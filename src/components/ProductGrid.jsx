import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductGrid = ({ products, onImageError }) => {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
          }}
          className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col border border-gray-100 hover:border-purple-100 transition-all duration-300"
        >
          <Link to={`/products/${product.id}`} className="flex-grow">
            <div className="h-64 bg-white flex items-center justify-center p-4">
              <motion.img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
                onError={onImageError || ((e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                })}
              />
            </div>
            
            <div className="p-4 border-t border-gray-50">
              <h3 className="font-semibold text-lg mb-1 text-gray-800 hover:text-purple-600 transition-colors duration-200 truncate">
                {product.name}
              </h3>
              
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
              </div>
              
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                {product.description}
              </p>
            </div>
          </Link>
          
          <div className="p-4 pt-0 flex justify-between items-center">
            <span className="text-lg font-bold text-purple-600">
              ${product.price.toFixed(2)}
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;