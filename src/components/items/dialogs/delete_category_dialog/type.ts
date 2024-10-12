export type DeleteCategoryDialogProps = {
  open: boolean;
  onClose: () => void;
  category: CategoryProps;
};
export type CategoryProps = {
  id: string;
  name: string;
};
