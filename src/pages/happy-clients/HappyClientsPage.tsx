import { useNavigate } from "react-router-dom";
import { useGetReviewsInfo } from "../../apis/clients-reviews/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HappyClientsPage = () => {
  const { data: reviewsInfo, isError, isLoading } = useGetReviewsInfo();
  const navigate = useNavigate();

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "fit-content",
          }}
          onClick={() => {
            navigate(`edit`);
          }}
        >
          edit the sliders
        </Button>
      </Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        Happy Clients
      </Typography>
      <span
        style={{ fontSize: "12px" }}
      >{`(size should be "W: 1400px * H: 400px")`}</span>
      {reviewsInfo && reviewsInfo.images.length > 0 ? (
        <>
          <Slider {...sliderSettings}>
            {reviewsInfo.images.map((image, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <img
                  src={image}
                  alt={`Slider Image ${index}`}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                  }}
                  crossOrigin="anonymous"
                />
              </Box>
            ))}
          </Slider>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default HappyClientsPage;
