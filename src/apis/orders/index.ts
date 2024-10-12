import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { OrderModel } from "./type";

const getOrdersInfo = async () => {
  const res = await publicInstance.get<OrderModel[]>(API_ROUTES.ORDERS.GET_ALL);
  return res.data;
};
const getOrderByIdInfo = async (id: string) => {
  const res = await publicInstance.get<OrderModel>(
    API_ROUTES.ORDERS.GETById(id)
  );
  return res.data;
};

const deleteOrder = async (id: string) => {
  const res = await publicInstance.delete<OrderModel>(
    API_ROUTES.ORDERS.DELETE(id)
  );
  return res.data;
};

export { getOrdersInfo, getOrderByIdInfo, deleteOrder };
