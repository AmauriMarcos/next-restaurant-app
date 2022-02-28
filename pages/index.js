import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image'
import Featured from '../components/Featured';
import BurgerList from '../components/BurgerList';
import axios from 'axios';

export default function Home({burgerData}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Yummy Pizza</title>
        <meta name='description' content='Delivery pizza app'/>
        <link href="https://fonts.googleapis.com/css2?family=Bakbak+One&family=Montserrat:wght@100;200;300;400;900&family=Oleo+Script&family=Pattaya&display=swap" rel="stylesheet"></link>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <Featured/>
     
      <BurgerList data={burgerData}/>
    </div>
  )
}

  export const getServerSideProps = async() => {
    const res = await axios.get("http://localhost:3000/api/products");
    return{
      props: {
        burgerData: res.data
      }
    }
  }
