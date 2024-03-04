import React, { useEffect, useState } from "react";
import "../cssModules/checkout.css";
import saf from "../assets/mpesa.png";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import OrderItems from "./OrderItems";


const Checkout = () => {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState('');
  const [street, setStreet] = useState("");

  const txt = JSON.parse(localStorage.getItem("cartItems"));
  //   console.log(txt[0].product.price)
  let price = String(txt[0].product.price);
  let total_price = String(txt[0].product.price);
  let animal = String(txt[0].product.id);
  let quantity = String(txt[0].qty);
  const amount = Math.round(price);
  
  // console.log({nesh: [city,street,phoneNumber,user,animal,total_price,address]})
  const postCart = async () => {
   
    let  paid_amount= total_price;
    let contact_number= phoneNumber;

    fetch("https://django-rest-api-x6mz.onrender.com/farm/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        animal,
        paid_amount,
        user,
        contact_number,
        street,
        city,
        address,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error("Error:", error));

}

  useEffect(() => {
    // Retrieve cookie value
    const cookieValue = Cookies.get("access");
    setUser(jwtDecode(cookieValue).user_id);
  }, []);
// console.log(user)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here
    postCart();
    daraja();
  };

  const daraja = () => {
    fetch("https://django-rest-api-x6mz.onrender.com/farm/stk/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        phoneNumber,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div className="container p-0 checkout-body">
        <div className="m-3 arrow">
            <Link className="" to="/cart"><IoMdArrowBack /></Link>
            <label className="p-3">Place your order</label>
        </div>
        <div className="row">
          <div className="col-md-6 gepetto">
          <OrderItems/>
          </div>
          <div className=" col-md-6">
          <div className="card px-4">
          <p className="h8 py-3">Payment Details</p>
          <div className="row gx-3">
            <div class="col-md-6">
              <div className="d-flex flex-column">
                <p className="text mb-1">City</p>
                <input className="form-control mb-3" type="text" placeholder="city"
                value={city} onChange={(e) => setCity(e.target.value)}/>
              </div>
            </div>
            <div class="col-md-6">
              <div className="d-flex flex-column">
                <p className="text mb-1">Street</p>
                <input className="form-control mb-3" type="text" placeholder="street"
                value={street} onChange={(e) => setStreet(e.target.value)}/>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-column">
                <p className="text mb-1">Address</p>
                <input className="form-control mb-3" type="text" placeholder="1234 Main St"
                value={address} onChange={e => setAddress(e.target.value)}/>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-column">
                <p className="text mb-2">Mpesa only</p>
                <img className="mpesa mb-2" src={saf} alt="mpesa" />
              </div>
            </div>

            <div className="col-12">
              <div className="d-flex flex-column">
                <p className="text mb-1">Phone Number</p>
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="2547XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-column">
                <p className="text mb-1"> Total Amount</p>
                <p className="form-control mb-3 p-3">{price}</p>
              </div>
            </div>

            <div className="col-12">
              <button className="btn btn-primary mb-2" onClick={handleSubmit}>
                <span className="ps-3">Pay ({price})</span>
                <span className="fas fa-arrow-right"></span>
              </button>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
