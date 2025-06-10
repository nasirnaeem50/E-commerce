import ProductCard from './ProductCard';

const FeaturedProducts = ({ products }) => {
  return (
    <div className="my-12">
      {/* Centered title with description */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Popular Products</h2>
        <p className="text-gray-600 text-lg">Discover our most loved products by customers</p>
      </div>

      {/* Original products grid (unchanged) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;