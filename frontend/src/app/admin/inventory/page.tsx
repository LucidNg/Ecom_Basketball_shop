"use client";
import React, { useState, useEffect, useRef } from "react";
import { FetchAllProducts, Admin_Product, DeleteProduct, InsertProduct } from "@/lib/admin";

export default function AdminOrderPage() {
    const [product, setProducts] = useState<Admin_Product[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [hasMoreProducts, setHasMoreproduct] = useState<boolean>(true);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [newProduct, setNewProduct] = useState({
        categoryID: "",
        name: "",
        description: "",
        brand: "",
        price: "",
        stock: "",
        dateAdded: "",
        size: ""
    });
    const [notification, setNotification] = useState<string | null>(null);
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const confirmModalRef = useRef<HTMLDialogElement | null>(null);
    const addProductModalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const Fetchproduct = await FetchAllProducts(offset);
                if (Fetchproduct.length > 0) {
                    setHasMoreproduct(true);
                } else {
                    setHasMoreproduct(false);
                }
                setProducts(Fetchproduct);
            } catch (error) {
                console.error("Failed to load orders:", error);
            }
        };
        loadOrders();
    }, [offset]);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const openConfirmModal = (productID: string) => {
        setProductToDelete(productID);
        if (confirmModalRef.current) {
            confirmModalRef.current.showModal();
        }
    };

    const openAddProductModal = () => {
        if (addProductModalRef.current) {
            addProductModalRef.current.showModal();
        }
    };

    const handleDelete = async () => {
        if (productToDelete) {
            try {
                await DeleteProduct(productToDelete);
                setProducts(product.filter((p) => p.productID !== productToDelete));
                console.log("Product deleted successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } catch (error) {
                console.error("Error deleting product:", error);
            } finally {
                setProductToDelete(null);
                if (confirmModalRef.current) {
                    confirmModalRef.current.close();
                }
            }
        }
    };

    const handleAddProduct = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await InsertProduct(
                newProduct.categoryID,
                newProduct.name,
                newProduct.description,
                newProduct.brand,
                newProduct.price,
                newProduct.stock,
                newProduct.dateAdded,
                newProduct.size
            );
            console.log("Product inserted successfully");

            setNotification("Product added successfully!");

            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            if (addProductModalRef.current) {
                addProductModalRef.current.close();
            }

            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };

    const nextPage = () => {
        if (hasMoreProducts) {
            setOffset(offset + 1);
        }
    };

    const prevPage = () => {
        if (offset > 0) {
            setOffset(offset - 1);
        }
    };

    return (
        <div className="DisplayArea w-full flex flex-col mb-10">
            <h1 className="text-5xl text-base-content font-semibold mt-12 ml-20">Inventory</h1>
            <div className="border-black w-full border-[0.5px] border-opacity-50 my-8"></div>
            <h1 className="text-2xl text-base-content font-semibold mt-4 ml-32">Add Product</h1>
            <button
                className="w-56 h-20 bg-green-500 text-white text-xl p-2 font-bold flex items-center justify-center hover:bg-green-600 mx-44 mt-10 rounded-lg"
                onClick={openAddProductModal}
            >
                + Add New Product
            </button>
            <h1 className="text-2xl text-base-content font-semibold mt-12 ml-32">Products Table</h1>
            <div className="mx-auto w-1/2 md:w-[90%] lg:w-[65%] px-10 rounded-lg mt-10 shadow-xl shadow-indigo-300/40">
                {product.length > 0 ? (
                    <table className="w-full min-w-[70%]] mx-10 border-separate border-spacing-y-3 overflow-auto pr-12">
                        <thead>
                            <tr className="text-xl text-base-content text-opacity-50">
                                <th className="tracking-wide text-left w-1/2 p-3">ID</th>
                                <th className="tracking-wide text-left w-2/6 p-3">Name</th>
                                <th className="tracking-wide text-left w-1/8 p-3">Size</th>
                                <th className="tracking-wide text-left w-1/8 p-3">Stock</th>
                                <th className="tracking-wide text-left w-1/8 p-3">Price</th>
                                <th className="tracking-wide text-left w-1/8 p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((product) => (
                                <tr key={product.productID} className="text-xl text-base-content font-medium">
                                    <td className="p-2 min-w-20">#{product.productID}</td>
                                    <td className="p-2 min-w-12">{product.productName}</td>
                                    <td className="p-2 min-w-10">{product.size}</td>
                                    <td className="p-2 min-w-12">{product.stock}</td>
                                    <td className="p-2 min-w-10">${product.price}</td>
                                    <td className="p-2 pl-4 min-w-10 text-red-500 hover:underline underline-offset-2 cursor-pointer" onClick={() => openConfirmModal(product.productID)}>Delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center text-4xl font-semibold py-10 text-red-500">
                        No product found.
                    </div>
                )}

                <div className="pagination flex justify-between p-4">
                    <button
                        className="btn w-32"
                        onClick={prevPage}
                        disabled={offset === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="btn w-32"
                        onClick={nextPage}
                        disabled={!hasMoreProducts}
                    >
                        Next
                    </button>
                </div>
            </div>

            {notification && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
                    {notification}
                </div>
            )}

            <dialog ref={addProductModalRef} id="add_product_modal" className="modal sm:modal-middle">
                <div className="w-[90%] md:w-1/2 lg:w-[30%] bg-base-100">
                    <div className="modelHeader bg-base-content h-14 flex items-center justify-between p-4">
                        <span className="text-lg text-base-100">Add New Product</span>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost text-base-100">✕</button>
                        </form>
                    </div>
                    <div className="modalBody p-10 flex flex-col gap-y-4">
                        <form onSubmit={handleAddProduct}>
                            <div className="flex flex-col gap-y-2 text-base-content">
                                <label className="text-md font-medium text-base-content">Category ID</label>
                                <input
                                    type="text"
                                    value={newProduct.categoryID}
                                    onChange={(e) => setNewProduct({ ...newProduct, categoryID: e.target.value })}
                                    className="input input-bordered"
                                    required
                                />
                                <label className="text-md font-medium text-base-content">Name</label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    className="input input-bordered"
                                    required
                                />
                                <label className="text-md font-medium text-base-content">Description</label>
                                <input
                                    type="text"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    className="input input-bordered"
                                    required
                                />
                                <label className="text-md font-medium text-base-content">Brand</label>
                                <input
                                    type="text"
                                    value={newProduct.brand}
                                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                                    className="input input-bordered"
                                    required
                                />
                                <label className="text-md font-medium text-base-content">Price</label>
                                <input
                                    type="text"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    className="input input-bordered"
                                    required
                                />
                                <label className="text-md font-medium text-base-content">Stock</label>
                                <input
                                    type="text"
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                    className="input input-bordered"
                                    required
                                />
                                <label className="text-md font-medium text-base-content">Date Added</label>
                                <input
                                    type="date"
                                    value={newProduct.dateAdded}
                                    onChange={(e) => setNewProduct({ ...newProduct, dateAdded: e.target.value })}
                                    className="input input-bordered"
                                    required
                                />
                                <label className="text-md font-medium text-base-content">Size</label>
                                <input
                                    type="text"
                                    value={newProduct.size}
                                    onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                                    className="input input-bordered"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full mt-6"
                                >
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog ref={confirmModalRef} id="confirm_modal" className="modal sm:modal-middle">
                <div className="modal-box bg-white flex flex-col">
                    <h3 className="font-bold text-lg">Confirm Deletion</h3>
                    <p className="py-4">Are you sure you want to delete this product?</p>
                    <div className="modal-action">
                        <button className="btn btn-sm" onClick={handleDelete}>Yes</button>
                        <form method="dialog">
                            <button className="btn btn-sm">No</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
