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
import { DeleteCollectionDialogProps } from "./type";
import { useDeleteCollectionMutation } from "../../../../apis/collection/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteCollectionDialog = ({
  open,
  onClose,
  collection,
}: DeleteCollectionDialogProps) => {
  const { mutate: deleteCollection } = useDeleteCollectionMutation();
  const handleDeleteService = () => {
    deleteCollection(collection.id);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${collection.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteService}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCollectionDialog;
