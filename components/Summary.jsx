import React, { useState, useEffect } from "react";
import styles from "../styles/Summary.module.css";
import { useRouter } from "next/router";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const Summary = ({ products, total, routerFlag }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/orders/2");
  };

  const handleOrder = () => {
    router.push("/orders/2");
    setOpen(true);
  };

  // This values are the props in the UI
  const amount = "2";
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
            return actions.order.capture().then(function () {
              // Your code here after capture the order
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.summary}>
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
      {routerFlag === "/cart" ? (
        <button onClick={handleCheckout} className={styles.button}>
          Checkout
        </button>
      ) : (
        <>
          {/*           <div className={styles.paypal}> */}
          {open ? (
            <div>
              <button
                style={{ margin: "1rem 0 1rem 0", width: '100%'}}
                className={styles.button}
              >
                Cash on delivery
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id": "test",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              style={{ marginBottom: ".5rem" }}
              onClick={handleOrder}
              className={styles.button}
            >
              Checkout now!
            </button>
          )}
          {/*  </div> */}
        </>
      )}
    </div>
  );
};

export default Summary;
