import React from "react";
import Link from "next/link";
import AlignLeft from '@geist-ui/icons/alignLeft'


export default function Navbar () {
    return (
        <div className="navbar h-12 bg-neutral px-8 lg:px-14 w-full justify-between">
            <div className="hidden w-full justify-between md:inline-flex 2xl:gap-8 2xl:justify-normal">
                <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button"><Link href="/" className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Quần áo</Link></div>
                {/* <ul tabIndex={0} className="dropdown-content menu bg-neutral rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                        <div className="dropdown dropdown-hover sub">
                            <div tabIndex={1} role="button1" className="btn m-1">Hover</div>
                            <ul tabIndex={1} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>
                    </li>
                </ul> */}
                <div className="dropdown-content">
                    <ul className="menu md:menu-horizontal bg-base-content rounded-box md:min-w-max p-10 gap-12">
                        <li>
                            <Link href="/"className="text-3xl font-semibold pb-5">Nam</Link>
                            <ul>
                                <li><Link href="/"className="text-xl">Áo thun</Link></li>
                                <li><Link href="/"className="text-xl">Áo jersey</Link></li>
                                <li><Link href="/"className="text-xl">Áo hoodie</Link></li>
                                <li><Link href="/"className="text-xl">Quần short</Link></li>
                                <li><Link href="/"className="text-xl">Quần dài</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link href="/"className="text-3xl font-semibold pb-5">Nữ</Link>
                            <ul>
                                <li><Link href="/"className="text-xl">Áo thun</Link></li>
                                <li><Link href="/"className="text-xl">Áo jersey</Link></li>
                                <li><Link href="/"className="text-xl">Áo hoodie</Link></li>
                                <li><Link href="/"className="text-xl">Quần short</Link></li>
                                <li><Link href="/"className="text-xl">Quần dài</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link href="/"className="text-3xl font-semibold pb-5">Trẻ em</Link>
                            <ul>
                                <li><Link href="/"className="text-xl">Áo thun</Link></li>
                                <li><Link href="/"className="text-xl">Áo jersey</Link></li>
                                <li><Link href="/"className="text-xl">Áo hoodie</Link></li>
                                <li><Link href="/"className="text-xl">Quần short</Link></li>
                                <li><Link href="/"className="text-xl">Quần dài</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                </div>
                <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button"><Link href="/" className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Giày</Link></div>
                <div className="dropdown-content">
                    <ul className="menu bg-base-content rounded-box w-56 py-5">
                        <li><Link href="/"className="text-xl">Nam</Link></li>
                        <li><Link href="/"className="text-xl">Nữ</Link></li>
                        <li><Link href="/"className="text-xl">Trẻ em</Link></li>
                    </ul>
                </div>
                </div>
                <Link href="/" className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Bóng rổ</Link>
                <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button"><Link href="/" className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Phụ kiện</Link></div>
                    <div className="dropdown-content">
                        <ul className="menu bg-base-content rounded-box w-56 py-5">
                            <li><Link href="/"className="text-xl">Băng thun</Link></li>
                            <li><Link href="/"className="text-xl">Bình nước</Link></li>
                            <li><Link href="/"className="text-xl">Balo</Link></li>
                            <li><Link href="/"className="text-xl">Dụng cụ</Link></li>
                        </ul>
                    </div>
                </div>
                <Link href="/" className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Mới nhất</Link>
                <Link href="/" className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Sale</Link>
            </div>
            <div className="navbar-start md:hidden">
                <div className="dropdown dropdown-content">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <AlignLeft size={30} strokeWidth={2}/>
                </div>

                <ul
                    tabIndex={0}
                    className="menu-sm dropdown-content menu bg-base-content z-[1] w-52 p-2 shadow mt-2">
                    <li>
                        <details >
                        <summary><Link href="/"className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Quần áo</Link></summary>
                        <ul>
                            <li>
                                <details>
                                    <summary><Link href="/"className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Nam</Link></summary>
                                    <ul>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo thun</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo jersey</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo hoodie</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần short</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần dài</Link></li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details>
                                    <summary><Link href="/"className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Nữ</Link></summary>
                                    <ul>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo thun</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo jersey</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo hoodie</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần short</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần dài</Link></li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details>
                                    <summary><Link href="/"className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Trẻ em</Link></summary>
                                    <ul>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo thun</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo jersey</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo hoodie</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần short</Link></li>
                                    <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần dài</Link></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                        </details>
                    </li>
                    <li>
                        <details >
                        <summary><Link href="/" className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Giày</Link></summary>
                        <ul>
                            <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Nam</Link></li>
                            <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Nữ</Link></li>
                            <li><Link href="/"className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Trẻ em</Link></li>
                        </ul>
                        </details>
                    </li>
                    <li><Link href="/" className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Bóng rổ</Link></li>
                    <li>
                        <details >
                        <summary><Link href="/"className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Phụ kiện</Link></summary>
                        <ul>
                            <li><Link href="/"className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Băng thun</Link></li>
                            <li><Link href="/"className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Bình nước</Link></li>
                            <li><Link href="/"className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Balo</Link></li>
                            <li><Link href="/"className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Dụng cụ</Link></li>
                        </ul>
                        </details>
                    </li>
                    <li><Link href="/" className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Mới nhất</Link></li>
                    <li><Link href="/" className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Sale</Link></li>
                </ul>
                </div>
            </div>
            <div className="inline md:hidden xl:inline md:pl-8">
                <h2 className="inline md:hidden text-2xl font-semibold xl:inline">boroshop@gmail.com</h2>
            </div>
        </div>
    )
}