import {
  useEditDeliveryFeeDataMutation,
  useGetDeliveryFeeInfoQuery,
} from "../../apis/delivery_fee/queries";
import { Box, Grid2, Stack, TextField, Typography } from "@mui/material";
import { DeliveryFeeModel } from "../../apis/delivery_fee/type";
import { Form, Formik, FormikHelpers } from "formik";
import LoadingButton from "../../components/items/loadingButtons/LoadingButtons";

const DeliveryFeePage = () => {
  const { data: feeInfo, isLoading, isError } = useGetDeliveryFeeInfoQuery();
  const { mutate: editFeeInfo } = useEditDeliveryFeeDataMutation();
  if (isLoading)
    return <Typography sx={{ color: "black" }}>Loading .......</Typography>;
  if (isError) return <></>;

  const handleUpdateFeeInfo = (
    values: DeliveryFeeModel,
    { setSubmitting }: FormikHelpers<DeliveryFeeModel>
  ) => {
    editFeeInfo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  const initialValues: DeliveryFeeModel = {
    _id: feeInfo?._id || "",
    insideUae: feeInfo?.insideUae || 0,
    outsideUae: feeInfo?.outsideUae || 0,
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
        delivery fee
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleUpdateFeeInfo}
      >
        {({ values, handleChange, touched, errors, isSubmitting }) => (
          <Form>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="insideUae"
                  name="insideUae"
                  label="Fees inside Uae in AED"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={values.insideUae}
                  onChange={handleChange}
                  error={touched.insideUae && Boolean(errors.insideUae)}
                  helperText={touched.insideUae && errors.insideUae}
                  sx={{ mb: 2 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  fullWidth
                  id="outsideUae"
                  name="outsideUae"
                  label="Fees outside Uae in AED"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={values.outsideUae}
                  onChange={handleChange}
                  error={touched.outsideUae && Boolean(errors.outsideUae)}
                  helperText={touched.outsideUae && errors.outsideUae}
                  sx={{ mb: 2 }}
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

export default DeliveryFeePage;
