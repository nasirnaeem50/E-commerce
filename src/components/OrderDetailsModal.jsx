import { XMarkIcon } from '@heroicons/react/24/outline';

const OrderDetailsModal = ({ order, onClose }) => {
  // Default values and safe destructuring
  const {
    id = 'N/A',
    customer = {},
    shippingAddress = {},
    payment = {},
    items = [],
    taxRate = 0.08, // Default tax rate of 8%
    freeShippingThreshold = 50, // Free shipping over $50
    baseShippingCost = 5.00 // Base shipping cost
  } = order || {};

  // Calculate order values dynamically
  const calculateOrderValues = () => {
    const subtotal = items.reduce((sum, item) => 
      sum + (item.price || 0) * (item.quantity || 0), 0);
    
    const shippingCost = subtotal >= freeShippingThreshold 
      ? 0 
      : baseShippingCost;
    
    const tax = subtotal * taxRate;
    const total = subtotal + shippingCost + tax;

    return { subtotal, shippingCost, tax, total };
  };

  const { subtotal, shippingCost, tax, total } = calculateOrderValues();

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value || 0);
  };

  // Format address lines
  const formatAddress = () => {
    const lines = [
      shippingAddress.address1,
      shippingAddress.address2,
      `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}`,
      shippingAddress.country
    ];
    return lines.filter(Boolean).map((line, i) => (
      <p key={i} className={i === 0 ? 'font-medium' : ''}>{line}</p>
    ));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-900">
            Order #<span className="font-mono">{id}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-8">
          {/* Customer and Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Customer Information</h4>
              <div className="space-y-2 text-gray-700">
                <p className="font-medium">
                  {customer.firstName} {customer.lastName}
                </p>
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Shipping Address</h4>
              <div className="space-y-1 text-gray-700">
                {formatAddress()}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {item.image && (
                            <div className="flex-shrink-0 h-10 w-10 mr-4">
                              <img className="h-10 w-10 rounded" src={item.image} alt={item.name} />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            {item.variant && (
                              <div className="text-sm text-gray-500">{item.variant}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary and Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Shipping
                    {subtotal >= freeShippingThreshold && (
                      <span className="text-green-600 ml-2">(Free Shipping)</span>
                    )}
                  </span>
                  <span className="font-medium">{formatCurrency(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({taxRate * 100}%)</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Payment Information</h4>
              <div className="bg-gray-50 p-5 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-medium capitalize">{payment.method || 'N/A'}</span>
                </div>
                {payment.transactionId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono font-medium text-sm">{payment.transactionId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${
                    payment.status === 'paid' ? 'text-green-600' : 
                    payment.status === 'pending' ? 'text-yellow-600' : 
                    'text-gray-600'
                  }`}>
                    {payment.status || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md transition-colors"
          >
            Close Order Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;