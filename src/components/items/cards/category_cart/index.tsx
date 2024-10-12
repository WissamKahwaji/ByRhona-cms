import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { CategoryModel } from "../../../../apis/categories/type";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import DeleteCategoryDialog from "../../dialogs/delete_category_dialog";

interface CategoryCardProps {
  category: CategoryModel;
}

const CategoryCard = ({ category: category }: CategoryCardProps) => {
  const navigate = useNavigate();
  const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] =
    useState<boolean>(false);

  const handleOpenDeleteCategoryDialog = () => {
    setOpenDeleteCategoryDialog(true);
  };
  const handleCloseDeleteCategoryDialog = () => {
    setOpenDeleteCategoryDialog(false);
  };
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          title={
            <Typography>
              {category.name.length > 20 ? (
                <>
                  {category.name.slice(0, 20)}
                  <Box component={"span"}>...</Box>
                </>
              ) : (
                category.name
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
                onClick={() => navigate(`edit/${category._id}`)}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={handleOpenDeleteCategoryDialog}
              >
                <Delete />
              </IconButton>
            </Box>
          }
        />
      </CardActionArea>
      <DeleteCategoryDialog
        open={openDeleteCategoryDialog}
        onClose={handleCloseDeleteCategoryDialog}
        category={{ id: category._id!, name: category.name }}
      />
    </Card>
  );
};

export default CategoryCard;
