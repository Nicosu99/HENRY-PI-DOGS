import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Welcome.module.css";
import fondo from "../assets/DogsWelcome.jpg"

const Welcome = () => {
  return (
    <div className={styles.main}>

        <div className={styles.overlay}></div>

        <img className={styles.fondo} src={fondo} alt="Fondo" />

        <div className={styles.content}>
            <div className={styles.welcome}>
                <h1 className={styles.h}>Welcome!</h1>
                <p className={styles.p}> On this site, you will find a wide variety of dog breeds, each with their own unique characteristics. Explore our collection of information cards and find out more about each breed. Dive into the world of dog breeds and find your perfect companion!
                </p>
                <Link to="/home" className={styles.button}>
                LEARN MORE
                </Link>
            </div>


        </div>
    </div>
  );
};

export default Welcome;
