import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-3xl">
                    <h1 className="text-7xl font-bold text-accent">404 - Page Not Found</h1>
                    <p className="py-6 text-gray-600">Sorry, the page you are looking for does not exist.</p>
                    <p className="text-gray-600">You will be redirected to the home page in 5 seconds...</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
