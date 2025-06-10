import React, { useState } from 'react';
import { 
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  IconButton,
  useTheme,
  Skeleton
} from '@mui/material';
import { ShoppingCart, FlashOn, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, onAddToCart, wishlistView = false }) => {
  const { addToCart } = useCart();
  const { 
    wishlist, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist 
  } = useWishlist();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const theme = useTheme();

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price.toFixed(2);
    return (price - (price * (discount / 100))).toFixed(2);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    if (onAddToCart) {
      onAddToCart();
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product);
    navigate('/checkout');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: wishlistView ? 1 : 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          position: 'relative',
          maxWidth: wishlistView ? 180 : 'none',
          margin: wishlistView ? '0 auto' : 'none',
          '&:hover': {
            boxShadow: wishlistView ? 'none' : theme.shadows[6],
            borderColor: wishlistView ? 'divider' : 'transparent'
          }
        }}
      >
        {!wishlistView && (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isAnimating ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2
            }}
          >
            <IconButton
              aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleWishlistToggle}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[2],
                '&:hover': {
                  bgcolor: 'background.paper',
                  color: 'error.main'
                },
                color: isInWishlist(product.id) ? 'error.main' : 'text.secondary'
              }}
            >
              {isInWishlist(product.id) ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </motion.div>
        )}

        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
          <Box sx={{ 
            position: 'relative', 
            aspectRatio: '1 / 1', 
            bgcolor: 'background.default', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: wishlistView ? 1 : 2
          }}>
            {!imageLoaded && (
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height="100%" 
                animation="wave" 
              />
            )}
            
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
              }}
              sx={{ 
                width: 'auto',
                maxWidth: '100%',
                height: 'auto',
                maxHeight: wishlistView ? 120 : '100%',
                objectFit: 'contain',
                display: imageLoaded ? 'block' : 'none',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: wishlistView ? 'none' : 'scale(1.05)'
                }
              }}
            />
            
            {product.stock <= 0 && (
              <Box sx={{
                position: 'absolute',
                inset: 0,
                bgcolor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Chip 
                  label="Out of Stock" 
                  color="error" 
                  size="small" 
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            )}
            
            {product.onSale && product.discount > 0 && (
              <Chip
                label={`${product.discount}% OFF`}
                color="error"
                size="small"
                sx={{ 
                  position: 'absolute', 
                  top: 12, 
                  left: 12,
                  fontWeight: 600
                }}
              />
            )}
          </Box>
          
          <CardContent sx={{ 
            p: wishlistView ? 1 : 2, 
            pt: wishlistView ? 0.5 : 1.5,
            flexGrow: 1
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              mb: wishlistView ? 0.5 : 1 
            }}>
              <Typography 
                variant={wishlistView ? "body2" : "subtitle1"} 
                component="h3"
                sx={{ 
                  fontWeight: 600,
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  pr: 1
                }}
              >
                {product.name}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {product.onSale && product.discount > 0 ? (
                  <>
                    <Typography variant="body2" sx={{ 
                      textDecoration: 'line-through', 
                      color: 'text.secondary',
                      fontSize: wishlistView ? '0.75rem' : '0.875rem'
                    }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant={wishlistView ? "body2" : "subtitle1"} color="error" sx={{ fontWeight: 700 }}>
                      ${calculateDiscountedPrice(product.price, product.discount)}
                    </Typography>
                  </>
                ) : (
                  <Typography variant={wishlistView ? "body2" : "subtitle1"} color="text.primary" sx={{ fontWeight: 700 }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                )}
              </Box>
            </Box>
            
            <Box sx={{ 
              display: wishlistView ? 'none' : 'flex', 
              alignItems: 'center', 
              mb: wishlistView ? 0 : 1.5 
            }}>
              <Rating 
                value={product.rating} 
                precision={0.5} 
                readOnly 
                size="small" 
                sx={{ color: 'warning.main', mr: 0.5 }}
              />
              <Typography variant="caption" color="text.secondary">
                ({product.reviews || 0} reviews)
              </Typography>
            </Box>
            
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: wishlistView ? 'none' : ['-webkit-box', '-moz-box'],
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                MozBoxOrient: 'vertical',
                overflow: 'hidden',
                fontSize: wishlistView ? '0.75rem' : '0.875rem',
                lineHeight: 1.5
              }}
            >
              {product.description}
            </Typography>
          </CardContent>
        </Link>
        
        <CardActions sx={{ 
          p: wishlistView ? '8px !important' : 2, 
          pt: wishlistView ? 0 : 0 
        }}>
          {product.stock > 0 ? (
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              width: '100%',
              flexDirection: wishlistView ? 'column' : 'row'
            }}>
              <Button
                component={motion.button}
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                variant="contained"
                color="primary"
                fullWidth
                size={wishlistView ? "small" : "medium"}
                startIcon={<FlashOn />}
                sx={{
                  fontWeight: 600,
                  py: wishlistView ? 0.5 : 1,
                  fontSize: wishlistView ? '0.75rem' : 'inherit',
                  minWidth: 0, // Added to prevent button expansion
                  whiteSpace: 'nowrap', // Added to prevent text wrapping
                  '&:hover': {
                    boxShadow: 'none'
                  }
                }}
              >
                Buy Now
              </Button>
              <Button
                component={motion.button}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                variant="outlined"
                color="primary"
                fullWidth
                size={wishlistView ? "small" : "medium"}
                startIcon={<ShoppingCart />}
                sx={{
                  fontWeight: 600,
                  py: wishlistView ? 0.5 : 1,
                  fontSize: wishlistView ? '0.75rem' : 'inherit',
                  minWidth: 0, // Added to prevent button expansion
                  whiteSpace: 'nowrap' // Added to prevent text wrapping
                }}
              >
                Add to Cart
              </Button>
            </Box>
          ) : (
            <Button
              disabled
              fullWidth
              size={wishlistView ? "small" : "medium"}
              variant="outlined"
              sx={{ 
                fontWeight: 600,
                color: 'text.disabled',
                borderColor: 'divider',
                fontSize: wishlistView ? '0.75rem' : 'inherit',
                minWidth: 0, // Added to prevent button expansion
                whiteSpace: 'nowrap' // Added to prevent text wrapping
              }}
            >
              Out of Stock
            </Button>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default ProductCard;