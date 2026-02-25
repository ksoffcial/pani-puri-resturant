import React, { useState } from 'react';
import { ShoppingCart, Tag, Leaf, Flame, Info } from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import { toast } from 'react-hot-toast';

const ProductCard = ({ data }) => {
    const [loading, setLoading] = useState(false);

    const handleToClick = async (id) => {
        try {
            setLoading(true);
            const response = await axiosClient.post(`/cart/addItem/${id}`);
            toast.success(response.data.message || 'Added to cart!');
        } catch (error) {
            console.error("Error adding to cart", error);
            toast.error('Failed to add item.');
        } finally {
            setLoading(false);
        }
    };

    // Determine food type icon
    const renderFoodTypeIcon = () => {
        if (data.foodType?.toLowerCase() === 'veg') {
            return <Leaf size={16} className="text-green-600" />;
        } else if (data.foodType?.toLowerCase() === 'non-veg') {
            return <Flame size={16} className="text-red-600" />;
        }
        return null;
    };


    return (
        <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-xs">
            {/* Image */}
            <figure className="px-4 pt-4">
                <img
                    src={data.imageLink || '/placeholder.jpg'}
                    alt={data.itemName}
                    className="rounded-xl h-48 w-full object-contain"
                />
            </figure>

            {/* Card Body */}
            <div className="card-body">
                {/* Title and Food Type */}
                <div className="flex items-center justify-between">
                    <h2 className="card-title text-lg font-semibold line-clamp-1">
                        {data.itemName}
                    </h2>
                    {renderFoodTypeIcon()}
                </div>

                {/* Description with optional Info icon for tooltip */}
                <p className="text-sm text-gray-600 line-clamp-2 flex items-start gap-1">
                    <span>{data.descritiption}</span>
                    {data.description && (
                        <Info size={14} className="tooltip tooltip-right cursor-help" data-tip={data.description} />
                    )}
                </p>

                {/* Pricing */}
                <div className="flex items-center gap-2 mt-2">
                    {data.discount > 0 && (
                        <>
                            <span className="text-lg font-bold text-primary">₹{data.finalPrice}</span>
                            <span className="text-sm line-through text-gray-400">₹{data.actualPrice}</span>
                            <span className="badge badge-secondary badge-sm flex items-center gap-1">
                                <Tag size={12} /> {data.discount}% off
                            </span>
                        </>
                    )}
                    {!data.discount && (
                        <span className="text-lg font-bold">₹{data.finalPrice || data.actualPrice}</span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <div className="card-actions mt-3">
                    <button
                        onClick={() => handleToClick(data._id)}
                        disabled={loading}
                        className="btn btn-primary btn-block gap-2 normal-case"
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            <ShoppingCart size={18} />
                        )}
                        {loading ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;