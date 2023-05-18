import { useState } from 'react';
import Card from "../Cards/Card"
import styles from "./Container.module.css"
const CardsContainer = ({ dogs }) => {
    const ITEMS_PER_PAGE = 8; // establecer la cantidad de elementos por página
    const [currentPage, setCurrentPage] = useState(1); // establecer el estado inicial de la página actual

    // Asegurarse de que dogs es un array
    if (!Array.isArray(dogs)) dogs = [];

    // calcular los índices de los elementos que deben ser mostrados en la página actual
    const lastIndex = currentPage * ITEMS_PER_PAGE;
    const firstIndex = lastIndex - ITEMS_PER_PAGE;
    const currentDogs = dogs.slice(firstIndex, lastIndex);

    // función para manejar el click en el botón 'Prev'
    const prevHandler = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // función para manejar el click en el botón 'Next'
    const nextHandler = () => {
        if (currentDogs.length === ITEMS_PER_PAGE) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div >

            <button className={styles.button} onClick={prevHandler}>Prev</button>
            <button className={styles.button} onClick={nextHandler}>Next</button>

            <div>
                {/* actualizar el renderizado de los elementos utilizando currentDogs */}
                {currentDogs.length > 0 ? (
                    <>
                        {currentDogs.map(dog => {
                            return <Card
                                key={dog.id}
                                id={dog.id}
                                name={dog.name}
                                image={dog.image}
                                minWeight={dog.minWeight}
                                maxWeight={dog.maxWeight}
                                temperaments={dog.temperaments}
                            />
                        })}
                    </>
                ) : (
                    <>
                        <Card
                            key="no-info"
                            id="no-info"
                            name="El perro no existe"
                            image="https://stormgain.com/sites/default/files/news/DOGE%20breed.jpg"
                            minWeight="0"
                            maxWeight="0"
                            temperaments="no-info"
                        />
                    </>
                )}
             </div>
        </div>
    );
};

export default CardsContainer;