// src/pages/AdminPanel.js
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to /admin/products if on /admin
  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/products');
    }
  }, [location, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Panel</h2>
          <nav className="space-y-2">
            <Link 
              to="/admin/products" 
              className={`block px-4 py-2 rounded-md transition-colors ${
                location.pathname.includes('/admin/products') 
                  ? 'bg-purple-100 text-purple-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Product Management
            </Link>
            <Link 
              to="/admin/orders" 
              className={`block px-4 py-2 rounded-md transition-colors ${
                location.pathname.includes('/admin/orders') 
                  ? 'bg-purple-100 text-purple-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Order Management
            </Link>
            <Link 
              to="#" 
              className="block px-4 py-2 text-gray-500 rounded-md cursor-not-allowed"
            >
              User Management (Coming Soon)
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;