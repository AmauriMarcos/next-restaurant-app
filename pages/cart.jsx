import React from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";

const Cart = () => {
  const burgerChoose = {
    id: 3,
    url: "/img/burger.png",
    title: "FIORI DI ZUCCA",
    price: "$19.90",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <div className={styles.imgBox}>
          <Image
            src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80"
            width={200}
            height={120}
            alt=""
            objectFit="cover"
          />
        </div>

        <div className={styles.description}>
          <h2>{burgerChoose.title}</h2>
          <div className={styles.blocText}>
            <h4>Extras:</h4>
            <span>Double ingredients, extra sauce, double cheese</span>
          </div>
          <div className={styles.blocText}>
            <h4>Quantity:</h4>
            <span>1</span>
          </div>

          <div className={styles.operationalBloc}>
            <button className={styles.operationalButton}>Remove</button>
            <button className={styles.operationalButton}>Edit</button>
        </div>
        </div>

        <h2 className={styles.price}>$23.90</h2>

    
      </div>

      <div className={styles.summary}>
        <h2>Summary</h2>
        <hr className={styles.line}></hr>
        <div className={styles.info}>
          <div className={styles.extras}>
            <h3>Subtotal:</h3>
            <span>$19.90</span>
          </div>
        </div>
        <hr className={styles.line}></hr>
        <div className={styles.info}>
          <div className={styles.extras}>
            <h3>Double ingredients</h3>
            <span>$4.5</span>
          </div>

          <div className={styles.extras}>
            <h3>Extra Sauce</h3>
            <span>$1</span>
          </div>

          <div className={styles.extras}>
            <h3>Double Cheese</h3>
            <span>$2</span>
          </div>
        </div>
        <hr className={styles.line}></hr>
        <div className={styles.info}>
          <div className={styles.extras}>
            <h2>Total</h2>
            <span className={styles.totalPrice}>$19.90</span>
          </div>
        </div>
        <hr className={styles.line}></hr>
        <button className={styles.button}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
