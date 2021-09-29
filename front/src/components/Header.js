import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "./common/Link";
import { Avatar, styled } from "@material-ui/core";
import { DesktopGrid, MobileGrid } from "./common/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();

  return (
    <>
      {/* <AppBar color={"inherit"}> */}
      <Toolbar>
        <Grid container alignItems={"center"}>
          <Grid item xs={3}>
            <div onClick={() => history.push("/")} style={{ cursor: "pointer" }}>
              <StyledImg src={"/logo.jpg"} alt={"logo"} />
            </div>
          </Grid>
          <Grid item xs={9}>
            <DesktopGrid container spacing={10} justifyContent={"flex-end"}>
              <Grid item>
                <Link linkName={"THEME"} linkUrl={"/theme"} />
              </Grid>
              <Grid item>
                <Link linkName={"RESERVATION"} linkUrl={"/reservation"} />
              </Grid>
            </DesktopGrid>
            <MobileGrid container justifyContent={"flex-end"}>
              <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
                <MenuIcon sx={{ width: 36, height: 36 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => history.push("/theme")}>
                  {/* <Link linkName={"THEME"} linkUrl={"/theme"} /> */}
                  <Typography variant={"h6"}>THEME</Typography>
                </MenuItem>
                <MenuItem onClick={() => history.push("/reservation")}>
                  <Typography variant={"h6"}>RESERVATION</Typography>
                </MenuItem>
              </Menu>
            </MobileGrid>
          </Grid>
        </Grid>
      </Toolbar>
    </>
  );
}

const StyledImg = styled("img")(({ theme }) => ({
  width: 160,
  height: 43,
  [theme.breakpoints.down("lg")]: {
    width: 130,
    height: 35,
  },
}));

export default Header;
