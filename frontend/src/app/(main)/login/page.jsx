'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Login = () => {
    // Define validation schema with Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, values)
                .then((result) => {
                    toast.success('Login successful');
                    resetForm();
                }).catch((err) => {
                    setSubmitting(false);
                    toast.error('Login failed');
                });
        }
    });

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100 p-6 overflow-hidden font-sans flex items-center justify-center">
            {/* Decorative blurred shapes */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full filter blur-3xl z-0"></div>
            <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-200 opacity-30 rounded-full filter blur-3xl z-0"></div>
            <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-pink-200 opacity-20 rounded-full filter blur-2xl z-0 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 max-w-md w-full mx-auto bg-white/80 rounded-xl shadow-lg p-8 border border-indigo-100">
                <div className="flex flex-col items-center mb-6">
                    <svg width="56" height="56" fill="none" viewBox="0 0 56 56" className="mb-3">
                        <rect x="12" y="20" width="32" height="16" rx="8" fill="#6366f1"/>
                        <rect x="24" y="12" width="8" height="32" rx="4" fill="#a5b4fc"/>
                        <circle cx="28" cy="28" r="8" fill="#fff"/>
                    </svg>
                    <h2 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center">Login</h2>
                </div>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`w-full rounded border ${
                                formik.touched.email && formik.errors.email
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`w-full rounded border ${
                                formik.touched.password && formik.errors.password
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring`}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="mt-1 text-sm text-red-500">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 md:text-base"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Logging in...' : 'Log in'}
                    </button>
                    <div className="flex items-center justify-center bg-gray-100 p-4 rounded-lg">
                        <p className="text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link
                                href="/signup"
                                className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700 font-semibold"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;