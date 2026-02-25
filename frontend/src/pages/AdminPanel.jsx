import React from 'react';
import { PlusCircle, Trash2, Edit, Users, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router'; // Assuming you use react-router for navigation

const AdminPanel = () => {
  const adminOption = [
    {
      id: "create",
      title: "Add Item",
      description: "Add a new item to our special curated section.",
      route: "/admin/create",
      icon: <PlusCircle className="w-8 h-8 text-primary" />,
      color: "border-primary"
    },
    {
      id: "delete",
      title: "Delete Item",
      description: "Remove existing items from the special section.",
      route: "/admin/delete",
      icon: <Trash2 className="w-8 h-8 text-error" />,
      color: "border-error"
    },
    {
      id: "update",
      title: "Update Details",
      description: "Modify current item details and descriptions.",
      route: "/admin/update",
      icon: <Edit className="w-8 h-8 text-warning" />,
      color: "border-warning"
    },
    {
      id: "userDetails",
      title: "User Details",
      description: "Get all registered user details and activity logs.",
      route: "/admin/getUser",
      icon: <Users className="w-8 h-8 text-info" />,
      color: "border-info"
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-2">
          <LayoutDashboard className="w-10 h-10 text-secondary" />
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-base-content/70">Manage your application content and users from one central hub.</p>
      </div>

      {/* Grid Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminOption.map((option) => (
          <div 
            key={option.id} 
            className={`card bg-base-100 shadow-xl border-t-4 ${option.color} hover:scale-105 transition-transform duration-200`}
          >
            <div className="card-body items-center text-center">
              <div className="p-3 bg-base-200 rounded-full mb-2">
                {option.icon}
              </div>
              <h2 className="card-title capitalize">{option.title}</h2>
              <p className="text-sm text-base-content/60">{option.description}</p>
              <div className="card-actions mt-4 w-full">
                <Link to={option.route} className="btn btn-outline btn-sm w-full">
                  Manage
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;