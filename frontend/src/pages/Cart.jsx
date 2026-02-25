import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartData, removeData } from '../cartSlice';
import { ShoppingCart, Trash2, LogIn, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartData, cartLoading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCartData());
    }
  }, [dispatch, isAuthenticated]);

  const handleToRemove = async (id) => {
    try {
      await dispatch(removeData(id)).unwrap();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // 1. Unauthenticated State
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
          <LogIn size={80} className="relative text-primary animate-pulse" />
        </div>
        <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Login Required</h1>
        <p className="text-base-content/60 max-w-sm text-center mb-8">
          Your dream items are waiting! Log in to access your saved cart and personalized offers.
        </p>
        <button onClick={() => navigate('/login')} className="btn btn-primary btn-wide rounded-full shadow-lg shadow-primary/30">
          Sign In to Your Account
        </button>
      </div>
    );
  }

  // 2. Loading State
  if (cartLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm font-medium animate-pulse">Fetching your goodies...</p>
      </div>
    );
  }

  // 3. Empty Cart State
  if (!cartData || cartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
        <div className="bg-base-200 p-10 rounded-full mb-6">
          <ShoppingBag size={100} className="text-base-content/20" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-base-content/60 mb-8 max-w-xs text-center">
          Looks like you haven't added anything yet. Explore our latest arrivals!
        </p>
        <button onClick={() => navigate('/')} className="btn btn-outline btn-primary px-10 rounded-full border-2">
          Start Shopping
        </button>
      </div>
    );
  }

  const subtotal = cartData.reduce((acc, curr) => acc + curr.product.finalPrice, 0);

  // 4. Main Cart UI
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10">
      <header className="flex items-end gap-4 mb-10">
        <h1 className="text-4xl font-black tracking-tight">My Cart</h1>
        <span className="text-lg font-medium text-base-content/50 mb-1">
          ({cartData.length} {cartData.length === 1 ? 'item' : 'items'})
        </span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartData.map((item) => (
            <div 
              key={item._id} 
              className="group flex flex-col sm:flex-row gap-6 bg-base-100 p-4 rounded-3xl border border-base-200 transition-all hover:shadow-xl hover:shadow-base-300/50"
            >
              <div className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                <img
                  src={item.product.imageLink}
                  alt={item.product.itemName}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110 duration-500"
                />
              </div>

              <div className="flex flex-col flex-grow justify-between py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-base-content/40">Category</span>
                    <h2 className="text-xl font-bold mt-1 line-clamp-1">{item.product.itemName}</h2>
                  </div>
                  <button
                    onClick={() => handleToRemove(item._id)}
                    className="btn btn-ghost btn-sm btn-circle text-error/60 hover:text-error hover:bg-error/10"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-6 sm:mt-0">
                  <div className="flex items-center gap-3 bg-base-200/50 p-1 rounded-xl">
                    <button className="btn btn-square btn-ghost btn-xs"><Minus size={14} /></button>
                    <span className="w-8 text-center font-bold">1</span>
                    <button className="btn btn-square btn-ghost btn-xs"><Plus size={14} /></button>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black">₹{item.product.finalPrice}</span>
                    </div>
                    {item.product.actualPrice > item.product.finalPrice && (
                      <span className="text-sm line-through text-base-content/40">₹{item.product.actualPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card bg-base-200/50 backdrop-blur-md p-6 rounded-3xl border border-base-300 sticky top-10">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-base-content/70">
                <span>Subtotal</span>
                <span className="font-semibold text-base-content">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base-content/70">
                <span>Shipping</span>
                <span className="text-success font-medium">Free</span>
              </div>
              <div className="divider opacity-50"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <div className="text-right">
                  <p className="text-2xl font-black text-primary">₹{subtotal.toFixed(2)}</p>
                  <p className="text-[10px] uppercase opacity-50 tracking-tighter">VAT Included</p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-block h-14 rounded-2xl text-lg shadow-xl shadow-primary/20 group">
              Checkout Now
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-center text-xs text-base-content/50 mt-4">
              Secure Checkout • 30 Day Returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;