import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useAppStore } from "./store";

// @ts-ignore
const zaloPay: any = window.ZaloPay;
const queryString = require('query-string');
const parsed = queryString.parse(window.location.search);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "3rem",
    },
    form: {
      width: "100%",
    },
    input: {
      margin: "20px 0",
      "& input:valid + fieldset": {
        borderColor: "#008fe5",
        borderWidth: 1,
      },
      "& input:focus + fieldset": {
        borderColor: "#008fe5 !important",
        borderWidth: 1,
      },
      "& input:invalid + fieldset": {
        borderColor: "#ff6767",
        borderWidth: 1,
      },
    },

    margin: {
      margin: theme.spacing(1),
    },

    pay: {
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

function Order() {
  const classes = useStyles();
  const { app, setApp, token, setToken } = useAppStore();
  const [result, setResult] = useState<string>("");


  useEffect(() => {
    if (typeof parsed.app === 'string') {
      setApp(parsed.app)
    }
    if (typeof parsed.t === 'string') {
      setToken(parsed.t)
    }
  }, [])

  const handleAppOnChange = (e: any) => {
    console.log("handleAppOnChange Value: ", e.target.value);
    setApp(e.target.value);
  };

  const handleTokenOnChange = (e: any) => {
    console.log("handleTokenOnChange Value: ", e.target.value);
    setToken(e.target.value);
  };

  const handlePayOrder = (e: any) => {
    e.preventDefault();
    console.log("app: ", app, "token: ", token);
    zaloPay.payOrder({ appid: app, zptranstoken: token }, callback);
  };

  const handleClearData = () => {
    console.log("cleared");
    setApp("");
    setToken("");
  };

  const handleClose = () => {
    zaloPay.closeWindow();
  };

  const handleToOAPage = () => {
    zaloPay.call(
      "launchDeeplink",
      {
        url: "https://zalo.me/1365410903334518373",
      },
      handleClose
    );

    //window.location.href =
    // "https://sbqrpay.zalopay.vn/merchant/shop/124708/follow-oa?id=1365410903334518373";
  };

  const callback = (data: any) => {
    console.log("data callback: ", data);
    if (data.error === 1) {
      setResult("Thanh toán thành công");
    } else if (data.error === 4) {
      setResult("Người dùng huỷ việc thanh toán đơn hàng");
    } else {
      setResult(`Thanh toán đơn hàng thất bại với mã lỗi: ${data.errorCode}`);
    }

    setTimeout(() => {
      setResult("");
    }, 5000);
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      className={classes.root}
    >
      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={handlePayOrder}
      >
        <Grid item>
          <TextField
            id="app-input"
            required
            autoFocus={true}
            type={"number"}
            label="App"
            value={app}
            variant="outlined"
            fullWidth
            className={classes.input}
            onChange={handleAppOnChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="token-input"
            required
            label="Token"
            value={token}
            variant="outlined"
            placeholder={"token"}
            fullWidth
            className={classes.input}
            onChange={handleTokenOnChange}
          />
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
            variant={"contained"}
            size={"medium"}
            fullWidth
            className={classes.pay}
            style={{ backgroundColor: "#fc820d" }}
            type={"submit"}
            disabled={
              app === null || app === "" || token == null || token === ""
            }
          >
            Thanh Toán
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={"contained"}
            size={"medium"}
            fullWidth
            className={classes.pay}
            style={{ marginTop: "20px" }}
            href={"/users"}
          >
            User Info
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={"contained"}
            size={"medium"}
            fullWidth
            className={classes.pay}
            style={{ marginTop: "20px" }}
            href={"/bindings"}
          >
            Binding
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={"contained"}
            size={"medium"}
            fullWidth
            className={classes.pay}
            style={{ marginTop: "20px" }}
            onClick={handleToOAPage}
          >
            FollowOA (2553)
          </Button>
        </Grid>
      </form>
      <p style={{ paddingTop: "20px", color: "#737373" }}>{result}</p>
    </Grid>
  );
}

export default Order;
