export type DeleteCollectionDialogProps = {
  open: boolean;
  onClose: () => void;
  collection: CollectionProps;
};
export type CollectionProps = {
  id: string;
  name: string;
};
