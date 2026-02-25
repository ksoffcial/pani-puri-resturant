import React from 'react';
import { useForm } from 'react-hook-form';
import axiosClient from '../utils/axiosClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PackagePlus, IndianRupee, Image as ImageIcon, FileText, Utensils, Percent } from 'lucide-react';

// 1. Define the Zod Schema for validation
const productSchema = z.object({
  itemName: z.string().min(3, "Product name must be at least 3 characters"),
  actualPrice: z.coerce.number().min(1, "Enter a valid actual price"),
  finalPrice: z.coerce.number().min(1, "Enter a valid final price"),
  discount: z.coerce.number().min(0).max(100),
  foodType: z.enum(["veg", "non-veg"], { errorMap: () => ({ message: "Please select a food type" }) }),
  imageLink: z.string().url("Please enter a valid image URL"),
  descritiption: z.string().min(10, "Description should be at least 10 characters"),
});

const Admincreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema), // 2. Connect Zod to React Hook Form
    defaultValues: {
      foodType: ""
    }
  });

  const submitData = async (data) => {
    try {
      const response = await axiosClient.post("/admin/create", data);
      console.log("Success:", response.data);
      reset();
      // Optional: Add a toast notification here
      alert("Product created successfully!");
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-6">
            <PackagePlus className="text-primary" size={28} />
            <h2 className="card-title text-2xl font-bold">Add New Product</h2>
          </div>

          <form onSubmit={handleSubmit(submitData)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Item Name */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">Product Name</label>
              <input
                type="text"
                placeholder="e.g. Paneer Butter Masala"
                className={`input input-bordered w-full ${errors.itemName ? 'input-error' : ''}`}
                {...register('itemName')}
              />
              {errors.itemName && <span className="text-error text-sm mt-1">{errors.itemName.message}</span>}
            </div>

            {/* Actual Price */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="flex items-center gap-1"><IndianRupee size={14} /> Actual Price</span>
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered w-full"
                {...register('actualPrice')}
              />
              {errors.actualPrice && <span className="text-error text-sm mt-1">{errors.actualPrice.message}</span>}
            </div>

            {/* Final Price */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="flex items-center gap-1"><IndianRupee size={14} /> Final Price</span>
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered w-full"
                {...register('finalPrice')}
              />
              {errors.finalPrice && <span className="text-error text-sm mt-1">{errors.finalPrice.message}</span>}
            </div>

            {/* Discount */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="flex items-center gap-1"><Percent size={14} /> Discount %</span>
              </label>
              <input
                type="number"
                placeholder="10"
                className="input input-bordered w-full"
                {...register('discount')}
              />
              {errors.discount && <span className="text-error text-sm mt-1">{errors.discount.message}</span>}
            </div>

            {/* Food Type */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="flex items-center gap-1"><Utensils size={14} /> Food Type</span>
              </label>
              <select className="select select-bordered w-full" {...register('foodType')}>
                <option value="" disabled>Select Type</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </select>
              {errors.foodType && <span className="text-error text-sm mt-1">{errors.foodType.message}</span>}
            </div>

            {/* Image Link */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">
                <span className="flex items-center gap-1"><ImageIcon size={14} /> Image URL</span>
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
                {...register('imageLink')}
              />
              {errors.imageLink && <span className="text-error text-sm mt-1">{errors.imageLink.message}</span>}
            </div>

            {/* Description */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">
                <span className="flex items-center gap-1"><FileText size={14} /> Description</span>
              </label>
              <textarea
                placeholder="Write a tasty description..."
                className="textarea textarea-bordered h-24"
                {...register('descritiption')}
              ></textarea>
              {errors.descritiption && <span className="text-error text-sm mt-1">{errors.descritiption.message}</span>}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full gap-2 text-lg"
              >
                {isSubmitting ? <span className="loading loading-spinner"></span> : <PackagePlus size={20} />}
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Admincreate;