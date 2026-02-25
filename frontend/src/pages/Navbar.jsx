import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router'; // Fixed: usually react-router-dom
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../authslice';
import {
  Menu,
  Search,
  ShoppingCart,
  User as UserIcon,
  Settings,
  Package,
  LogOut,
  LayoutDashboard,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, count, amount } = useSelector((state) => state.auth);
  const { cartData } = useSelector((state) => state.cart);
  // const cartIteml = cartData.length;

  
  
  console.log(cartData)
  const navRef = useRef(null);


  // GSAP: Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-content", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-lg px-2 md:px-8 sticky top-0 z-[100]" ref={navRef}>
      {/* --- Mobile Menu & Logo --- */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden nav-content">
            <Menu className="h-6 w-6" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => navigate('/')}>Home</a></li>
            <li><a>Menu</a></li>
            <li><a>Offers</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col cursor-pointer nav-content"
          onClick={() => navigate('/')}
        >
          <span className="text-xl md:text-2xl font-black text-orange-600 leading-tight">
            SHUBHAM
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold bg-yellow-400 px-1 rounded text-black flex items-center gap-0.5">
              <MapPin size={8} strokeWidth={3} /> PURNIA
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase italic">Pani Puri</span>
          </div>
        </motion.div>
      </div>

      {/* --- Desktop Navigation --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold text-gray-700">
          {['Menu', 'Special Box', 'Bulk Order', 'Track Order'].map((item, i) => (
            <li key={item} className="nav-content">
              <motion.a
                whileHover={{ y: -2, color: '#ea580c' }}
                className="transition-colors cursor-pointer"
              >
                {item}
              </motion.a>
            </li>
          ))}
        </ul>
      </div>

      {/* --- Icons & Profile --- */}
      <div className="navbar-end gap-2">
        <button className="btn btn-ghost btn-circle hidden sm:flex nav-content">
          <Search className="h-5 w-5" />
        </button>

        {/* Shopping Cart Dropdown */}
        <div className="dropdown dropdown-end nav-content">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <ShoppingCart className="h-5 w-5" />
              <span className="badge badge-sm badge-warning indicator-item font-bold">0
                </span>
            </div>
          </label>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-64 bg-base-100 shadow-2xl border border-base-200">
            <div className="card-body">
              <span className="font-bold text-lg">Items</span>
              <span className="text-orange-600 font-semibold">Subtotal: ₹{amount}</span>
              <div className="card-actions">
                <button onClick={() => navigate("/cart")} className="btn btn-warning btn-block text-white btn-sm shadow-md hover:shadow-lg transition-all">
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Authentication / Profile */}
        <div className="nav-content">
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-orange-500 hover:border-orange-600 transition-all p-0.5">
                <div className="w-10 rounded-full">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || 'Guest'}`} alt="user" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-56 border border-base-200">
                <li className="menu-title text-orange-600 font-bold border-b border-base-200 mb-2 pb-1">
                  {user?.fullName || 'Profile'}
                </li>
                <li><a><Package size={16} /> My Orders</a></li>
                <li><a><Settings size={16} /> Settings</a></li>
                {user?.role === 'admin' && (
                  <li>
                    <NavLink to="/adminPanel" className="text-blue-600">
                      <LayoutDashboard size={16} /> Admin Dash
                    </NavLink>
                  </li>
                )}
                <div className="divider my-1"></div>
                <li>
                  <button onClick={() => dispatch(logoutUser())} className="text-error hover:bg-error/10">
                    <LogOut size={16} /> Log out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="btn btn-warning btn-sm md:btn-md text-white border-none shadow-md hidden sm:flex px-6"
            >
              Login
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;