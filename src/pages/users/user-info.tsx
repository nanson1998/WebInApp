import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "3rem",
    },

    margin: {
      margin: theme.spacing(1),
    },

    button: {
      padding: "16px 0",
      boxShadow: "none",
      backgroundColor: "#008fe5",
      color: "#f9f9f9",
      "&:hover": {
        boxShadow: "none",
        backgroundColor: "#008fe5",
        color: "#f9f9f9",
      },
    },

    clear: {
      padding: "16px 0",
      color: "#6093ff",
      textTransform: "inherit",
    },
  })
);

const userInfoDefault: string = "User Information";
function UserInfo() {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState<string>(userInfoDefault);

  const handleGetUserInfo = () => {
    // @ts-ignore
    ZaloPay.call("getUserInfo", { appid: 2553 }, (data) => {
      console.log("data callback: ", data);
      setUserInfo(JSON.stringify(data, null, 2));
    });
  };

  const handleClearData = () => {
    setUserInfo(userInfoDefault);
  };

  // @ts-ignore
  const handleCallNow = (e) => {
    e.preventDefault();
    window.open("tel:+1303499-7111", "_parent");
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Button
          variant={"contained"}
          size={"medium"}
          fullWidth
          className={classes.button}
          style={{ marginTop: "20px", padding: "20px" }}
          onClick={handleGetUserInfo}
        >
          Get User Info
        </Button>
      </Grid>

      <Grid item>
        <Button
          variant={"text"}
          size={"medium"}
          fullWidth
          className={classes.clear}
          onClick={handleClearData}
        >
          Xoá data
        </Button>
      </Grid>
      <Grid item>
        <Button
          size={"medium"}
          fullWidth
          className="external"
          onClick={(e) => {
            e.preventDefault();
          }}
          href={"tel:1900545436"}
        >
          Call Now!
        </Button>
      </Grid>
      <a onClick={handleCallNow}>+1234567890</a>
      <a
        className="link external icon-only button button-fill-md button-large-md color-green"
        href="tel:0966936938"
        target="_system"
      >
        Phone
      </a>

      <pre
        style={{
          paddingTop: "20px",
          color: "#737373",
          backgroundColor: "#d6d6d6",
          height: 300,
          width: "100%",
        }}
      >
        {userInfo}
      </pre>
      <Grid item>
        <Button
          variant={"contained"}
          size={"medium"}
          fullWidth
          className={classes.button}
          style={{ marginTop: "20px", padding: "20px 60px" }}
          href={"/"}
        >
          Home
        </Button>
      </Grid>
    </Grid>
  );
}

export default UserInfo;
