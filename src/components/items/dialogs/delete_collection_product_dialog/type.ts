export type DeleteProductCollectionDialogProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  product: ProductCollectionProps;
};
export type ProductCollectionProps = {
  id: string;
  name: string;
};
