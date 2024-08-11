import React from "react";
import Link from "next/link";
import AlignLeft from '@geist-ui/icons/alignLeft';

const generateLink = (category = '', subcategory = '') => {
    if (subcategory) {
        return `/${category}/${subcategory}`;
    }
    return `/${category}`;
};

export default function Navbar() {
    return (
        <div className="navbar h-12 bg-neutral px-8 lg:px-14 w-full justify-between">
            <div className="hidden w-full justify-between md:inline-flex 2xl:gap-8 2xl:justify-normal">
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button">
                        <Link href={generateLink('clothes')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Clothes</Link>
                    </div>

                    <div className="dropdown-content z-10">
                        <ul className="menu md:menu-horizontal bg-base-content rounded-box md:min-w-max p-10 gap-12">
                            <li>
                                <Link href={generateLink('clothes', 'men')} className="text-3xl font-semibold pb-5 focus:text-base-100">Men</Link>
                                <ul>
                                    <li><Link href={generateLink('clothes', 'men/t-shirt')} className="text-xl focus:text-base-100">T-shirt</Link></li>
                                    <li><Link href={generateLink('clothes', 'men/jersey')} className="text-xl focus:text-base-100">Jersey</Link></li>
                                    <li><Link href={generateLink('clothes', 'men/hoodie')} className="text-xl focus:text-base-100">Hoodie</Link></li>
                                    <li><Link href={generateLink('clothes', 'men/shorts')} className="text-xl focus:text-base-100">Shorts</Link></li>
                                    <li><Link href={generateLink('clothes', 'men/trousers')} className="text-xl focus:text-base-100">Trousers</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link href={generateLink('clothes', 'wm')} className="text-3xl font-semibold pb-5 focus:text-base-100">Women</Link>
                                <ul>
                                    <li><Link href={generateLink('clothes', 'wm/t-shirt')} className="text-xl focus:text-base-100">T-shirt</Link></li>
                                    <li><Link href={generateLink('clothes', 'wm/jersey')} className="text-xl focus:text-base-100">Jersey</Link></li>
                                    <li><Link href={generateLink('clothes', 'wm/hoodie')} className="text-xl focus:text-base-100">Hoodie</Link></li>
                                    <li><Link href={generateLink('clothes', 'wm/shorts')} className="text-xl focus:text-base-100">Shorts</Link></li>
                                    <li><Link href={generateLink('clothes', 'wm/trousers')} className="text-xl focus:text-base-100">Trousers</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link href={generateLink('clothes', 'kid')} className="text-3xl font-semibold pb-5 focus:text-base-100">Kid</Link>
                                <ul>
                                    <li><Link href={generateLink('clothes', 'kid/t-shirt')} className="text-xl focus:text-base-100">T-shirt</Link></li>
                                    <li><Link href={generateLink('clothes', 'kid/jersey')} className="text-xl focus:text-base-100">Jersey</Link></li>
                                    <li><Link href={generateLink('clothes', 'kid/hoodie')} className="text-xl focus:text-base-100">Hoodie</Link></li>
                                    <li><Link href={generateLink('clothes', 'kid/shorts')} className="text-xl focus:text-base-100">Shorts</Link></li>
                                    <li><Link href={generateLink('clothes', 'kid/trousers')} className="text-xl focus:text-base-100">Trousers</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button">
                        <Link href={generateLink('shoes')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Shoes</Link>
                    </div>
                    <div className="dropdown-content z-10">
                        <ul className="menu bg-base-content rounded-box w-56 py-5">
                            <li><Link href={generateLink('shoes', 'men')} className="text-xl focus:text-base-100">Men</Link></li>
                            <li><Link href={generateLink('shoes', 'wm')} className="text-xl focus:text-base-100">Women</Link></li>
                            <li><Link href={generateLink('shoes', 'kid')} className="text-xl focus:text-base-100">Kid</Link></li>
                        </ul>
                    </div>
                </div>
                <Link href={generateLink('ball')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Ball</Link>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button">
                        <Link href={generateLink('accessories')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Accessories</Link>
                    </div>
                    <div className="dropdown-content z-10">
                        <ul className="menu bg-base-content rounded-box w-56 py-5">
                            <li><Link href={generateLink('accessories', 'band')} className="text-xl focus:text-base-100">Band</Link></li>
                            <li><Link href={generateLink('accessories', 'water-bottle')} className="text-xl focus:text-base-100">Water bottle</Link></li>
                            <li><Link href={generateLink('accessories', 'backpack')} className="text-xl focus:text-base-100">Backpack</Link></li>
                            <li><Link href={generateLink('accessories', 'tool')} className="text-xl focus:text-base-100">Tool</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button">
                        <span className="text-2xl font-semibold cursor-none">
                            Brand
                        </span>
                    </div>
                    <div className="dropdown-content z-10">
                        <ul className="menu bg-base-content rounded-box w-56 py-5 grid grid-cols-2 gap-4">
                            <li><Link href={generateLink('brand', 'nike')} className="text-xl focus:text-base-100">Nike</Link></li>
                            <li><Link href={generateLink('brand', 'adidas')} className="text-xl focus:text-base-100">Adidas</Link></li>
                            <li><Link href={generateLink('brand', 'puma')} className="text-xl focus:text-base-100">Puma</Link></li>
                            <li><Link href={generateLink('brand', 'under-armour')} className="text-xl focus:text-base-100">Under Armour</Link></li>
                            <li><Link href={generateLink('brand', 'reebok')} className="text-xl focus:text-base-100">Reebok</Link></li>
                            <li><Link href={generateLink('brand', 'spalding')} className="text-xl focus:text-base-100">Spalding</Link></li>
                            <li><Link href={generateLink('brand', 'wilson')} className="text-xl focus:text-base-100">Wilson</Link></li>
                            <li><Link href={generateLink('brand', 'molten')} className="text-xl focus:text-base-100">Molten</Link></li>
                            <li><Link href={generateLink('brand', 'rawlings')} className="text-xl focus:text-base-100">Rawlings</Link></li>
                            <li><Link href={generateLink('brand', 'baden')} className="text-xl focus:text-base-100">Baden</Link></li>
                        </ul>
                    </div>
                </div>
                <Link href={generateLink('sale')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-neutral hover:font-bold">Sale</Link>
            </div>
            <div className="navbar-start md:hidden">
                <div className="dropdown dropdown-content">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <AlignLeft size={30} strokeWidth={2} />
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu-sm dropdown-content menu bg-base-content z-[1] w-56 p-2 shadow mt-2">
                        <li>
                            <details>
                                <summary><Link href={generateLink('clothes')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Clothes</Link></summary>
                                <ul>
                                    <li>
                                        <details>
                                            <summary><Link href={generateLink('clothes', 'men')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Men</Link></summary>
                                            <ul>
                                                <li><Link href={generateLink('clothes', 'men/t-shirt')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">T-shirt</Link></li>
                                                <li><Link href={generateLink('clothes', 'men/jersey')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Jersey</Link></li>
                                                <li><Link href={generateLink('clothes', 'men/hoodie')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Hoodie</Link></li>
                                                <li><Link href={generateLink('clothes', 'men/shorts')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Shorts</Link></li>
                                                <li><Link href={generateLink('clothes', 'men/trousers')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Trousers</Link></li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li>
                                        <details>
                                            <summary><Link href={generateLink('clothes', 'wm')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Women</Link></summary>
                                            <ul>
                                                <li><Link href={generateLink('clothes', 'wm/t-shirt')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">T-shirt</Link></li>
                                                <li><Link href={generateLink('clothes', 'wm/jersey')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Jersey</Link></li>
                                                <li><Link href={generateLink('clothes', 'wm/hoodie')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Hoodie</Link></li>
                                                <li><Link href={generateLink('clothes', 'wm/shorts')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Shorts</Link></li>
                                                <li><Link href={generateLink('clothes', 'wm/trousers')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Trousers</Link></li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li>
                                        <details>
                                            <summary><Link href={generateLink('clothes', 'kid')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Kid</Link></summary>
                                            <ul>
                                                <li><Link href={generateLink('clothes', 'kid/t-shirt')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">T-shirt</Link></li>
                                                <li><Link href={generateLink('clothes', 'kid/jersey')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Jersey</Link></li>
                                                <li><Link href={generateLink('clothes', 'kid/hoodie')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Hoodie</Link></li>
                                                <li><Link href={generateLink('clothes', 'kid/shorts')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Shorts</Link></li>
                                                <li><Link href={generateLink('clothes', 'kid/trousers')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Trousers</Link></li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary><Link href={generateLink('shoes')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Shoes</Link></summary>
                                <ul>
                                    <li><Link href={generateLink('shoes', 'men')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Men</Link></li>
                                    <li><Link href={generateLink('shoes', 'wm')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Women</Link></li>
                                    <li><Link href={generateLink('shoes', 'kid')} className="btn btn-ghost text-sm hover:bg-secondary hover:text-neutral hover:font-bold">Kid</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link href={generateLink('ball')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Ball</Link></li>
                        <li>
                            <details>
                                <summary><Link href={generateLink('accessories')} className="btn btn-ghost text-2xl hover:bg-secondary hover:text-primary-content hover:font-bold">Accessories</Link></summary>
                                <ul>
                                    <li><Link href={generateLink('accessories', 'band')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Band</Link></li>
                                    <li><Link href={generateLink('accessories', 'water-bottle')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Water bottle</Link></li>
                                    <li><Link href={generateLink('accessories', 'backpack')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">backpack</Link></li>
                                    <li><Link href={generateLink('accessories', 'tool')} className="btn btn-ghost text-lg hover:bg-secondary hover:text-neutral hover:font-bold">Tool</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary><div className="text-2xl cursor-none">Brand</div></summary>
                                <ul className=" grid grid-cols-2 gap-4 pr-5">
                                    <li><Link href={generateLink('brand', 'nike')} className="text-xl focus:text-base-100">Nike</Link></li>
                                    <li><Link href={generateLink('brand', 'adidas')} className="text-xl focus:text-base-100">Adidas</Link></li>
                                    <li><Link href={generateLink('brand', 'puma')} className="text-xl focus:text-base-100">Puma</Link></li>
                                    <li><Link href={generateLink('brand', 'under%20armour')} className="text-xl focus:text-base-100">Under Armour</Link></li>
                                    <li><Link href={generateLink('brand', 'reebok')} className="text-xl focus:text-base-100">Reebok</Link></li>
                                    <li><Link href={generateLink('brand', 'spalding')} className="text-xl focus:text-base-100">Spalding</Link></li>
                                    <li><Link href={generateLink('brand', 'wilson')} className="text-xl focus:text-base-100">Wilson</Link></li>
                                    <li><Link href={generateLink('brand', 'molten')} className="text-xl focus:text-base-100">Molten</Link></li>
                                    <li><Link href={generateLink('brand', 'rawlings')} className="text-xl focus:text-base-100">Rawlings</Link></li>
                                    <li><Link href={generateLink('brand', 'baden')} className="text-xl focus:text-base-100">Baden</Link></li>
                                </ul>
                            </details>
                        </li>
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
