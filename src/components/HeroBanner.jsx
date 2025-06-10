import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getFeaturedProducts } from "../data/products";
import ProductCard from './ProductCard';

const HeroBanner = () => {
  // Featured products floating in the hero background
  const floatingProducts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      name: 'Premium Headphones'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80',
      name: 'Smart Watch'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1067&q=80',
      name: 'Wireless Speaker'
    }
  ];

  // Product slides data
  const slides = [
    {
      id: 1,
      title: "Premium Headphones",
      subtitle: "Experience crystal clear sound",
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      cta: "Shop Now",
      color: "from-purple-600 to-indigo-700"
    },
    {
      id: 2,
      title: "Smart Watch",
      subtitle: "Stay connected in style",
      image: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80',
      cta: "Explore Features",
      color: "from-blue-600 to-teal-500"
    },
    {
      id: 3,
      title: "Wireless Speaker",
      subtitle: "Powerful sound anywhere",
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1067&q=80',
      cta: "Listen Now",
      color: "from-orange-500 to-amber-500"
    }
  ];

  const featuredProducts = getFeaturedProducts();

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress(0);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, slides.length]);

  // Progress bar animation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50); // Update progress bar every 50ms

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index) => {
    setProgress(0);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setProgress(0);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setProgress(0);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative">
      {/* Hero Title Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800">
        {/* Animated floating product images */}
        <div className="absolute inset-0 overflow-hidden">
          {floatingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.2, y: 0 }}
              transition={{ 
                duration: 1, 
                delay: index * 0.3,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 3
              }}
              className="absolute rounded-lg shadow-xl overflow-hidden"
              style={{
                width: '300px',
                height: '300px',
                left: `${15 + (index * 25)}%`,
                top: `${20 + (index * 10)}%`,
                transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)`
              }}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Content container */}
        <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6"
            >
              Discover Our Latest Collection
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-purple-100 mb-10 max-w-2xl mx-auto"
            >
              Premium quality products with exclusive discounts. Elevate your shopping experience today.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/products"
                className="px-8 py-4 bg-white text-purple-700 font-bold rounded-lg shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Shop Now
              </Link>
              <Link
                to="/cart"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg shadow-lg hover:bg-white hover:text-purple-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                View Cart
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>

      {/* Product Slider Section */}
      <div className="relative bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Collections</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated selections of premium products
            </p>
          </div>

          {/* Slider container */}
          <div className="relative overflow-hidden rounded-xl shadow-xl h-110 mb-8">
            {/* Background gradient with fade effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} opacity-95 transition-colors duration-1000`}></div>
            
            {/* Slides */}
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  zIndex: index === currentSlide ? 1 : 0
                }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex items-center"
              >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-center md:text-left"
                    >
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
                        {slide.title}
                      </h3>
                      
                      <p className="text-xl text-white/90 mb-10">
                        {slide.subtitle}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                          to="/products"
                          className="px-8 py-3 bg-white text-purple-700 font-bold rounded-lg shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          {slide.cta}
                        </Link>
                      </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="relative"
                    >
                      <div className="relative w-full h-64">
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Navigation controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-4">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              {/* Progress indicators */}
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </div>

          {/* Featured Products Section */}
          <div className="text-center mb-12 mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular items loved by customers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block px-8 py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;