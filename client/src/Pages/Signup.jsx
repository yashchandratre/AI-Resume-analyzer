import React from 'react'
import { useForm } from 'react-hook-form';
import API from '../services/authapi';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [errors, setError] = useState([]);

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const res = await API.post("/auth/register", {
                data
            });
            alert(res.data.msg);
        } catch (err) {
            console.log("Error in Register:", err);
            alert(err.response?.data?.msg || "Something went wrong!");
        }
        navigate("/login")
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-[#0B2545] mb-2">Create your account</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Already have an account? <Link to="/login" className="text-[#FF6A00] font-medium">Sign in</Link>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <label className="block mb-3">
                        <span className="text-sm text-gray-700">Full name</span>
                        <input
                            {...register('fname', { required: 'Full name is required' })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.fname ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="John Doe"
                        />
                        {errors.fname && <p className="text-xs text-red-500 mt-1">{errors.fname}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm text-gray-700">Email</span>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.email ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm text-gray-700">Password</span>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.password ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="Create a password"
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                    </label>

                    <label className="block mb-4">
                        <span className="text-sm text-gray-700">Confirm password</span>
                        <input
                            type="password"
                            {...register('password2', { required: 'Please confirm your password' })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.password2 ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="Repeat password"
                        />
                        {errors.password2 && <p className="text-xs text-red-500 mt-1">{errors.password2}</p>}
                    </label>

                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#0B2545] text-white font-semibold hover:opacity-95 cursor-pointer"
                    >
                        Create account
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">By creating an account you agree to our <a href="#" className="text-[#FF6A00]">Terms</a>.</div>
            </div>
        </div>
    )
}
