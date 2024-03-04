import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssModules/Header.css";
import Cookies from "js-cookie";
import { ShoppingCart } from "phosphor-react";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("access");
  const { cartItems } = useSelector((state) => state?.carts);
  

  const handleClick = () => {
    // Remove the JWT token cookie
    Cookies.remove("access");

    // Check if the cookie is successfully removed
    if (!Cookies.get("access")) {
      // Navigate to the home route
      navigate("/");
    }
  };

  return (
    <div className="header">
      <div className="container header">
        <div className="logo">FarmArt</div>
        <div className="end">
          {token ? (
            <div>
              <Link to="/about-us">About Us</Link>
              <Link to="/cart">
                <ShoppingCart size={24}></ShoppingCart>
                ({cartItems?.length})
              </Link>
              <Link to="/contact"> Contact </Link>
              <Link to="/logout"> Logout </Link>
            </div>
          ) : (
            <div>
              <Link to="/">Home</Link>
              <Link to="/sign-in"> Login </Link>
              <Link to="/sign-up"> Signup </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
