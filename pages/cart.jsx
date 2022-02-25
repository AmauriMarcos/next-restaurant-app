import React from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import CartProduct from "../components/CartProduct";
import { useSelector } from "react-redux";
import Summary from "../components/Summary";
import {useRouter} from 'next/router';

const Cart = () => {
  const state = useSelector((state) => state.cart);
  const { products, total } = state;

 const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.cartBox}>
        {products.map((product) => {
          return (
            <CartProduct key={product.id} burgerData={product} total={total} />
          );
        })}
      </div>

      <Summary routerFlag={router.pathname} products={products} total={total}/>
    </div>
  );
};

export default Cart;
