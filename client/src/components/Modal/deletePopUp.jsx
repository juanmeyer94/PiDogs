import React from "react";
import styles from "./modal.module.css";
import { Link } from "react-router-dom";

const DeleteModal = ({ show, handleClose }) => {
  const showHideClassName = show ? `${styles.modal} ${styles.displayBlock}` : `${styles.modal} ${styles.displayNone}`;

  return (
    <div className={showHideClassName}>
      <section className={styles.modalMain}>
        <p>El perro ha sido modificado con éxito</p>
        <button className={styles.button} onClick={handleClose}>Cerrar</button>
        <Link to='/home'><button className={styles.button} type="submit"> HOME</button></Link>
      </section>
    </div>
  );
};

export default DeleteModal