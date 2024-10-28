/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { Box, Stack, TextField, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Form, Formik, FormikHelpers } from "formik";
import { ContactUsInfo } from "../../apis/contacts/type";
import {
  useEditContactUsInfoMutation,
  useGetContactUsInfo,
} from "../../apis/contacts/queries";
import LoadingButton from "../../components/items/loadingButtons/LoadingButtons";

const ContactUs = () => {
  const theme = useTheme();
  const { data: contactInfo, isLoading, isError } = useGetContactUsInfo();
  const { mutate: editContactUsInfo } = useEditContactUsInfoMutation();
  if (isLoading)
    return <Typography sx={{ color: "black" }}>Loading .......</Typography>;
  if (isError) return <></>;
  const handleUpdateContactInfo = (
    values: ContactUsInfo,
    { setSubmitting }: FormikHelpers<ContactUsInfo>
  ) => {
    editContactUsInfo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

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
        contact us
      </Typography>
      <Formik
        initialValues={{
          _id: contactInfo?._id!,
          title: contactInfo?.title!,
          content: contactInfo?.content!,
        }}
        onSubmit={handleUpdateContactInfo}
      >
        {({ values, handleChange, touched, errors, isSubmitting }) => (
          <Form>
            <Grid container justifyContent={"center"} gap={6}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Stack gap={3}>
                  <TextField
                    name="title"
                    fullWidth
                    label={"title"}
                    value={values.title}
                    onChange={handleChange}
                    error={touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                  />
                  <TextField
                    name="content.email"
                    fullWidth
                    label={"email"}
                    value={values.content?.email}
                    onChange={handleChange}
                    error={touched.content?.email && !!errors.content?.email}
                    helperText={touched.content?.email && errors.content?.email}
                  />
                  <TextField
                    name="content.phoneNumber"
                    fullWidth
                    label={"phone number"}
                    value={values.content.phoneNumber}
                    onChange={handleChange}
                    error={
                      touched.content?.phoneNumber &&
                      !!errors.content?.phoneNumber
                    }
                    helperText={
                      touched.content?.phoneNumber &&
                      errors.content?.phoneNumber
                    }
                  />{" "}
                  <TextField
                    name="content.mobileOne"
                    fullWidth
                    label={"another phone number"}
                    value={values.content.mobileOne}
                    onChange={handleChange}
                    error={
                      touched.content?.mobileOne && !!errors.content?.mobileOne
                    }
                    helperText={
                      touched.content?.mobileOne && errors.content?.mobileOne
                    }
                  />{" "}
                  <TextField
                    name="content.location"
                    fullWidth
                    label={"location"}
                    value={values.content.location}
                    onChange={handleChange}
                    error={
                      touched.content?.location && !!errors.content?.location
                    }
                    helperText={
                      touched.content?.location && errors.content?.location
                    }
                  />{" "}
                  <TextField
                    name="content.whatsApp"
                    fullWidth
                    label={"whatsApp"}
                    value={values.content?.whatsApp}
                    onChange={handleChange}
                    error={
                      touched.content?.whatsApp && !!errors.content?.whatsApp
                    }
                    helperText={
                      touched.content?.whatsApp && errors.content?.whatsApp
                    }
                  />
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Stack gap={3}>
                  <TextField
                    name="content.faceBook"
                    fullWidth
                    label={"faceBook"}
                    value={values.content?.faceBook}
                    onChange={handleChange}
                    error={
                      touched.content?.faceBook && !!errors.content?.faceBook
                    }
                    helperText={
                      touched.content?.faceBook && errors.content?.faceBook
                    }
                  />{" "}
                  <TextField
                    name="content.instagram"
                    fullWidth
                    label={"instagram"}
                    value={values.content?.instagram}
                    onChange={handleChange}
                    error={
                      touched.content?.instagram && !!errors.content?.instagram
                    }
                    helperText={
                      touched.content?.instagram && errors.content?.instagram
                    }
                  />{" "}
                  <TextField
                    name="content.instagram"
                    fullWidth
                    label={"instagram"}
                    value={values.content?.instagram}
                    onChange={handleChange}
                    error={
                      touched.content?.instagram && !!errors.content?.instagram
                    }
                    helperText={
                      touched.content?.instagram && errors.content?.instagram
                    }
                  />{" "}
                  <TextField
                    name="content.tiktok"
                    fullWidth
                    label={"tiktok"}
                    value={values.content?.tiktok}
                    onChange={handleChange}
                    error={touched.content?.tiktok && !!errors.content?.tiktok}
                    helperText={
                      touched.content?.tiktok && errors.content?.tiktok
                    }
                  />{" "}
                  <TextField
                    name="content.snapChat"
                    fullWidth
                    label={"snapChat"}
                    value={values.content?.snapChat}
                    onChange={handleChange}
                    error={
                      touched.content?.snapChat && !!errors.content?.snapChat
                    }
                    helperText={
                      touched.content?.snapChat && errors.content?.snapChat
                    }
                  />{" "}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack justifyContent={"center"}>
                  <LoadingButton
                    isSubmitting={isSubmitting}
                    buttonText={"submit"}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.text.primary,
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContactUs;
