import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { getTemperaments, updateDog } from "../../redux/actions/actions";
import DeleteModal from "../Modal/deletePopUp";
import styles from "./Modify.module.css"


const regexURL = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;





const Modify = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const allTemperaments = useSelector(state => state.temperaments)
    const [showModal, setShowModal] = useState(false)


    const dog = useSelector(state => state.dog);


    const [errors, setErrors] = useState({});
    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch])

    let arrayTemperament = [];
    if (dog && dog.temperaments) {
        arrayTemperament = dog.temperaments.split(", ");
    }
    let temperamentsLast = arrayTemperament;


    const [form, setForm] = useState({
        id: id,
        name: dog.name,
        image: dog.image,
        minHeight: dog.minHeight,
        maxHeight: dog.maxHeight,
        minWeight: dog.minWeight,
        maxWeight: dog.maxWeight,
        minLifeSpan: dog.minLifeSpan,
        maxLifeSpan: dog.maxLifeSpan,
        temperaments: arrayTemperament,
        temperamentsLast
    });







    // obtenemos los valores de nuestro input y los guardamos en el estado local form
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value })
    }


    const submitHandler = (event) => {
        event.preventDefault();
        const error = onValidate(form)
        if (!error) {
            dispatch(updateDog(form))
            setShowModal(true);
        } else {
            setErrors(error)
        }
    }
    function selectHandler(event) {
        setForm({
            ...form, temperaments: [...form.temperaments, event.target.value],
        });
    }

    function deleteHandler(el) {
        setForm({
            ...form, temperaments: form.temperaments.filter((temp) => temp !== el),
        });
    }


    const onValidate = form => {
        let isError = false;
        let error = {};

        if (form.name.length < 3 || form.name.length > 35) {
            error.name = "El nombre debe tener entre 3 y 35 caracteres";
            isError = true;
        } else if (!regexName.test(form.name)) {
            error.name = "El nombre solo puede contener letras y espacios";
            isError = true;
        }

        if (!regexURL.test(form.image)) {
            error.image = "La imagen debe tener la extensión .jpg o .png";
            isError = true;
        }

        if (form.minHeight <= 0 || parseInt(form.minHeight) >= parseInt(form.maxHeight)) {
            error.minHeight = "La altura mínima no puede ser menor que cero o superar la altura máxima";
            isError = true;
        } else if (form.minHeight > 100) {
            error.minHeight = "La altura mínima no puede ser mayor a 100";
            isError = true;
        }
        if (form.minWeight <= 0 || parseInt(form.minWeight) >= parseInt(form.maxWeight)) {
            error.minWeight = "El peso mínimo no puede ser menor que cero o superar el peso máximo";
            isError = true;
        } else if (form.minWeight > 50) {
            error.minWeight = "El peso mínimo no puede ser mayor que 50 kilos";
            isError = true;
        }

        if (form.minLifeSpan <= 0 || parseInt(form.minLifeSpan) >= parseInt(form.maxLifeSpan)) {
            error.minLifeSpan = "El tiempo de vida mínimo no puede ser menor que cero o superar el tiempo de vida máximo";
            isError = true;
        } else if (form.minLifeSpan > 15) {
            error.minLifeSpan = "El tiempo de vida mínimo no puede ser mayor que 15 años";
            isError = true;
        }

        if (form.maxLifeSpan <= 0 || parseInt(form.minLifeSpan) >= parseInt(form.maxLifeSpan)) {
            error.maxLifeSpan = "El tiempo de vida máximo no puede ser menor que cero o menor que el tiempo de vida mínimo";
        } else if (form.maxLifeSpan > 20) {
            error.minLifeSpan = "El tiempo de vida mínimo no puede ser mayor que 15 años";
            isError = true;
        }

        if (form.temperaments.length <= 0) {
            error.temperaments = "Debe seleccionar al menos un temperamento";
            isError = true;
        }

        return isError ? error : null;
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (

        <div>

<h2> MODIFICÁ TU PERRO </h2>
            < form className={styles.formcontainer}>

                <div >
                   
                </div >
                <div  className={styles.name}>
                <label>
                    <h1>Nombre: </h1>

                    <input type="text" name="name" value={form.name} onChange={changeHandler} />
                    <br />
                    {errors && errors.name ? <p>{errors.name}</p> : null}
                </label>
                <div className={styles.weight}>
                <label>
                    Imagen URL:
                    <input placeholder='.jpg o .png' type="text" name="image" value={form.image} onChange={changeHandler} />
                    <br />
                    {errors && errors.image ? <p>{errors.image}</p> : null}
                </label>
                </div>
                <div className={styles.weight}>
                    <label>
                        Peso:
                        <input placeholder='mínimo' type="number" name="minWeight" value={form.minWeight} onChange={changeHandler} />
                        -
                        <input placeholder='máximo' type="number" name="maxWeight" value={form.maxWeight} onChange={changeHandler} />
                    </label>
                    {errors && errors.maxWeight ? <p>{errors.maxWeight}</p> : null}
                    {errors && errors.minWeight ? <p>{errors.minWeight}</p> : null}
                </div>
                <div className={styles.weight}>
                <label>
                    Altura :
                    <input placeholder='mínima' type="number" name="minHeight" value={form.minHeight} onChange={changeHandler} /> - 
                    <input placeholder="máxima" type="number" name="maxHeight" value={form.maxHeight} onChange={changeHandler} />
                    </label>
                    {errors && errors.minHeight ? <p>{errors.minHeight}</p> : null}
                    {errors && errors.maxHeight ? <p>{errors.maxHeight}</p> : null}
               
                </div>
                <div className={styles.weight}>
                <label>
                    Edad: 
                    <input placeholder='mínima' type="number" name="minLifeSpan" value={form.minLifeSpan} onChange={changeHandler} /> - <input placeholder="máxima" type="number" name="maxLifeSpan" value={form.maxLifeSpan} onChange={changeHandler} />
                    </label>
                    {errors && errors.minLifeSpan ? <p>{errors.minLifeSpan}</p> : null}
                    {errors && errors.maxLifeSpan ? <p>{errors.maxLifeSpan}</p> : null}
                </div>
                <div className={styles.temperaments}>
                <label>Temperamentos: </label>
                   
                <select onChange={selectHandler}>

                    <option disabled value="default"> Elige tus temperamentos</option>
                    {allTemperaments.map((temp) => {
                        return (
                            <option key={temp.id} name={temp.name}>
                                {temp.name}
                            </option>
                        );
                    })}
                </select>
                    </div>
                <span >
                    {errors && errors.temperaments ? <p>{errors.temperaments}</p> : null}
                </span>
                <br />
                <h4>Temperamentos seleccionados: </h4>
                <div>
                    {form.temperaments.map((temp) => (
                        <><span key={temp.id}>{temp} </span><button onClick={() => deleteHandler(temp)} >x</button></>
                    ))}
                </div>
                <br />
                <div>
                    <button type="submit" onClick={submitHandler} >Modify!</button>
                </div>
                </div>
            </form >
            <div className={styles.container}>
                <div className={styles.card}>
                    {form.image && form.image.length > 20 ? (
                        <img src={form.image} alt={form.name} className={styles.img} />
                    ) : (<img className={styles.img} src={"https://hips.hearstapps.com/hmg-prod/images/dog-puns-1581708208.jpg"} alt={form.name} />)}
                    <div className={styles.name2}>
                        <h1 >Nombre: <br />
                            {form.name}</h1></div>
                    <h4 className={styles.weight}>Peso:</h4><div>
                        <span className={styles.span}>{form.minWeight}  - {form.maxWeight} kgs </span></div>
                    <h4 className={styles.height}>Altura:</h4><div>
                        <span className={styles.span}>{form.minHeight}  - {form.maxHeight} cms</span></div>
                    <h4 className={styles.lifeSpan}>Promedio de vida:</h4>
                    <span className={styles.span}>{form.minLifeSpan}  - {form.maxLifeSpan} años</span>
                    <h4 className={styles.temperaments}>Temperamentos:</h4>
                    <span className={styles.span}>{form.temperaments} </span>
                    <br />
                </div>

                <div>
                    <Link to="/home"><button className={styles.button52}>Home</button></Link></div>

            </div>
            <DeleteModal show={showModal} handleClose={handleCloseModal}>
            </DeleteModal>
        </div>


    );

}
// ponele una key en donde no se...
export default Modify