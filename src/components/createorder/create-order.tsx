import React, { useEffect, useState } from "react";
import axios from "axios";
import {AppZaloPayConfig} from "../../lib/config/keys";
import {useFullPaymentStore} from "./store";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
    })
);
// @ts-ignore
function CreateOrderAPI(){
    const classes = useStyles();
    const { appId, setAppID, appUser, setAppUser,  amount, setAmount, embedData, setEmbedData, Item, setItem,  mackey, setMacKey } = useFullPaymentStore();
    const [result] = useState<string>("");
    useEffect(() => {

        if (typeof parsed.appId === 'string') {
            setAppID(parsed.appId)
        }
        if (typeof parsed.appuser === 'string') {
            setAppUser(parsed.appuser)
        }
        if (typeof parsed.amount === 'string') {
            setAmount(parsed.amount)
        }
        if (typeof parsed.embeddata === 'string') {
            setEmbedData(parsed.embeddata)
        }
        if (typeof parsed.item === 'string') {
            setItem(parsed.item)
        }
        if (typeof parsed.mackey === 'string') {
            setMacKey(parsed.mackey)
        }
    }, [])
    const handleAppOnChange = (e: any) => {
        setAppID(e.target.value);
    };
    const handleAppUserChange = (e: any) => {
        setAppUser(e.target.value);
    };
    const handleAmountChange = (e: any) => {
        setAmount(e.target.value);
    };

    const handleEmbedDataChange = (e: any) => {
        setEmbedData(e.target.value);
    };

    const handleItemChange = (e: any) => {
        setItem(e.target.value);
    };

    const handleMacChange = (e: any) => {
        setMacKey(e.target.value);
    };

    const order = {
        app_id: appId,
        app_user: appUser,
        item: Item,
        embed_data: embedData,
        amount: amount,
        mac_key: mackey,
    };
    let config = {
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 3000
    };

    const handleOrder = async () => {
        console.log("clicked")
        await axios.post(AppZaloPayConfig.Endpoint, order, config)
            .then((data) => {
            console.log("response data")
            console.log(data)
            if (data.data?.order_url) {
                window.location.href = data.data.order_url
            } else {
                console.log('error');
            }

        });
    }

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
            >
                <Grid item>
                    <TextField
                        id="app-input"
                        required
                        autoFocus={true}
                        type={"number"}
                        label="App"
                        value={appId}
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                        onChange={handleAppOnChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="app-user-input"
                        required
                        autoFocus={true}
                        type={"string"}
                        label="AppUser"
                        value={appUser}
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                        onChange={handleAppUserChange}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="token-input"
                        required
                        label="Amount"
                        value={amount}
                        variant="outlined"
                        placeholder={"token"}
                        fullWidth
                        className={classes.input}
                        onChange={handleAmountChange}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="token-input"
                        required
                        label="EmbedData"
                        value={embedData}
                        variant="outlined"
                        placeholder={"token"}
                        fullWidth
                        className={classes.input}
                        onChange={handleEmbedDataChange}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="token-input"
                        required
                        label="Item"
                        value={Item}
                        variant="outlined"
                        placeholder={"token"}
                        fullWidth
                        className={classes.input}
                        onChange={handleItemChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="token-input"
                        required
                        label="Mac"
                        value={mackey}
                        variant="outlined"
                        placeholder={"token"}
                        fullWidth
                        className={classes.input}
                        onChange={handleMacChange}
                    />
                </Grid>
                <Button variant={"outlined"}
                        style={{margin: "0 auto"}}
                        className={classes.pay}
                        onClick={() => handleOrder()}> CreateOrder
                </Button>
            </form>
            <p style={{ paddingTop: "20px", color: "#737373" }}>{result}</p>
        </Grid>

    );
}

export default CreateOrderAPI;
