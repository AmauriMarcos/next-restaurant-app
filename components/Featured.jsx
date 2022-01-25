import React from 'react';
import styles from '../styles/Featured.module.css';
import Image from 'next/image';

const Featured = () => {

    return (
        <div className={styles.container}>
            <div className={styles.bloc}>
                <h4>Fresh</h4>
                <h1 className={styles.title}>Bur</h1>
                <p>Lorem ipsum dolor sit amet, <br></br> consectetur adipiscing elit.</p>
                <button className={styles.button}>Delivery</button>
            </div>

            <div className={styles.imgBloc}>
                <Image  src="/img/burger.png" alt="" layout='fill' objectFit='cover'/>
            </div>
            
               
            <div className={styles.bloc}>             
                <h1 className={styles.title}>Ger</h1>
            </div>
        </div>
    )
}

export default Featured;
