import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Product } from "../../../../apis/product/type";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import DeleteCollectionProductDialog from "../../dialogs/delete_collection_product_dialog";

interface CollectionProductCardProps {
  collectionId: string;
  product: Product;
}

const CollectionProductCard = ({
  product,
  collectionId,
}: CollectionProductCardProps) => {
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
            <IconButton color="error" onClick={handleOpenDeleteProductDialog}>
              <Delete />
            </IconButton>
          </Box>
        }
      />
      {/* <Link to={`${product._id}/edit`} reloadDocument> */}
      <CardActionArea>
        <CardMedia
          component={"img"}
          sx={{ objectFit: "contain" }}
          src={product.img}
          height="240px"
          crossOrigin="anonymous"
        />
      </CardActionArea>
      {/* </Link> */}

      <DeleteCollectionProductDialog
        id={collectionId}
        open={openDeleteProductDialog}
        onClose={handleCloseDeleteProductDialog}
        product={{ id: product._id!, name: product.title }}
      />
    </Card>
  );
};

export default CollectionProductCard;
