import { useForm } from 'react-hook-form';
import API from '../services/authapi';
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';

export default function Signin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            setServerError("");
            const res = await API.post("/auth/login", {
                data
            }, { withCredentials: true }); 
            localStorage.setItem("token", res.data.token);  
            localStorage.setItem("user", JSON.stringify(res.data.user)); 
            alert("Login Successful")
            navigate('/');
        } catch (err) {
            console.log("Error In Login: ", err);
            setServerError(err.response?.data?.msg || "Login failed!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-[#0B2545] mb-2">Sign in to your account</h2>
                <p className="text-sm text-gray-500 mb-6">
                    New here? <Link to="/signup" className="text-[#FF6A00] font-medium">Create an account</Link>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <label className="block mb-3">
                        <span className="text-sm text-gray-700">Email</span>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Enter a valid email address',
                                },
                            })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.email ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm text-gray-700">Password</span>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.password ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </label>

                    <div className="flex items-center justify-between mb-6">
                        <label className="inline-flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                {...register('remember')}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            Remember me
                        </label>
                        <button
                            type="button"
                            onClick={() => setServerError('Password reset is not available yet.')}
                            className="text-sm text-[#0B2545] hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {serverError && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#FF6A00] text-white font-semibold hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Or continue with
                </div>

                <div className="mt-4 flex gap-3">
                    <button className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm cursor-pointer hover:bg-[#FF6A00]  hover:text-white">Continue with Google</button>
                    <button className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm cursor-pointer hover:bg-[#FF6A00]  hover:text-white">Continue with Apple</button>
                </div>
            </div>
        </div>
    )
}
