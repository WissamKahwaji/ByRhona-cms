import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { DepartmentModel } from "../../../../apis/departments/type";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import DeleteDepartmentDialog from "../../dialogs/delete-department-dialogs";

interface DepartmentCardProps {
  department: DepartmentModel;
}

const DepartmentCard = ({ department }: DepartmentCardProps) => {
  const navigate = useNavigate();
  const [openDeleteDepartmentDialog, setOpenDeleteDepartmentDialog] =
    useState<boolean>(false);

  const handleOpenDeleteDepartmentDialog = () => {
    setOpenDeleteDepartmentDialog(true);
  };
  const handleCloseDeleteDepartmentDialog = () => {
    setOpenDeleteDepartmentDialog(false);
  };
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          title={
            <Typography
              onClick={e => {
                e.preventDefault();
                navigate(`${department._id}`);
              }}
            >
              {department.name.length > 20 ? (
                <>
                  {department.name.slice(0, 20)}
                  <Box component={"span"}>...</Box>
                </>
              ) : (
                department.name
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
              <IconButton
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  navigate(`edit/${department._id}`);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={handleOpenDeleteDepartmentDialog}
              >
                <Delete />
              </IconButton>
            </Box>
          }
        />
      </CardActionArea>
      <DeleteDepartmentDialog
        open={openDeleteDepartmentDialog}
        onClose={handleCloseDeleteDepartmentDialog}
        department={{ id: department._id!, name: department.name }}
      />
    </Card>
  );
};

export default DepartmentCard;
