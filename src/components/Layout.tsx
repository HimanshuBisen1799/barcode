import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LayoutDashboard, Package, Users, ShoppingCart, Truck, LogOut } from 'lucide-react';

const Layout: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="text-xl font-bold mb-8">Inventory Manager</div>
        <nav className="space-y-2">
          <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/products" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link to="/suppliers" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <Truck size={20} />
            <span>Suppliers</span>
          </Link>
          <Link to="/purchases" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <ShoppingCart size={20} />
            <span>Purchases</span>
          </Link>
          <Link to="/sales" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <Users size={20} />
            <span>Sales</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded w-full text-left text-red-400"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;