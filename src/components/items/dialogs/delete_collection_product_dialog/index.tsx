/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import React from "react";

import { TransitionProps } from "@mui/material/transitions";
import { DeleteProductCollectionDialogProps } from "./type";
import { useRemoveProductsFromCollectionDataMutation } from "../../../../apis/collection/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteCollectionProductDialog = ({
  open,
  onClose,
  product,
  id,
}: DeleteProductCollectionDialogProps) => {
  const { mutate: deleteProduct } =
    useRemoveProductsFromCollectionDataMutation();
  const handleDeleteProduct = () => {
    deleteProduct({ id: id, productIds: [product.id] });
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to remove ${product.name} from the collection`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteProduct}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCollectionProductDialog;
