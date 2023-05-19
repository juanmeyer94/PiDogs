import React from "react";
import styles from "./modal.module.css";

const Modal = ({ show, handleClose }) => {
  const showHideClassName = show ? `${styles.modal} ${styles.displayBlock}` : `${styles.modal} ${styles.displayNone}`;

  return (
    <div className={showHideClassName}>
      <section className={styles.modalMain}>
        <p>El perro ha sido creado con éxito</p>
        <button className={styles.button} onClick={handleClose}>Cerrar</button>
      </section>
    </div>
  );
};

export default Modal;