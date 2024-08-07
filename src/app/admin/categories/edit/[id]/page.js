"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditCategories({ params }) {
    const router = useRouter();
    const id = params.id;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [categories, setCategories] = useState(null);


    useEffect(() => {
        // Lấy dữ liệu chi tiết sản phẩm cần sửa
        const getCategories = async () => {
            const res = await fetch(`http://localhost:3000/categories/${id}`);
            const data = await res.json();
            setCategories(data);
            // Dữ liệu chi tiết sản phẩm show ra form
            // Đặt giá trị ban đầu cho form
            setValue('name', data.name);
            setValue('description', data.description);
            // setValue('image', data.image);
        };
        if (id) {
            getCategories();
        }
    }, [id, setValue]);


    const onSubmit = async (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        const res = await fetch(`http://localhost:3000/updatecategories/${id}`, {
            method: 'PUT',
            body: formData,
        });
        const result = await res.json();
        if (!result.error) {
            router.push('/admin/categories');
        } else {
            console.error(result.error);
        }
    };
    return (
        <>
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between">
                    <h3 className="mb-4">Cập nhật danh mục</h3>
                    <div>
                        <a href="#" className="btn btn-outline-secondary rounded-0">
                            <i className="far fa-long-arrow-left"></i> Back
                        </a>
                    </div>
                </div>
                <form className="row" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="col-md-8 mb-4">
                        <div className="card rounded-0 border-0 shadow-sm mb-4">
                            <div className="card-body">
                                <h6 className="pb-3 border-bottom">Basic Info</h6>
                                <div className="mb-3">
                                    <label for="name" className="form-label">Tên danh mục</label>
                                    <input type="text" className="form-control rounded-0" name="name"
                                    {...register('name', { required: 'Nhập tên danh mục là bắt buộc' })}/>
                                    {errors.name && <div className="text-danger mt-1">{errors.name.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label">Mô tả danh mục</label>
                                    <textarea className="form-control rounded-0" name="description" rows="6"
                                    {...register('description', { required: 'Nhập mô tả danh mục là bắt buộc' })}>
                                    </textarea>
                                    {errors.description && <div className="text-danger mt-1">{errors.description.message}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card rounded-0 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="pb-3 border-bottom">Image</h6>
                                <div className="mb-3">
                                    <label for="image" className="form-label">Ảnh danh mục</label>
                                    <input className="form-control rounded-0" type="file" name="image" {...register('image')}/>
                                    {errors.image && <div className="text-danger">{errors.image.message}</div>}
                                    <div className="bg-secondary-subtle mb-3 p-2 text-center">
                                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${categories?.image}`} className="w-50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">Cập nhật danh mục</button>
                    </div>
                </form>
            </div>
        </>
    );
}