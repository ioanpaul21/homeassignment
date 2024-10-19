import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Search from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "..";
import { filterProducts } from "../redux/slices/ProductSlice";
import { Product } from "../types";
import CartProduct from "./CartProduct";
import FavoriteProduct from "./FavoriteProduct";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterProducts(event.target.value));
  };
  const [cartAnchorEl, setCartAnchorEl] = useState<any>(null);
  const [favAnchorEl, setFavAnchorEl] = useState<any>(null);

  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    setCartAnchorEl(event.currentTarget); // Set anchor to the button element
  };
  const handleFavClick = (event: React.MouseEvent<HTMLElement>) => {
    setFavAnchorEl(event.currentTarget); // Set anchor to the button element
  };

  const handleClose = () => {
    setCartAnchorEl(null);
    setFavAnchorEl(null);
  };

  const cartOpen = Boolean(cartAnchorEl);
  const favOpen = Boolean(favAnchorEl);
  const cartId = cartOpen ? "cart-popover" : undefined;
  const favoriteId = favOpen ? "favorite-popover" : undefined;

  const cartProducts = useSelector((state: any) => state.cartProducts);
  const favoriteProducts = useSelector((state: any) => state.favoritesProducts);
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <img src="./logo.png" className="logo" alt="site-logo"></img>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl sx={{ m: 1, width: "55ch" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-search">
                Search for products
              </InputLabel>
              <FilledInput
                aria-label="search for products"
                fullWidth={true}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                }}
                id="filled-adornment-search"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(event)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box>
            <IconButton
              aria-label="cart button"
              color="inherit"
              size="large"
              onClick={handleCartClick}
            >
              <Badge
                badgeContent={cartProducts.reduce(
                  (total: number, product: Product) => {
                    return total + product.quantity;
                  },
                  0
                )}
                color="warning"
              >
                <ShoppingCartIcon fontSize="large" color="primary" />
              </Badge>
            </IconButton>
            <Popover
              id={cartId}
              open={cartOpen}
              anchorEl={cartAnchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {cartProducts.length ? (
                <Box minWidth={300}>
                  {cartProducts.map((product: Product) => (
                    <CartProduct key={product.id} {...product} />
                  ))}
                </Box>
              ) : (
                <Box p={2}>
                  <Typography>Your Cart is empty</Typography>
                </Box>
              )}
            </Popover>
            <IconButton
              aria-label="favorite button"
              color="inherit"
              onClick={handleFavClick}
            >
              <Badge badgeContent={favoriteProducts.length} color="warning">
                <FavoriteBorderOutlinedIcon fontSize="large" color="primary" />
              </Badge>
            </IconButton>
            <Popover
              id={favoriteId}
              open={favOpen}
              anchorEl={favAnchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {favoriteProducts.length ? (
                <Box minWidth={300}>
                  {favoriteProducts.map((product: Product) => (
                    <FavoriteProduct key={product.id} {...product} />
                  ))}
                </Box>
              ) : (
                <Box p={2}>
                  <Typography>Your Favorite List is empty</Typography>
                </Box>
              )}
            </Popover>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
