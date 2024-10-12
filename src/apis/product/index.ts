import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { Product, ProductInputProps } from "./type";

const getProductsInfo = async () => {
  const res = await publicInstance.get<Product[]>(API_ROUTES.PRODUCT.GET_ALL);
  return res.data;
};

const getProductByIdInfo = async (id: string | undefined) => {
  const res = await publicInstance.get<Product>(API_ROUTES.PRODUCT.GETById(id));
  return res.data;
};

const addProduct = async (payload: ProductInputProps) => {
  const data = createFormData(payload);

  const res = await publicInstance.post<Product>(API_ROUTES.PRODUCT.ADD, data);
  return res;
};

const editProduct = async (payload: ProductInputProps) => {
  const data = createFormData(payload);

  const res = await publicInstance.put<Product>(
    API_ROUTES.PRODUCT.EDIT(payload._id),
    data
  );
  return res;
};

const deleteProduct = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.PRODUCT.DELETE(id));
  return res.data;
};

export {
  getProductsInfo,
  getProductByIdInfo,
  addProduct,
  editProduct,
  deleteProduct,
};
