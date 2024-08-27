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
                    fullName: name,
                    dob: dateOfBirth,
                    phoneNumber: contactNumber,
                    address: address,
                    userID: userID,
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

            await UpdateUserPassword(email, newPassword);
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
            <div role="tablist" className="tabs tabs-lifted p-24 mt-2 mx-auto md:w-7/12">
                {/* Profile Tab */}
                <input  
                    type="radio" 
                    name="my_tabs_2" 
                    role="tab" 
                    className="tab font-semibold text-2xl text-primary-content" 
                    aria-label="Profile" 
                    defaultChecked
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 w-full place-items-center pt-8">
                        <input 
                            className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl rounded-lg w-4/5 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditable}
                        />

                        <div className="flex items-center justify-center">
                            <span className="text-2xl text-primary-content cursor-not-allowed xl:inline hidden">Date of birth :</span>
                            <input 
                                className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                    p-2 text-xl rounded-lg w-4/5 caret-transparent focus:caret-black focus:border-b-4 ml-2 ${
                                    isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                                }`}
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                disabled={!isEditable}
                                placeholder="Date of Birth"
                            />
                        </div>

                        <input 
                            className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl rounded-lg w-4/5 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Contact number"
                            type="number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            disabled={!isEditable}
                        />

                        <input 
                            className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl rounded-lg w-4/5 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!isEditable}
                        />

                        <input 
                            className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl rounded-lg w-4/5 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={true}
                        />

                        <div className="relative w-4/5">
                            <input 
                                className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                    p-2 text-xl rounded-lg w-full caret-transparent focus:caret-black focus:border-b-4 ${
                                    isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                                }`}
                                placeholder="●●●●●●●●"
                                type="password"
                                value={"●●●●●●●●"}
                                disabled={true}
                                id="visual-password"
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

                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-primary-content">✕</button>
                                </form>
                                <div className="gap-y-3 flex flex-col my-5">
                                    <h2 className="text-2xl text-base-content font-medium self-center mb-3">Change password</h2>
                                    <h3 className="text-lg text-base-content font-medium">Current password</h3>
                                    <input 
                                        className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                            p-2 text-xl rounded-lg w-full caret-transparent focus:caret-black focus:border-b-4 ${
                                            isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                                        }`}
                                        placeholder="current password"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />

                                    <h3 className="text-lg text-base-content font-medium">New password</h3>
                                    <input 
                                        className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                            p-2 text-xl rounded-lg w-full caret-transparent focus:caret-black focus:border-b-4 ${
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
                    <div className="flex justify-center gap-4 my-6">
                        <button
                            className="btn text-xl text-primary-content bg-secondary bg-opacity-50 hover:bg-secondary"
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
