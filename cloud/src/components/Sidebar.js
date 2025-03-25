import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Event, Assignment, AvTimer } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { text: "Reservations", icon: <Event />, path: "/reservations" },
    { text: "Visits", icon: <Assignment />, path: "/visits" },
    { text: "Available Slots", icon: <AvTimer />, path: "/available-slots" },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
