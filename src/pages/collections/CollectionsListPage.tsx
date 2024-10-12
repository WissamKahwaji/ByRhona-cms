import { Box, Button, Grid2, Typography } from "@mui/material";
import { useGetCollectionsDataInfoQuery } from "../../apis/collection/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { Link } from "react-router-dom";
import CollectionCard from "../../components/items/cards/collection_card";

const CollectionsListPage = () => {
  const {
    data: collectionsInfo,
    isError,
    isFetching,
  } = useGetCollectionsDataInfoQuery();

  if (isFetching) return <LoadingPage />;
  if (isError) return <div>Error !!!</div>;

  return (
    <Box sx={{ width: "100%", p: 3 }}>
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
        All Collections
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
            Add Collection
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
        {collectionsInfo &&
          collectionsInfo.map((collection, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Box p={1}>
                <CollectionCard collection={collection} />
              </Box>
            </Grid2>
          ))}
      </Grid2>
    </Box>
  );
};

export default CollectionsListPage;
