export type DeleteOrderDialogProps = {
  open: boolean;
  onClose: () => void;
  order: Order;
};
export type Order = {
  id: string;
};
