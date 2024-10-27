import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editFeeData, getDeliveryFeeInfo } from ".";
import { DeliveryFeeModel } from "./type";
import { toast } from "react-toastify";

const useGetDeliveryFeeInfoQuery = () =>
  useQuery({ queryKey: ["fee-info"], queryFn: () => getDeliveryFeeInfo() });

const useEditDeliveryFeeDataMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-fee"],
    mutationFn: (data: DeliveryFeeModel) => editFeeData(data),
    onSuccess: () => {
      toast("edited fee successfully");
      queryClient.invalidateQueries({
        queryKey: ["fee-info"],
      });
    },
    onError: () => {
      toast.error("failed to edited fee");
    },
  });
};

export { useGetDeliveryFeeInfoQuery, useEditDeliveryFeeDataMutation };
