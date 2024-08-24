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
    // Step 2: Decrypt the JWT token using the decryptToken function
    const decryptedJwt = decryptToken(jwt);

    // Step 3: Parse the decrypted JWT to extract the userID
    let userID: string;
    try {
        const parsedToken = JSON.parse(decryptedJwt);
        userID = parsedToken.userID; // Assume userID is stored directly in the JWT payload
    } catch (error) {
        throw new Error("Failed to parse decrypted JWT: " + error);
    }

    // Step 4: Make a request to the /createCart endpoint using the extracted userID
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

    return jwt; // Returning the JWT token received from the server
}
