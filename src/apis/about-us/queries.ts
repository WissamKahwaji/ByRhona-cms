import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editAboutUsInfo, getAboutUsInfo } from ".";
import { AboutUsInfo } from "./type";
import { toast } from "react-toastify";

const useGetAboutUsInfoQuery = () =>
  useQuery({ queryKey: ["about-us-info"], queryFn: () => getAboutUsInfo() });

const useEditAboutUsInfoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-about-us-info"],
    mutationFn: (payload: AboutUsInfo) => editAboutUsInfo(payload),
    onSuccess() {
      toast.success("update about info successfully.");
      queryClient.invalidateQueries({ queryKey: ["about-us-info"] });
    },
    onError() {
      toast.error("failed to update about info");
    },
  });
};

export { useGetAboutUsInfoQuery, useEditAboutUsInfoMutation };
