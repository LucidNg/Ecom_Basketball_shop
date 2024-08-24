import { connectString } from "./constant";
import { decryptToken } from "./decrypt";

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

    const userID = await response.text();
    
    const createCartUrl = `${connectString}/createCart?userID=${encodeURIComponent(userID)}`;

    const createCartResponse = await fetch(createCartUrl, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
    });

    if (!createCartResponse.ok) {
        const errorMsg = await createCartResponse.text();
        throw new Error(`Failed to create cart: ${errorMsg}`);
    }

    return "User registered successfully";
}

export interface UserLogin {
    email: string;
    password: string;
}

export async function LoginUser(
    userData: UserLogin
): Promise<string> {
    const url = `${connectString}/authenticate?email=${encodeURIComponent(userData.email)}&password=${encodeURIComponent(userData.password)}`;

    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
    });

    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Failed to login: ${errorMsg}`);
    }

    const jwt = await response.text();
    

    return jwt; // Returning the JWT token received from the server
}
