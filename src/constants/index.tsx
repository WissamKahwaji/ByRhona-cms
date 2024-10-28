import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import LayersIcon from "@mui/icons-material/Layers";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

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
  {
    name: "logo",
    href: "/logo",
    icon: InsertPhotoIcon,
  },
  {
    name: "sliders",
    href: "/sliders",
    icon: WebStoriesIcon,
  },
  {
    name: "fees",
    href: "/fees",
    icon: RequestQuoteIcon,
  },
  {
    name: "happy clients",
    href: "/happy-clients",
    icon: InsertEmoticonIcon,
  },
];

const ORDERS_TABLE_HEADER = ["product", "note", "quantity", "total price"];

export { NAV_LINKS, ORDERS_TABLE_HEADER };
