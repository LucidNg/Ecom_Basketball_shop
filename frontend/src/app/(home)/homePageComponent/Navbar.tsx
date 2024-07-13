import React from "react";
import Link from "next/link";
import AlignLeft from '@geist-ui/icons/alignLeft';

const generateLink = (category = '', subcategory = '') => {
    if (subcategory) {
        return `/browse/${category}/${subcategory}`;
    }
    return `/browse/${category}`;
};

export default function Navbar() {
    return (
        <div className="navbar h-12 bg-neutral px-8 lg:px-14 w-full justify-between">
            <div className="hidden w-full justify-between md:inline-flex 2xl:gap-8 2xl:justify-normal">
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button">
                        <Link href={generateLink('quan-ao')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Quần áo</Link>
                    </div>

                    <div className="dropdown-content z-10">
                        <ul className="menu md:menu-horizontal bg-base-content rounded-box md:min-w-max p-10 gap-12">
                            <li>
                                <Link href={generateLink('quan-ao', 'nam')} className="text-3xl font-semibold pb-5">Nam</Link>
                                <ul>
                                    <li><Link href={generateLink('quan-ao', 'nam/ao-thun')} className="text-xl">Áo thun</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'nam/ao-jersey')} className="text-xl">Áo jersey</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'nam/ao-hoodie')} className="text-xl">Áo hoodie</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'nam/quan-short')} className="text-xl">Quần short</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'nam/quan-dai')} className="text-xl">Quần dài</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link href={generateLink('quan-ao', 'nu')} className="text-3xl font-semibold pb-5">Nữ</Link>
                                <ul>
                                    <li><Link href={generateLink('quan-ao', 'nu/ao-thun')} className="text-xl">Áo thun</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'nu/ao-jersey')} className="text-xl">Áo jersey</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'nu/ao-hoodie')} className="text-xl">Áo hoodie</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'nu/quan-short')} className="text-xl">Quần short</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'nu/quan-dai')} className="text-xl">Quần dài</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link href={generateLink('quan-ao', 'tre-em')} className="text-3xl font-semibold pb-5">Trẻ em</Link>
                                <ul>
                                    <li><Link href={generateLink('quan-ao', 'tre-em/ao-thun')} className="text-xl">Áo thun</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'tre-em/ao-jersey')} className="text-xl">Áo jersey</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'tre-em/ao-hoodie')} className="text-xl">Áo hoodie</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'tre-em/quan-short')} className="text-xl">Quần short</Link></li>
                                    <li><Link href={generateLink('quan-ao', 'tre-em/quan-dai')} className="text-xl">Quần dài</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button">
                        <Link href={generateLink('giay')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Giày</Link>
                    </div>
                    <div className="dropdown-content z-10">
                        <ul className="menu bg-base-content rounded-box w-56 py-5">
                            <li><Link href={generateLink('giay', 'nam')} className="text-xl">Nam</Link></li>
                            <li><Link href={generateLink('giay', 'nu')} className="text-xl">Nữ</Link></li>
                            <li><Link href={generateLink('giay', 'tre-em')} className="text-xl">Trẻ em</Link></li>
                        </ul>
                    </div>
                </div>
                <Link href={generateLink('bong-ro')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Bóng rổ</Link>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button">
                        <Link href={generateLink('phu-kien')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Phụ kiện</Link>
                    </div>
                    <div className="dropdown-content z-10">
                        <ul className="menu bg-base-content rounded-box w-56 py-5">
                            <li><Link href={generateLink('phu-kien', 'bang-thun')} className="text-xl">Băng thun</Link></li>
                            <li><Link href={generateLink('phu-kien', 'binh-nuoc')} className="text-xl">Bình nước</Link></li>
                            <li><Link href={generateLink('phu-kien', 'balo')} className="text-xl">Balo</Link></li>
                            <li><Link href={generateLink('phu-kien', 'dung-cu')} className="text-xl">Dụng cụ</Link></li>
                        </ul>
                    </div>
                </div>
                <Link href={generateLink('moi-nhat')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Mới nhất</Link>
                <Link href={generateLink('sale')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Sale</Link>
            </div>
            <div className="navbar-start md:hidden">
                <div className="dropdown dropdown-content">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <AlignLeft size={30} strokeWidth={2} />
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu-sm dropdown-content menu bg-base-content z-[1] w-52 p-2 shadow mt-2">
                        <li>
                            <details>
                                <summary><Link href={generateLink('quan-ao')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Quần áo</Link></summary>
                                <ul>
                                    <li>
                                        <details>
                                            <summary><Link href={generateLink('quan-ao', 'nam')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Nam</Link></summary>
                                            <ul>
                                                <li><Link href={generateLink('quan-ao', 'nam/ao-thun')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo thun</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'nam/ao-jersey')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo jersey</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'nam/ao-hoodie')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo hoodie</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'nam/quan-short')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần short</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'nam/quan-dai')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần dài</Link></li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li>
                                        <details>
                                            <summary><Link href={generateLink('quan-ao', 'nu')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Nữ</Link></summary>
                                            <ul>
                                                <li><Link href={generateLink('quan-ao', 'nu/ao-thun')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo thun</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'nu/ao-jersey')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo jersey</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'nu/ao-hoodie')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo hoodie</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'nu/quan-short')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần short</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'nu/quan-dai')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần dài</Link></li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li>
                                        <details>
                                            <summary><Link href={generateLink('quan-ao', 'tre-em')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Trẻ em</Link></summary>
                                            <ul>
                                                <li><Link href={generateLink('quan-ao', 'tre-em/ao-thun')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo thun</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'tre-em/ao-jersey')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo jersey</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'tre-em/ao-hoodie')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Áo hoodie</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'tre-em/quan-short')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần short</Link></li>
                                                <li><Link href={generateLink('quan-ao', 'tre-em/quan-dai')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Quần dài</Link></li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary><Link href={generateLink('giay')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Giày</Link></summary>
                                <ul>
                                    <li><Link href={generateLink('giay', 'nam')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Nam</Link></li>
                                    <li><Link href={generateLink('giay', 'nu')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Nữ</Link></li>
                                    <li><Link href={generateLink('giay', 'tre-em')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Trẻ em</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link href={generateLink('bong-ro')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Bóng rổ</Link></li>
                        <li>
                            <details>
                                <summary><Link href={generateLink('phu-kien')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Phụ kiện</Link></summary>
                                <ul>
                                    <li><Link href={generateLink('phu-kien', 'bang-thun')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Băng thun</Link></li>
                                    <li><Link href={generateLink('phu-kien', 'binh-nuoc')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Bình nước</Link></li>
                                    <li><Link href={generateLink('phu-kien', 'balo')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Balo</Link></li>
                                    <li><Link href={generateLink('phu-kien', 'dung-cu')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Dụng cụ</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link href={generateLink('moi-nhat')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Mới nhất</Link></li>
                        <li><Link href={generateLink('sale')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Sale</Link></li>
                    </ul>
                </div>
            </div>
            <div className="inline md:hidden xl:inline md:pl-8">
                <h2 className="inline md:hidden text-2xl font-semibold xl:inline">boroshop@gmail.com</h2>
            </div>
        </div>
    );
}
