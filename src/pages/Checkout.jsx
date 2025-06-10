import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    paypalEmail: ''
  });
  
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate order ID
    const newOrderId = `ORD-${Date.now()}`;
    
    // Create order object
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString(),
      status: 'Processing',
      total: cartTotal * 1.1, // Include tax
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        country: formData.country,
        zipCode: formData.zipCode
      },
      payment: {
        method: formData.paymentMethod,
        status: 'Pending',
        ...(formData.paymentMethod === 'credit-card' && {
          last4: formData.cardNumber.slice(-4)
        }),
        ...(formData.paymentMethod === 'paypal' && {
          paypalEmail: formData.paypalEmail
        })
      },
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }))
    };

    // Add order to context
    addOrder(newOrder);
    
    // Clear cart and show success
    clearCart();
    setOrderId(newOrderId);
    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">Order Confirmed!</h2>
            <p className="mt-2 text-gray-600">Your order <span className="font-medium text-purple-600">#{orderId}</span> has been placed successfully.</p>
            <p className="mt-2 text-gray-600">A confirmation email has been sent to <span className="font-medium">{formData.email}</span>.</p>
            
            <div className="mt-6 grid grid-cols-1 gap-4">
              <Link
                to={`/orders/${orderId}`}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                View Order Details
              </Link>
              <Link
                to="/products"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-3 text-xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">There are no items in your cart to checkout.</p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div className="mt-8 lg:mt-12">
              {/* Contact Information - Always visible */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Contact information</h2>
                
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                      required
                    />
                  </div>
                </div>

                {/* PayPal Email - Only shown when PayPal is selected */}
                {formData.paymentMethod === 'paypal' && (
                  <div>
                    <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700 mb-1">PayPal Email</label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="paypalEmail"
                        name="paypalEmail"
                        value={formData.paypalEmail}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                        required={formData.paymentMethod === 'paypal'}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <div className="mt-1">
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                        required
                      >
                        <option value="">Select a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IN">India</option>
                        <option value="PK">Pakistan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Postal code</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-6">
                  <fieldset>
                    <legend className="sr-only">Payment type</legend>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="credit-card"
                          name="paymentMethod"
                          type="radio"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                          Credit card
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="paypal"
                          name="paymentMethod"
                          type="radio"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                          PayPal
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="bank-transfer"
                          name="paymentMethod"
                          type="radio"
                          value="bank-transfer"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <label htmlFor="bank-transfer" className="ml-3 block text-sm font-medium text-gray-700">
                          Bank transfer
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  {/* Dynamic Payment Method Forms */}
                  {formData.paymentMethod === 'credit-card' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="0000 0000 0000 0000"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Expiration date (MM/YY)</label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="cardCvc"
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              placeholder="CVC"
                              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'paypal' && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-md border border-yellow-100">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">PayPal Notice</h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>You will be redirected to PayPal to complete your purchase securely.</p>
                            <p className="mt-2">Please ensure your PayPal email matches the one provided above.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'bank-transfer' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">Bank Transfer Details</h3>
                          <div className="mt-2 text-sm text-blue-700">
                            <p className="font-medium">Account Name: YourStore Inc.</p>
                            <p className="font-medium">Account Number: 123456789</p>
                            <p className="font-medium">Bank: International Bank</p>
                            <p className="font-medium">SWIFT/BIC: INTLUS33</p>
                            <p className="mt-2">Please include your order number as payment reference.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-8 lg:mt-12">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="sr-only">Order summary</h2>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">Order summary</h3>
                  
                  <div className="mt-6 space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.name}
                            </h4>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                            <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <dl className="mt-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Tax</dt>
                      <dd className="text-sm font-medium text-gray-900">${(cartTotal * 0.1).toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="text-base font-medium text-gray-900">Order total</dt>
                      <dd className="text-base font-medium text-gray-900">${(cartTotal * 1.1).toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out transform hover:scale-105"
                  >
                    Confirm Order
                  </button>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center text-sm">
                  <p className="text-gray-500">
                    or{' '}
                    <Link to="/cart" className="font-medium text-purple-600 hover:text-purple-500">
                      return to cart
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;