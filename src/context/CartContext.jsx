import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discounts, setDiscounts] = useState({}); // Store product discounts

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedDiscounts = localStorage.getItem('discounts');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedDiscounts) {
      setDiscounts(JSON.parse(savedDiscounts));
    }
  }, []);

  // Save cart and discounts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('discounts', JSON.stringify(discounts));
  }, [cartItems, discounts]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { 
        ...product, 
        quantity,
        originalPrice: product.originalPrice || product.price // Preserve original price
      }];
    });
  };

  const applyDiscount = (productId, discountPercentage) => {
    setDiscounts(prev => ({
      ...prev,
      [productId]: discountPercentage
    }));
    
    setCartItems(prevItems =>
      prevItems.map(item => 
        item.id === productId
          ? { 
              ...item, 
              price: item.originalPrice * (1 - discountPercentage / 100),
              discountPercentage 
            }
          : item
      )
    );
  };

  const removeDiscount = (productId) => {
    setDiscounts(prev => {
      const newDiscounts = {...prev};
      delete newDiscounts[productId];
      return newDiscounts;
    });
    
    setCartItems(prevItems =>
      prevItems.map(item => 
        item.id === productId
          ? { 
              ...item, 
              price: item.originalPrice,
              discountPercentage: 0
            }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    removeDiscount(productId);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscounts({});
  };

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + (item.originalPrice || item.price) * item.quantity,
    0
  );

  const cartDiscount = cartItems.reduce(
    (total, item) => total + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyDiscount,
        removeDiscount,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        discounts
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};