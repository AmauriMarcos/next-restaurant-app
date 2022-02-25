import React from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const state = useSelector((state) => state.cart.products);

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.texts}>
                    <div className={styles.text}>ORDER NOW!</div>
                    <div className={styles.text}>012 345 678</div>
                </div>
            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <Link href="/">
                        <li className={styles.listItem}>Homepage</li>
                    </Link>
                    <li className={styles.listItem}>Menu</li>

                    <Image src="/img/logo.png" alt="" width={120} height={70} />

                    <li className={styles.listItem}>About</li>
                    <li className={styles.listItem}>Contact</li>
                </ul>
            </div>
            <Link href="/cart">
            <div className={styles.item}>
                <div className={styles.cart}>
                    <Image src="/img/cart.png" alt="" width={30} height={30} />
                    <div className={styles.counter}>{state.length}</div>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default Navbar
