import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Summary.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { reset } from "../redux/cartSlice";
import { cashPayment } from "../redux/cartSlice";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const Summary = ({ products, total, createOrder }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCash = () => {
    dispatch(cashPayment())
  }

  const showPaymentMethodButton = () => {
    setOpen(true);
  };

 /*  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push("/orders/" + res.data._id);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  }; */

  // This values are the props in the UI
  const amount = total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

   
    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;

              var newProducts = [];
          
              products.map((product)=> {
                var obj = {
                  title: product.title,
                  price: product.burgerPrice,
                  qtd: product.burgerQtd,
                  extraOptions: {
                    text: product.extraIngredients.map((extraIngredient) => extraIngredient.text),
                    price: product.extraIngredients.map((extraIngredient) => extraIngredient.price)
                  }
                }

                newProducts.push(obj)
                return newProducts
              });
             
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                products: newProducts,
                total: total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={`${styles.summary} ${router.pathname === "/orders/[id]" ? styles.paid : null}`}>
      <h2>Summary</h2>
      <hr className={styles.line}></hr>
      <div className={styles.info}>
        {products.map((product) => {
          return (
            <div className={styles.summaryBurgerExtras}>
              <div className={styles.burgerInfo}>
                <div className={styles.titleAndQtd}>
                  <h4>{product.burgerQtd}x</h4>
                  <h3>{product.title}</h3>
                </div>

                <div>
                  <span>${product.burgerTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className={styles.extraIngredients}>
                {product.extraIngredients.map((extra) => {
                  return (
                    <>
                      <span>{extra.text}</span>
                      <br></br>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
        <hr className={styles.line}></hr>
        <div className={styles.extras}>
          <h3>Subtotal:</h3>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <hr className={styles.line}></hr>
      <div className={styles.info}>
        <div className={styles.extras}>
          <h3>Discount:</h3>
          <span>0.00</span>
        </div>
      </div>
      <hr className={styles.line}></hr>
      <div className={styles.info}>
        <div className={styles.extras}>
          <h2>Total</h2>
          <span className={styles.totalPrice}>${total.toFixed(2)}</span>
        </div>
      </div>
      <hr className={styles.line}></hr>
    
      <button onClick={showPaymentMethodButton} className={styles.button}>
        Checkout
      </button>
     
      {open && (
        <>
          <button
            style={{ margin: "1rem 0 1rem 0", width: "100%" }}
            className={styles.button}
            onClick={handleCash}
          >
            Cash on delivery
          </button>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AS8GMLPSFjvsTowx_kIZM-ebsU7_ZB_Say3lUY8b2CS5hquM16AEZGw_UqD7h2GQp1EMqSZ604XhSlQ4",
              components: "buttons",
              currency: "USD",
              "disable-funding": "credit,card,p24",
            }}
          >
            <ButtonWrapper currency={currency} showSpinner={false} />
          </PayPalScriptProvider>
        </>
      )}
    </div>
  );
};

export default Summary;
