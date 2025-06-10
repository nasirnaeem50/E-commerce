import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load orders from localStorage on initial render
  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          if (Array.isArray(parsedOrders)) {
            setOrders(parsedOrders);
          }
        }
      } catch (error) {
        console.error('Failed to load orders from localStorage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders, isLoading]);

  const addOrder = (newOrder) => {
    const orderWithDefaults = {
      ...newOrder,
      id: newOrder.id || Date.now().toString(),
      createdAt: newOrder.createdAt || new Date().toISOString(),
      status: newOrder.status || 'pending'
    };
    setOrders(prev => [orderWithDefaults, ...prev]);
    return orderWithDefaults;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
    }
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const viewOrderDetails = (orderId) => {
    const order = getOrderById(orderId);
    setSelectedOrder(order);
    return order;
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      selectedOrder,
      isLoading,
      addOrder, 
      updateOrderStatus,
      deleteOrder,
      getOrderById,
      viewOrderDetails,
      closeOrderDetails
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);