import { NavLink } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.message}>
        
        <h1>ERROR 404 PAGET NOT FOUND</h1>
        <p>La página a la que intentas ingresar no ha sido encontrada</p>
        <NavLink to="./home">
          <button className={styles.button}>BACK TO HOME</button>
        </NavLink>
      </div>
    </div>
  );
}
