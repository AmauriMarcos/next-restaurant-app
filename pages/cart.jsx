import React from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import CartProduct from "../components/CartProduct";
import { useSelector } from "react-redux";

const Cart = () => {
  const state = useSelector((state) => state.cart);
  const { products, total } = state;


  return (
    <div className={styles.container}>
      <div className={styles.cartBox}>
        {products.map((product) => {
          return (
            <CartProduct key={product.id} burgerData={product} total={total} />
          );
        })}
      </div>

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
        <button className={styles.button}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
