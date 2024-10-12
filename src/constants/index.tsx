import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import LayersIcon from "@mui/icons-material/Layers";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const NAV_LINKS = [
  {
    name: "orders",
    href: "/orders",
    icon: ShoppingBagIcon,
  },
  {
    name: "products",
    href: "/products",
    icon: InventoryIcon,
  },
  {
    name: "departments",
    href: "/departments",
    icon: LayersIcon,
  },
  {
    name: "collections",
    href: "/collections",
    icon: CategoryIcon,
  },
  {
    name: "about-us",
    href: "/about-us",
    icon: InfoIcon,
  },
  {
    name: "contacts",
    href: "/contacts",
    icon: ContactPhoneIcon,
  },
];

const ORDERS_TABLE_HEADER = ["product", "note", "quantity", "total price"];

export { NAV_LINKS, ORDERS_TABLE_HEADER };
