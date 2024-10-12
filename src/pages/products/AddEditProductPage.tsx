import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid2,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useParams } from "react-router-dom";
import { ProductInputProps } from "../../apis/product/type";
import { useGetCategoriesDataInfoQuery } from "../../apis/categories/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { useEffect, useState } from "react";
import LoadingButton from "../../components/items/loadingButtons/LoadingButtons";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetProductByIdInfoQuery,
} from "../../apis/product/queries";

const AddEditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: categories,
    isError,
    isFetching,
  } = useGetCategoriesDataInfoQuery();
  const { data: productInfo } = useGetProductByIdInfoQuery(id);
  const { mutate: addProduct } = useAddProductMutation();
  const { mutate: editProduct } = useEditProductMutation();

  const [selectedCat, setSelectedCat] = useState<string>();

  useEffect(() => {
    if (!id) {
      if (categories) {
        setSelectedCat(categories[0]._id);
      }
    } else {
      setSelectedCat(productInfo?.category._id);
    }
  }, [categories, id, productInfo?.category._id]);

  const initialValues: ProductInputProps = {
    ...(id && { _id: id }),
    title: productInfo?.title || "",
    titleAr: productInfo?.titleAr || "",
    titleFr: productInfo?.titleFr || "",
    desc: productInfo?.desc || "",
    descAr: productInfo?.descAr || "",
    descFr: productInfo?.descFr || "",
    category: productInfo?.category._id || "",
    ...(id && {
      price: {
        priceAED: productInfo?.price.priceAED ?? 0,
        priceUSD: productInfo?.price.priceUSD ?? 0,
      },
    }),
    ...(id && {
      productQuantity: productInfo?.productQuantity,
    }),
    ...(id && {
      isOffer: productInfo?.isOffer,
    }),
    ...(id && {
      priceAfterOffer: {
        priceAED: productInfo?.priceAfterOffer?.priceAED ?? 0,
        priceUSD: productInfo?.priceAfterOffer?.priceUSD ?? 0,
      },
    }),
  };
  const handleSubmit = (
    values: ProductInputProps,
    { setSubmitting }: FormikHelpers<ProductInputProps>
  ) => {
    if (id) {
      editProduct(values, {
        onSettled() {
          setSubmitting(false);
        },
      });
    } else {
      addProduct(values, {
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
        {id ? `edit ${productInfo?.title}` : `add product`}
      </Typography>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          setFieldValue,
        }) => (
          <Form>
            <Grid2 container spacing={2}>
              {!id && (
                <Grid2 size={{ xs: 12, lg: 6 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyItems="center"
                    alignItems="center"
                  >
                    <FormLabel sx={{ fontSize: "14px" }}>
                      Categories :
                    </FormLabel>
                    <Select
                      value={selectedCat}
                      displayEmpty
                      inputProps={{ "aria-label": "Select city" }}
                      onChange={e => {
                        setSelectedCat(e.target.value);
                        setFieldValue("category", e.target.value);
                      }}
                      sx={{ width: "85%", direction: "ltr" }}
                    >
                      {categories?.map((category, index) => (
                        <MenuItem key={index} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid2>
              )}
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="product title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="titleFr"
                  name="titleFr"
                  label="product titleFr"
                  type="text"
                  value={values.titleFr}
                  onChange={handleChange}
                  error={touched.titleFr && Boolean(errors.titleFr)}
                  helperText={touched.titleFr && errors.titleFr}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="titleAr"
                  name="titleAr"
                  label="product titleAr"
                  type="text"
                  value={values.titleAr}
                  onChange={handleChange}
                  error={touched.titleAr && Boolean(errors.titleAr)}
                  helperText={touched.titleAr && errors.titleAr}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="desc"
                  name="desc"
                  label="description"
                  multiline
                  minRows={1}
                  value={values.desc}
                  onChange={handleChange}
                  error={touched.desc && Boolean(errors.desc)}
                  helperText={touched.desc && errors.desc}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="descFr"
                  name="descFr"
                  label="descriptionFr"
                  multiline
                  minRows={1}
                  value={values.descFr}
                  onChange={handleChange}
                  error={touched.descFr && Boolean(errors.descFr)}
                  helperText={touched.descFr && errors.descFr}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="descAr"
                  name="descAr"
                  label="descriptionAr"
                  multiline
                  minRows={1}
                  value={values.descAr}
                  onChange={handleChange}
                  error={touched.descAr && Boolean(errors.descAr)}
                  helperText={touched.descAr && errors.descAr}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="price.priceAED"
                  name="price.priceAED"
                  label="priceAED"
                  type="number"
                  value={values.price?.priceAED}
                  onChange={handleChange}
                  helperText={touched.price && errors.price}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="price.priceUSD"
                  name="price.priceUSD"
                  label="priceUSD"
                  type="number"
                  value={values.price?.priceUSD}
                  onChange={handleChange}
                  helperText={touched.price && errors.price}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="productQuantity"
                  name="productQuantity"
                  label="product Quantity"
                  type="number"
                  value={values.productQuantity}
                  onChange={handleChange}
                  error={
                    touched.productQuantity && Boolean(errors.productQuantity)
                  }
                  helperText={touched.productQuantity && errors.productQuantity}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.isOffer}
                      onChange={e => setFieldValue("isOffer", e.target.checked)}
                      name="isOffer"
                      color="primary"
                    />
                  }
                  label="is this product has offer"
                  sx={{ direction: "ltr" }}
                />
              </Grid2>
              {values.isOffer && values.isOffer == true && (
                <Grid2 size={{ xs: 12, lg: 6 }}>
                  <TextField
                    fullWidth
                    id="priceAfterOffer.priceAED"
                    name="priceAfterOffer.priceAED"
                    label="priceAED after offer"
                    type="number"
                    value={values.priceAfterOffer?.priceAED}
                    onChange={handleChange}
                    helperText={
                      touched.priceAfterOffer && errors.priceAfterOffer
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid2>
              )}
              {values.isOffer && values.isOffer == true && (
                <Grid2 size={{ xs: 12, lg: 6 }}>
                  <TextField
                    fullWidth
                    id="priceAfterOffer.priceUSD"
                    name="priceAfterOffer.priceUSD"
                    label="priceUSD after offer"
                    type="number"
                    value={values.priceAfterOffer?.priceUSD}
                    onChange={handleChange}
                    helperText={
                      touched.priceAfterOffer && errors.priceAfterOffer
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid2>
              )}
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <ImageDragDropField
                  name="img"
                  label="Product Image"
                  oldImg={productInfo?.img}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Button variant="contained" component="label">
                  upload product images
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={event => {
                      if (event.currentTarget.files) {
                        setFieldValue(
                          "imgs",
                          Array.from(event.currentTarget.files)
                        );
                      }
                    }}
                  />
                </Button>
                {values.imgs && values.imgs.length > 0 && (
                  <Typography>{values.imgs.length} images selected</Typography>
                )}
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Button variant="contained" component="label">
                  upload product video
                  <input
                    type="file"
                    accept="video/*"
                    hidden
                    multiple
                    onChange={event => {
                      if (event.currentTarget.files) {
                        setFieldValue(
                          "videos",
                          Array.from(event.currentTarget.files)
                        );
                      }
                    }}
                  />
                </Button>
                {values.videos && values.videos.length > 0 && (
                  <Typography>
                    {values.videos.length} videos selected
                  </Typography>
                )}
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

export default AddEditProductPage;
