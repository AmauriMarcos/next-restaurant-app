import React from "react";
import styles from "../styles/BurgerList.module.css";
import BurgerCard from "./BurgerCard";
import axios from 'axios';
import useSWR from 'swr';

const BurgerList = () => {
  
  const fetcher = url => axios.get(url).then(res => res.data);
  const { data, error } = useSWR('http://localhost:3000/api/getAllBurgers', fetcher, {
    refreshInterval: 1000
  });

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our brutal selection!</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {data.map((burger) => {
          return (
            <BurgerCard
              key={burger.id}
              id={burger.id}
              img={burger.url}
              title={burger.title}
              price={burger.price}
              desc={burger.burger_description}
            />
          );
        })}
      </div>
    </div>
  );
};


export default BurgerList;
