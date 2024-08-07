"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CustomerEdit({ params }) {
    const router = useRouter();
    const id = params.id;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        // Lấy dữ liệu chi tiết đơn hàng cần update
        const getCustomer = async () => {
            const res = await fetch(`http://localhost:3000/users/${id}`);
            const data = await res.json();
            setCustomer(data);
            // Dữ liệu chi tiết sản phẩm show ra form
            // Đặt giá trị ban đầu cho form
            setValue('roles', data.roles);
        };
        if (id) {
            getCustomer();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const updatedCustomer = {
            ...customer,
            roles: data.roles
        };
        const res = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer),
        });
        const result = await res.json();
        if (!result.error) {
            router.push('/admin/customer');
        } else {
            console.error(result.error);
        }
    };

    return (
        <>
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between">
                    <h3 className="mb-4">Cập nhật khách hàng</h3>
                    <div>
                        <a href="#" className="btn btn-outline-secondary rounded-0">
                            <i className="far fa-long-arrow-left"></i> Back
                        </a>
                    </div>
                </div>
                <form className="row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-8 mb-4">
                        <div className="card rounded-0 border-0 shadow-sm mb-4">
                            <div className="card-body">
                                <h6 className="pb-3 border-bottom">Basic Info</h6>
                                <div className="row">
                                    <div className="col mb-3">
                                        <label for="category" className="form-label">Vai trò</label>
                                        <div className="input-group">
                                            <select className="form-select rounded-0" name="roles" {...register('roles')}>
                                                <option selected>Chọn danh mục</option>
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">Cập nhật khách hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}