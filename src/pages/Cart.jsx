import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal,
    cartDiscount,
    cartTotal, 
    clearCart,
    applyDiscount,
    removeDiscount,
    discounts
  } = useCart();

  if (cartItems === null) {
    return <LoadingSpinner />;
  }

  const handleApplyDiscount = (productId) => {
    const discountPercentage = prompt("Enter discount percentage (e.g., 10 for 10%):");
    if (discountPercentage && !isNaN(discountPercentage)) {
      applyDiscount(productId, parseFloat(discountPercentage));
      toast.success(`Discount applied successfully!`, { autoClose: 2000 });
    } else if (discountPercentage) {
      toast.error('Please enter a valid number for discount', { autoClose: 2000 });
    }
  };

  const handleRemoveFromCart = (productId, productName) => {
    removeFromCart(productId);
    toast.info(`${productName} removed from cart`, { autoClose: 2000 });
  };

  const handleClearCart = () => {
    clearCart();
    toast.info('Cart cleared successfully', { autoClose: 2000 });
  };

  const handleQuantityUpdate = (productId, newQuantity, productName) => {
    updateQuantity(productId, newQuantity);
    toast.info(`Updated quantity for ${productName}`, { autoClose: 2000 });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-xl font-medium mt-4">Your cart is empty</h2>
          <p className="text-gray-600 mt-2">Looks like you haven't added anything to your cart yet</p>
          <Link 
            to="/products" 
            className="inline-block mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="p-4 flex">
                    <div className="flex-shrink-0 h-24 w-24 bg-gray-200 rounded overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                      {item.discountPercentage > 0 && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.discountPercentage}% OFF
                        </span>
                      )}
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link to={`/products/${item.id}`} className="hover:text-purple-600">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-gray-500">{item.category}</p>
                        </div>
                        <div className="text-right">
                          {item.originalPrice && item.originalPrice !== item.price && (
                            <p className="text-gray-500 line-through text-sm">
                              ${item.originalPrice.toFixed(2)}
                            </p>
                          )}
                          <p className="text-lg font-medium text-gray-900">
                            ${item.price.toFixed(2)}
                          </p>
                          {item.discountPercentage > 0 && (
                            <p className="text-green-600 text-sm">
                              You save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button 
                            onClick={() => handleQuantityUpdate(item.id, item.quantity - 1, item.name)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityUpdate(item.id, item.quantity + 1, item.name)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.discountPercentage > 0 ? (
                            <button 
                              onClick={() => {
                                removeDiscount(item.id);
                                toast.info('Discount removed', { autoClose: 2000 });
                              }}
                              className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                            >
                              Remove Discount
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleApplyDiscount(item.id)}
                              className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded hover:bg-purple-200"
                            >
                              Apply Discount
                            </button>
                          )}
                          <button 
                            onClick={() => handleRemoveFromCart(item.id, item.name)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button 
                onClick={handleClearCart}
                className="px-4 py-2 text-red-600 hover:text-red-800"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="divide-y divide-gray-200">
                <div className="pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">-${cartDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">${(cartTotal * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Link 
                to="/checkout" 
                className="block w-full mt-6 px-6 py-3 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors duration-300"
                onClick={() => toast.info('Proceeding to checkout', { autoClose: 2000 })}
              >
                Proceed to Checkout
              </Link>
              <div className="mt-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-2 text-sm text-gray-500">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;