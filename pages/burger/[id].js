import React, { useState} from "react";
import styles from "../../styles/BurgerSelected.module.css";
import Image from "next/image";
import {useDispatch} from 'react-redux';
import { addProduct } from "../../redux/cartSlice";
import axios from 'axios';


const Burger = ({burger}) => {

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(burger.price);
  const [extras, setExtras] = useState([]);
  const [add, setAdd] = useState(null);

  const dispatch = useDispatch();

  if (!burger) return <div>loading...</div>

  const handleChange = (e, option) => {
     const checked = e.target.checked;

     if(checked){
       setPrice(prevPrice => prevPrice + option.price)
       setExtras(prevExtras => [...prevExtras, option]);

     }else{
       setPrice(prevPrice => prevPrice - option.price);
       setExtras(extras.filter((extra) => extra._id !== option._id))
     }
  };

  const product = {
    id: burger._id,
    title: burger.title,
    img: burger.img,
    unitPrice: burger.price,
    extraIngredients: extras,
    burgerPrice: price,
    burgerQtd: +quantity,
    burgerTotal: price * +quantity
  }

  const addToTheCart = (e) =>{
    e.preventDefault();
    dispatch(addProduct(product));
    setAdd(true);
  }


  return (
    <div className={styles.container}>
      <div className={styles.boxImg}>
        <Image src={burger.img} layout="fill" alt="" objectFit="cover" />
      </div>
      <div className={styles.content}>
        <div className={styles.titlePriceDesc}>
          <h2>{burger.title}</h2>
          <h4>${price.toFixed(2)}</h4>
          <p>{burger.desc}</p>
        </div>
        <div className={styles.addIngredients}>
          <h3 style={{"marginBottom": "1.5rem"}}>Choose additional ingredients </h3>
          {burger.extraOptions.map((option) =>{
    
            return (
            <div className={styles.option} key={option._id}> 
            <input
              type="checkbox"
              id="double"
              name={option.text}
              className={styles.checkbox}
              onChange={(e) => handleChange(e, option)}
              
            />
            <label className={styles.label} htmlFor="double">
              {option.text}
            </label>
          </div>)
          })}          
         
        </div>
        <div className={styles.add}>
          <h4>QTD</h4>
          <input
            type="number"
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
        </div>
     
          <button className={styles.button} onClick={addToTheCart}>
            Add to cart
          </button>
          {add && <p className={styles.addMessage}>{burger.title} burger has been added to your cart !</p>}
      </div>
    </div>
  );
};

export const getServerSideProps = async({params}) => {

  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return{
    props: {
      burger: res.data
    }
  }
}

export default Burger;
