import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid2,
} from "@mui/material";
import { useGetCategoryWithProductsInfoQuery } from "../../apis/categories/queries";
import LoadingPage from "../loading-page/LoadingPage";
import ProductCard from "../../components/items/cards/product_card/ProductCard";
import { Link } from "react-router-dom";

const ProductListPage = () => {
  const {
    data: productsByCategory,
    isError,
    isFetching,
  } = useGetCategoryWithProductsInfoQuery();

  if (isFetching) return <LoadingPage />;
  if (isError) return <div>Error !!!</div>;

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {/* Header section with button */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Product List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "fit-content",
            textTransform: "capitalize",
          }}
          onClick={() => {
            navigate("add");
          }}
        >
          Add Product
        </Button>
      </Box> */}
      <Typography
        component={"h1"}
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 3,
          color: "black",
        }}
      >
        All Products
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Link to={`add`} reloadDocument>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: "fit-content",
            }}
          >
            Add Product
          </Button>
        </Link>
      </Box>

      {/* Product Grid Section */}
      <Grid2 container spacing={4} sx={{ marginTop: "20px" }}>
        {productsByCategory && productsByCategory.length > 0 ? (
          productsByCategory.map(
            (category, index) =>
              category.products &&
              category.products.length !== 0 && (
                <Box key={index} sx={{ mb: 5, width: "100%" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: "secondary.main",
                      mb: 2,
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Grid2 container spacing={3}>
                    {category.products.map((product, productIndex) => (
                      <Grid2
                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        key={productIndex}
                      >
                        <Card
                          sx={{
                            height: "100%",
                            boxShadow: 3,
                            "&:hover": {
                              boxShadow: 6,
                            },
                          }}
                        >
                          <CardContent>
                            <ProductCard product={product} />
                          </CardContent>
                        </Card>
                      </Grid2>
                    ))}
                  </Grid2>
                </Box>
              )
          )
        ) : (
          <Typography
            component="h5"
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "text.secondary",
              my: 5,
            }}
          >
            There is no product available.
          </Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default ProductListPage;
