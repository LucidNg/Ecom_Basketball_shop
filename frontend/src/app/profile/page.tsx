"use client";
import React, { useState } from "react";

export default function ProfilePage() {
    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleToggleEdit = () => {
        if (isEditable) {
            console.log({ name, dateOfBirth, contactNumber, address, email, password });
        }
        setIsEditable(!isEditable);
    };

    return (
        <>
            <div role="tablist" className="tabs tabs-lifted p-24 mt-2 mx-auto w-7/12">
                <input  
                    type="radio" 
                    name="my_tabs_2" 
                    role="tab" 
                    className="tab font-semibold text-2xl text-primary-content" 
                    aria-label="Profile" 
                    defaultChecked
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 w-full place-items-center">
                        <input 
                            className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl w-4/5 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditable}
                        />

                        <div className="flex items-center justify-center">
                            <span className="text-2xl text-primary-content cursor-not-allowed">Date of birth :</span>
                            <input 
                                className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                    p-2 text-xl caret-transparent focus:caret-black focus:border-b-4 ml-2 ${
                                    isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                                }`}
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                disabled={!isEditable}
                            />
                        </div>

                        <input 
                            className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl w-4/5 caret-transparent focus:caret-black focus:border-b-4 ${
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
                                p-2 text-xl w-4/5 caret-transparent focus:caret-black focus:border-b-4 ${
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
                                p-2 text-xl w-4/5 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditable}
                        />

                        <input 
                            className={`border border-primary-content text-primary-content placeholder:text-opacity-50 placeholder:text-primary-content 
                                p-2 text-xl w-4/5 caret-transparent focus:caret-black focus:border-b-4 ${
                                isEditable ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'
                            }`}
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={!isEditable}
                        />
                    </div>
                    
                    <div className="flex justify-center mt-10">
                        <button 
                            className="btn text-xl text-primary-content bg-secondary bg-opacity-50 hover:bg-secondary"
                            onClick={handleToggleEdit}
                        >
                            {isEditable ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab font-semibold text-2xl text-primary-content"
                    aria-label="Rewards"
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[255px]">
                    {/* Rewards content */}
                </div>

                <input 
                    type="radio" 
                    name="my_tabs_2" 
                    role="tab" 
                    className="tab font-semibold text-2xl text-primary-content" 
                    aria-label="Coupon" 
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[255px]">
                    {/* Coupon content */}
                </div>
            </div>
        </>
    );
}
