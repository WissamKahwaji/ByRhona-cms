import { Box, Grid2, Stack, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useAddCategoryDataMutation,
  useEditCategoryDataMutation,
  useGetCategoryByIdInfoQuery,
} from "../../apis/categories/queries";
import { CategoryModel } from "../../apis/categories/type";
import { Form, Formik, FormikHelpers } from "formik";
import LoadingButton from "../../components/items/loadingButtons/LoadingButtons";

const AddEditCategoryPage = () => {
  const { id, categoryId } = useParams<{
    id: string | undefined;
    categoryId: string | undefined;
  }>();
  const {
    data: categoryInfo,
    isError,
    isLoading,
  } = useGetCategoryByIdInfoQuery(categoryId);
  const { mutate: addCategory } = useAddCategoryDataMutation();
  const { mutate: editCategory } = useEditCategoryDataMutation();
  const initialValues: CategoryModel = {
    ...(categoryId && { _id: categoryId }),
    name: categoryInfo?.name || "",
    nameAr: categoryInfo?.nameAr || "",
    nameFr: categoryInfo?.nameFr || "",
    department: categoryInfo?.department || id,
  };
  const handleSubmit = async (
    values: CategoryModel,
    { setSubmitting }: FormikHelpers<CategoryModel>
  ) => {
    if (categoryId) {
      editCategory(values, {
        onSettled() {
          setSubmitting(false);
        },
      });
    } else {
      addCategory(values, {
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
        {categoryId ? `edit` : `add Category`}
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
                  label={"category name"}
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
                  label={"category nameFr"}
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
                  label={"category nameAr"}
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

export default AddEditCategoryPage;
