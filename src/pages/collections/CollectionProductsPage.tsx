import { Link, useParams } from "react-router-dom";
import { useGetCollectionByIdInfoQuery } from "../../apis/collection/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid2, Typography } from "@mui/material";
import CollectionProductCard from "../../components/items/cards/collection_product_card/CollectionProductCard";

const CollectionProductsPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: collectionInfo,
    isError,
    isFetching,
  } = useGetCollectionByIdInfoQuery(id);

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
        Products in Collection {collectionInfo?.name}
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
            Add Products To Collection
          </Button>
        </Link>
      </Box>
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
        {collectionInfo &&
        collectionInfo.products &&
        collectionInfo.products.length > 0 ? (
          collectionInfo.products.map((product, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Box p={1}>
                <CollectionProductCard
                  product={product}
                  collectionId={collectionInfo._id!}
                />
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

export default CollectionProductsPage;
