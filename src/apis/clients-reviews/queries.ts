import { useMutation, useQuery } from "@tanstack/react-query";
import { editReviewsInfo, getReviewsInfo } from ".";
import { useNavigate } from "react-router-dom";
import { ReviewsInputModel } from "./type";
import { toast } from "react-toastify";

const useGetReviewsInfo = () =>
  useQuery({
    queryKey: ["reviews-info"],
    queryFn: () => getReviewsInfo(),
  });

const useEditReviewsInfoMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-reviews-info"],
    mutationFn: (payload: ReviewsInputModel) => editReviewsInfo(payload),
    onSuccess() {
      toast.success(`edit successfully.`);
      navigate(-1);
    },
    onError() {
      toast.error(`failed to edit`);
    },
  });
};

export { useGetReviewsInfo, useEditReviewsInfoMutation };
