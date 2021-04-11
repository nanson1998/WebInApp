import React from "react";
import Order from "../../components/home/create-order";
import { AppStoreProvider } from "../../components/home/store";

function HomePage() {
  return (
    <>
      <AppStoreProvider>
        {/*<MenuApp />*/}
        <Order />
      </AppStoreProvider>
    </>
  );
}

export default HomePage;
