import { useState } from "react";
import constate from "constate";

const InAppFactory = () => {
  const [app, setApp] = useState<any>("");
  const [token, setToken] = useState<string>("");
  return {
    app,
    setApp,

    token,
    setToken,
  };
};

export const [AppStoreProvider, useAppStore] = constate(InAppFactory);
