import React, { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { LayoutGrid, Loader2, UtensilsCrossed } from 'lucide-react';
import { getCartData } from '../cartSlice';

const ProductSection = () => {
    const [loading, setLoading] = useState(false);
    const [foodData, setfoodData] = useState([]);
    const [error, setError] = useState(null);

    // Pulling cart stats from Redux for the header
    const dispatch = useDispatch()
    const { cartData } = useSelector((state) => state.cart);
    
    const count = 4;
    const amount = 500;
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get("/admin/getallFood");
                // Assuming response.data contains the array directly based on your code
                setfoodData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        dispatch(getCartData())
    }, []);

  
    
    if (error) return (
        <div className="alert alert-error max-w-md mx-auto mt-10">
            <span>Error: {error}</span>
        </div>
    );

    return (
        <div className="container mx-auto px-4 md:px-12 py-6 md:py-12 min-h-screen">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-black flex items-center gap-2">
                        <UtensilsCrossed className="text-primary" /> 
                        Our Menu
                    </h1>
                    <p className="text-base-content/60 mt-1">Discover the best flavors in town</p>
                </div>

                {/* Quick Stats / Filter placeholder */}
                <div className="stats shadow bg-base-100 border border-base-200">
                    <div className="stat py-2 px-4">
                        <div className="stat-title text-xs uppercase font-bold text-gray-400">Items in Cart</div>
                        <div className="stat-value text-primary text-2xl">{count || 0}</div>
                    </div>
                    <div className="stat py-2 px-4">
                        <div className="stat-title text-xs uppercase font-bold text-gray-400">Total Value</div>
                        <div className="stat-value text-secondary text-2xl">₹{amount || 0}</div>
                    </div>
                </div>
            </div>

            {/* Content Logic */}
            {loading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <Loader2 className="animate-spin text-primary" size={48} />
                    <p className="text-lg font-medium animate-pulse">Preparing delicious data...</p>
                </div>
            ) : foodData.length > 0 ? (
                <div className="flex flex-wrap gap-8 items-center justify-center">
                    {foodData.map((item) => (
                        <ProductCard key={item._id} data={item} />
                    ))}
                </div>
            ) : (
                <div className="hero bg-base-200 rounded-3xl p-10">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <LayoutGrid size={60} className="mx-auto mb-4 opacity-20" />
                            <h2 className="text-2xl font-bold">No food items found</h2>
                            <p className="py-6 text-base-content/70">
                                It looks like the kitchen is empty right now. Check back later!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductSection;