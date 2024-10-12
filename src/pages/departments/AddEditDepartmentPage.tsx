import { Box, Grid2, Stack, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { DepartmentModel } from "../../apis/departments/type";
import { Form, Formik, FormikHelpers } from "formik";
import LoadingButton from "../../components/items/loadingButtons/LoadingButtons";
import {
  useAddDepartmentDataMutation,
  useEditDepartmentDataMutation,
  useGetDepartmentByIdInfoQuery,
} from "../../apis/departments/queries";

const AddEditDepartmentPage = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const {
    data: departmentInfo,
    isError,
    isLoading,
  } = useGetDepartmentByIdInfoQuery(id);
  const { mutate: addDepartment } = useAddDepartmentDataMutation();
  const { mutate: editDepartment } = useEditDepartmentDataMutation();
  const initialValues: DepartmentModel = {
    ...(id && { _id: id }),
    name: departmentInfo?.name || "",
    nameAr: departmentInfo?.nameAr || "",
    nameFr: departmentInfo?.nameFr || "",
  };
  const handleSubmit = async (
    values: DepartmentModel,
    { setSubmitting }: FormikHelpers<DepartmentModel>
  ) => {
    if (id) {
      editDepartment(values, {
        onSettled() {
          setSubmitting(false);
        },
      });
    } else {
      addDepartment(values, {
        onSettled() {
          setSubmitting(false);
        },
      });
    }
  };
  if (isError || isLoading) return <></>;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component={"h1"}
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 6,
        }}
      >
        {id ? `edit` : `add Department`}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => (
          <Form>
            <Grid2 container justifyContent={"center"} spacing={3}>
              <Grid2 size={{ xs: 12, md: 5 }}>
                <TextField
                  name="name"
                  fullWidth
                  label={"department name"}
                  error={touched.name && !!errors.name}
                  onChange={handleChange}
                  value={values.name || ""}
                  sx={{ direction: "ltr" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 5 }}>
                <TextField
                  name="nameFr"
                  fullWidth
                  label={"department nameFr"}
                  error={touched.nameFr && !!errors.nameFr}
                  onChange={handleChange}
                  value={values.nameFr || ""}
                  sx={{ direction: "ltr" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 5 }}>
                <TextField
                  name="nameAr"
                  fullWidth
                  label={"department nameAr"}
                  error={touched.nameAr && !!errors.nameAr}
                  onChange={handleChange}
                  value={values.nameAr || ""}
                  sx={{ direction: "rtl" }}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Stack justifyContent={"center"}>
                  <LoadingButton
                    isSubmitting={isSubmitting}
                    buttonText="submit"
                  />
                </Stack>
              </Grid2>
            </Grid2>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditDepartmentPage;
