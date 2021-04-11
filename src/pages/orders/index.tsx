import React from "react";
import CreateOrderAPI from "../../components/createorder/create-order";
import {AppStoreProvider} from "../../components/createorder/store";

function OrderPage() {
    return (
        <>
            <AppStoreProvider>
                {/*<MenuApp />*/}
                <CreateOrderAPI />
            </AppStoreProvider>
        </>
        )
}

export default OrderPage
