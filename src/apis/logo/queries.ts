import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editLogoData, getLogoInfo } from ".";
import { LogoInputModel } from "./type";
import { toast } from "react-toastify";

const useGetLogoInfoQuery = () =>
  useQuery({ queryKey: ["logo-info"], queryFn: () => getLogoInfo() });

const useEditLogoDataMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-logo"],
    mutationFn: (data: LogoInputModel) => editLogoData(data),
    onSuccess: () => {
      toast("edited logo successfully");
      queryClient.invalidateQueries({
        queryKey: ["logo-info"],
      });
    },
    onError: () => {
      toast.error("failed to edited logo");
    },
  });
};

export { useGetLogoInfoQuery, useEditLogoDataMutation };
