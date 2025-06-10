import { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import DealOfTheDay from "../components/DealOfTheDay";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import CartSidebar from "../components/CartSidebar";
import ProductCard from "../components/ProductCard"; // Import the ProductCard
import { getProducts } from "../data/products";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API loading delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        const allProducts = getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = () => {
    setIsCartOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative">
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <HeroBanner />

      <div className="container mx-auto px-4 py-8">
        <FeaturedProducts products={products.slice(0, 3)} />

        <div className="my-12">
          <DealOfTheDay product={products.length > 0 ? products[0] : null} />
        </div>

        <div className="my-12 text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Our Products
          </h2>
          <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
            Discover our high-quality selection of products designed to meet
            your needs and exceed your expectations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        <Testimonials />

        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
