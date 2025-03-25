import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6">Receptionist Portal</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
