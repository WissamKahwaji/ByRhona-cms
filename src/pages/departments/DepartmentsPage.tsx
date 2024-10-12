import { Box, Button, Grid2, Typography } from "@mui/material";
import { useGetDepartmentsInfoQuery } from "../../apis/departments/queries";
import DepartmentCard from "../../components/items/cards/department_card";
import { Link } from "react-router-dom";

const DepartmentsPage = () => {
  const {
    data: departmentsInfo,
    isError,
    isLoading,
  } = useGetDepartmentsInfoQuery();
  if (isLoading)
    return <Typography sx={{ color: "black" }}>Loading .......</Typography>;
  if (isError) return <></>;
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
        all departments
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
            Add Department
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
        {departmentsInfo &&
          departmentsInfo.map((department, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Box p={1}>
                <DepartmentCard department={department} />
              </Box>
            </Grid2>
          ))}
      </Grid2>
    </Box>
  );
};

export default DepartmentsPage;
