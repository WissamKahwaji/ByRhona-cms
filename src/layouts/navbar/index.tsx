import { Box, Toolbar } from "@mui/material";
import { AppBar } from "../style";
import Logo from "../../assets/logo.png";
import TProps from "./type";

const NavBar = ({ open }: TProps) => {
  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ background: theme => theme.palette.secondary.main }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, md: 3 },
            alignItems: "center",
            width: "100%",
            color: "white",
          }}
        >
          {!open && (
            <img
              src={Logo}
              alt={"asda"}
              loading="lazy"
              style={{
                width: "12%",
                height: "100%",
              }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
