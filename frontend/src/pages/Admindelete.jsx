import React, { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { Trash2, Loader2, AlertCircle, UtensilsCrossed, IndianRupee } from 'lucide-react';

const Admindelete = () => {
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Correct way to use async in useEffect
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/admin/getallitem");
        // Ensure we are setting an array even if the API returns something else
        setFoodData(Array.isArray(response.data) ? response.data : response.data.items || []);
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load products. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handletoDelete = async (id) => {
    // Basic confirmation for safety
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await axiosClient.delete(`/admin/deleteItem/${id}`);
      if (response.status === 200 || response.status === 204) {
        // 2. Use data._id to match your mapping key
        setFoodData(prev => prev.filter(item => item._id !== id));
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Could not delete the item. It might already be gone.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-lg font-medium">Fetching your menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-10">
        <div className="alert alert-error shadow-lg max-w-md">
          <AlertCircle />
          <span>{error}</span>
          <button className="btn btn-sm btn-ghost" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <UtensilsCrossed className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Manage Inventory</h1>
        </div>
        <div className="badge badge-outline p-4 font-mono">{foodData.length} Items Total</div>
      </div>

      {foodData.length > 0 ? (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md border border-base-300">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-200">
              <tr>
                <th>Product Info</th>
                <th>Price</th>
                <th>Discount</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {foodData.map((data) => (
                <tr key={data._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={data.imageLink || 'https://via.placeholder.com/150'} alt={data.itemName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{data.itemName}</div>
                        <div className="text-sm opacity-50 uppercase">{data.foodType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold italic">
                    <span className="flex items-center gap-1">
                       <IndianRupee size={14}/> {data.finalPrice}
                    </span>
                  </td>
                  <td>
                    <div className="badge badge-secondary badge-outline">{data.discount}% OFF</div>
                  </td>
                  <th className="text-center">
                    <button 
                      onClick={() => handletoDelete(data._id)}
                      className="btn btn-error btn-sm btn-square hover:scale-110 transition-transform"
                      title="Delete Item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 bg-base-100 rounded-xl border-2 border-dashed border-base-300">
          <p className="text-xl text-base-content/60">No items found in your menu.</p>
          <button className="btn btn-primary mt-4">Add your first item</button>
        </div>
      )}
    </div>
  );
};

export default Admindelete;