import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import UserInfo from "./pages/users/user-info";
import BindingConfirm from "./pages/bindings";
 import OrderPage from "./pages/orders";


function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact component={HomePage} />
        <Route path={"/login"} component={LoginPage} />
        <Route path={"/users"} component={UserInfo} />
        <Route path={"/bindings"} component={BindingConfirm} />
        <Route path={"/orders"} component={OrderPage} />

        <Redirect to="https://docs.zalopay.vn" />
      </Switch>
    </Router>
  );
}

export default App;
