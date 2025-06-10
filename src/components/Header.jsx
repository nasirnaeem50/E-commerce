import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FavoriteBorder, ShoppingCart, Favorite } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, isCartOpen, setIsCartOpen, addToCart } = useCart();
  const { wishlistCount, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [lastAction, setLastAction] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
      toast.info(`Searching for: ${searchQuery}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (lastAction) {
      const { type, product } = lastAction;
      if (type === 'addToCart') {
        toast.success(`${product.name} added to cart!`, {
          icon: '🛒',
          autoClose: 2000,
        });
      } else if (type === 'addToWishlist') {
        toast.success(`${product.name} added to wishlist!`, {
          icon: '❤️',
          autoClose: 2000,
        });
      } else if (type === 'removeFromWishlist') {
        toast.info(`${product.name} removed from wishlist`, {
          icon: '💔',
          autoClose: 2000,
        });
      }
      setLastAction(null);
    }
  }, [lastAction]);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen && cartCount > 0) {
      toast.info(`You have ${cartCount} item${cartCount > 1 ? 's' : ''} in your cart`, {
        autoClose: 2000,
      });
    }
  };

  const handleQuickAddToWishlist = async (productId) => {
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
        setLastAction({ type: 'removeFromWishlist', product: { id: productId, name: 'Product' } });
      } else {
        await addToWishlist(productId);
        setLastAction({ type: 'addToWishlist', product: { id: productId, name: 'Product' } });
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update wishlist');
    }
  };

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/products', name: 'Shop' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' }
  ];

  const authLinks = [
    ...(!user ? [
      { path: '/login', name: 'Login' },
      { path: '/register', name: 'Register' }
    ] : []),
    ...(user ? [{ path: '/account', name: 'Account' }] : []),
    ...(isAdmin() ? [{ path: '/admin', name: 'Admin' }] : [])
  ];

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
            : 'bg-white/90 py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="flex items-center">
                <img 
                  src="/assets/images/logo.png" 
                  alt="Brand Logo" 
                  className="w-14 h-14 transition-opacity hover:opacity-80"
                />
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <nav>
                <ul className="flex space-x-6">
                  {navLinks.map((link) => (
                    <motion.li 
                      key={link.path}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NavLink 
                        to={link.path} 
                        className={({ isActive }) => 
                          `hover:text-purple-600 transition-colors duration-300 ${
                            isActive ? 'text-purple-600 font-medium' : 'text-gray-700'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </motion.li>
                  ))}
                  {authLinks.filter(link => link.path !== '/login' && link.path !== '/register').map((link) => (
                    <motion.li 
                      key={link.path}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NavLink 
                        to={link.path} 
                        className={({ isActive }) => 
                          `hover:text-purple-600 transition-colors duration-300 ${
                            isActive ? 'text-purple-600 font-medium' : 'text-gray-700'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center space-x-4">
                <motion.form 
                  onSubmit={handleSearch}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <motion.input 
                    type="text" 
                    placeholder="Search products..." 
                    className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 w-48 hover:w-56 focus:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    whileFocus={{ width: 256 }}
                  />
                  <motion.button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </motion.button>
                </motion.form>

                <div className="flex items-center space-x-4">
                  {user ? (
                    <div className="flex items-center space-x-3">
                      <motion.button
                        onClick={() => {
                          navigate('/account');
                          toast.info('Viewing your account', { autoClose: 2000 });
                        }}
                        className="text-gray-700 hover:text-purple-600 transition-colors duration-300 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Hi, {user.name || user.email.split('@')[0]}
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          logout();
                          toast.success('Logged out successfully', { autoClose: 2000 });
                        }}
                        className="text-gray-700 hover:text-purple-600 transition-colors duration-300 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Logout
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => {
                          navigate('/login');
                          toast.info('Please login to continue', { autoClose: 2000 });
                        }}
                        className="text-gray-700 hover:text-purple-600 transition-colors duration-300 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Login
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          navigate('/register');
                          toast.info('Create a new account', { autoClose: 2000 });
                        }}
                        className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Register
                      </motion.button>
                    </>
                  )}

                  <div className="flex items-center space-x-2">
                    {/* Wishlist Icon */}
                    <motion.button 
                      onClick={() => {
                        navigate('/wishlist');
                        if (wishlistCount > 0) {
                          toast.info(`You have ${wishlistCount} item${wishlistCount > 1 ? 's' : ''} in your wishlist`, { autoClose: 2000 });
                        } else {
                          toast.info('Your wishlist is empty', { autoClose: 2000 });
                        }
                      }}
                      className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <AnimatePresence mode="wait">
                        {wishlistCount > 0 ? (
                          <motion.div
                            key="filled"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <Favorite className="h-6 w-6 text-purple-600" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="outline"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <FavoriteBorder className="h-6 w-6" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {wishlistCount > 0 && (
                        <motion.span 
                          className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                          key={`wishlist-${wishlistCount}`}
                        >
                          {wishlistCount}
                        </motion.span>
                      )}
                    </motion.button>

                    {/* Cart Icon */}
                    <motion.button 
                      onClick={handleCartClick}
                      className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <AnimatePresence mode="wait">
                        {cartCount > 0 ? (
                          <motion.div
                            key="filled-cart"
                            initial={{ scale: 0.9, rotate: -5 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.9, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <ShoppingCart className="h-6 w-6 text-purple-600" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="empty-cart"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <ShoppingCart className="h-6 w-6" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {cartCount > 0 && (
                        <motion.span 
                          className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                          key={`cart-${cartCount}`}
                        >
                          {cartCount}
                        </motion.span>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center md:hidden space-x-4">
              <div className="flex items-center space-x-2">
                <motion.button 
                  onClick={() => {
                    navigate('/wishlist');
                    if (wishlistCount > 0) {
                      toast.info(`You have ${wishlistCount} item${wishlistCount > 1 ? 's' : ''} in your wishlist`, { autoClose: 2000 });
                    } else {
                      toast.info('Your wishlist is empty', { autoClose: 2000 });
                    }
                  }}
                  className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {wishlistCount > 0 ? (
                      <motion.div
                        key="filled-mobile"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        <Favorite className="h-6 w-6 text-purple-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="outline-mobile"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        <FavoriteBorder className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span 
                      className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                      key={`wishlist-mobile-${wishlistCount}`}
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </motion.button>

                <motion.button 
                  onClick={handleCartClick}
                  className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {cartCount > 0 ? (
                      <motion.div
                        key="filled-cart-mobile"
                        initial={{ scale: 0.9, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0.9, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        <ShoppingCart className="h-6 w-6 text-purple-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty-cart-mobile"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        <ShoppingCart className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                      key={`cart-mobile-${cartCount}`}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.button>
              </div>

              <motion.button 
                className="text-gray-700 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu as a separate element to prevent layout shifting */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white shadow-lg md:hidden overflow-hidden"
            style={{ marginTop: isScrolled ? '1rem' : '1.5rem' }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav>
                <ul className="space-y-4">
                  {[...navLinks, ...authLinks].map((link) => (
                    <motion.li 
                      key={link.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <NavLink 
                        to={link.path} 
                        className={({ isActive }) => 
                          `block hover:text-purple-600 transition-colors duration-300 ${
                            isActive ? 'text-purple-600 font-medium' : 'text-gray-700'
                          }`
                        }
                        onClick={() => {
                          setIsMenuOpen(false);
                          if (link.path === '/login') {
                            toast.info('Please login to continue', { autoClose: 2000 });
                          } else if (link.path === '/register') {
                            toast.info('Create a new account', { autoClose: 2000 });
                          }
                        }}
                      >
                        {link.name}
                      </NavLink>
                    </motion.li>
                  ))}
                  {user && (
                    <motion.li
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                          toast.success('Logged out successfully', { autoClose: 2000 });
                        }}
                        className="block w-full text-left text-gray-700 hover:text-purple-600 transition-colors duration-300"
                      >
                        Logout
                      </button>
                    </motion.li>
                  )}
                </ul>
              </nav>

              <motion.form 
                onSubmit={handleSearch}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative my-4"
              >
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </motion.form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add padding to the main content to prevent header overlap */}
      <div className={`pt-24 ${isScrolled ? 'md:pt-20' : 'md:pt-24'}`}></div>
    </>
  );
};

export default Header;