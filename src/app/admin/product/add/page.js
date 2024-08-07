"use client"

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "Yup";

export default function ProductAdd() {
    const validationSchema = Yup.object({
        name: Yup.string().required("Nhập tên sản phẩm là bắt buộc"),
        shortDescribe: Yup.string().required("Nhập mô tả ngắn sản phẩm là bắt buộc"),
        description: Yup.string().required("Nhập mô tả sản phẩm là bắt buộc"),
        quantity: Yup.number()
            .required("Nhập số lượng sản phẩm là bắt buộc")
            .positive("Số lượng phải là một số dương")
            .integer("Số lượng phải là số nguyên"),
        categoryId: Yup.string().required("Chọn danh mục là bắt buộc"),
        price: Yup.number()
            .required("Nhập giá sản phẩm là bắt buộc")
            .positive("Giá phải là một số dương")
            .integer("Số lượng phải là số nguyên"),
        priceSale: Yup.number()
            .required("Nhập giá khuyến mãi là bắt buộc")
            .positive("Giá khuyến mãi phải là một số dương")
            .integer("Số lượng phải là số nguyên"),
        image: Yup.string()
            .required("Chọn ảnh sản phẩm là bắt buộc "),
            // .matches(/\.(jpg|jpeg|png|gif)$/,
            // "Chỉ được upload file ảnh"
            // )
    });

    const [formValue, setFormValue] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch('http://localhost:3000/categories');
            const data = await res.json();
            setCategories(data);
        };
        getCategories();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            shortDescribe: "",
            description: "",
            quantity: "",
            categoryId: "",
            price: "",
            priceSale: "",
            image: null,
        },
        validationSchema,
        onSubmit: async (value) => {
            setFormValue(value);
            // console.log(formValue);
            const formData = new FormData();
            formData.append('name', value.name);
            formData.append('price', parseFloat(value.price));
            formData.append('priceSale', parseFloat(value.priceSale));
            formData.append('description', value.description);
            formData.append('shortDescribe', value.shortDescribe);
            formData.append('quantity', parseInt(value.quantity, 10));
            formData.append('categoryId', value.categoryId);
            formData.append('image', value.image);
            const res = await fetch('http://localhost:3000/addproduct', {
                method: 'POST',
                body: formData,
            });
            const result = await res.json();
            if (result.error) {
                setError(result.error);
            } else {
                setMessage(result.message);
                router.push('/admin/product');
            }
        },
    });


    return (
        <>
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between">
                    <h3 className="mb-4">Thêm sản phẩm</h3>
                    <div>
                        <a href="#" className="btn btn-outline-secondary rounded-0">
                            <i className="far fa-long-arrow-left"></i> Back
                        </a>
                    </div>
                </div>
                <form className="row" onSubmit={formik.handleSubmit} method="POST" encType="multipart/form-data">
                    <div className="col-md-8 mb-4">
                        <div className="card rounded-0 border-0 shadow-sm mb-4">
                            <div className="card-body">
                                <h6 className="pb-3 border-bottom">Basic Info</h6>
                                <div className="mb-3">
                                    <label for="name" className="form-label">Tên sản phẩm</label>
                                    <input type="text" className="form-control rounded-0" name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name ? (<div className="text-danger mt-1">{formik.errors.name}</div>) : null}                                
                                </div>
                                <div className="mb-3">
                                    <label for="shortDescribe" className="form-label">Mô tả ngắn sản phẩm</label>
                                    <textarea className="form-control rounded-0" name="shortDescribe" rows="6"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.shortDescribe}>
                                    </textarea>
                                    {formik.touched.shortDescribe && formik.errors.shortDescribe ? (<div className="text-danger mt-1">{formik.errors.shortDescribe}</div>) : null}
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label">Mô tả sản phẩm</label>
                                    <textarea className="form-control rounded-0" name="description" rows="6"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}>
                                    </textarea>
                                    {formik.touched.description && formik.errors.description ? (<div className="text-danger mt-1">{formik.errors.description}</div>) : null}
                                </div>
                                <div className="row">
                                    <div className="col mb-3">
                                        <label for="quantity" className="form-label">Số lượng</label>
                                        <input type="number" className="form-control rounded-0" name="quantity"
                                        onChange={formik.handleChange} min="0"
                                        onBlur={formik.handleBlur}
                                        value={formik.values.quantity}
                                        />
                                        {formik.touched.quantity && formik.errors.quantity ? (<div className="text-danger mt-1">{formik.errors.quantity}</div>) : null}
                                    </div>
                                    <div className="col mb-3">
                                        <label for="category" className="form-label">Danh mục</label>
                                        <div className="input-group">
                                            <select className="form-select rounded-0" name="categoryId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.categoryId}>
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
                                        {formik.touched.categoryId && formik.errors.categoryId ? (<div className="text-danger mt-1">{formik.errors.categoryId}</div>) : null}
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
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.price}
                                        />
                                    {formik.touched.price && formik.errors.price ? (<div className="text-danger mt-1">{formik.errors.price}</div>) : null}

                                    </div>
                                    <div className="col mb-3">
                                        <label for="sale_price" className="form-label">Giá khuyến mãi</label>
                                        <input type="number" className="form-control rounded-0" name="priceSale" min="0"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.priceSale}
                                        />
                                    {formik.touched.priceSale && formik.errors.priceSale ? (<div className="text-danger mt-1">{formik.errors.priceSale}</div>) : null}
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
                                    <input className="form-control rounded-0" type="file" name="image" 
                                    onBlur={formik.handleBlur}
                                    onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
                                    />
                                    {formik.touched.image && formik.errors.image ? (<div className="text-danger mt-1">{formik.errors.image}</div>) : null}
                                    {/* <div className="bg-secondary-subtle mb-3 p-2 text-center">
                                        <img src="/img/products/iphone.webp" className="w-50" />
                                    </div> */}
                                </div>
                                {/* <div className="mb-3">
                                    <label for="images" className="form-label">More Product Image</label>
                                    <input className="form-control rounded-0" type="file" id="images" multiple />
                                    <div className="bg-secondary-subtle mb-3 p-2 text-center d-flex">
                                        <img src="/img/products/iphone.webp" className="w-25" />
                                        <img src="/img/products/iphone.webp" className="w-25" />
                                        <img src="/img/products/iphone.webp" className="w-25" />
                                        <img src="/img/products/iphone.webp" className="w-25" />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">Thêm sản phẩm</button>
                    </div>
                </form>



            </div>
        </>
    );
}