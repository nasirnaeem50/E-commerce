import React from 'react';
import { 
  Drawer,
  Box,
  Typography,
  IconButton,
  Badge,
  Divider,
  Button,
  useTheme
} from '@mui/material';
import { Favorite, Close, ShoppingCart } from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WishlistSidebar = () => {
  const theme = useTheme();
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen,
    removeFromWishlist
  } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <Drawer
      anchor="right"
      open={isWishlistOpen}
      onClose={() => setIsWishlistOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          p: 2,
          bgcolor: theme.palette.background.paper
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="div">
          <Badge badgeContent={wishlist.length} color="error">
            <Favorite sx={{ mr: 1 }} />
          </Badge>
          My Wishlist
        </Typography>
        <IconButton onClick={() => setIsWishlistOpen(false)}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {wishlist.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Favorite sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="body1" color="text.secondary">
            Your wishlist is empty
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={() => setIsWishlistOpen(false)}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ overflowY: 'auto', maxHeight: '70vh', mb: 2 }}>
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mr: 2
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight="bold">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <IconButton
                      size="small"
                      onClick={() => handleMoveToCart(product)}
                      sx={{ mr: 1 }}
                    >
                      <ShoppingCart fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => removeFromWishlist(product.id)}
                      color="error"
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Divider />
              </motion.div>
            ))}
          </Box>
          <Button
            component={Link}
            to="/wishlist"
            variant="contained"
            fullWidth
            onClick={() => setIsWishlistOpen(false)}
            startIcon={<Favorite />}
          >
            View Full Wishlist
          </Button>
        </>
      )}
    </Drawer>
  );
};

export default WishlistSidebar;