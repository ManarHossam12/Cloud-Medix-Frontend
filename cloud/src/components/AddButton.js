import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddButton = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      sx={{ position: "fixed", bottom: "20px", right: "20px" }}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
