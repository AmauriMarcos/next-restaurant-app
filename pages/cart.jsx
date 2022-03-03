import React from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import CartProduct from "../components/CartProduct";
import { useSelector } from "react-redux";
import Summary from "../components/Summary";
import { useRouter } from "next/router";
import axios from 'axios';
import OrderDetail from "../components/OrderDetail";

const Cart = () => {
  const state = useSelector((state) => state.cart);
  const { products, total, cash } = state;

  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push("/orders/" + res.data._id);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cartBox}>
        {products.map((product) => {
          return (
            <CartProduct key={product.id} burgerData={product} total={total} />
          );
        })}
      </div>

      {cash && <OrderDetail products={products} total={total} createOrder={createOrder} />}

      <Summary routerFlag={router.pathname} createOrder={createOrder} products={products} total={total} />
    </div>
  );
};

export default Cart;
