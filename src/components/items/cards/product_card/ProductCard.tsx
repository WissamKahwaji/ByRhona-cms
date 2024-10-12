import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Product } from "../../../../apis/product/type";
import DeleteProductDialog from "../../dialogs/delete_product_dialog/DeleteProductDialog";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const [openDeleteProductDialog, setOpenDeleteProductDialog] =
    useState<boolean>(false);

  const handleOpenDeleteProductDialog = () => {
    setOpenDeleteProductDialog(true);
  };
  const handleCloseDeleteProductDialog = () => {
    setOpenDeleteProductDialog(false);
  };
  return (
    <Card>
      <CardHeader
        title={
          <Typography>
            {product.title.length > 20 ? (
              <>
                {product.title.slice(0, 20)}
                <Box component={"span"}>...</Box>
              </>
            ) : (
              product.title
            )}
          </Typography>
        }
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <Link to={`${product._id}/edit`} reloadDocument> */}
            <IconButton
              color="primary"
              onClick={() => {
                navigate(`${product._id}/edit`);
              }}
            >
              <Edit />
            </IconButton>
            {/* </Link> */}
            <IconButton color="error" onClick={handleOpenDeleteProductDialog}>
              <Delete />
            </IconButton>
          </Box>
        }
      />
      {/* <Link to={`${product._id}/edit`} reloadDocument> */}
      <CardActionArea
        onClick={() => {
          navigate(`${product._id}/edit`);
        }}
      >
        <CardMedia
          component={"img"}
          sx={{ objectFit: "contain" }}
          src={product.img}
          height="240px"
          crossOrigin="anonymous"
        />
      </CardActionArea>
      {/* </Link> */}

      <DeleteProductDialog
        open={openDeleteProductDialog}
        onClose={handleCloseDeleteProductDialog}
        product={{ id: product._id!, name: product.title }}
      />
    </Card>
  );
};

export default ProductCard;
