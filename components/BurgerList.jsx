import React from "react";
import styles from "../styles/BurgerList.module.css";
import BurgerCard from "./BurgerCard";

const BurgerList = () => {
  const burgers = [
    {
      id: 1,
      url: "/img/burger1-transformed.png",
      title: "FIORI DI ZUCCA",
      price: "$19.90",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      url: "/img/burger2-transformed.png",
      title: "FIORI DI ZUCCA",
      price: "$19.90",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      url: "/img/burger.png",
      title: "FIORI DI ZUCCA",
      price: "$19.90",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 4,
      url: "/img/burger4-transformed.png",
      title: "FIORI DI ZUCCA",
      price: "$19.90",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 5,
      url: "/img/burger5-transformed.png",
      title: "FIORI DI ZUCCA",
      price: "$19.90",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 6,
      url: "/img/burger6-transformed.png",
      title: "FIORI DI ZUCCA",
      price: "$19.90",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our brutal selection!</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {burgers.map((burger) => {
          return (
            <BurgerCard
              key={burger.id}
              id={burger.id}
              img={burger.url}
              title={burger.title}
              price={burger.price}
              desc={burger.desc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BurgerList;
