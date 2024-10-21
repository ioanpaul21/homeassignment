import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Carousel from "react-material-ui-carousel";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorites } from "../redux/slices/ProductSlice";
import { Product } from "../types";
import ReviewCard from "./ReviewCard";

const ProductViewer = ({ ...product }: Product) => {
  const dispatch = useDispatch();
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const reviews =
    product.reviews !== undefined &&
    product.reviews.map((review, index) => (
      <ReviewCard key={index} review={review} />
    ));

  return (
    <Container sx={{ padding: 2 }}>
      <Grid2 container spacing={8}>
        <Grid2 size={8}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor={"background.paper"}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {product.title}
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

          <Box sx={{ position: "relative", marginTop: 2 }}>
            <CardMedia
              component="img"
              height="500"
              image={product.images !== undefined ? product.images[0] : ""}
              alt={product.title}
              sx={{
                width: { xs: 300, sm: 300, md: 300, lg: 300, xl: 500 },
                height: { xs: 300, sm: 300, md: 300, lg: 300, xl: 500 },
                objectFit: "contain",
              }}
            />
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1" sx={{ marginBottom: 4 }}>
              {product.description}
            </Typography>
            <Typography variant="body1">
              Dimensions: H:
              {product.dimensions !== undefined
                ? product.dimensions.height
                : ""}{" "}
              x W:
              {product.dimensions !== undefined
                ? product.dimensions.width
                : ""}{" "}
              x D:
              {product.dimensions !== undefined ? product.dimensions.depth : ""}
            </Typography>
            <Typography variant="body1">Weight: {product.weight} kg</Typography>
          </Box>
        </Grid2>
        <Grid2 size={4}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            height={"100%"}
          >
            <Box>
              <Typography mb={2} variant="h6" sx={{ fontWeight: "semibold" }}>
                What our customers say
              </Typography>
              <Carousel>{reviews}</Carousel>
            </Box>

            <Box display="flex" alignItems="center" alignSelf={"self-end"}>
              <Button
                aria-label="add to cart"
                id={`add-to-cart-${product.id}`}
                size="small"
                variant="contained"
                onClick={() => dispatch(addToCart(product))}
                startIcon={<ShoppingCartIcon />}
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
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ProductViewer;
