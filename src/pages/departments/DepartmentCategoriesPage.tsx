import { Link, useParams } from "react-router-dom";
import { useGetDepartmentByIdInfoQuery } from "../../apis/departments/queries";
import { Box, Button, Grid2, Typography } from "@mui/material";
import CategoryCard from "../../components/items/cards/category_cart";

const DepartmentCategoriesPage = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const {
    data: departmentInfo,
    isError,
    isLoading,
  } = useGetDepartmentByIdInfoQuery(id);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching department info</div>;

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
        All Categories in {departmentInfo?.name}
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
            Add Category
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
        {departmentInfo &&
          departmentInfo.categories &&
          departmentInfo.categories.map((category, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Box p={1}>
                <CategoryCard category={category} />
              </Box>
            </Grid2>
          ))}
      </Grid2>
    </Box>
  );
};

export default DepartmentCategoriesPage;
