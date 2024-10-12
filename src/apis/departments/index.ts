import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { DepartmentModel } from "./type";

const getDepartmentsInfo = async () => {
  const res = await publicInstance.get<DepartmentModel[]>(
    API_ROUTES.DEPARTMENT.GET
  );
  return res.data;
};
const getDepartmentByIdInfo = async (id: string | undefined) => {
  const res = await publicInstance.get<DepartmentModel>(
    API_ROUTES.DEPARTMENT.GETById(id)
  );
  return res.data;
};

const addDepartmentData = async (payload: DepartmentModel) => {
  const data = createFormData(payload);

  const res = await publicInstance.post(API_ROUTES.DEPARTMENT.ADD, data);
  return res.data;
};

const editDepartmentData = async (payload: DepartmentModel) => {
  const data = createFormData(payload);

  const res = await publicInstance.put(
    API_ROUTES.DEPARTMENT.EDIT(payload._id),
    data
  );
  return res.data;
};

const deleteDepartment = async (id: string) => {
  const res = await publicInstance.delete(
    API_ROUTES.DEPARTMENT.DELETE_DEPARTMENT(id)
  );
  return res.data;
};

export {
  getDepartmentsInfo,
  getDepartmentByIdInfo,
  addDepartmentData,
  editDepartmentData,
  deleteDepartment,
};
