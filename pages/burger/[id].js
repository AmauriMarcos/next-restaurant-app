import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/BurgerSelected.module.css";
import Image from "next/image";
import axios from 'axios';
import useSWR from 'swr';

const Burger = () => {

  const [double, setDouble] = useState(false);
  const [sauce, setSauce] = useState(false);
  const [cheese, setCheese] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const { id } = router.query;

  const fetcher = url => axios.get(url).then(res => res.data);
  const { data, error } = useSWR(`http://localhost:3000/api/burger/${id}`, fetcher, {
    refreshInterval: 1000
  });


  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log(data);

  const burgerChoose = {
    id: 3,
    url: "/img/burger.png",
    title: "FIORI DI ZUCCA",
    price: "$19.90",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  console.log(double, sauce, cheese);

  const handleProduct = (e) => {
    e.preventDefault();

    if (cheese) {
      setCheese(2.0);
    }
    if (sauce) {
      setSauce(1.5);
    }
    if (double) {
      setDouble(4.5);
    }

    console.log(`Double ingredients: ${double}`);
    console.log(`Extra sauce: ${sauce}`);
    console.log(`Extra cheese: ${cheese}`);
    console.log(`QTD: ${quantity}`);

  };

  return (
    <div className={styles.container}>
      <div className={styles.boxImg}>
        <Image src={data.url} layout="fill" alt="" objectFit="cover" />
      </div>
      <div className={styles.content}>
        <div className={styles.titlePriceDesc}>
          <h2>{data.title}</h2>
          <h4>{data.price}</h4>
          <p>{data.burger_description}</p>
        </div>
        <div className={styles.addIngredients}>
          <h3>Choose additional ingredients </h3>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="double"
              name="double"
              className={styles.checkbox}
              onChange={(e) => setDouble(e.target.checked)}
              value="4.50"
            />
            <label className={styles.label} htmlFor="double">
              Double Ingredients ($4.50)
            </label>
          </div>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="sauce"
              name="sauce"
              className={styles.checkbox}
              onChange={(e) => setSauce(e.target.checked)}
              value="1.50"
            />
            <label className={styles.label} htmlFor="sauce">
              Extra Sauce ($1.00)
            </label>
          </div>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="cheese"
              name="cheese"
              checked={cheese}
              className={styles.checkbox}
              onChange={(e) => setCheese(e.target.checked)}
            />
            <label className={styles.label} htmlFor="cheese">
              Extra Cheese ($2.00)
            </label>
          </div>
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
        <button className={styles.button} onClick={handleProduct}>
          Add to cart
        </button>
      </div>
    </div>
  );
};


export default Burger;
