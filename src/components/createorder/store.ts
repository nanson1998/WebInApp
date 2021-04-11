import { useState } from "react";
import constate from "constate";

const InAppFactory = () => {
    const [appId, setAppID] = useState<any>("");
    const [appUser, setAppUser] = useState<string>("");
    const [amount, setAmount] = useState<any>("");
    const [embedData, setEmbedData] = useState<string>("");
    const [Item, setItem] = useState<string>("");
    const [mackey, setMacKey] = useState<string>("");
    return {
        appId, setAppID,
        appUser, setAppUser,
        amount, setAmount,
        embedData, setEmbedData,
        Item, setItem,
        mackey, setMacKey,

    };
};

export const [AppStoreProvider, useFullPaymentStore] = constate(InAppFactory);
