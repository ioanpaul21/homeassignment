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

          <Grid2 p={2} size={8}>
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
        </Grid2>
      </Container>
    </>
  );
};

export default Dashboard;
