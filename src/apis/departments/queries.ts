import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDepartmentData,
  deleteDepartment,
  editDepartmentData,
  getDepartmentByIdInfo,
  getDepartmentsInfo,
} from ".";
import { DepartmentModel } from "./type";
import { toast } from "react-toastify";

const useGetDepartmentsInfoQuery = () =>
  useQuery({
    queryKey: ["get-departments"],
    queryFn: () => getDepartmentsInfo(),
  });

const useGetDepartmentByIdInfoQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["get-department-by-Id", id],
    queryFn: () => getDepartmentByIdInfo(id),
    enabled: !!id,
  });

const useAddDepartmentDataMutation = () => {
  return useMutation({
    mutationKey: ["add-department"],
    mutationFn: (data: DepartmentModel) => addDepartmentData(data),
    onSuccess: () => {
      toast("added department successfully");
    },
    onError: () => {
      toast.error("failed to add department");
    },
  });
};

const useEditDepartmentDataMutation = () => {
  return useMutation({
    mutationKey: ["edit-department"],
    mutationFn: (data: DepartmentModel) => editDepartmentData(data),
    onSuccess: () => {
      toast("Edited department successfully");
    },
    onError: () => {
      toast.error("failed to edit department");
    },
  });
};

const useDeleteDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-department"],
    mutationFn: (id: string) => {
      return deleteDepartment(id);
    },
    onSuccess(_data) {
      toast.success(`delete ${_data.name} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-departments"],
      });
    },
    onError(_data) {
      toast.error(`failed to delete ${_data.name}`);
    },
  });
};

export {
  useGetDepartmentsInfoQuery,
  useAddDepartmentDataMutation,
  useEditDepartmentDataMutation,
  useGetDepartmentByIdInfoQuery,
  useDeleteDepartmentMutation,
};
