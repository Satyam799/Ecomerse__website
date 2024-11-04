import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import HomeScreen from "./Screens/HomeScreen";
import Productscreen from "./Screens/Productscreen";
import { Provider } from "react-redux";
import { store } from "../src/Slices/store";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import Shippingscreen from "./Screens/Shippingscreen";
import Privaterourte from "./Component/Privaterourte";
import Paymentscreen from "./Screens/Paymentscreen";
import Placeorder from "./Screens/Placeorder";
import OrderScreen from "./Screens/OrderScreen";
import Profilescreen from "./Screens/Profilescreen";
import OrderListscreen from "./Screens/admin/OrderListscreen";
import Adminroute from "./Component/Adminroute";
import Productlist from "./Screens/admin/Productlist";
import Productedit from "./Screens/admin/Productedit";
import UserList from "./Screens/admin/Userlist";
import Useredit from "./Screens/admin/Useredit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen/>}/>
      <Route path="/page/:pageNumber" element={<HomeScreen/>}/>
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen/>}/>
      <Route path="/product/:id" element={<Productscreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<Privaterourte />}>
        <Route path="/shipping" element={<Shippingscreen />} />
        <Route path="/payment" element={<Paymentscreen />} />
        <Route path="/placeorder" element={<Placeorder />} />
        <Route path="/orders/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<Profilescreen />} />
      </Route>
      <Route path="" element={<Adminroute/>}>
        <Route path="/admin/orderlist" element={<OrderListscreen/>}/>
        <Route path="/admin/productlist" element={<Productlist/>}/>
        <Route path="/admin/productlist/:pageNumber" element={<Productlist/>}/>
        <Route path="/admin/product/:id/edit" element={<Productedit/>}/>
        <Route path="/admin/userlist" element={<UserList/>}/>
        <Route path="/admin/userlist/:id/edit" element={<Useredit/>}/>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
