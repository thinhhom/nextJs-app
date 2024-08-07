"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'


export default function Customer() {
    const [data, setData] = useState([]);
    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3000/users", { cache: 'no-store' });
        const newData = await res.json();
        setData(newData);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const messageDelete = (id) => {
        Swal.fire({
            title: "Bạn chắc muốn xóa tài khoản này ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, tôi muốn xóa"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await fetch(`http://localhost:3000/deleteuser/${id}`, {
                        method: 'DELETE',
                    });
                    const result = await res.json();
                    if (result.message) {
                        Swal.fire({
                            title: "Xóa thành công",
                            text: "Tài khoản này đã được xóa.",
                            confirmButtonColor: "#3085d6",
                            icon: "success"
                        });
                        fetchUsers();
                    }
                }
            });
    }

    const deleteUser = (id) => {
        messageDelete(id);
    };


    return (
        <>
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between">
                    <h3 className="mb-4">Khách hàng</h3>
                    <div>
                        <Link href="#" className="btn btn-outline-success rounded-0 me-2">Manage Categories</Link>
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

                <div className="card rounded-0 border-0 shadow-sm">
                    <div className="card-body">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th className="text-start" colSpan="2">Họ và tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Quyền hạn</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {data.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td className="text-start">
                                            <strong>
                                                {user.fullName}
                                            </strong>
                                            <br />
                                            <small>
                                                Id: <strong>{user._id}</strong>
                                            </small>
                                        </td>
                                        <td></td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.roles}</td>
                                        <td>
                                            <Link href="#" className="btn btn-primary btn-sm me-1">
                                                <i className="fas fa-eye fa-fw"></i>
                                            </Link>
                                            <Link href={`/admin/customer/edit/${user._id}`} className="btn btn-outline-warning btn-sm me-1">
                                                <i className="fas fa-pencil fa-fw"></i>
                                            </Link>
                                            <Link href="#" className="btn btn-outline-danger btn-sm" onClick={() => deleteUser(user._id)}>
                                                <i className="fas fa-times fa-fw"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}