import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editContactUsInfo, getContactUsInfo } from ".";
import { ContactUsInfo } from "./type";
import { toast } from "react-toastify";

const useGetContactUsInfo = () =>
  useQuery({
    queryKey: ["contact-us-info"],
    queryFn: () => getContactUsInfo(),
  });

const useEditContactUsInfoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-contact-us-info"],
    mutationFn: (payload: ContactUsInfo) => editContactUsInfo(payload),
    onSuccess() {
      toast.success("update contact info successfully.");
      queryClient.invalidateQueries({ queryKey: ["contact-us-info"] });
    },
    onError() {
      toast.error("failed to update contact info");
    },
  });
};

export { useGetContactUsInfo, useEditContactUsInfoMutation };
