import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCollectionData,
  addProductsToCollectionsData,
  deleteCollection,
  editCollectionData,
  getCollectionByIdInfo,
  getCollectionDataInfo,
  removeProductsFromCollectionsData,
} from ".";
import { toast } from "react-toastify";
import {
  CollectionAddRemoveProductInputModel,
  CollectionInputModel,
} from "./type";
import { useNavigate } from "react-router-dom";

const useGetCollectionsDataInfoQuery = () =>
  useQuery({
    queryKey: ["get-all-collections"],
    queryFn: () => getCollectionDataInfo(),
  });

const useGetCollectionByIdInfoQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["get-collection-by-Id"],
    queryFn: () => getCollectionByIdInfo(id!),
    enabled: !!id,
  });

const useAddCollectionDataMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-collection"],
    mutationFn: (data: CollectionInputModel) => addCollectionData(data),
    onSuccess: () => {
      toast("added collection successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-all-collections"],
      });
      navigate("/collections");
    },
    onError: () => {
      toast.error("failed to add collection");
    },
  });
};

const useEditCollectionDataMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["edit-collection"],
    mutationFn: (data: CollectionInputModel) => editCollectionData(data),
    onSuccess: () => {
      toast("edited collection successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-all-collections"],
      });
      navigate("/collections");
    },
    onError: () => {
      toast.error("failed to edited collection");
    },
  });
};

const useDeleteCollectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-collection"],
    mutationFn: (id: string) => {
      return deleteCollection(id);
    },
    onSuccess() {
      toast.success(`delete collection successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-all-collections"],
      });
    },
    onError() {
      toast.error(`failed to delete collection`);
    },
  });
};

const useAddProductsToCollectionDataMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-products-to-collection"],
    mutationFn: (data: CollectionAddRemoveProductInputModel) =>
      addProductsToCollectionsData(data),
    onSuccess: (_data, variables) => {
      toast("added products to collection successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-collection-by-Id"],
      });
      navigate(`/collections/${variables.id}`);
    },
    onError: () => {
      toast.error("failed to add products to collection");
    },
  });
};

const useRemoveProductsFromCollectionDataMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["remove-products-from-collection"],
    mutationFn: (data: CollectionAddRemoveProductInputModel) =>
      removeProductsFromCollectionsData(data),
    onSuccess: () => {
      toast("removed products from collection successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-collection-by-Id"],
      });
    },
    onError: () => {
      toast.error("failed to remove products from collection");
    },
  });
};

export {
  useGetCollectionsDataInfoQuery,
  useGetCollectionByIdInfoQuery,
  useDeleteCollectionMutation,
  useAddCollectionDataMutation,
  useEditCollectionDataMutation,
  useAddProductsToCollectionDataMutation,
  useRemoveProductsFromCollectionDataMutation,
};
