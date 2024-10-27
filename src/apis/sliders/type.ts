export type SliderModel = {
  _id?: string;
  images: string[];
  videos?: string[];
  shippingSlider?: string[];
};

export type SliderInputModel = {
  _id?: string;
  images?: string[];
  videos?: string[];
  shippingSlider?: string[];
  removeMainSliderImages: string[];
  removedVideos: string[];
};
