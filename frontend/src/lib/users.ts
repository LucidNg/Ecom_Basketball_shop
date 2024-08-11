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
