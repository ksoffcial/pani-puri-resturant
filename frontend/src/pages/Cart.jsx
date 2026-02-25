import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartData, removeData } from '../cartSlice';
import { ShoppingCart, Trash2, LogIn, ShoppingBag } from 'lucide-react';
import { Navigate } from 'react-router';

const Cart = () => {
  const dispatch = useDispatch();

  // Directly use cartData from Redux to ensure sync with global state
  const { cartData, cartLoading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(cartData)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCartData());
    }
  }, [dispatch, isAuthenticated]);

  // remove the form the cart 

  const handleToRemove = async (id) => {
    try {
      // Wait for the removal to complete
      await dispatch(removeData(id)).unwrap();
      await dispatch(getCartData());
      window.location.reload();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }


  };
  // 1. Unauthenticated State
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="bg-base-200 p-8 rounded-full mb-6">
          <LogIn size={64} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Please Login</h1>
        <p className="text-base-content/70 mb-6">You need to be logged in to view your shopping cart.</p>
        <button className="btn btn-primary btn-wide">Login Now</button>
      </div>
    );
  }

  // 2. Loading State
  if (cartLoading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  // 3. Authenticated but Empty Cart State
  if (!cartData || cartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <ShoppingBag size={80} className="text-base-300 mb-4" />
        <h2 className="text-2xl font-semibold italic text-base-content/60">Your cart is feeling a bit light...</h2>
        <p className="mt-2 mb-8">Add some amazing items to get started!</p>
        <button className="btn btn-outline btn-secondary">Go Shopping</button>
      </div>
    );
  }

  // 4. Cart with Items
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="text-primary" />
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
        <div className="badge badge-primary">{cartData.length} items</div>
      </div>

      <div className="grid gap-6">
        {cartData.map((item) => (
          <div key={item._id} className="card card-side bg-base-100 shadow-xl border border-base-200">
            <figure className="w-32 h-32 md:w-48 md:h-48 overflow-hidden bg-gray-100">
              <img
                src={item.product.imageLink}
                alt={item.product.itemName}
                className="object-contain w-full h-full"
              />
            </figure>
            <div className="card-body p-4 md:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="card-title text-lg md:text-xl">{item.product.itemName}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold text-primary">₹{item.product.finalPrice}</span>
                    {item.actualPrice > item.finalPrice && (
                      <span className="text-sm line-through opacity-50">₹{item.product.actualPrice}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleToRemove(item._id)}
                  className="btn btn-ghost btn-circle text-error"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="card-actions justify-end mt-auto">
                <div className="join border border-base-300">
                  <button className="btn btn-sm join-item">-</button>
                  <button className="btn btn-sm btn-ghost join-item pointer-events-none">1</button>
                  <button className="btn btn-sm join-item">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-base-200 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-lg font-medium">Total Balance</p>
          <h3 className="text-3xl font-black text-primary">
            ₹{cartData.reduce((acc, curr) => acc + curr.product.finalPrice, 0).toFixed(2)}
          </h3>
        </div>
        <button className="btn btn-primary btn-lg px-12">Checkout Now</button>
      </div>
    </div>
  );
};

export default Cart;