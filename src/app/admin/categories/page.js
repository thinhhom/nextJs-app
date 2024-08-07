"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'


export default function Categories() {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchCategories = async (page = 1) => {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:3000/currentCategories?page=${page}&limit=5`, { cache: 'no-store' });
            const result = await res.json();
            setData(result.categories);
            setTotalPages(result.totalPages);
            setCurrentPage(result.currentPage);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const messageDelete = (id) => {
        Swal.fire({
            title: "Bạn chắc muốn xóa danh mục này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, tôi muốn xóa"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:3000/deletecategories/${id}`, {
                        method: 'DELETE',
                    });
                    const result = await res.json();
                    if (result.message) {
                        Swal.fire({
                            title: "Xóa thành công",
                            text: "Danh mục của bạn đã được xóa.",
                            confirmButtonColor: "#3085d6",
                            icon: "success"
                        });
                        fetchCategories(currentPage);
                    }
                } catch (error) {
                    console.error("Error deleting category:", error);
                }
            }
        });
    };

    const deleteCategories = (id) => {
        messageDelete(id);
    };

    const filteredCategories = data.filter(categories =>
        categories.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between">
                    <h3 className="mb-4">Danh mục</h3>
                    <div>
                        <Link href="#" className="btn btn-outline-success rounded-0 me-2">Manage Categories</Link>
                        <Link href="/admin/categories/add" className="btn btn-primary rounded-0">Thêm danh mục</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
                            <div className="card-body text-end">
                                <div className="display-6 d-flex justify-content-between">
                                    <i className="fal fa-box"></i>
                                    20
                                </div>
                                PRODUCTS
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card border-0 rounded-0 bg-danger-subtle text-danger">
                            <div className="card-body text-end">
                                <div className="display-6 d-flex justify-content-between">
                                    <i className="fal fa-box-open"></i>
                                    3
                                </div>
                                RUNNING OUT
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card border-0 rounded-0 bg-success-subtle text-success">
                            <div className="card-body text-end">
                                <div className="display-6 d-flex justify-content-between">
                                    <i className="fal fa-boxes"></i>
                                    5
                                </div>
                                CATEGORIES
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card border-0 rounded-0 bg-dark-subtle text-dark">
                            <div className="card-body text-end">
                                <div className="display-6 d-flex justify-content-between">
                                    <i className="fal fa-archive"></i>
                                    0
                                </div>
                                ARCHIVE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between w-100">
                        <form className="d-flex w-50" role="search" data-bs-theme="light" onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group">
                                <button type="submit" className="btn btn-primary rounded-0 border-white">
                                    <i className="far fa-search"></i>
                                </button>
                                <input className="form-control me-2 rounded-0" type="search"
                                placeholder="Tìm kiếm danh mục"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                />
                            </div>
                        </form>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                </div>

                <div className="card rounded-0 border-0 shadow-sm mt-4">
                    <div className="card-body">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th className="text-start" colSpan="2">Danh mục</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="4">Không có danh mục nào</td>
                                    </tr>
                                ) : (
                                    filteredCategories.map((category, index) => (
                                        <tr key={category._id}>
                                            <td>{(currentPage - 1) * 5 + index + 1}</td>
                                            <td style={{ width: 64 + "px" }}>
                                                <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${category.image}`} alt={category.name} className="w-100" />
                                            </td>
                                            <td className="text-start">
                                                <strong>
                                                    {category.name}
                                                </strong>
                                                <br />
                                                <small>
                                                    Id: <strong>{category._id}</strong>
                                                </small>
                                            </td>
                                            <td>
                                                <Link href="#" target="_blank" className="btn btn-primary btn-sm me-1">
                                                    <i className="fas fa-eye fa-fw"></i>
                                                </Link>
                                                <Link href={`/admin/categories/edit/${category._id}`} className="btn btn-outline-warning btn-sm me-1">
                                                    <i className="fas fa-pencil fa-fw"></i>
                                                </Link>
                                                <Link href="#" className="btn btn-outline-danger btn-sm" onClick={() => deleteCategories(category._id)}>
                                                    <i className="fas fa-times fa-fw"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <Link className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}>Previous</Link>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <Link className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePageChange(index + 1); }}>{index + 1}</Link>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <Link className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}>Next</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}