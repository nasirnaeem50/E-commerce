import React from 'react';
import { 
  Container,
  Typography,
  Grid,
  IconButton,
  Box,
  Button
} from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from "../components/ProductCard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success(`${product.name} moved to cart!`, { autoClose: 2000 });
  };

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    toast.info(`${productName} removed from wishlist`, { autoClose: 2000 });
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.info('Wishlist cleared', { autoClose: 2000 });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Your Wishlist
        </Typography>
        {wishlist.length > 0 && (
          <Button 
            variant="outlined" 
            color="error"
            onClick={handleClearWishlist}
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Clear All Items
          </Button>
        )}
      </Box>

      {wishlist.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Favorite sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You haven't added any products to your wishlist yet
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            href="/products"
            size="large"
            onClick={() => toast.info('Browsing products', { autoClose: 2000 })}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {wishlist.map(product => (
            <Grid item key={product.id} xs={6} sm={4} md={3} lg={2}>
              <Box position="relative" sx={{ height: '100%' }}>
                <ProductCard 
                  product={product}
                  wishlistView={true}
                />
                <Box
                  position="absolute"
                  top={8}
                  right={8}
                  display="flex"
                  gap={0.5}
                  zIndex={1}
                >
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                    sx={{ 
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': { 
                        bgcolor: 'background.paper',
                        color: 'error.dark'
                      }
                    }}
                  >
                    <Favorite fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleAddToCart(product)}
                    sx={{ 
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': { 
                        bgcolor: 'background.paper',
                        color: 'primary.dark'
                      }
                    }}
                  >
                    <ShoppingCart fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WishlistPage;