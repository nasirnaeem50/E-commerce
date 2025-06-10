import { useParams } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setIsCartOpen } = useCart();

  // Get related products (same category, excluding current product)
  const relatedProducts = product 
    ? getProductsByCategory(product.category).filter(p => p.id !== product.id)
    : [];

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setIsCartOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
          </div>
          
          <p className="text-2xl font-bold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Features</h2>
            <ul className="list-disc pl-5 text-gray-600">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center mb-6">
            <span className="text-gray-700 mr-4">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <span className="ml-4 text-sm text-gray-500">
              {product.stock} available
            </span>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
              product.stock > 0 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rating) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs ml-1">({product.rating})</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600 mb-3">${product.price.toFixed(2)}</p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      addToCart({ ...product, quantity: 1 });
                      setIsCartOpen(true);
                    }}
                    disabled={product.stock <= 0}
                    className={`w-full py-2 px-4 rounded-md text-sm font-medium text-white ${
                      product.stock > 0 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-400 cursor-not-allowed'
                    } transition-colors`}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;