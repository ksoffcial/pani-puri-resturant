import React, { useEffect, useState, useRef } from 'react';
import axiosClient from '../utils/axiosClient';
import { Trash2, User, Mail, Phone, ShieldCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AdminAllUser = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // Correct useEffect implementation
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get('/admin/getAllUser');
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // GSAP Animation for the title/header
  useEffect(() => {
    if (!loading) {
      gsap.fromTo(".user-card", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".user-grid",
            start: "top 80%",
          }
        }
      );
    }
  }, [loading]);

  const handleDelete = async (id) => {
    try {
      // In a real app, maybe add a "Confirm" modal here
      await axiosClient.delete(`/admin/deleteUser/${id}`);
      setUserData(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-base-200">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h1 className="text-xl font-semibold">Loading User Database...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8" ref={containerRef}>
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-base-content mb-2">User Management</h1>
        <p className="text-base-content/60">Manage permissions and account status</p>
      </header>

      <div className="user-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <AnimatePresence>
          {userData.map((user) => (
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={user._id}
              className="user-card card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-12 flex text-center justify-center items-center">
                      <span className="text-lg ">{user.fullName[0].toUpperCase()}</span>
                    </div>
                  </div>
                  <div className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'} gap-1`}>
                    <ShieldCheck size={14} />
                    {user.role}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h2 className="card-title text-xl flex items-center gap-2">
                    <User size={18} className="text-primary" /> {user.fullName}
                  </h2>
                  <p className="flex items-center gap-2 text-sm text-base-content/70">
                    <Mail size={16} /> {user.emailId}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-base-content/70">
                    <Phone size={16} /> {user.phoneNumber}
                  </p>
                </div>

                <div className="card-actions justify-end mt-6">
                  <button 
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-error btn-outline btn-sm gap-2"
                  >
                    <Trash2 size={16} />
                    Block User
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {userData.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl opacity-50">No users found in the database.</h2>
        </div>
      )}
    </div>
  );
};

export default AdminAllUser;