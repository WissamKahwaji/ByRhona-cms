import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import {
  CollectionAddRemoveProductInputModel,
  CollectionInputModel,
  CollectionModel,
} from "./type";

const getCollectionDataInfo = async () => {
  const res = await publicInstance.get<CollectionModel[]>(
    API_ROUTES.COLLECTION.GET_ALL
  );
  return res.data;
};

const getCollectionByIdInfo = async (id: string) => {
  const res = await publicInstance.get<CollectionModel>(
    API_ROUTES.COLLECTION.GET_ById(id)
  );
  return res.data;
};

const addCollectionData = async (payload: CollectionInputModel) => {
  const data = createFormData(payload);

  const res = await publicInstance.post(API_ROUTES.COLLECTION.ADD, data);
  return res.data;
};

const editCollectionData = async (payload: CollectionInputModel) => {
  const data = createFormData(payload);

  const res = await publicInstance.put(
    API_ROUTES.COLLECTION.EDIT(payload._id),
    data
  );
  return res.data;
};

const deleteCollection = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.COLLECTION.DELETE(id));
  return res.data;
};

const addProductsToCollectionsData = async (
  payload: CollectionAddRemoveProductInputModel
) => {
  const data = createFormData(payload);

  const res = await publicInstance.post(
    API_ROUTES.COLLECTION.ADD_PRODUCTS(payload.id),
    data
  );
  return res.data;
};

const removeProductsFromCollectionsData = async (
  payload: CollectionAddRemoveProductInputModel
) => {
  const data = createFormData(payload);

  const res = await publicInstance.put(
    API_ROUTES.COLLECTION.REMOVE_PRODUCTS(payload.id),
    data
  );
  return res.data;
};

export {
  getCollectionDataInfo,
  getCollectionByIdInfo,
  deleteCollection,
  addCollectionData,
  editCollectionData,
  addProductsToCollectionsData,
  removeProductsFromCollectionsData,
};
