// src/pages/OrderDetails.js
import { useParams } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const { user } = useAuth();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-3 text-xl font-bold text-gray-900">Order Not Found</h2>
            <p className="mt-2 text-gray-600">We couldn't find an order with that ID.</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if the order belongs to the current user or if user is admin
  const isOwner = user?.email === order.customer.email;
  const isAdmin = user?.role === 'admin';

  if (!isOwner && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="mt-3 text-xl font-bold text-gray-900">Access Denied</h2>
            <p className="mt-2 text-gray-600">You don't have permission to view this order.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-lg leading-6 font-medium text-gray-900">
              Order #{order.id}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Placed on {new Date(order.date).toLocaleString()}
            </p>
            <div className="mt-4 flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {order.customer.firstName} {order.customer.lastName}</p>
                  <p><span className="font-medium">Email:</span> {order.customer.email}</p>
                </div>

                <h2 className="text-lg font-medium text-gray-900 mt-6 mb-4">Shipping Address</h2>
                <div className="space-y-2">
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Method:</span> {order.payment.method}</p>
                  {order.payment.method === 'credit-card' && (
                    <p><span className="font-medium">Card ending in:</span> **** **** **** {order.payment.last4}</p>
                  )}
                  {order.payment.method === 'paypal' && (
                    <p><span className="font-medium">PayPal email:</span> {order.payment.paypalEmail}</p>
                  )}
                  <p><span className="font-medium">Payment Status:</span> {order.payment.status}</p>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-medium text-gray-900 mt-8 mb-4">Order Items</h2>
            <div className="border-t border-gray-200">
              {order.items.map((item) => (
                <div key={item.productId} className="py-4 flex border-b border-gray-200 last:border-0">
                  <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex-1 flex items-end justify-between">
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${(order.total / 1.1).toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
                <p>Tax (10%)</p>
                <p>${(order.total - (order.total / 1.1)).toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
                <p>Total</p>
                <p>${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;