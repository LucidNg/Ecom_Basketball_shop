"use client";
import { decryptToken } from "@/lib/decrypt";
import React, { useEffect, useState } from "react";
import { CheckPassword, UpdateUserDetail, UpdateUserPassword } from "@/lib/users";

export default function ProfilePage() {
    const [isEditable, setIsEditable] = useState(false);
    const [userID, setUserID] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [tokenAvailable, setTokenAvailable] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (token) {
            setTokenAvailable(true);
        } else {
            const checkForToken = setInterval(() => {
                const token = localStorage.getItem("jwt");
                if (token) {
                    setTokenAvailable(true);
                    clearInterval(checkForToken);
                }
            }, 100);

            return () => clearInterval(checkForToken);
        }
    }, []);

    useEffect(() => {
        if (!tokenAvailable) return;

        const token = localStorage.getItem("jwt");
        if (token) {
            const decrypted = decryptToken(token);
            const payload = JSON.parse(atob(decrypted.split(".")[1]));
            
            setUserID(payload.userID);
            setName(payload.fullname);
            setEmail(payload.email);
            setDateOfBirth(payload.dob);
            setAddress(payload.address);
            setContactNumber(payload.phoneNumber); 
            console.log("User data loaded successfully.");
        } else {
            console.log("Error: User not found");
        }
    }, [tokenAvailable]);

    const handleToggleEdit = async () => {
        if (isEditable) {
            try {
                await UpdateUserDetail({
                    userID: userID,
                    fullName: name,
                    dob: dateOfBirth,
                    phoneNumber: contactNumber,
                    address: address,
                });
                alert("User details updated successfully.");
            } catch (err) {
                if (err instanceof Error) {
                    console.error(`Failed to update user details: ${err.message}`);
                    alert(`Failed to update user details: ${err.message}. Please try again.`);
                } else {
                    console.error("An unknown error occurred.");
                    alert("An unknown error occurred. Please try again.");
                }
            }
        }
        setIsEditable(!isEditable);
    };

    const handlePasswordChange = async () => {
        try {
            const isPasswordCorrect = await CheckPassword({ email, password: currentPassword });
            if (!isPasswordCorrect) {
                setError("Current password is incorrect.");
                return;
            }

            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(newPassword)) {
                setError("New password must be at least 8 characters long and include both text and numbers.");
                return;
            }

            await UpdateUserPassword(userID, newPassword);
            setPassword(newPassword);
            setError('');
            alert("Password updated successfully");

            const modal = document.getElementById('my_modal_3');
            if (modal) {
                (modal as HTMLDialogElement).close();
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(`Failed to update password: ${err.message}`);
                console.error(`Failed to update password: ${err.message}`);
            } else {
                setError("Failed to update password due to an unknown error.");
                console.error("An unknown error occurred while updating the password.");
            }
        }
    };

    return (
        <>
            <div className="sm:p-8 p-2 mb-4 mt-10 mx-10 sm:mx-auto md:w-7/12 shadow-lg shadow-base-content/40">
                <h2 className="text-base-content text-4xl font-semibold pt-5">Account Details</h2>
                <div className="bg-base-100 border-base-300 rounded-box p-6">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 w-full place-items-start pt-4">
                    <div className="flex items-center w-full">
                        <label htmlFor="name" className="text-xl text-primary-content w-1/3 mb-2">Name</label>
                        <input 
                            id="name"
                            className={`border-b-2 border-b-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl w-2/3 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="flex items-center w-full">
                        <label htmlFor="dateOfBirth" className="text-xl text-primary-content w-1/3 mb-2">Date of Birth</label>
                        <input 
                            id="dateOfBirth"
                            className={`border-b-2 border-b-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl w-2/3 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="flex items-center w-full">
                        <label htmlFor="contactNumber" className="text-xl text-primary-content w-1/3 mb-2">Contact Number</label>
                        <input 
                            id="contactNumber"
                            className={`border-b-2 border-b-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl w-2/3 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Contact number"
                            type="number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="flex items-center w-full">
                        <label htmlFor="address" className="text-xl text-primary-content w-1/3 mb-2">Address</label>
                        <input 
                            id="address"
                            className={`border-b-2 border-b-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl w-2/3 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="flex items-center w-full">
                        <label htmlFor="email" className="text-xl text-primary-content w-1/3 mb-2">Email</label>
                        <input 
                            id="email"
                            className={`border-b-2 border-b-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl w-2/3 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={true}
                        />
                    </div>

                    <div className="flex items-center w-full">
                        <label htmlFor="password" className="text-xl text-primary-content w-1/3 mb-2">Password</label>
                        <div className="relative w-2/3">
                            <input 
                                id="password"
                                className={`border-b-2 border-b-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                    p-2 text-xl w-full caret-transparent focus:caret-black focus:border-b-4 ${
                                    isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                                }`}
                                placeholder="●●●●●●●●"
                                type="password"
                                value={"●●●●●●●●"}
                                disabled={true}
                            />
                            <button 
                                className={`text-base-content text-sm hover:underline absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none ${
                                    isEditable ? '' : 'cursor-not-allowed opacity-50'
                                }`} 
                                onClick={() => {
                                    if (isEditable) {
                                        const modal = document.getElementById('my_modal_3');
                                        if (modal) {
                                            (modal as HTMLDialogElement).showModal();
                                        }
                                    }
                                }}
                                disabled={!isEditable}
                            >
                                Change
                            </button>
                        </div>
                    </div>

                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-primary-content">✕</button>
                                </form>
                                <div className="gap-y-3 flex flex-col my-5">
                                    <h2 className="text-2xl text-base-content font-medium self-center mb-3">Change password</h2>
                                    <h3 className="text-lg text-base-content font-medium">Current password</h3>
                                    <input 
                                        className={`border-b-2 border-b-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                            p-2 text-xl  w-full caret-transparent focus:caret-black focus:border-b-4 ${
                                            isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                                        }`}
                                        placeholder="current password"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />

                                    <h3 className="text-lg text-base-content font-medium">New password</h3>
                                    <input 
                                        className={`border-b-2 border-b-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                            p-2 text-xl  w-full caret-transparent focus:caret-black focus:border-b-4 ${
                                            isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                                        }`}
                                        placeholder="new password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    {error && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {error}
                                        </span>
                                    )}
                                </div>

                                <div className="modal-action">
                                    <button 
                                        className={`btn btn-block text-lg capitalize bg-base-content text-base-100 ${
                                            isEditable ? '' : 'cursor-not-allowed opacity-50'
                                        }`} 
                                        onClick={handlePasswordChange}
                                        disabled={!isEditable}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    <div className="flex justify-center gap-4 my-6 pt-5">
                        <button
                            className="btn w-1/6 border-none shadow-lg hover:scale-105 hover:translate-y-0.5 duration-300 transition-transform text-xl text-base-100 bg-neutral bg-opacity-50 hover:bg-neutral"
                            onClick={handleToggleEdit}
                        >
                            {isEditable ? "Save" : "Edit"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
