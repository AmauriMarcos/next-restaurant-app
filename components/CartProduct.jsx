import React from "react";
import styles from "../styles/CartProduct.module.css";
import Image from "next/image";
import { removeProduct } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const CartProduct = ({ burgerData, total }) => {
  const {
    id,
    title,
    img,
    burgerPrice,
    burgerQtd,
    extraIngredients,
    unitPrice,
  } = burgerData;

  const dispatch = useDispatch();

  const burgerTotal = burgerPrice * burgerQtd;

  const removeProductFromCart = (e) => {
    e.preventDefault();
    dispatch(removeProduct({ id, burgerTotal }));
  };
  return (
    <div className={styles.cart}>
      <div className={styles.imgBox} >
        <Image       
          src={`${img}`}
          width={250}
          height={180}
          alt=""
          objectFit="cover"
        />
      </div>

      <div className={styles.description}>
        <h2>{title}</h2>
        <div className={styles.blocText}>
          <h4>Extras:</h4>
          {extraIngredients.map((extra) => {
            return <span>{extra.text},</span>;
          })}
        </div>
        <div className={styles.blocText}>
          <h4>Quantity:</h4>
          <span>{burgerQtd}</span>
        </div>
        <div className={styles.blocText}>
          <h4>Price:</h4>
          <span>${unitPrice}</span>
        </div>

        <div className={styles.operationalBloc}>
          <button
            onClick={removeProductFromCart}
            className={styles.operationalButton}
          >
            Remove
          </button>
          <button className={styles.operationalButton}>Edit</button>
        </div>
      </div>

      <h2 className={styles.price}>${burgerPrice.toFixed(2)}</h2>
    </div>
  );
};

export default CartProduct;
