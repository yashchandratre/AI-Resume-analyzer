import { useForm } from 'react-hook-form';
import API from '../services/authapi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            setServerError("");
            const res = await API.post("/auth/register", {
                data
            });
            toast.success(res.data?.msg || "Account created successfully!");
            navigate("/login", { state: { message: res.data.msg } });
        } catch (err) {
            console.log("Error in Register:", err);
            setServerError(err.response?.data?.msg || "Something went wrong!");
            toast.error(err.response?.data?.msg || "Registration failed!");
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
                        animate={{ rotate: -360 }}
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
                            Start Your Career Acceleration
                        </h2>
                        <p className="text-slate-300 text-base leading-relaxed">
                            Create your free account today and find out how well your resume matches against real-world job roles and requirements.
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

            {/* Right side: Register Form */}
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
                    <div className="mb-6">
                        <div className="flex items-center gap-2 md:hidden mb-6">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">ResumeAI</span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Server Error Alert */}
                    {serverError && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-4 rounded-2xl bg-rose-50 border border-rose-100 p-4 text-sm text-rose-700 flex items-start gap-3"
                        >
                            <span className="font-semibold">Error:</span> {serverError}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fname" className="block text-sm font-medium text-slate-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <User className="h-4 w-4" />
                                </span>
                                <input
                                    id="fname"
                                    type="text"
                                    autoComplete="name"
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
                                    className={`pl-10 pr-4 py-2.5 block w-full rounded-xl border bg-slate-50/50 text-sm focus:outline-none transition ${
                                        errors.fname
                                            ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                                            : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
                                    }`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.fname && (
                                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.fname.message}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
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
                                    className={`pl-10 pr-4 py-2.5 block w-full rounded-xl border bg-slate-50/50 text-sm focus:outline-none transition ${
                                        errors.email
                                            ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                                            : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
                                    }`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="h-4 w-4" />
                                </span>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                            message: 'Use 8+ characters with uppercase, lowercase, and a number',
                                        },
                                    })}
                                    className={`pl-10 pr-10 py-2.5 block w-full rounded-xl border bg-slate-50/50 text-sm focus:outline-none transition ${
                                        errors.password
                                            ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                                            : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
                                    }`}
                                    placeholder="Create a password"
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
                                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="password2" className="block text-sm font-medium text-slate-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="h-4 w-4" />
                                </span>
                                <input
                                    id="password2"
                                    type={showPassword2 ? "text" : "password"}
                                    autoComplete="new-password"
                                    {...register('password2', {
                                        required: 'Please confirm your password',
                                        validate: (value, formValues) => value === formValues.password || 'Passwords do not match',
                                    })}
                                    className={`pl-10 pr-10 py-2.5 block w-full rounded-xl border bg-slate-50/50 text-sm focus:outline-none transition ${
                                        errors.password2
                                            ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                                            : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
                                    }`}
                                    placeholder="Repeat password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword2(!showPassword2)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                                >
                                    {showPassword2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password2 && (
                                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.password2.message}</p>
                            )}
                        </div>

                        {/* Terms checkbox */}
                        <div className="text-xs text-slate-500 mt-2">
                            By creating an account, you agree to our{' '}
                            <a href="#" className="text-indigo-600 font-semibold hover:underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-indigo-600 font-semibold hover:underline">
                                Privacy Policy
                            </a>.
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
                                    Creating account...
                                </>
                            ) : (
                                'Create account'
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
