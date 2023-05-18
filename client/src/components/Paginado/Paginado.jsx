import React from "react";
import styles from "./Paginado.module.css"

export default function Paginado({ dogsPerPage, dogs, paginado }) {
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(dogs / dogsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className={styles.paginado}>

                {pageNumbers && pageNumbers.map(number => (
                    <li className={styles.number} key={number}>
                        <button onClick={() => paginado(number)}>{number} </button>
                    </li>
                ))}


            </ul>
        </nav>
        )

} 