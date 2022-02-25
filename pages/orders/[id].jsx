import React from "react";
import styles from "../../styles/Order.module.css";
import Image from "next/image";
import Summary from "../../components/Summary";
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

const Order = () => {
  const { products, total } = useSelector((state) => state.cart);

  const status = 0;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.generalInfo}>
          <div className={styles.bloc}>
            <h2>Order ID</h2>
            <p>9039283092</p>
          </div>
          <div className={styles.bloc}>
            <h2>Customer</h2>
            <p>Bryan Scott</p>
          </div>
          <div className={styles.bloc}>
            <h2>Address</h2>
            <p>Milton st. 493-232 TU</p>
          </div>
          <div className={styles.bloc}>
            <h2>Total</h2>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
        <div className={styles.stepProgressBar}>
          <div className={styles.row}>
            <div className={`${styles.paymentBloc} ${statusClass(0)}`}>
              <FaRegCreditCard size={28} />
              <span>Payment</span>
              <div className={styles.checkedIcon}>
                <FaCheckCircle size={23} className={styles.checkedIcon} />
              </div>
            </div>
            <div className={`${styles.paymentBloc} ${statusClass(1)}`}>
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
        <Summary products={products} total={total} />
      </div>
    </div>
  );
};

export default Order;
