import {
  Grid2,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useGetOrdersQuery } from "../../apis/orders/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  if (isLoading) return <LoadingPage />;
  if (isError) return <></>;
  return (
    <Grid2 container gap={4} size={{ xs: 12 }}>
      {orders?.map(order => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={order._id}>
          <MuiLink
            component={Link}
            sx={{ textDecoration: "none" }}
            to={`/orders/${order._id}`}
          >
            <Paper
              sx={{
                p: 2,
                backgroundColor: theme => theme.palette.background.default,
              }}
            >
              <Stack direction={"row"} spacing={1}>
                <Typography color={"primary"} sx={{ fontWeight: "bold" }}>
                  create at:{" "}
                </Typography>
                <Typography>
                  {new Date(order.createdAt ?? "").toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography color={"primary"} sx={{ fontWeight: "bold" }}>
                  user name:{" "}
                </Typography>
                <Typography>{order.userName}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography color={"primary"} sx={{ fontWeight: "bold" }}>
                  user mobile number:{" "}
                </Typography>
                <Typography>{order.userMobileNumber}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography color={"primary"} sx={{ fontWeight: "bold" }}>
                  user's emirate:{" "}
                </Typography>
                <Typography>{order.city}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography color={"primary"} sx={{ fontWeight: "bold" }}>
                  payment method:{" "}
                </Typography>
                <Typography>{order.paymentMethod}</Typography>
              </Stack>
            </Paper>
          </MuiLink>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default OrdersPage;
