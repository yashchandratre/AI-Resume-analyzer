import { useForm } from 'react-hook-form';
import API from '../services/authapi';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            setServerError("");
            const res = await API.post("/auth/register", {
                data
            });
            navigate("/login", { state: { message: res.data.msg } });
        } catch (err) {
            console.log("Error in Register:", err);
            setServerError(err.response?.data?.msg || "Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
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
                            {...register('fname', {
                                required: 'Full name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Full name must be at least 2 characters',
                                },
                                maxLength: {
                                    value: 80,
                                    message: 'Full name must be 80 characters or less',
                                },
                            })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.fname ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="John Doe"
                        />
                        {errors.fname && <p className="text-xs text-red-500 mt-1">{errors.fname.message}</p>}
                    </label>

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
                            {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                    message: 'Use 8+ characters with uppercase, lowercase, and a number',
                                },
                            })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.password ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="Create a password"
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </label>

                    <label className="block mb-4">
                        <span className="text-sm text-gray-700">Confirm password</span>
                        <input
                            type="password"
                            {...register('password2', {
                                required: 'Please confirm your password',
                                validate: (value, formValues) => value === formValues.password || 'Passwords do not match',
                            })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.password2 ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="Repeat password"
                        />
                        {errors.password2 && <p className="text-xs text-red-500 mt-1">{errors.password2.message}</p>}
                    </label>

                    {serverError && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#0B2545] text-white font-semibold hover:opacity-95 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">By creating an account you agree to our <a href="#" className="text-[#FF6A00]">Terms</a>.</div>
            </div>
        </div>
    )
}
