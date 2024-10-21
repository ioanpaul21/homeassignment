import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useSelector } from "react-redux";
import ProductViewer from "../components/ProductViewer";
import ProductsList from "../components/ProductsList";
import { RootState } from "../index";
import { Product } from "../types";

const Dashboard = () => {
  let selectedProduct: Product = useSelector(
    (state: RootState) => state.selectedProduct
  );
  return (
    <>
      <Container
        fixed={true}
        sx={{
          height: "90vh",
          overflowY: "hidden",
          minWidth: "100%",
        }}
      >
        <Grid2
          container
          spacing={2}
          sx={{
            height: "100%",
            paddingBottom: 4,
          }}
        >
          <Grid2
            display={{
              xs: "none",
              sm: "none",
              md: "none",
              lg: "grid",
              xl: "grid",
            }}
            // display={"none"}
            size={4}
            sx={{
              height: "100%",
            }}
          >
            <Box
              sx={{
                height: "100%",
                padding: 2,
                overflowY: "scroll",
              }}
            >
              <ProductsList />
            </Box>
          </Grid2>

          <Grid2 p={2} size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
            <Box
              bgcolor={"background.paper"}
              sx={{
                padding: 2,
                height: "100%",
                width: "100%",
              }}
            >
              {<ProductViewer {...selectedProduct} />}
            </Box>
          </Grid2>
          <Grid2
            display={{
              xs: "grid",
              sm: "grid",
              md: "grid",
              lg: "none",
              xl: "none",
            }}
            size={{ xs: 8, sm: 8, md: 8, lg: 8, xl: 4 }}
            sx={{
              height: "40%",
            }}
          >
            <Box
              sx={{
                height: "100%",
                padding: 2,
                overflowY: "scroll",
              }}
            >
              <ProductsList />
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default Dashboard;
