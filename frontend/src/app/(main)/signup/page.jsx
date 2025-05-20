'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Link from 'next/link';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required')
        .min(8, 'Minimum 8 characters')
        .matches(/[a-z]/, 'Lowercase letter is required')
        .matches(/[A-Z]/, 'Uppercase letter is required')
        .matches(/[0-9]/, 'Number is required')
        .matches(/\W/, 'Special character is required'),
    confirmPassword: Yup.string().required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Signup = () => {
    const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, values);
                toast.success('Account created successfully');
            } catch (error) {
                toast.error('Something went wrong');
            }
        },
        validationSchema: SignupSchema
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
                    <h2 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center">Sign Up</h2>
                    <p className="mt-2 text-sm text-gray-600 text-center">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline font-medium">
                            Sign in here
                        </Link>
                    </p>
                </div>
                <form onSubmit={signupForm.handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.name}
                            className={`w-full rounded border ${signupForm.touched.name && signupForm.errors.name ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring`}
                        />
                        {signupForm.touched.name && signupForm.errors.name && (
                            <div className="mt-1 text-sm text-red-500">{signupForm.errors.name}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.email}
                            className={`w-full rounded border ${signupForm.touched.email && signupForm.errors.email ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring`}
                        />
                        {signupForm.touched.email && signupForm.errors.email && (
                            <div className="mt-1 text-sm text-red-500">{signupForm.errors.email}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.password}
                            className={`w-full rounded border ${signupForm.touched.password && signupForm.errors.password ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring`}
                        />
                        {signupForm.touched.password && signupForm.errors.password && (
                            <div className="mt-1 text-sm text-red-500">{signupForm.errors.password}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.confirmPassword}
                            className={`w-full rounded border ${signupForm.touched.confirmPassword && signupForm.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring`}
                        />
                        {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
                            <div className="mt-1 text-sm text-red-500">{signupForm.errors.confirmPassword}</div>
                        )}
                    </div>
                    <div className="flex items-center">
                        <input id="terms" name="terms" type="checkbox" className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I accept the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 md:text-base"
                        disabled={signupForm.isSubmitting}
                    >
                        {signupForm.isSubmitting ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;