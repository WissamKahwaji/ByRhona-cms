import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import LoadingPage from "./pages/loading-page/LoadingPage";
import OrdersPage from "./pages/orders";
import UnAuthorized from "./pages/unAuthorized";
import SignInPage from "./pages/sign-in";
import ContactUs from "./pages/contacts/ContactUs";
import AboutUsPage from "./pages/about-us";
import DepartmentsPage from "./pages/departments/DepartmentsPage";
import AddEditDepartmentPage from "./pages/departments/AddEditDepartmentPage";
import DepartmentCategoriesPage from "./pages/departments/DepartmentCategoriesPage";
import AddEditCategoryPage from "./pages/categories/AddEditCategoryPage";
import ProductListPage from "./pages/products/ProductListPage";
import AddEditProductPage from "./pages/products/AddEditProductPage";
import OrderDetailsPage from "./pages/orders/OrderDetailsPage";
import CollectionsListPage from "./pages/collections/CollectionsListPage";
import AddEditCollectionPage from "./pages/collections/AddEditCollectionPage";
import CollectionProductsPage from "./pages/collections/CollectionProductsPage";
import AddProductsToCollectionPage from "./pages/collections/AddProductsToCollectionPage";
import LogoPage from "./pages/logo/LogoPage";
import SlidersPage from "./pages/sliders/SlidersPage";
import EditSliderPage from "./pages/sliders/EditSliderPage";
import DeliveryFeePage from "./pages/delivery_fee/DeliveryFeePage";
import HappyClientsPage from "./pages/happy-clients/HappyClientsPage";
import EditHappyClientsPage from "./pages/happy-clients/EditHappyClientsPage";

const Routes = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={localStorage.getItem("token") ? <App /> : <UnAuthorized />}
        >
          <Route index element={<Navigate to={"/orders"} />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailsPage />} />
          <Route path="contacts" element={<ContactUs />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route
            path="departments/edit/:id"
            element={<AddEditDepartmentPage />}
          />
          <Route path="departments/add" element={<AddEditDepartmentPage />} />
          <Route
            path="departments/:id"
            element={<DepartmentCategoriesPage />}
          />
          <Route
            path="departments/:id/edit/:categoryId"
            element={<AddEditCategoryPage />}
          />
          <Route path="departments/:id/add" element={<AddEditCategoryPage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/add" element={<AddEditProductPage />} />
          <Route path="products/:id/edit" element={<AddEditProductPage />} />

          <Route path="collections" element={<CollectionsListPage />} />
          <Route path="collections/add" element={<AddEditCollectionPage />} />
          <Route
            path="collections/:id/add"
            element={<AddProductsToCollectionPage />}
          />
          <Route path="collections/:id" element={<CollectionProductsPage />} />
          <Route
            path="collections/:id/edit"
            element={<AddEditCollectionPage />}
          />
          <Route path="logo" element={<LogoPage />} />
          <Route path="sliders" element={<SlidersPage />} />
          <Route path="sliders/:sliderId/edit" element={<EditSliderPage />} />
          <Route path="fees" element={<DeliveryFeePage />} />
          <Route path="happy-clients" element={<HappyClientsPage />} />
          <Route path="happy-clients/edit" element={<EditHappyClientsPage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
      </Route>
    )
  );
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default Routes;
