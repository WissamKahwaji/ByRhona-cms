import { Product } from "../product/type";

export type CollectionModel = {
  _id?: string;
  image: string;
  name: string;
  nameFr: string;
  nameAr: string;
  products?: Product[];
};

export type CollectionInputModel = {
  _id?: string;
  image?: File;
  name: string;
  nameFr: string;
  nameAr: string;
  products?: string[];
};

export type CollectionAddRemoveProductInputModel = {
  id: string;
  productIds: string[];
};
