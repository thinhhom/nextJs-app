"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProduct({ params }) {
    const router = useRouter();
    const id = params.id;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Khai báo hàm lấy danh mục
        const getCategories = async () => {
            const res = await fetch('http://localhost:3000/categories');
            const data = await res.json();
            setCategories(data);
        };
        getCategories();

        // Lấy dữ liệu chi tiết sản phẩm cần sửa
        const getProduct = async () => {
            const res = await fetch(`http://localhost:3000/products/${id}`);
            const data = await res.json();
            setProduct(data);
            // Dữ liệu chi tiết sản phẩm show ra form
            // Đặt giá trị ban đầu cho form
            setValue('name', data.name);
            setValue('shortDescribe', data.shortDescribe);
            setValue('description', data.description);
            setValue('quantity', data.quantity);
            setValue('categoryId', data.categoryId);
            setValue('price', data.price);
            setValue('priceSale', data.priceSale);
            // setValue('image', data.image);
        };
        if (id) {
            getProduct();
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

        const res = await fetch(`http://localhost:3000/updateproduct/${id}`, {
            method: 'PUT',
            body: formData,
        });
        const result = await res.json();
        if (result.error) {
            console.error(result.error);
        } else {
            router.push('/admin/product');
        }
    };

    return (
        <>
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between">
                    <h3 className="mb-4">Cập nhật sản phẩm</h3>
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
                                    <label for="name" className="form-label">Tên sản phẩm</label>
                                    <input type="text" className="form-control rounded-0" name="name"
                                    {...register('name', { required: 'Nhập tên sản phẩm là bắt buộc' })}
                                    />
                                    {errors.name && <div className="text-danger mt-1">{errors.name.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label for="shortDescribe" className="form-label">Mô tả ngắn sản phẩm</label>
                                    <textarea className="form-control rounded-0" name="shortDescribe" rows="6"
                                    {...register('shortDescribe', { required: 'Nhập mô tả ngắn sản phẩm là bắt buộc' })}>
                                    </textarea>
                                    {errors.shortDescribe && <div className="text-danger mt-1">{errors.shortDescribe.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label">Mô tả sản phẩm</label>
                                    <textarea className="form-control rounded-0" name="description" rows="6"
                                    {...register('description', { required: 'Nhập mô tả sản phẩm là bắt buộc' })}>
                                    </textarea>
                                    {errors.description && <div className="text-danger mt-1">{errors.description.message}</div>}
                                </div>
                                <div className="row">
                                    <div className="col mb-3">
                                        <label for="quantity" className="form-label">Số lượng</label>
                                        <input type="number" className="form-control rounded-0" name="quantity" min="0"
                                        {...register('quantity', { required: 'Nhập số lượng sản phẩm là bắt buộc' })}
                                        />
                                        {errors.quantity && <div className="text-danger mt-1">{errors.quantity.message}</div>}
                                    </div>
                                    <div className="col mb-3">
                                        <label for="category" className="form-label">Danh mục</label>
                                        <div className="input-group">
                                            <select className="form-select rounded-0" name="categoryId" {...register('categoryId', { required: 'Chọn danh mục là bắt buộc' })}>
                                                <option selected>Chọn danh mục</option>
                                                {categories.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button type="button" className="btn btn-outline-primary rounded-0">
                                                <i className="fal fa-boxes"></i>
                                            </button>
                                        </div>
                                        {errors.categoryId && <div className="text-danger mt-1">{errors.categoryId.message}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card rounded-0 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="pb-3 border-bottom">Price</h6>
                                <div className="row">
                                    <div className="col mb-3">
                                        <label for="price" className="form-label">Giá sản phẩm</label>
                                        <input type="number" className="form-control rounded-0" name="price" min="0"
                                        {...register('price', { required: 'Nhập giá sản phẩm là bắt buộc' })}/>
                                        {errors.price && <div className="text-danger mt-1">{errors.price.message}</div>}
                                    </div>
                                    <div className="col mb-3">
                                        <label for="sale_price" className="form-label">Giá khuyến mãi</label>
                                        <input type="number" className="form-control rounded-0" name="priceSale" min="0"
                                        {...register('priceSale', { required: 'Nhập giá khuyến mãi là bắt buộc' })}/>
                                        {errors.priceSale && <div className="text-danger mt-1">{errors.priceSale.message}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card rounded-0 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="pb-3 border-bottom">Image</h6>
                                <div className="mb-3">
                                    <label for="image" className="form-label">Product Image *</label>
                                    <input className="form-control rounded-0" type="file" name="image" {...register('image')}/>
                                    {errors.image && <div className="text-danger">{errors.image.message}</div>}
                                    <div className="bg-secondary-subtle mb-3 p-2 text-center">
                                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product?.image}`} className="w-50" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">Cập nhật sản phẩm</button>
                    </div>
                </form>
            </div>
        </>
    );
}