import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { CategoryModel } from "./type";

const getCategoriesDataInfo = async () => {
  const res = await publicInstance.get<CategoryModel[]>(
    API_ROUTES.CATEGORY.GET_ALL
  );
  return res.data;
};

const getCategoryByIdInfo = async (id: string | undefined) => {
  const res = await publicInstance.get<CategoryModel>(
    API_ROUTES.CATEGORY.GETById(id)
  );
  return res.data;
};
const addCategoryData = async (payload: CategoryModel) => {
  const data = createFormData(payload);

  const res = await publicInstance.post(API_ROUTES.CATEGORY.ADD, data);
  return res.data;
};

const editCategoryData = async (payload: CategoryModel) => {
  const data = createFormData(payload);

  const res = await publicInstance.put(
    API_ROUTES.CATEGORY.EDIT(payload._id),
    data
  );
  return res.data;
};

const deleteCategory = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.CATEGORY.DELETE(id));
  return res.data;
};

const getCategoryWithProductsInfo = async () => {
  const res = await publicInstance.get<CategoryModel[]>(
    API_ROUTES.CATEGORY.GET_WITH_PRODUCTS
  );
  return res.data;
};

export {
  getCategoriesDataInfo,
  getCategoryByIdInfo,
  deleteCategory,
  addCategoryData,
  editCategoryData,
  getCategoryWithProductsInfo,
};
