/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useEditReviewsInfoMutation,
  useGetReviewsInfo,
} from "../../apis/clients-reviews/queries";
import { ReviewsInputModel } from "../../apis/clients-reviews/type";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import LoadingButton from "../../components/items/loadingButtons/LoadingButtons";

const EditHappyClientsPage = () => {
  const { data: reviewsInfo, isError, isLoading } = useGetReviewsInfo();
  const { mutate: editReviewInfo } = useEditReviewsInfoMutation();
  const [croppedImages, setCroppedImages] = useState<File[]>([]);

  const initialValues: ReviewsInputModel = {
    images: reviewsInfo?.images || [],
    removeImages: [],
  };
  const handleSubmit = (
    values: ReviewsInputModel,
    { setSubmitting }: FormikHelpers<ReviewsInputModel>
  ) => {
    editReviewInfo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  const handleChoosenMainImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    push: any
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(0, 9);

      setFieldValue("imgs", [...croppedImages, ...filesArray]);

      const fileArray = Array.from([...filesArray]).map(file =>
        URL.createObjectURL(file)
      );
      fileArray.forEach(url => push(url));
      setCroppedImages([...croppedImages, ...filesArray]);
    }
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        edit images
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <FieldArray name="images">
              {({ push, remove }) => (
                <>
                  <Typography variant="h6">
                    Happy Clients
                    <span
                      style={{ fontSize: "12px" }}
                    >{`(size should be "W: 1400px * H: 400px")`}</span>
                  </Typography>
                  <Grid2 container spacing={2}>
                    {values.images &&
                      values.images.map((image, index) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                          <Box sx={{ position: "relative" }}>
                            <img
                              src={image}
                              alt={`Main Slider ${index}`}
                              style={{ width: "100%", height: "auto" }}
                              crossOrigin="anonymous"
                            />
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                remove(index);
                                setFieldValue("removeImages", [
                                  ...values.removeImages!,
                                  image,
                                ]);
                              }}
                            >
                              remove
                            </Button>
                          </Box>
                        </Grid2>
                      ))}
                    <Grid2 size={{ xs: 12 }}>
                      <Button variant="contained" component="label">
                        add Clients Image Reviews
                        <input
                          type="file"
                          accept="image/png, image/jpeg image/jpg"
                          className="absolute w-full h-full opacity-0 cursor-pointer"
                          multiple
                          hidden
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleChoosenMainImages(event, setFieldValue, push);
                          }}
                        />
                      </Button>
                    </Grid2>
                  </Grid2>
                </>
              )}
            </FieldArray>
            <Grid2 size={{ xs: 12 }}>
              <Stack justifyContent={"center"}>
                <LoadingButton
                  isSubmitting={isSubmitting}
                  buttonText="submit"
                />
              </Stack>
            </Grid2>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditHappyClientsPage;
