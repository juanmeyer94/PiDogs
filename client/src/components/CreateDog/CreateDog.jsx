import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, createDog } from "../../redux/actions/actions"
import { Link } from 'react-router-dom';
import styles from "./CreateDog.module.css"
const regexURL = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;
const TEMPS_PER_PAGE = 10;


const DogForm = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments); // Obtiene los temperamentos del estado de Redux
    const [errors, setErrors] = useState({});



    //paginado
    const [currentPage, setPage] = useState(0);
    const [paginatedTemps, setPaginatedTemps] = useState([]);


    const calculateTemps = () => {
        const firstIndex = currentPage * TEMPS_PER_PAGE;
        const lastIndex = firstIndex + TEMPS_PER_PAGE;
        return temperaments.slice(firstIndex, lastIndex);
    };

    const nextHandler = () => {
        setErrors({})// todavia no funciona, arreglar
        const totalTemps = temperaments.length;
        const nextPage = currentPage + 1;

        const firstIndex = nextPage * TEMPS_PER_PAGE;
        if (firstIndex >= totalTemps) {
            return;
        }
        const lastIndex = firstIndex + TEMPS_PER_PAGE;
        setPaginatedTemps(temperaments.slice(firstIndex, lastIndex));
        setPage(nextPage);
    };

    const prevHandler = () => {
        setErrors({}) // todavia no funciona, arreglar
        const prevPage = currentPage - 1;
        if (prevPage < 0) {
            return;
        }
        const firstIndex = prevPage * TEMPS_PER_PAGE;
        const lastIndex = firstIndex + TEMPS_PER_PAGE;
        setPaginatedTemps(temperaments.slice(firstIndex, lastIndex));
        setPage(prevPage);
    };
    useEffect(() => {
        setPaginatedTemps(calculateTemps());
    }, [currentPage, temperaments]);

    ///

    const [dogData, setDogData] = useState({
        name: '',
        image: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLifeSpan: '',
        maxLifeSpan: '',
        selectedTemperaments: []
    });



    useEffect(() => {
        dispatch(getTemperaments()); // Carga los temperamentos al cargar el formulario
    }, [dispatch]);



    const handleInputChange = event => {
        const { name, value } = event.target;
        setDogData(prevDogData => ({
            ...prevDogData,
            [name]: value,

        }
        ));
    };


    const handleTemperamentChange = event => {
        const temperament = event.target.value;
        setDogData(prevDogData => {
            if (prevDogData.selectedTemperaments.includes(temperament)) {
                return {
                    ...prevDogData,
                    selectedTemperaments: prevDogData.selectedTemperaments.filter(temp => temp !== temperament)
                };
            } else {
                return {
                    ...prevDogData,
                    selectedTemperaments: [...prevDogData.selectedTemperaments, temperament]
                };
            }
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const error = onValidate(dogData);
        if (!error) {

            dispatch(createDog(dogData));
        } else {
            setErrors(error);
        }


        return (
            <h1>Se ha creado el perro con exito</h1>
        )

    };


    const onValidate = dogData => {
        let isError = false;
        let error = {};

        if (dogData.name.length < 3 || dogData.name.length > 35) {
            error.name = "El nombre debe tener entre 3 y 35 caracteres";
            isError = true;
        } else if (!regexName.test(dogData.name)) {
            error.name = "El nombre solo puede contener letras y espacios";
            isError = true;
        }

        if (!regexURL.test(dogData.image)) {
            error.image = "La imagen debe tener la extensión .jpg o .png";
            isError = true;
        }

        if (dogData.minHeight <= 0 || parseInt(dogData.minHeight) >= parseInt(dogData.maxHeight)) {
            error.minHeight = "La altura mínima no puede ser menor que cero o superar la altura máxima";
            isError = true;
        } else if (dogData.minHeight > 100) {
            error.minHeight = "La altura mínima no puede ser mayor a 100";
            isError = true;
        }
        if (dogData.minWeight <= 0 || parseInt(dogData.minWeight) >= parseInt(dogData.maxWeight)) {
            error.minWeight = "El peso mínimo no puede ser menor que cero o superar el peso máximo";
            isError = true;
        } else if (dogData.minWeight > 50) {
            error.minWeight = "El peso mínimo no puede ser mayor que 50 kilos";
            isError = true;
        }

        if (dogData.minLifeSpan <= 0 || parseInt(dogData.minLifeSpan) >= parseInt(dogData.maxLifeSpan)) {
            error.minLifeSpan = "El tiempo de vida mínimo no puede ser menor que cero o superar el tiempo de vida máximo";
            isError = true;
        } else if (dogData.minLifeSpan > 15) {
            error.minLifeSpan = "El tiempo de vida mínimo no puede ser mayor que 15 años";
            isError = true;
        }

        if (dogData.maxLifeSpan <= 0 || parseInt(dogData.minLifeSpan) >= parseInt(dogData.maxLifeSpan)) {
            error.maxLifeSpan = "El tiempo de vida máximo no puede ser menor que cero o menor que el tiempo de vida mínimo";
        } else if (dogData.maxLifeSpan > 20) {
            error.minLifeSpan = "El tiempo de vida mínimo no puede ser mayor que 15 años";
            isError = true;
        }

        if (dogData.selectedTemperaments.length <= 0) {
            error.temperaments = "Debe seleccionar al menos un temperamento";
            isError = true;
        }

        return isError ? error : null;
    }


    const showTemps = paginatedTemps.map(temperament => (
        <div className={styles.checkbox}  key={temperament.id}>
        <label className={styles.checkboxLabel}>
             
            <input
                type="checkbox"
                name={temperament.name}
                value={temperament.name}
                checked={dogData.selectedTemperaments.includes(temperament.name)}
                onChange={handleTemperamentChange}
            />
    <span >{temperament.name}</span>
            
        </label>
        </div>
    ))


    return (<div>
        <form onSubmit={handleSubmit} className={styles.formcontainer}>
            <div  className={styles.name}>
                <label>
                    <h1>Nombre: </h1>

                    <input type="text" name="name" value={dogData.name} onChange={handleInputChange} />
                    <br />
                    {errors && errors.name ? <p>{errors.name}</p> : null}
                </label>
                <div className={styles.weight}>
                <label>
                    Image URL:
                    <input placeholder='.jpg o .png' type="text" name="image" value={dogData.image} onChange={handleInputChange} />
                    <br />
                    {errors && errors.image ? <p>{errors.image}</p> : null}
                </label>
                </div>
                <div className={styles.weight}>
                    <label>
                        Peso:
                        <input placeholder='mínimo' type="number" name="minWeight" value={dogData.minWeight} onChange={handleInputChange} />
                        -
                        <input placeholder='máximo' type="number" name="maxWeight" value={dogData.maxWeight} onChange={handleInputChange} />
                    </label>
                    {errors && errors.maxWeight ? <p>{errors.maxWeight}</p> : null}
                    {errors && errors.minWeight ? <p>{errors.minWeight}</p> : null}
                </div>
                <div className={styles.weight}>
                <label>
                    Altura 
                    <input placeholder='mínima' type="number" name="minHeight" value={dogData.minHeight} onChange={handleInputChange} /> - 
                    <input placeholder="máxima" type="number" name="maxHeight" value={dogData.maxHeight} onChange={handleInputChange} />
                    </label>
                    {errors && errors.minHeight ? <p>{errors.minHeight}</p> : null}
                    {errors && errors.maxHeight ? <p>{errors.maxHeight}</p> : null}
               
                </div>
                <div className={styles.weight}>
                <label>
                    Edad: 
                    <input placeholder='mínima' type="number" name="minLifeSpan" value={dogData.minLifeSpan} onChange={handleInputChange} /> - <input placeholder="máxima" type="number" name="maxLifeSpan" value={dogData.maxLifeSpan} onChange={handleInputChange} />
                    </label>
                    {errors && errors.minLifeSpan ? <p>{errors.minLifeSpan}</p> : null}
                    {errors && errors.maxLifeSpan ? <p>{errors.maxLifeSpan}</p> : null}
                </div>
               

                <h3 >
                    Temperamentos:</h3>
                <button className={styles.button} onClick={prevHandler}>Prev</button>
                <button className={styles.button} onClick={nextHandler}>Next</button>

                <div className={styles.temperaments}>

                    {showTemps}
                    {errors && errors.temperaments ? <p>{errors.temperaments}</p> : null}
            
                </div>


                <br />
                <button className={styles.button53} type="submit">Crear Perro</button>
            </div>
        </form>
        <div className={styles.container}>
            <div className={styles.card}>           <img className={styles.img} src={"https://hips.hearstapps.com/hmg-prod/images/dog-puns-1581708208.jpg"} alt={dogData.name} />
            <div className={styles.name2}>
                <h1 >Nombre: <br />
                    {dogData.name}</h1></div>
                <h4 className={styles.weight}>Peso:</h4>
                <span className={styles.span}>{dogData.minWeight} - {dogData.maxWeight} kgs </span>
                <h4 className={styles.height}>Altura:</h4>
                <span className={styles.span}>{dogData.minHeight} - {dogData.maxHeight} cms</span>
                <h4 className={styles.lifeSpan}>Promedio de vida:</h4>
                <span className={styles.span}>{dogData.minLifeSpan} - {dogData.maxLifeSpan} años</span>
                <h4 className={styles.temperaments}>Temperamentos:</h4>
                <span className={styles.span}>{dogData.selectedTemperaments}</span>
                <br />
            </div>

            <div>
                <Link to="/home"><button className={styles.button52}>Home</button></Link></div>

        </div>
    </div>
    );
};

export default DogForm;
