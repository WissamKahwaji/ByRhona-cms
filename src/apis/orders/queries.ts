import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteOrder, getOrderByIdInfo, getOrdersInfo } from ".";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useGetOrdersQuery = () =>
  useQuery({ queryKey: ["get-orders"], queryFn: () => getOrdersInfo() });
const useGetOrderByIdQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["get-order-by-id", id],
    queryFn: () => getOrderByIdInfo(id!),
    enabled: !!id,
  });

const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["delete-order"],
    mutationFn: (id: string) => {
      return deleteOrder(id);
    },
    onSuccess() {
      toast.success(`delete order successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-orders"] });
      navigate("/orders", { replace: true });
    },
    onError() {
      toast.error(`failed to delete order}`);
    },
  });
};

export { useGetOrderByIdQuery, useGetOrdersQuery, useDeleteOrderMutation };
