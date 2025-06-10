// src/components/OrderHistory.js
import { useOrders } from '../context/OrderContext';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return <p className="mt-1 text-gray-600">You haven't placed any orders yet.</p>;
  }

  return (
    <div className="mt-4 space-y-6">
      {orders.map((order) => (
        <Link 
          to={`/orders/${order.id}`} 
          key={order.id} 
          className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-medium">Order #{order.id}</span>
              <span className="text-sm text-gray-500 ml-2">{order.date}</span>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {order.status}
            </span>
          </div>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t flex justify-between items-center">
            <span className="text-sm text-gray-500">Total</span>
            <span className="font-medium">${order.total.toFixed(2)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrderHistory;