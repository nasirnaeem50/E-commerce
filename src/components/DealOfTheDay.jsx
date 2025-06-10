import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const DealSlider = () => {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Sample deal products
  const deals = [
    {
      id: 101,
      name: "Premium Wireless Headphones",
      price: 199.99,
      rating: 4.8,
      description:
        "Experience crystal-clear sound with noise cancellation and 30-hour battery life.",
      image: "/assets/images/wirlessheadphone.jpg",
      originalPrice: 249.99,
      discountPercentage: 20, // Added discount percentage
      stock: 15,
    },
    {
      id: 102,
      name: "Smart Watch Pro",
      price: 249.99,
      rating: 4.6,
      description:
        "Stay connected with health monitoring, GPS, and customizable watch faces.",
      image: "/assets/images/smartwatch.jpeg",
      originalPrice: 299.99,
      discountPercentage: 16.67, // Added discount percentage
      stock: 8,
    },
    {
      id: 103,
      name: "4K Ultra HD Smart TV",
      price: 899.99,
      rating: 4.9,
      description:
        "Immerse yourself in stunning 4K resolution with HDR and built-in streaming apps.",
      image: "/assets/images/tv.jpeg",
      originalPrice: 1099.99,
      discountPercentage: 18.18, // Added discount percentage
      stock: 5,
    },
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1;
        const newMinutes = newSeconds < 0 ? prev.minutes - 1 : prev.minutes;
        const newHours = newMinutes < 0 ? prev.hours - 1 : prev.hours;

        return {
          hours: newHours < 0 ? 23 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % deals.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [deals.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentDeal = deals[currentSlide];

  return (
    <div className="relative bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 md:p-8 overflow-hidden">
      {/* Badge */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-red-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium z-10">
        Limited Time Offer
      </div>

      {/* Discount Badge - Responsive */}
      {currentDeal.discountPercentage > 0 && (
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-green-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium z-10">
          {currentDeal.discountPercentage}% OFF
        </div>
      )}

      {/* Slider Indicators */}
      <div className="flex justify-center space-x-2 mb-4 md:mb-0 md:absolute md:bottom-6 md:left-1/2 md:transform md:-translate-x-1/2">
        {deals.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-purple-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center">
        {/* Product Image */}
        <motion.div
          key={`image-${currentSlide}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/3 mb-6 md:mb-0"
        >
          <img
            src={currentDeal.image}
            alt={currentDeal.name}
            className="w-full h-64 object-contain rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x300?text=Product+Image";
            }}
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          key={`info-${currentSlide}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-2/3 md:pl-8"
        >
          <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
            Deal of the Day
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {currentDeal.name}
          </h2>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(currentDeal.rating)
                      ? "fill-current"
                      : "stroke-current"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 ml-2">
              {currentDeal.rating.toFixed(1)}
            </span>
          </div>

          <p className="text-gray-600 mb-6">{currentDeal.description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-2xl md:text-3xl font-bold text-purple-600">
                ${currentDeal.price.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500 line-through">
                ${currentDeal.originalPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-red-600 font-medium">
                (Save $
                {(currentDeal.originalPrice - currentDeal.price).toFixed(2)})
              </span>
            </div>

            <button
              onClick={() => addToCart(currentDeal)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Add to Cart
            </button>
          </div>

          {/* Countdown Timer */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Hurry! Offer ends in:
              </span>
              <span className="text-sm font-medium text-red-600">
                {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${
                    100 -
                    (timeLeft.hours * 3600 +
                      timeLeft.minutes * 60 +
                      timeLeft.seconds) /
                      864
                  }%`,
                }}
              />
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Sold: {Math.floor((currentSlide + 1) * 33)}%</span>
              <span>Available: {currentDeal.stock} left</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DealSlider;
