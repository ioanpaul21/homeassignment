import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../types";

const CartProduct = (product: Product) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        borderBottom: "1px solid #f0f0f0",
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
            title={product.title}
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
          <Box display="flex">
            <Typography component="div" gutterBottom>
              Quantity: {product.quantity}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartProduct;
