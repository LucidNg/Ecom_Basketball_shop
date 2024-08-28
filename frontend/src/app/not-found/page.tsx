"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decryptToken } from '@/lib/decrypt';

interface DecodedToken {
    role: string;
}

const NotFound = () => {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            const decrypted = decryptToken(jwt);
            const payload = JSON.parse(atob(decrypted.split(".")[1]));
            const { role } = payload as DecodedToken;
            setUserRole(role);
        }
        const timer = setTimeout(() => {
            if (userRole === "admin") {
                router.push('/admin/orders');
            } else {
                router.push('/');
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [router, userRole]);

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-3xl">
                    <h1 className="text-7xl font-bold text-accent">404 - Page Not Found</h1>
                    <p className="py-6 text-gray-600">Sorry, the page you are looking for does not exist.</p>
                    <p className="text-gray-600">
                        You will be redirected to the valid page in 5 seconds...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
