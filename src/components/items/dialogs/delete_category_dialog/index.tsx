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
import { DeleteCategoryDialogProps } from "./type";
import { useDeleteCategoryMutation } from "../../../../apis/categories/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteCategoryDialog = ({
  open,
  onClose,
  category,
}: DeleteCategoryDialogProps) => {
  const { mutate: deleteCategory } = useDeleteCategoryMutation();
  const handleDeleteService = () => {
    deleteCategory(category.id);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${category.name}`}</DialogContentText>
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

export default DeleteCategoryDialog;
