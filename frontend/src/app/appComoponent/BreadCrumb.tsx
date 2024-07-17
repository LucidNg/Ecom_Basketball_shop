"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
    const pathname = usePathname();
    const pathnames = pathname ? pathname.split('/').filter((x) => x) : [];

    const getBreadcrumbText = (path: string) => {
        switch (path) {
            case 'wm':
                return 'women';
            default:
                return path;
        }
    };

    return (
        <div className="breadcrumbs text-lg text-base-content px-10 sm:px-20 pt-10">
            <ul>
                <li>
                    <Link href="/" className="hover:font-semibold">Home</Link>
                </li>
                {pathnames.map((path, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const breadcrumbText = getBreadcrumbText(path);
                    return (
                        <li key={path} className="hover:font-semibold capitalize">
                            {isLast ? (
                                <span>{breadcrumbText}</span>
                            ) : (
                                <Link href={routeTo}>{breadcrumbText}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
