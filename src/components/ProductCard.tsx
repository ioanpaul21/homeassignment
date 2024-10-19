import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addToCart,
  addToFavorites,
  selectProduct,
} from "../redux/slices/ProductSlice";
import { Product } from "../types";
const ProductCard = (product: Product) => {
  const dispatch = useDispatch();
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <Card
      sx={{ cursor: "pointer" }}
      elevation={10}
      onClick={() => dispatch(selectProduct(product.id))}
    >
      <CardContent sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            bgcolor: "background.paper",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            alt={product.title}
            height="200"
            image={product.thumbnail}
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              justifySelf: "center",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Typography variant="h6" component="div" fontWeight={"semibold"}>
              {product.title.length > 30
                ? `${product.title.slice(0, 30)}...`
                : product.title}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" color="primary" marginRight={1}>
                ${discountedPrice}
              </Typography>
              <Chip
                label={`-${product.discountPercentage}%`}
                color="warning"
                size="small"
                variant="filled"
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" width={"70%"}>
            <Typography
              variant="body2"
              color="textSecondary"
              fontWeight={"semibold"}
            >
              {product.description.slice(0, 80)}...
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap={"wrap"}
            mb={1}
          >
            <Box display="flex" alignItems="center">
              <Rating
                name="product-rating"
                value={product.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {product.rating} ({product.reviews.length})
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Button
                aria-label="add to cart"
                id={`add-to-cart-${product.id}`}
                size="small"
                variant="contained"
                onClick={() => dispatch(addToCart(product))}
                startIcon={<ShoppingCartIcon />}
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Add to cart
              </Button>
              <IconButton
                aria-label="add to favorite"
                color="inherit"
                onClick={() => dispatch(addToFavorites(product))}
              >
                <FavoriteBorderOutlinedIcon fontSize="medium" color="primary" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
