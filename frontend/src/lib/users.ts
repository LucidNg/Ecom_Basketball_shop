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


export async function CheckPassword(
    userData: UserLogin
): Promise<boolean> {
    const url = `${connectString}/authenticate?email=${encodeURIComponent(userData.email)}&password=${encodeURIComponent(userData.password)}`;

    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
    });

    if (!response.ok) {
        return false;
    }
    

    return true; // Returning the JWT token received from the server
}

export interface UserDetailUpdate {
    userID: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    dob: string;
}


export async function UpdateUserDetail(
    userDetailData: UserDetailUpdate
): Promise<string> {
    const url = `${connectString}/updateUserDetail?userID=${encodeURIComponent(userDetailData.userID)}`
                    +`&fullName=${encodeURIComponent(userDetailData.fullName)}`
                    + `&phoneNumber=${encodeURIComponent(userDetailData.phoneNumber)}`
                    + `&address=${encodeURIComponent(userDetailData.address)}`
                    + `&dob=${encodeURIComponent(userDetailData.dob)}`;
    
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
    });

    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Failed to update user details: ${errorMsg}`);
    }

    return "User details updated successfully";
}

export async function UpdateUserPassword(
    userID: string,
    newPassword: string
): Promise<string> {
    const url = `${connectString}/updateUserPassword?userID=${encodeURIComponent(userID)}`
                    +`&newPassword=${encodeURIComponent(newPassword)}`;

    console.log(url)
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
    });

    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Failed to update password: ${errorMsg}`);
    }

    return "Password updated successfully";
}

export interface UserDetail {
    fullName: string;
    phoneNumber: string;
    address: string;
    dob: string;
}

export async function QueryUserDetail(userID: string): Promise<UserDetail[]> {
    const url = `${connectString}/userDetail?userID=${encodeURIComponent(userID)}`;
  
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
    });

    console.log("loading user detail");
  
    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Failed to fetch user details: ${errorMsg}`);
    }
  
    const userDetails: UserDetail[] = await response.json();
    return userDetails;
}
