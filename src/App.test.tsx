import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductsList from "./components/ProductsList";
import { RootState } from "./index";
import { Product } from "./types";
const mockStore = configureStore([]);
const initialState = {
  products: [],
  totalProducts: 0,
  selectedProduct: {},
  cartProducts: [],
  favoritesProducts: [],
  filteredProducts: [],
  error: undefined,
  status: "idle",
};

describe("ProductsList", () => {
  it("renders loading state", () => {
    const store = mockStore({
      ...initialState,
      status: "loading",
    });

    render(
      <Provider store={store}>
        <ProductsList />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders products when succeeded", () => {
    const store = mockStore({
      ...initialState,
      status: "succeeded",
      filteredProducts: [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ],
    });

    render(
      <Provider store={store}>
        <ProductsList />
      </Provider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("renders error message when failed", () => {
    const store = mockStore({
      ...initialState,
      status: "failed",
      error: "Failed to fetch products",
    });

    render(
      <Provider store={store}>
        <ProductsList />
      </Provider>
    );

    expect(screen.getByText("Failed to fetch products")).toBeInTheDocument();
  });
});
