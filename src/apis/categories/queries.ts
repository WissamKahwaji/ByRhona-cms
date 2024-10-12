import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategoryData,
  deleteCategory,
  editCategoryData,
  getCategoriesDataInfo,
  getCategoryByIdInfo,
  getCategoryWithProductsInfo,
} from ".";
import { toast } from "react-toastify";
import { CategoryModel } from "./type";

const useGetCategoriesDataInfoQuery = () =>
  useQuery({
    queryKey: ["get-all-categories"],
    queryFn: () => getCategoriesDataInfo(),
  });

const useGetCategoryByIdInfoQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["get-category-by-Id"],
    queryFn: () => getCategoryByIdInfo(id),
    enabled: !!id,
  });

const useAddCategoryDataMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-category"],
    mutationFn: (data: CategoryModel) => addCategoryData(data),
    onSuccess: () => {
      toast("added category successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-department-by-Id"],
      });
    },
    onError: () => {
      toast.error("failed to add category");
    },
  });
};

const useEditCategoryDataMutation = () => {
  return useMutation({
    mutationKey: ["edit-category"],
    mutationFn: (data: CategoryModel) => editCategoryData(data),
    onSuccess: () => {
      toast("Edited category successfully");
    },
    onError: () => {
      toast.error("failed to edit category");
    },
  });
};

const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-category"],
    mutationFn: (id: string) => {
      return deleteCategory(id);
    },
    onSuccess(_data) {
      toast.success(`delete ${_data.name} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-department-by-Id"],
      });
    },
    onError(_data) {
      toast.error(`failed to delete ${_data.name}`);
    },
  });
};

const useGetCategoryWithProductsInfoQuery = () =>
  useQuery({
    queryKey: ["get-category-with-products"],
    queryFn: () => getCategoryWithProductsInfo(),
  });

export {
  useGetCategoriesDataInfoQuery,
  useGetCategoryByIdInfoQuery,
  useDeleteCategoryMutation,
  useAddCategoryDataMutation,
  useEditCategoryDataMutation,
  useGetCategoryWithProductsInfoQuery,
};
