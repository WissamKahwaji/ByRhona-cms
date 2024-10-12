import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MuiTheme from "./libs/mui/theme";
import Routes from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Wrapper = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <MuiTheme>
          <Routes />
          <ToastContainer />
        </MuiTheme>
      </CssBaseline>
    </QueryClientProvider>
  );
};

export default Wrapper;
