import React, { useState } from "react";
import styles from "../../styles/Order.module.css";
import Image from "next/image";
import Summary from "../../components/Summary";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import {
  FaRegCreditCard,
  FaCheckCircle,
  FaHamburger,
  FaTruck,
  FaRocket,
  FaSmileBeam,
  FaShippingFast,
  FaChild,
} from "react-icons/fa";

const Order = ({ orders }) => {
  const { products, total } = useSelector((state) => state.cart);
  const router = useRouter()
  const status = 0;
  const { id } = router.query

  const statusClass = (index) => {
    const currentOrder = orders.filter((order) => order._id === id)[0]
    console.log(currentOrder)

    if (index - currentOrder.status < 1) return styles.done;
    if (index - currentOrder.status === 1) return styles.inProgress;
    if (index - currentOrder.status  > 1) return styles.undone;
  };

  let latestBurger = orders[orders.length - 1];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.generalInfo}>
          <div className={styles.bloc}>
            <h2>Order ID</h2>
            <p>{latestBurger._id}</p>
          </div>
          <div className={styles.bloc}>
            <h2>Customer</h2>
            <p>{latestBurger.customer}</p>
          </div>
          <div className={styles.bloc}>
            <h2>Address</h2>
            <p>{latestBurger.address}</p>
          </div>
          <div className={styles.bloc}>
            <h2>Total</h2>
            <p>${latestBurger.total.toFixed(2)}</p>
          </div>
        </div>
        <div className={styles.stepProgressBar}>
          <div className={styles.row}>
            <div
              className={`${styles.paymentBloc}  ${statusClass(
                0
              )}`}
            >
              <FaRegCreditCard size={28} />
              <span>Payment</span>
              <div className={styles.checkedIcon}>
                <FaCheckCircle size={23} className={styles.checkedIcon} />
              </div>
            </div>
            <div className={`${styles.paymentBloc}  ${statusClass(1)}`}>
              <FaHamburger size={28} />
              <span>Preparing</span>
              <div className={styles.checkedIcon}>
                <FaCheckCircle size={23} className={styles.checkedIcon} />
              </div>
            </div>
            <div className={`${styles.paymentBloc} ${statusClass(2)}`}>
              <FaTruck size={28} />
              <span>On the way</span>
              <div className={styles.checkedIcon}>
                <FaCheckCircle size={23} className={styles.checkedIcon} />
              </div>
            </div>
            <div className={`${styles.paymentBloc} ${statusClass(3)}`}>
              <FaChild size={28} />
              <span>Delivered</span>
              <div className={styles.checkedIcon}>
                <FaCheckCircle size={23} className={styles.checkedIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={`${styles.summary} ${styles.paid} `}>
          <h2>Summary</h2>
          <hr className={styles.line}></hr>
          <div className={styles.info}>
            {latestBurger.products.map((product) => {
              return (
                <div className={styles.summaryBurgerExtras}>
                  <div className={styles.burgerInfo}>
                    <div className={styles.titleAndQtd}>
                      <h4>{product.qtd}x</h4>
                      <div>
                        <h3>{product.title}</h3>
                        {product.extraOptions.map((extra) => {
                           return extra.text.map((t) => {
                              return <span>{t}<br></br></span>
                            })
                        })}
                      </div>
                    </div>

                    <div>
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <hr className={styles.line}></hr>
            <div className={styles.extras}>
              <h3>Subtotal:</h3>
              <span>${latestBurger.total.toFixed(2)}</span>
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
              <span className={styles.totalPrice}>
                ${latestBurger.total.toFixed(2)}
              </span>
            </div>
          </div>
          <hr className={styles.line}></hr>

          <button className={`${styles.button} ${styles.paidButton}`}>
            Paid
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/orders");
  return {
    props: {
      orders: res.data,
    },
  };
};
