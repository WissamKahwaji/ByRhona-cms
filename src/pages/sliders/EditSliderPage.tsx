/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useEditSlidersInfoMutation,
  useGetSlidersInfo,
} from "../../apis/sliders/queries";
import { SliderInputModel } from "../../apis/sliders/type";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import LoadingPage from "../loading-page/LoadingPage";
import {
  Box,
  Button,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "../../components/items/loadingButtons/LoadingButtons";

const EditSliderPage = () => {
  const { sliderId } = useParams<{ sliderId: string }>();
  const { data: sliderInfo, isError, isLoading } = useGetSlidersInfo();
  const { mutate: editSliderInfo } = useEditSlidersInfoMutation();
  const [croppedImages, setCroppedImages] = useState<File[]>([]);

  const initialValues: SliderInputModel = {
    ...(sliderId && { _id: sliderId }),
    removeMainSliderImages: [],
    removedVideos: [],
    images: sliderInfo?.images || [],
    videos: sliderInfo?.videos || [],
    shippingSlider: sliderInfo?.shippingSlider || [],
  };
  const handleSubmit = (
    values: SliderInputModel,
    { setSubmitting }: FormikHelpers<SliderInputModel>
  ) => {
    editSliderInfo(values, {
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

      setFieldValue("mainSliderImg", [...croppedImages, ...filesArray]);

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
        edit sliders
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <FieldArray name="images">
              {({ push, remove }) => (
                <>
                  <Typography variant="h6">
                    main slider
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
                                setFieldValue("removeMainSliderImages", [
                                  ...values.removeMainSliderImages,
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
                        add main slider images
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
            <FieldArray name="videos">
              {({ push, remove }) => (
                <>
                  <Typography variant="h6">
                    video slider
                    <span
                      style={{ fontSize: "12px" }}
                    >{`(size should be "W: 1400px * H: 400px")`}</span>
                  </Typography>
                  <Grid2 container spacing={2}>
                    {values.videos &&
                      values.videos.map((video, index) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                          <Box sx={{ position: "relative" }}>
                            <video
                              style={{ width: "100%", height: "490px" }}
                              controls
                              autoPlay
                              muted
                            >
                              <source
                                src={
                                  typeof video === "string"
                                    ? video
                                    : URL.createObjectURL(video)
                                }
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                remove(index);
                                setFieldValue("removedVideos", [
                                  ...values.removedVideos,
                                  video,
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
                        add slider videos
                        <input
                          type="file"
                          accept="video/mp4"
                          className="absolute w-full h-full opacity-0 cursor-pointer"
                          multiple
                          hidden
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            // handleChoosenVideos(event, setFieldValue, push);
                            if (event.target.files) {
                              const filesArray = Array.from(event.target.files);

                              filesArray.forEach(file => push(file));

                              setFieldValue("videos", [
                                ...values.videos!,
                                ...filesArray,
                              ]);
                            }
                          }}
                        />
                      </Button>
                    </Grid2>
                  </Grid2>
                </>
              )}
            </FieldArray>
            <FieldArray name="shippingSlider">
              {({ push, remove }) => (
                <>
                  {values.shippingSlider &&
                    values.shippingSlider.map(
                      (sliderItem: string, index: number) => (
                        <Box key={index} sx={{ marginBottom: "10px" }}>
                          <TextField
                            fullWidth
                            name={`shippingSlider.${index}`}
                            label="Title"
                            value={sliderItem}
                            sx={{ marginTop: "30px" }}
                            onChange={e =>
                              setFieldValue(
                                `shippingSlider.${index}`,
                                e.target.value
                              )
                            }
                          />

                          <Button
                            variant="contained"
                            onClick={() => remove(index)}
                            sx={{ marginTop: "10px" }}
                          >
                            Remove
                          </Button>
                        </Box>
                      )
                    )}
                  <Button
                    variant="contained"
                    onClick={() => push({ title: "", description: "" })}
                  >
                    Add
                  </Button>
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

export default EditSliderPage;
