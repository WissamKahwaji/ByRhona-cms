import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { ReviewsInputModel, ReviewsModel } from "./type";

const getReviewsInfo = async () => {
  const res = await publicInstance.get<ReviewsModel>(API_ROUTES.REVIEWS.GET);
  return res.data;
};

const editReviewsInfo = async (payload: ReviewsInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(API_ROUTES.REVIEWS.EDIT_REVIEWS, data);
  return res.data;
};

export { getReviewsInfo, editReviewsInfo };
