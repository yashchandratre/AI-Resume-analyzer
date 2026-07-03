import { useForm } from 'react-hook-form';
import API from '../services/authapi';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function Signin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            setServerError("");
            const res = await API.post("/auth/login", { data });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setUser(res.data.user);
            toast.success("Welcome back! Login successful.");
            navigate("/");
        } catch (err) {
            console.log("Error In Login: ", err);
            setServerError(err.response?.data?.msg || "Invalid email or password!");
            toast.error(err.response?.data?.msg || "Login failed!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
            {/* Left side: Premium AI Branding/Marketing (Hidden on Mobile) */}
            <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-900 text-white p-12 flex-col justify-between relative overflow-hidden">
                {/* Decorative background gradients */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
                </div>

                {/* Top Branding */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                            ResumeAI
                        </span>
                        <span className="text-xs block text-slate-400 font-medium">ATS Analyzer & Optimizer</span>
                    </div>
                </div>

                {/* Interactive SVG / Illustration */}
                <div className="my-auto flex flex-col items-center justify-center relative z-10 py-12">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="w-64 h-64 relative flex items-center justify-center"
                    >
                        {/* Outer rotating dashed ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/20" />
                        
                        {/* Middle glowing ring */}
                        <div className="absolute inset-8 rounded-full border border-indigo-400/40 bg-indigo-950/20 backdrop-blur-sm animate-pulse" />
                        
                        {/* Inner network circle */}
                        <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                            <Sparkles className="h-10 w-10 text-white animate-bounce" />
                        </div>
                        
                        {/* Floating orbiting dots */}
                        <div className="absolute top-2 left-1/2 w-4 h-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                        <div className="absolute bottom-2 left-1/2 w-3.5 h-3.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                        <div className="absolute left-2 top-1/2 w-3 h-3 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50" />
                        <div className="absolute right-2 top-1/2 w-4 h-4 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
                    </motion.div>

                    <div className="text-center mt-12 max-w-lg">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4">
                            Optimize Your Resume for ATS Algorithms
                        </h2>
                        <p className="text-slate-300 text-base leading-relaxed">
                            Upload your resume and leverage the power of advanced AI models to identify missing skills, fix weaknesses, and get matched with your dream job.
                        </p>
                    </div>
                </div>

                {/* Footer Badges */}
                <div className="flex gap-6 relative z-10 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        <span>GDPR Secured</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-indigo-400" />
                        <span>Instant Scoring</span>
                    </div>
                </div>
            </div>

            {/* Right side: Login Form */}
            <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 sm:p-12 relative">
                {/* Floating decor for mobile */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none md:hidden">
                    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-indigo-300 blur-3xl" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-white border border-slate-100/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50"
                >
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 md:hidden mb-6">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">ResumeAI</span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
                        <p className="text-sm text-slate-500 mt-2">
                            New here?{' '}
                            <Link to="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    {/* Server Error Alert */}
                    {serverError && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 rounded-2xl bg-rose-50 border border-rose-100 p-4 text-sm text-rose-700 flex items-start gap-3"
                        >
                            <span className="font-semibold">Error:</span> {serverError}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="h-4 w-4" />
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Enter a valid email address',
                                        },
                                    })}
                                    className={`pl-10 pr-4 py-3 block w-full rounded-xl border bg-slate-50/50 text-sm focus:outline-none transition ${
                                        errors.email
                                            ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                                            : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
                                    }`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setServerError('Password reset is not available yet.')}
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="h-4 w-4" />
                                </span>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    {...register('password', { required: 'Password is required' })}
                                    className={`pl-10 pr-10 py-3 block w-full rounded-xl border bg-slate-50/50 text-sm focus:outline-none transition ${
                                        errors.password
                                            ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                                            : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
                                    }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                {...register('remember')}
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-slate-600 cursor-pointer">
                                Remember me
                            </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </motion.button>
                    </form>

                    {/* Social Login Separator */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-slate-400 font-medium">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition">
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </button>
                        <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition">
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C3.79 16.32 3.13 9.4 6.84 9.17c1.17.07 2.01.69 2.63.69.63 0 1.7-.76 3.13-.61 1.83.2 3.23 1.01 4 2.27-3.79 2.17-2.92 7.28.75 8.76zM15.4 7.09c.89-1.12.76-2.54-.15-3.52-.94-.96-2.52-.77-3.29.3-.96 1.11-.74 2.59.21 3.51.98.97 2.45.71 3.23-.29z"
                                />
                            </svg>
                            Apple
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
