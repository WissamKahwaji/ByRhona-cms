import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsInfoQuery } from "../../apis/product/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { useAddProductsToCollectionDataMutation } from "../../apis/collection/queries";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Grid2,
  Typography,
} from "@mui/material";

const AddProductsToCollectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const { data: productsInfo, isError, isFetching } = useGetProductsInfoQuery();
  const { mutate: addProductsToCollection } =
    useAddProductsToCollectionDataMutation();

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prevSelectedProducts =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter(id => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const handleAddToSelectedProducts = () => {
    if (selectedProducts.length > 0) {
      addProductsToCollection({ id: id!, productIds: selectedProducts });
    }
  };

  if (isFetching) return <LoadingPage />;
  if (isError) return <div>Error !!!</div>;

  return (
    <Box sx={{ width: "100%" }}>
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
        Select Ptoducts to add it to the collection
      </Typography>
      {selectedProducts.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToSelectedProducts}
            sx={{
              height: "fit-content",
            }}
          >
            Submit
          </Button>
        </Box>
      )}
      <Grid2
        container
        gap={4}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {productsInfo && productsInfo.length > 0 ? (
          productsInfo.map((product, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Box p={1}>
                <Card
                  sx={{
                    cursor: "pointer",
                    border: theme =>
                      selectedProducts.includes(product._id!)
                        ? `2px solid ${theme.palette.primary.main}`
                        : "1px solid grey",
                    boxShadow: theme =>
                      selectedProducts.includes(product._id!)
                        ? `0 0 10px ${theme.palette.secondary.main} `
                        : "none",
                    transition: "all 0.3s",
                  }}
                  onClick={() => handleSelectProduct(product._id)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.img} // Use product image URL
                    alt={product.title}
                    sx={{ objectFit: "contain" }} // Ensure the image covers the card properly
                  />
                  <CardContent>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h6">
                        {product.title.length > 20 ? (
                          <>
                            {product.title.slice(0, 20)}
                            <Box component={"span"}>...</Box>
                          </>
                        ) : (
                          product.title
                        )}
                      </Typography>
                      <Checkbox
                        checked={selectedProducts.includes(product._id)}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid2>
          ))
        ) : (
          <Typography>There is No Products in This Collection</Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default AddProductsToCollectionPage;
