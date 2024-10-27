import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Button, Typography } from "@mui/material";
import { useGetSlidersInfo } from "../../apis/sliders/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { useNavigate } from "react-router-dom";

const SlidersPage = () => {
  const { data: sliderInfo, isError, isLoading } = useGetSlidersInfo();
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
            navigate(`${sliderInfo?._id}/edit`);
          }}
        >
          edit the sliders
        </Button>
      </Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        main slider
      </Typography>
      {sliderInfo && sliderInfo.images.length > 0 ? (
        <>
          <Slider {...sliderSettings}>
            {sliderInfo.images.map((image, index) => (
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
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "40px" }}>
        videos slider
      </Typography>
      {sliderInfo && sliderInfo.videos && sliderInfo.videos.length > 0 ? (
        <>
          <Slider {...sliderSettings}>
            {sliderInfo.videos.map((video, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <video
                  className="w-full md:h-[490px]  h-[140px] object-contain"
                  controls
                  autoPlay
                  muted
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            ))}
          </Slider>
        </>
      ) : (
        <></>
      )}
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "40px" }}>
        Shipping Slider
      </Typography>
      {sliderInfo &&
      sliderInfo.shippingSlider &&
      sliderInfo.shippingSlider.length > 0 ? (
        <Box sx={{ marginTop: "40px" }}>
          <Slider {...sliderSettings}>
            {sliderInfo.shippingSlider.map((item, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: "center",
                  backgroundColor: theme => theme.palette.primary.main,
                  paddingY: "10px",
                }}
              >
                <Typography sx={{ textAlign: "center", fontSize: "19px" }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default SlidersPage;
