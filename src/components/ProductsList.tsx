import { Stack } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../index";
import { fetchProducts } from "../redux/slices/ProductSlice";
import { Product } from "../types";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products: Product[] = useSelector(
    (state: RootState) => state.filteredProducts
  );
  const error = useSelector((state: RootState) => state.error);
  const status = useSelector((state: RootState) => state.status);
  const totalProducts = useSelector((state: RootState) => state.totalProducts);
  const [page, setPage] = useState<number>(0);
  const [limit] = useState<number>(20);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: any) => {
      if (status === "loading") return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [status]
  );

  useEffect(() => {
    if (page * limit <= totalProducts) dispatch(fetchProducts({ page, limit }));
  }, [page]);

  let content;
  if (status === "loading" && page === 0) {
    content = <div>Loading...</div>;
  } else if (status === "succeeded" || (status === "loading" && page > 0)) {
    content = (
      <Stack spacing={2}>
        {products.map((product: Product, index) => (
          <div ref={products.length === index + 1 ? lastPostElementRef : null}>
            <ProductCard key={product.id} {...product} />
          </div>
        ))}
      </Stack>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};

export default ProductsList;
