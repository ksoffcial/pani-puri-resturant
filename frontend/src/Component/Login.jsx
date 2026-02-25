import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../authslice';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
    phoneNumber: z
        .string()
        .length(10, "Phone number must be exactly 10 digits")
        .regex(/^[0-9]+$/, "Phone number must contain only digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const submitData = (data) => {
        // console.log('Data is here', data)
        dispatch(loginUser(data));
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card w-full max-w-sm bg-base-100 shadow-2xl border-b-4 border-yellow-500">
                <div className="card-body">
                    {/* Header Section */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-extrabold text-orange-600">Welcome Back!</h2>
                        <p className="text-gray-500 text-sm italic">Craving some Shubham Pani Puri?</p>
                    </div>

                    <form onSubmit={handleSubmit(submitData)} className="space-y-5">
                        {/* Phone Number Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Phone Number</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type="text"
                                    {...register('phoneNumber')} 
                                    className={`input input-bordered w-full pl-10 ${errors.phoneNumber ? 'input-error' : ''}`} 
                                    placeholder="8986348991" 
                                />
                                <span className="absolute left-3 top-3.5 text-gray-400">
                                    📞
                                </span>
                            </div>
                            {errors.phoneNumber && (
                                <span className="text-error text-xs mt-1">{errors.phoneNumber.message}</span>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                                <span className="label-text-alt link link-hover text-orange-600">Forgot?</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type="password" 
                                    {...register('password')} 
                                    className={`input input-bordered w-full pl-10 ${errors.password ? 'input-error' : ''}`} 
                                    placeholder="••••••••" 
                                />
                                <span className="absolute left-3 top-3.5 text-gray-400">
                                    🔒
                                </span>
                            </div>
                            {errors.password && (
                                <span className="text-error text-xs mt-1">{errors.password.message}</span>
                            )}
                        </div>

                        {/* Redux Error Handling */}
                        {error && (
                            <div className="alert alert-error text-xs py-2 shadow-sm">
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="form-control mt-4">
                            <button 
                                type="submit" 
                                className={`btn btn-warning text-white border-none bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Checking...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6 text-center text-sm">
                        <p>Don't have an account?</p>
                        <button 
                            onClick={() => navigate('/signup')} 
                            className="text-orange-600 font-bold hover:underline mt-1"
                        >
                            Register your account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;