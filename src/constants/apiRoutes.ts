const AUTH = {
  SIGNIN: "/admin/signin",
};

const CONTACT_US = {
  GET: "/contact",
  Edit: (id: string | undefined) => `contact/edit-contact-data/${id}`,
};

const DEPARTMENT = {
  GET: "/departments",
  ADD: "/departments/add",
  GETById: (id: string | undefined) => `/departments/${id}`,
  EDIT: (id: string | undefined) => `/departments/edit/${id}`,
  DELETE_DEPARTMENT: (id: string) => `/departments/delete/${id}`,
};

const ABOUT_US = {
  GET: "/about",
  EDIT: "/about/edit",
};

const CATEGORY = {
  GET_ALL: "/categories",
  ADD: "/categories/add",
  GETById: (id: string | undefined) => `/categories/${id}`,
  EDIT: (id: string | undefined) => `/categories/edit/${id}`,
  DELETE: (id: string | undefined) => `/categories/delete/${id}`,
  GET_WITH_PRODUCTS: "/categories/category-products",
};

const PRODUCT = {
  GET_ALL: "/products",
  GETById: (id: string | undefined) => `/products/${id}`,
  ADD: "/products/add",
  EDIT: (id: string | undefined) => `/products/edit/${id}`,
  DELETE: (id: string | undefined) => `/products/delete/${id}`,
};

const ORDERS = {
  GET_ALL: "/order",
  GETById: (id: string | undefined) => `/order/${id}`,
  DELETE: (id: string) => `/order/delete-order/${id}`,
};

const COLLECTION = {
  GET_ALL: "/collections",
  GET_ById: (id: string) => `/collections/${id}`,
  DELETE: (id: string) => `/collections/${id}`,
  EDIT: (id: string | undefined) => `/collections/edit/${id}`,
  ADD: "/collections/add",
  ADD_PRODUCTS: (id: string | undefined) =>
    `/collections/add-products-to-collection/${id}`,
  REMOVE_PRODUCTS: (id: string | undefined) =>
    `/collections/remove-products-from-collection/${id}`,
};

const LOGO = {
  GET: "/logo",
  EDIT: "/logo/edit",
};

const SLIDER = {
  GET: "/sliders",
  EDIT_SLIDER: (sliderId: string) => `/sliders/edit/${sliderId}`,
};
const FEE = {
  GET: "/deliveryFee",
  EDIT_Fee: "/deliveryFee/edit",
};

const REVIEWS = {
  GET: "/clientsReviews",
  EDIT_REVIEWS: "/clientsReviews/edit",
};

const API_ROUTES = {
  AUTH,
  CONTACT_US,
  ABOUT_US,
  DEPARTMENT,
  CATEGORY,
  PRODUCT,
  ORDERS,
  COLLECTION,
  LOGO,
  SLIDER,
  FEE,
  REVIEWS,
};

export default API_ROUTES;
