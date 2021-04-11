import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { ClearAll, CodeRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function MenuApp() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#236bff" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <ClearAll />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ZaloPay InApp
          </Typography>
          <Button color="inherit">
            <CodeRounded />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuApp;
