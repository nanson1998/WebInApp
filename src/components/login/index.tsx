import React, { useEffect, useState } from "react";
import { loginWithEmail } from "../../lib/api/api";
import { Button } from "@material-ui/core";
import { keyUserLoginToken } from "../../lib/config/keys";

function LoginComponent() {
  let [user, setUser] = useState<any>("not login");

  const handleLogin = async () => {
    const response = await loginWithEmail("ncn001-dl", "12345");
    console.log("data:", JSON.stringify(response, null, 2));
    if (!response.success) {
      if (response.error === 401) {
        localStorage.removeItem(keyUserLoginToken);
        window.location.href = "http://localhost:3000/login";
      } else {
        // todo: handle error -> show message
        setUser(JSON.stringify(response, null, 2));
      }
    } else {
      localStorage.setItem(keyUserLoginToken, JSON.stringify(response));
      setTimeout(() => {
        handleLogged();
      }, 3000);
    }
  };

  useEffect(() => {
    handleLogged();
  }, [user]);

  function handleLogged() {
    const uLocal = localStorage.getItem(keyUserLoginToken);
    console.log("uLocal: ", uLocal);
    // todo: goto dashboard or homepage
    if (uLocal) {
      window.location.href = "http://localhost:3000";
    }
  }

  return (
    <>
      <p>Login</p>
      <pre>{user}</pre>
      <Button onClick={handleLogin}>Login</Button>
    </>
  );
}

export default LoginComponent;
