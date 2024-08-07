"use client"

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "Yup";

export default function CategoriesAdd() {
    const validationSchema = Yup.object({
        name: Yup.string().required("Nhập tên danh mục là bắt buộc"),
        description: Yup.string().required("Nhập mô tả danh mục là bắt buộc"),
        image: Yup.string().required("Chọn ảnh danh mục là bắt buộc "),
    });

    const [formValue, setFormValue] = useState(null);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            image: null,
        },
        validationSchema,
        onSubmit: async (value) => {
            setFormValue(value);
            // console.log(formValue);
            const formData = new FormData();
            formData.append('name', value.name);
            formData.append('description', value.description);
            formData.append('image', value.image);
            const res = await fetch('http://localhost:3000/addcategories', {
                method: 'POST',
                body: formData,
            });
            const result = await res.json();
            if (result.error) {
                console.error(result.error);
            } else {
                router.push('/admin/categories');
            }
        },
    });

    return (
        <>
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between">
                    <h3 className="mb-4">Thêm danh mục</h3>
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
                                    <label for="name" className="form-label">Tên danh mục</label>
                                    <input type="text" className="form-control rounded-0" name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name ? (<div className="text-danger mt-1">{formik.errors.name}</div>) : null}
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label">Mô tả danh mục</label>
                                    <textarea className="form-control rounded-0" name="description" rows="6"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}>
                                    </textarea>
                                    {formik.touched.description && formik.errors.description ? (<div className="text-danger mt-1">{formik.errors.description}</div>) : null}
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
                                    <input className="form-control rounded-0" type="file" name="image"
                                    onBlur={formik.handleBlur}
                                    onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
                                    />
                                    {formik.touched.image && formik.errors.image ? (<div className="text-danger mt-1">{formik.errors.image}</div>) : null}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">Thêm danh mục</button>
                    </div>
                </form>
            </div>
        </>
    );
}