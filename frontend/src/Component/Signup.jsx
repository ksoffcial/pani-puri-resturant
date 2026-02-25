import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../authslice';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Added gender to schema so validation doesn't fail
const signupSchema = z.object({
    fullName: z.string().min(3, "Name should contain at least 3 letters"),
    emailId: z.string().email("Invalid email"),
    phoneNumber: z
        .string()
        .length(10, "Phone number must be exactly 10 digits")
        .regex(/^[0-9]+$/, "Phone number must contain only digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    gender: z.enum(["male", "female", "other"], { errorMap: () => ({ message: "Please select a gender" }) }),
});

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(signupSchema) });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const submitData = (data) => {
        dispatch(registerUser(data));
        console.log("Form Data:", data);
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl border-t-4 border-orange-500">
                <div className="card-body">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl font-bold text-orange-600">Shubham Pani Puri</h2>
                        <p className="text-gray-500">Create your account to start ordering!</p>
                    </div>

                    <form onSubmit={handleSubmit(submitData)} className="space-y-4">
                        {/* Full Name */}
                        <div className="form-control">
                            <label className="label font-semibold">Full Name</label>
                            <input 
                                {...register('fullName')} 
                                className={`input input-bordered w-full ${errors.fullName ? 'input-error' : ''}`} 
                                placeholder="John Doe" 
                            />
                            {errors.fullName && <span className="text-error text-sm mt-1">{errors.fullName.message}</span>}
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label font-semibold">Email Address</label>
                            <input 
                                {...register('emailId')} 
                                className={`input input-bordered w-full ${errors.emailId ? 'input-error' : ''}`} 
                                placeholder="name@example.com" 
                            />
                            {errors.emailId && <span className="text-error text-sm mt-1">{errors.emailId.message}</span>}
                        </div>

                        {/* Phone Number */}
                        <div className="form-control">
                            <label className="label font-semibold">Phone Number</label>
                            <input 
                                {...register('phoneNumber')} 
                                className={`input input-bordered w-full ${errors.phoneNumber ? 'input-error' : ''}`} 
                                placeholder="9876543210" 
                            />
                            {errors.phoneNumber && <span className="text-error text-sm mt-1">{errors.phoneNumber.message}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Password */}
                            <div className="form-control">
                                <label className="label font-semibold">Password</label>
                                <input 
                                    type="password"
                                    {...register('password')} 
                                    className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`} 
                                    placeholder="******" 
                                />
                                {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
                            </div>

                            {/* Gender */}
                            <div className="form-control">
                                <label className="label font-semibold">Gender</label>
                                <select 
                                    {...register("gender")} 
                                    className="select select-bordered w-full"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && <span className="text-error text-sm mt-1">{errors.gender.message}</span>}
                            </div>
                        </div>

                        {/* Display Redux Error if any */}
                        {error && <div className="alert alert-error text-sm py-2">{error}</div>}

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button 
                                type="submit" 
                                className={`btn btn-warning w-full text-white font-bold ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    <div className="divider">OR</div>
                    <p className="text-center text-sm">
                        Already have an account? 
                        <span 
                            className="text-orange-600 font-bold cursor-pointer ml-1" 
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;