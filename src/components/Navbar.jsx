import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { text: "Home", link: "/" },
  { text: "Requirements", link: "/requirements" },
  { text: "Project Summary", link: "/summary" },
];

function Navbar() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ pl: 2, pt: 3 }}>
        <img style={{ maxHeight: 40 }} src="/umsl-logo.png" alt="USML Logo" />
      </Box>
      <List>
        {pages.map((page, index) => (
          <ListItem
            key={page.text}
            disablePadding
            selected={page.link === location.pathname}
          >
            <ListItemButton to={page.link} component={Link}>
              <ListItemText primary={page.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding selected={"/planner" === location.pathname}>
          <ListItemButton href={"/planner"} component={Button}>
            <ListItemText primary={"Planner"} sx={{ textTransform: "none" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#fff", color: "#333", mb: 4 }}
        elevation={2}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              style={{ maxHeight: 40 }}
              src="/umsl-logo.png"
              alt="USML Logo"
            />
            <Box
              sx={{
                height: "40px",
                width: "2px",
                backgroundColor: "#333",
                ml: 2,
                display: { xs: "none", md: "block" },
              }}
            ></Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              to="/"
              sx={{
                ml: 2,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              University of Missouri–St. Louis
            </Typography>

            <Box
              sx={{
                justifyContent: "flex-end",
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                justifyContent: "flex-end",
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.text}
                  onClick={toggleDrawer(false)}
                  sx={{
                    my: 2,
                    color: page.link === location.pathname ? "#BA0C2F" : "#333",
                    display: "block",
                    fontWeight: page.link === location.pathname ? 700 : 400,
                  }}
                  to={page.link}
                  component={Link}
                >
                  {page.text}
                </Button>
              ))}
              <Button
                onClick={toggleDrawer(false)}
                sx={{
                  my: 2,
                  color: "/planner" === location.pathname ? "#BA0C2F" : "#333",
                  display: "block",
                  fontWeight: "/planner" === location.pathname ? 700 : 400,
                }}
                href={"/planner"}
              >
                Planner
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
export default Navbar;
