import {
  useEditLogoDataMutation,
  useGetLogoInfoQuery,
} from "../../apis/logo/queries";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { LogoInputModel } from "../../apis/logo/type";
import { Form, Formik, FormikHelpers } from "formik";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/loadingButtons/LoadingButtons";

const LogoPage = () => {
  const { data: logoInfo, isLoading, isError } = useGetLogoInfoQuery();
  const { mutate: editLogo } = useEditLogoDataMutation();

  const handleSubmit = (
    values: LogoInputModel,
    { setSubmitting }: FormikHelpers<LogoInputModel>
  ) => {
    editLogo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  const initialValues: LogoInputModel = {};

  if (isLoading)
    return <Typography sx={{ color: "black" }}>Loading .......</Typography>;
  if (isError) return <></>;

  return (
    <Box sx={{ width: "100%" }}>
      {" "}
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
        Logo
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <ImageDragDropField
                  name="img"
                  label="Logo Image"
                  oldImg={logoInfo?.image}
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

export default LogoPage;
