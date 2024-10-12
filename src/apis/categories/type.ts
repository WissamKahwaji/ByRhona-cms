import { Product } from "../product/type";

export type CategoryModel = {
  _id?: string;
  name: string;
  nameAr?: string;
  nameFr?: string;
  products?: Product[];
  department?: string;
};

export type GetProductParams = {
  category: string | null;
};
