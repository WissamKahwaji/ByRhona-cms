import {
  Box,
  Button,
  Grid2,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import {
  useEditAboutUsInfoMutation,
  useGetAboutUsInfoQuery,
} from "../../apis/about-us/queries";
import { AboutUsContent, AboutUsInfo } from "../../apis/about-us/type";

const AboutUsPage = () => {
  const { data: aboutUsInfo, isLoading, isError } = useGetAboutUsInfoQuery();
  const { mutate: editAboutUsInfo } = useEditAboutUsInfoMutation();

  const theme = useTheme();

  const handleUpdateAboutUsInfo = (
    values: AboutUsInfo,
    { setSubmitting }: FormikHelpers<AboutUsInfo>
  ) => {
    editAboutUsInfo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  if (isError) return <div>Error Fetching data</div>;
  if (isLoading) return <div>Loading...</div>;

  const initialValues: AboutUsInfo = {
    _id: aboutUsInfo?._id ?? "",

    content: aboutUsInfo?.content ?? [],
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
        }}
        color="black"
      >
        About Us
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleUpdateAboutUsInfo}>
        {({
          values,

          setFieldValue,
        }) => (
          <Form>
            <Grid2 container justifyContent="center" spacing={3}>
              <Grid2 size={{ xs: 12, md: 8 }}>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary.main}`,
                    padding: theme.spacing(2),
                    marginTop: theme.spacing(3),
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginBottom: theme.spacing(2),
                    }}
                  >
                    Content
                  </Typography>
                  <FieldArray name="content">
                    {({ push, remove }) => (
                      <>
                        {values.content.map(
                          (contentItem: AboutUsContent, index: number) => (
                            <Box
                              key={index}
                              sx={{ marginBottom: theme.spacing(2) }}
                            >
                              <TextField
                                fullWidth
                                name={`content.${index}.title`}
                                label="Title"
                                value={contentItem.title}
                                onChange={e =>
                                  setFieldValue(
                                    `content.${index}.title`,
                                    e.target.value
                                  )
                                }
                              />
                              <TextField
                                fullWidth
                                multiline
                                name={`content.${index}.text`}
                                label="Description"
                                value={contentItem.text}
                                onChange={e =>
                                  setFieldValue(
                                    `content.${index}.text`,
                                    e.target.value
                                  )
                                }
                                sx={{ marginTop: theme.spacing(2) }}
                              />
                              <TextField
                                fullWidth
                                name={`content.${index}.titleFr`}
                                label="TitleFr"
                                value={contentItem.titleFr}
                                sx={{ marginTop: theme.spacing(2) }}
                                onChange={e =>
                                  setFieldValue(
                                    `content.${index}.titleFr`,
                                    e.target.value
                                  )
                                }
                              />
                              <TextField
                                fullWidth
                                multiline
                                name={`content.${index}.textFr`}
                                label="DescriptionFr"
                                value={contentItem.textFr}
                                onChange={e =>
                                  setFieldValue(
                                    `content.${index}.textFr`,
                                    e.target.value
                                  )
                                }
                                sx={{ marginTop: theme.spacing(2) }}
                              />
                              <TextField
                                fullWidth
                                name={`content.${index}.titleAr`}
                                label="TitleAr"
                                value={contentItem.titleAr}
                                sx={{
                                  marginTop: theme.spacing(2),
                                  direction: "rtl",
                                }}
                                onChange={e =>
                                  setFieldValue(
                                    `content.${index}.titleAr`,
                                    e.target.value
                                  )
                                }
                              />
                              <TextField
                                fullWidth
                                multiline
                                name={`content.${index}.textAr`}
                                label="DescriptionAr"
                                value={contentItem.textAr}
                                onChange={e =>
                                  setFieldValue(
                                    `content.${index}.textAr`,
                                    e.target.value
                                  )
                                }
                                sx={{
                                  marginTop: theme.spacing(2),
                                  direction: "rtl",
                                }}
                              />
                              {/* <input
                                  type="file"
                                  accept="image/*"
                                  onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = event => {
                                        setFieldValue(
                                          `content.${index}.img`,
                                          event.target?.result as string
                                        );
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
  
                                {contentItem.img && (
                                  <img
                                    src={contentItem.img}
                                    alt={`Content ${index + 1}`}
                                    style={{
                                      marginTop: theme.spacing(2),
                                      maxWidth: "100%",
                                    }}
                                  />
                                )} */}
                              <Button
                                variant="contained"
                                onClick={() => remove(index)}
                                sx={{ marginTop: theme.spacing(2) }}
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
                          Add Content
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Box>
              </Grid2>
            </Grid2>
            <Box sx={{ textAlign: "center", marginTop: theme.spacing(3) }}>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AboutUsPage;
