export type ReviewsModel = {
  _id?: string;
  images: string[];
};

export type ReviewsInputModel = {
  removeImages?: string[];
  images: string[];
};
