import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { me } from "./store";
import Login_Page from "./components/LoginSignup/Login_Page";
import SignUp_Page from "./components/LoginSignup/SignUp_Page";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import Bio from "./components/bio/Bio";
import Login_Popup from "./components/LoginSignup/Login_Popup";
import Product_Edit from "./components/products/Product_Edit";
import Checkout_Page from "./components/checkout/Checkout_Page";
import Previous_Orders_Page from "./components/previous_orders/Previous_Orders_Page";
import CreateProduct from "./components/products/CreateProduct";
import Product from "./components/products/Product";
import Single_Category_Page from "./components/categories/Single_Category_Page";

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  return (
    <div>
      <Switch>
        <Route
          exact
          path={[
            "/",
            "/home",
            "/products/sorted/a-z",
            "/products/sorted/price/low-high",
            "/products/sorted/price/high-low",
          ]}
          component={Products}
        />

        <Route
          exact
          path="/products/Crypto_Punks"
          component={Single_Category_Page}
        />
        <Route
          exact
          path="/products/Tasty_Bones"
          component={Single_Category_Page}
        />
        <Route
          exact
          path="/products/Clone_X"
          component={Single_Category_Page}
        />
        <Route exact path="/products/Azuki" component={Single_Category_Page} />
        <Route
          exact
          path="/products/The_Metascapes"
          component={Single_Category_Page}
        />
        <Route
          exact
          path="/products/The_Ladies"
          component={Single_Category_Page}
        />
        <Route
          exact
          path="/products/Grumpets"
          component={Single_Category_Page}
        />
        <Route
          exact
          path="/products/Little_Lemon_Friends"
          component={Single_Category_Page}
        />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/bio" component={Bio} />
        <Route exact path="/products/:id" component={Product} />

        <Route exact path="/orders/checkout" component={Checkout_Page} />
        <Route
          exact
          path="/orders/previous_orders"
          component={Previous_Orders_Page}
        />
        <Route exact path="/login" exact component={Login_Page} />
        <Route exact path="/signup" exact component={SignUp_Page} />

        <Route exact path="/products/edit/:id" component={Product_Edit} />
        <Route exact path="/create-product" component={CreateProduct} />
      </Switch>
    </div>
  );
};

export default Routes;
