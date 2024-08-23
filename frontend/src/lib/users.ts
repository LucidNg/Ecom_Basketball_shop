import { connectString } from "./constant";

export interface UserRegistration {
    fullname: string;
    email: string;
    password: string;
}

export async function RegisterUser(
    userData: UserRegistration
): Promise<string> {
    const url = `${connectString}/users?email=${encodeURIComponent(userData.email)}&password=${encodeURIComponent(userData.password)}&fullname=${encodeURIComponent(userData.fullname)}`;

    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
    });

    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Failed to register user: ${errorMsg}`);
    }

    return "User registered successfully";
}

export interface UserLogin {
    email: string;
    password: string;
}

export async function LoginUser(
    userData: UserLogin
): Promise<void> {
    const url = `${connectString}/authenticate?email=${encodeURIComponent(userData.email)}&password=${encodeURIComponent(userData.password)}`;

    const response = await fetch(url, {
        method: "POST",
        credentials: "include", // This ensures that cookies (including HTTP-only) are included in requests
        mode: "cors",
        cache: "no-cache",
    });

    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Failed to login: ${errorMsg}`);
    }

}

export async function getAuthStatus(): Promise<{ fullname: string; email: string; userID: string } | null> {
    const url = `${connectString}/auth/status`;

    const response = await fetch(url, {
        method: "GET",
        credentials: "include", // Important to include cookies in the request
        mode: "cors",
        cache: "no-cache",
    });

    if (!response.ok) {
        console.error('Failed to fetch auth status:', response.statusText);
        return null;
    }

    const data = await response.json();
    return data;
}
