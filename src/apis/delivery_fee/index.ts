import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { DeliveryFeeModel } from "./type";

const getDeliveryFeeInfo = async () => {
  const res = await publicInstance.get<DeliveryFeeModel>(API_ROUTES.FEE.GET);
  return res.data;
};

const editFeeData = async (payload: DeliveryFeeModel) => {
  const data = createFormData(payload);

  const res = await publicInstance.put(API_ROUTES.FEE.EDIT_Fee, data);
  return res.data;
};

export { getDeliveryFeeInfo, editFeeData };
