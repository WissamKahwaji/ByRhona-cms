import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";

import { CollectionModel } from "../../../../apis/collection/type";
import DeleteCollectionDialog from "../../dialogs/delete_collection_dialog";

interface CollectionCardProps {
  collection: CollectionModel;
}

const CollectionCard = ({ collection: collection }: CollectionCardProps) => {
  const navigate = useNavigate();
  const [openDeleteCollectionDialog, setOpenDeleteCollectionDialog] =
    useState<boolean>(false);

  const handleOpenDeleteCollectionDialog = () => {
    setOpenDeleteCollectionDialog(true);
  };
  const handleCloseDeleteCollectionDialog = () => {
    setOpenDeleteCollectionDialog(false);
  };
  return (
    <Card>
      <CardHeader
        title={
          <Typography>
            {collection.name.length > 20 ? (
              <>
                {collection.name.slice(0, 20)}
                <Box component={"span"}>...</Box>
              </>
            ) : (
              collection.name
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
                navigate(`${collection._id}/edit`);
              }}
            >
              <Edit />
            </IconButton>
            {/* </Link> */}
            <IconButton
              color="error"
              onClick={handleOpenDeleteCollectionDialog}
            >
              <Delete />
            </IconButton>
          </Box>
        }
      />
      {/* <Link to={`${product._id}/edit`} reloadDocument> */}
      <CardActionArea
        onClick={() => {
          navigate(`${collection._id}`);
        }}
      >
        <CardMedia
          component={"img"}
          sx={{ objectFit: "contain" }}
          src={collection.image}
          height="240px"
          crossOrigin="anonymous"
        />
      </CardActionArea>
      {/* </Link> */}

      <DeleteCollectionDialog
        open={openDeleteCollectionDialog}
        onClose={handleCloseDeleteCollectionDialog}
        collection={{ id: collection._id!, name: collection.name }}
      />
    </Card>
  );
};

export default CollectionCard;
