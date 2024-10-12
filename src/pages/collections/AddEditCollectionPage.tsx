import { useParams } from "react-router-dom";
import {
  useAddCollectionDataMutation,
  useEditCollectionDataMutation,
  useGetCollectionByIdInfoQuery,
} from "../../apis/collection/queries";
import { CollectionInputModel } from "../../apis/collection/type";
import { Form, Formik, FormikHelpers } from "formik";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Grid2, Stack, TextField, Typography } from "@mui/material";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/loadingButtons/LoadingButtons";

const AddEditCollectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: collectionInfo,
    isError,
    isFetching,
  } = useGetCollectionByIdInfoQuery(id);
  const { mutate: addCollection } = useAddCollectionDataMutation();
  const { mutate: editCollection } = useEditCollectionDataMutation();

  const initialValues: CollectionInputModel = {
    ...(id && { _id: id }),
    name: collectionInfo?.name || "",
    nameAr: collectionInfo?.nameAr || "",
    nameFr: collectionInfo?.nameFr || "",
  };

  const handleSubmit = (
    values: CollectionInputModel,
    { setSubmitting }: FormikHelpers<CollectionInputModel>
  ) => {
    if (id) {
      editCollection(values, {
        onSettled() {
          setSubmitting(false);
        },
      });
    } else {
      addCollection(values, {
        onSettled() {
          setSubmitting(false);
        },
      });
    }
  };

  if (isFetching) return <LoadingPage />;
  if (isError) return <div>Error !!!</div>;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 3,
        }}
      >
        {id ? `edit ${collectionInfo?.name}` : `add collection`}
      </Typography>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => (
          <Form>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="collection name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="nameAr"
                  name="nameAr"
                  label="collection nameAr"
                  type="text"
                  value={values.nameAr}
                  onChange={handleChange}
                  error={touched.nameAr && Boolean(errors.nameAr)}
                  helperText={touched.nameAr && errors.nameAr}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="nameFr"
                  name="nameFr"
                  label="collection nameFr"
                  type="text"
                  value={values.nameFr}
                  onChange={handleChange}
                  error={touched.nameFr && Boolean(errors.nameFr)}
                  helperText={touched.nameFr && errors.nameFr}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <ImageDragDropField
                  name="img"
                  label="Collection Image"
                  oldImg={collectionInfo?.image}
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

export default AddEditCollectionPage;
