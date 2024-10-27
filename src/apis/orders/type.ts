export type OrderModel = {
  cartItems: CartItem[];
  cartItemsTotalPrice: number;
  country: string;
  city: string;
  email: string;
  createdAt: string;
  paymentMethod: "cash" | "card";
  isUseVoucher?: boolean;
  UsedVoucherAmount?: number;
  updatedAt: string;
  userBuilding: string;
  userId: string;
  userMobileNumber: string;
  userName: string;
  userNote: string;
  userStreet: string;
  userUnitNo?: string;
  userFloorNo?: string;
  deliveryFee?: number;
  _id: string;
};
export type CartItem = {
  id?: string;
  img: string;
  price: {
    priceAED: number;
    priceUSD: number;
  };
  quantity: number;
  title: string;
  note?: string;
  _id?: string;
};
