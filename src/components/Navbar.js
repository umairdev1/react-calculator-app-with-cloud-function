import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Calculator
        </Typography>
        {isSmallScreen && (
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}
        <Drawer
          anchor="right"
          open={drawerOpen && isSmallScreen}
          onClose={toggleDrawer}
          sx={{ width: 250 }}
        >
          <List>
            {currentUser ? (
              <>
                <ListItem
                  component={Link}
                  to="/userinfo"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="UserInfo" />
                </ListItem>
                <ListItem component={Link} to="/" onClick={toggleDrawer}>
                  <ListItemText primary="Calculator" />
                </ListItem>
                <ListItem component={Link} to="/history" onClick={toggleDrawer}>
                  <ListItemText primary="History" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem component={Link} to="/login" onClick={toggleDrawer}>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem component={Link} to="/signup" onClick={toggleDrawer}>
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </>
            )}
          </List>
          <Divider />
        </Drawer>

        {!isSmallScreen && (
          <>
            {currentUser ? (
              <>
                <Button color="inherit" component={Link} to="/userinfo">
                  UserInfo
                </Button>
                <Button color="inherit" component={Link} to="/">
                  Calculator
                </Button>
                <Button color="inherit" component={Link} to="/history">
                  History
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
