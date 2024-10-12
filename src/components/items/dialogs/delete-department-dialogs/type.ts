export type DeleteDepartmentDialogProps = {
  open: boolean;
  onClose: () => void;
  department: DepartmentProps;
};
export type DepartmentProps = {
  id: string;
  name: string;
};
