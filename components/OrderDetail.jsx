import React, {useState} from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({total, createOrder, products}) => {
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [address,setAddress] = useState('');


  const paymentData = {
      customer,
      phone,
      address
  }

  const handleCashPayment = (e) =>{
      e.preventDefault();
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

      createOrder({...paymentData, total, method: 0, products: newProducts})
  }


  return (
    <div className={styles.container}>
     
      <form onSubmit={handleCashPayment}>
        <h2>You will pay ${total} after delivery</h2>
        <div className={styles.formBloc}>
          <label className={styles.label} htmlFor="customer">Name Surname</label>
          <input className={styles.input} onChange={(e) => setCustomer(e.target.value)} type="text" name="customer" />
        </div >
        <div className={styles.formBloc}>
          <label className={styles.label} htmlFor="phone">Phone number</label>
          <input className={styles.input} onChange={(e) => setPhone(e.target.value)} type="text" name="phone" />
        </div>
        <div className={styles.formBloc}>
          <label className={styles.label} htmlFor="address">Address</label>
          <textarea className={styles.textarea} onChange={(e) => setAddress(e.target.value)} name="address" />
        </div>
        <button type="submit" className={styles.btn}>Order</button>
      </form>
    </div>
  );
};

export default OrderDetail;
