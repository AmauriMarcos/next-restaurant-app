import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image'
import Featured from '../components/Featured';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Yummy Pizza</title>
        <meta name='description' content='Delivery pizza app'/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <Featured/>
    </div>
  )
}
