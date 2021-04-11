import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// @ts-ignore
const zaloPay: any = window.ZaloPay;

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

function BindingConfirm() {
  const classes = useStyles();
  const [deeplink, setDeeplink] = useState<string>("");
  const [shortLink, setShortLink] = useState<string>("");

  const handleDeeplinkChange = (e: any) => {
    console.log("handleDeeplinkChange Value: ", e.target.value);
    setDeeplink(e.target.value);
  };

  const handlerShortLinkChange = (e: any) => {
    setShortLink(e.target.value);
    console.log("handlerShortLinkChange::", e.target.value);
  };

  const handleBindingLink = (e: any) => {
    e.preventDefault();
    console.log("deeplink::", deeplink);
    console.log("shortLink::", shortLink);

    if (deeplink && deeplink.length > 0) {
      zaloPay.call("launchDeeplink", { url: deeplink }, (cb: any) => {
        console.log("callback launchDeeplink: ", cb);
      });
    } else {
      handleShortLink();
    }
  };

  const handleShortLink = () => {
    setTimeout(()=>{
      console.log("callback shortLink::", shortLink);
      window.location.href = shortLink;
    }, 2000);
  }

  const handleClearData = () => {
    setShortLink("");
    setDeeplink("");
  };

  return (
    <>
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
          onSubmit={handleBindingLink}
        >
          <Grid item>
              <TextField
                id="app-input"
                autoFocus={true}
                label="Deeplink"
                value={deeplink}
                variant="outlined"
                fullWidth
                className={classes.input}
                onChange={handleDeeplinkChange}
              />
          </Grid>

          <Grid item>
            <TextField
                id="short-link-input"
                autoFocus={true}
                label="ShortLink"
                value={shortLink}
                variant="outlined"
                fullWidth
                className={classes.input}
                onChange={handlerShortLinkChange}
            />
          </Grid>

          <Grid item>
            <Button
              variant={"contained"}
              size={"medium"}
              fullWidth
              className={classes.button}
              type={"submit"}
              disabled={(deeplink == null || deeplink === "") && (shortLink == null || shortLink === "") }
            >
              Binding Now
            </Button>
          </Grid>
          <span className={classes.margin} />
          <Grid item>
            <Button
              variant={"contained"}
              size={"medium"}
              fullWidth
              className={classes.button}
              href={"/"}
            >
              Home
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
        </form>
      </Grid>
    </>
  );
}

export default BindingConfirm;
