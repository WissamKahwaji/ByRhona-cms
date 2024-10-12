import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ProductInputProps } from "./type";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductByIdInfo,
  getProductsInfo,
} from ".";
import { toast } from "react-toastify";

const useGetProductsInfoQuery = () =>
  useQuery({
    queryKey: ["get-all-products"],
    queryFn: () => getProductsInfo(),
  });

const useGetProductByIdInfoQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["get-product-by-Id"],
    queryFn: () => getProductByIdInfo(id),
    enabled: !!id,
  });

const useAddProductMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-product"],
    mutationFn: (payload: ProductInputProps) => addProduct(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.title} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.title}`);
    },
  });
};

const useEditProductMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-product"],
    mutationFn: (payload: ProductInputProps) => editProduct(payload),
    onSuccess() {
      toast.success(`edit successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-category-with-products"],
      });
      navigate("/products");
    },
    onError() {
      toast.error(`failed to edit product`);
    },
  });
};

const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (id: string) => {
      return deleteProduct(id);
    },
    onSuccess() {
      toast.success(`deleted successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-category-with-products"],
      });
    },
    onError() {
      toast.error(`failed to delete `);
    },
  });
};

export {
  useGetProductsInfoQuery,
  useEditProductMutation,
  useGetProductByIdInfoQuery,
  useAddProductMutation,
  useDeleteProductMutation,
};
