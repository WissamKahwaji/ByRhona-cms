import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { LogoInputModel, LogoModel } from "./type";

const getLogoInfo = async () => {
  const res = await publicInstance.get<LogoModel>(API_ROUTES.LOGO.GET);
  return res.data;
};

const editLogoData = async (payload: LogoInputModel) => {
  const data = createFormData(payload);

  const res = await publicInstance.put(API_ROUTES.LOGO.EDIT, data);
  return res.data;
};

export { getLogoInfo, editLogoData };
