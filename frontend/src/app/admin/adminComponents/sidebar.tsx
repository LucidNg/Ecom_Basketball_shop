"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { decryptToken } from '@/lib/decrypt';

export default function SideBar() {
    const [open, setOpen] = useState(false);
    const currentPath = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userID, setUserID] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const router = useRouter();  // Use useRouter hook
    

    const isCurrentPage = (path: string) => currentPath === path;

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            setIsAuthenticated(true);
            const decrypted = decryptToken(token);
            const payload = JSON.parse(atob(decrypted.split('.')[1]));
            setUsername(payload.fullname);
            setUserID(payload.userID);
            setEmail(payload.email);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setIsAuthenticated(false);
        setUsername("");

        router.push("/auth/login");
    };

    return (
        <div
            className={`SideBar bg-base-content h-screen flex flex-col py-20 px-6 transition-all duration-300 ${open ? "w-60" : "w-24"}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="relative inline-flex items-center">
                <div className="Avatar rounded-full bg-gray-500 w-10 h-10 flex-shrink-0"></div>
                <h1
                    className={`absolute left-14 text-lg transition-transform duration-300 ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
                >
                    <span className="block line-clamp-2">
                        {email}
                    </span>
                </h1>
            </div>

            <div className="mt-32 flex flex-col gap-y-10">
                <Link href="/admin/inventory">
                    <div className={`flex items-center transition-all duration-300 ${isCurrentPage("/admin/inventory") ? "opacity-100" : "opacity-50"} hover:opacity-100`}>
                        <div className="w-10 h-10 flex-shrink-0">
                            <Image src={`/icons/inventory.svg`} alt="Inventory" width={36} height={36} />
                        </div>
                        <h1
                            className={`ml-4 text-2xl transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
                        >
                            Inventory
                        </h1>
                    </div>
                </Link>

                <Link href="/admin/orders">
                    <div className={`flex items-center transition-all duration-300 ${isCurrentPage("/admin/orders") ? "opacity-100" : "opacity-50"} hover:opacity-100`}>
                        <div className="w-10 h-10 flex-shrink-0">
                            <Image src={`/icons/orders.svg`} alt="Orders" width={36} height={36} />
                        </div>
                        <h1
                            className={`ml-4 text-2xl transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
                        >
                            Orders
                        </h1>
                    </div>
                </Link>

                <Link href="/admin/customers">
                    <div className={`flex items-center transition-all duration-300 ${isCurrentPage("/admin/customers") ? "opacity-100" : "opacity-50"} hover:opacity-100`}>
                        <div className="w-10 h-10 flex-shrink-0">
                            <Image src={`/icons/customers.svg`} alt="Customers" width={36} height={36} />
                        </div>
                        <h1
                            className={`ml-4 text-2xl transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
                        >
                            Customers
                        </h1>
                    </div>
                </Link>

                <Link href="/admin/statistics">
                    <div className={`flex items-center transition-all duration-300 ${isCurrentPage("/admin/statistics") ? "opacity-100" : "opacity-50"} hover:opacity-100`}>
                        <div className="w-10 h-10 flex-shrink-0">
                            <Image src={`/icons/stats.svg`} alt="Statistics" width={36} height={36} />
                        </div>
                        <h1
                            className={`ml-4 text-2xl transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
                        >
                            Statistics
                        </h1>
                    </div>
                </Link>

                <div className={`border-2 border-white ${open ? "border-opacity-100" : "border-opacity-50"}`}></div>

                <div className="flex items-center transition-all duration-300 opacity-50 hover:opacity-100 focus:opacity-100" role="button" onClick={handleLogout}>
                    <div className="w-10 h-10 flex-shrink-0">
                        <Image src={`/icons/logout_icon.svg`} alt="Logout" width={36} height={36} />
                    </div>
                    <h1
                        className={`ml-4 text-2xl transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
                    >
                        Logout
                    </h1>
                </div>

            </div>
        </div>
    );
}
