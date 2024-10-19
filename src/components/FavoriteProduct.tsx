import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/ProductSlice";
import { Product } from "../types";

const FavoriteProduct = (product: Product) => {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        cursor: "pointer",
        borderBottom: "1px solid",
        borderColor: "secondary.dark",
      }}
      elevation={0}
    >
      <CardContent sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            bgcolor: "background.paper",
            marginRight: 2,
          }}
        >
          <CardMedia
            component="img"
            alt={product.title}
            height="200"
            image={product.thumbnail}
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              justifySelf: "center",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex">
            <Typography component="div" gutterBottom>
              {product.title}
            </Typography>
          </Box>
          <Box>
            <Button
              id={`add-to-cart-${product.id}`}
              size="small"
              variant="contained"
              onClick={() => dispatch(addToCart(product))}
              startIcon={<ShoppingCartIcon />}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FavoriteProduct;
