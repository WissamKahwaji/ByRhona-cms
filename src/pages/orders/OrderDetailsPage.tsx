import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../apis/orders/queries";
import LoadingPage from "../loading-page/LoadingPage";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { ORDERS_TABLE_HEADER } from "../../constants";
import DeleteOrderDialog from "../../components/items/dialogs/delete_order_dialog";

const OrderDetailsPage = () => {
  const [openDeleteOrderDialog, setOpenDeleteOrderDialog] =
    useState<boolean>(false);

  const handleOpenDeleteOrderDialog = () => {
    setOpenDeleteOrderDialog(true);
  };
  const handleCloseDeleteOrderDialog = () => {
    setOpenDeleteOrderDialog(false);
  };
  const { id } = useParams<{ id: string | undefined }>();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id);
  if (isLoading) return <LoadingPage />;
  if (isError) return <></>;

  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          backgroundColor: theme => theme.palette.background.default,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              create at:{" "}
            </Typography>
            <Typography>
              {new Date(order?.createdAt ?? "").toLocaleDateString()}
            </Typography>
          </Stack>
          <IconButton color="error" onClick={handleOpenDeleteOrderDialog}>
            <Delete />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography color="primary" sx={{ fontWeight: "bold" }}>
            user name:{" "}
          </Typography>
          <Typography>{order?.userName}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography color="primary" sx={{ fontWeight: "bold" }}>
            user mobile number:{" "}
          </Typography>
          <Typography>{order?.userMobileNumber}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography color="primary" sx={{ fontWeight: "bold" }}>
            user's emirate:{" "}
          </Typography>
          <Typography>{order?.city}</Typography>
        </Stack>
        <Stack direction="row" spacing={5}>
          {order?.userStreet && (
            <Stack direction="row" spacing={1}>
              <Typography color="primary" sx={{ fontWeight: "bold" }}>
                userStreet:{" "}
              </Typography>
              <Typography>{order?.userStreet} </Typography>
            </Stack>
          )}
          {order?.userBuilding && (
            <Stack direction="row" spacing={1}>
              <Typography color="primary" sx={{ fontWeight: "bold" }}>
                user Building:{" "}
              </Typography>
              <Typography>{order?.userBuilding}</Typography>
            </Stack>
          )}
          {order?.userFloorNo && (
            <Stack direction="row" spacing={1}>
              <Typography color="primary" sx={{ fontWeight: "bold" }}>
                Floor Number:{" "}
              </Typography>
              <Typography>{order?.userFloorNo}</Typography>
            </Stack>
          )}
          {order?.userUnitNo && (
            <Stack direction="row" spacing={1}>
              <Typography color="primary" sx={{ fontWeight: "bold" }}>
                Unit Number:{" "}
              </Typography>
              <Typography>{order?.userUnitNo}</Typography>
            </Stack>
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography color="primary" sx={{ fontWeight: "bold" }}>
            payment method:{" "}
          </Typography>
          <Typography>{order?.paymentMethod}</Typography>
        </Stack>
        {order?.isUseVoucher && (
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              is user use voucher:{" "}
            </Typography>
            <Typography>Yes</Typography>
          </Stack>
        )}
        <Stack direction="row" spacing={1}>
          <Typography color="primary" sx={{ fontWeight: "bold" }}>
            Total Amount:{" "}
          </Typography>
          <Typography>
            {(order?.cartItemsTotalPrice ?? 0).toFixed(2)} AED
          </Typography>
        </Stack>
        <DeleteOrderDialog
          open={openDeleteOrderDialog}
          onClose={handleCloseDeleteOrderDialog}
          order={{ id: order?._id ?? "" }}
        />
      </Paper>

      <Typography
        fontWeight={"bold"}
        fontSize={"2rem"}
        color={"primary"}
        textAlign={"center"}
        py={10}
      >
        products
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            {ORDERS_TABLE_HEADER.map(cell => (
              <TableCell key={cell}>{cell}</TableCell>
            ))}
          </TableHead>
          <TableBody>
            {order?.cartItems?.map(item => (
              <TableRow key={item._id}>
                <TableCell>
                  <Stack direction={"row"} spacing={2}>
                    <Box sx={{ width: 50, height: 50 }}>
                      <Box
                        component={"img"}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        }}
                        src={item.img}
                      />
                    </Box>
                    <Box>
                      <Typography>{item.title}</Typography>
                      <Typography>
                        {item.price.priceAED.toFixed(2)} AED /
                        {item.price.priceUSD.toFixed(2)}$
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{item.note ?? "---------"}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Typography>
                    {(item.price.priceAED * item.quantity).toFixed(2)} AED
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderDetailsPage;
