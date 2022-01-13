import styles from '../styles/Featured.module.css';
import Image from 'next/image';

const Featured = () => {

    const images = [
        "/img/featured.png",
        "/img/featured2.png",
        "/img/featured3.png",
      ];

    return (
        <div className={styles.container}>
             <div className={styles.arrowContainer}>
                <Image src="/img/arrowl.png" alt="" width={50} height={50}/>
             </div>
            
            <div className={styles.wrapper}>
                {images.map((img, i) => (
                    <div className={styles.imgContainer} key={i}>
                        <Image src="/img/featured2.png" alt="" layout="fill" objectFit="contain"/>  
                    </div>
                ))}     
            </div>

            <div className={styles.arrowContainer}>
                <Image src="/img/arrowr.png" alt="" width={50} height={50}/>
             </div>
        </div>
    )
}

export default Featured
