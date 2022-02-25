import Image from "next/image";
import styles from "../styles/BurgerCard.module.css";
import Link from "next/link";

const BurgerCard = ({ id, img, title, price, desc }) => {
  
  return (
    <Link href={`/burger/${id}`}>
      <div className={styles.container}>
        <Image src={img} alt="" width="400" height="330" objectFit="cover" />
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.price}>{price}</span>
        <p className={styles.desc}>{desc}</p>
      </div>
    </Link>
  );
};

export default BurgerCard;
