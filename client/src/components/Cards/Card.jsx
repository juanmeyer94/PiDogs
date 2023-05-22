import style from './Card.module.css'
import { Link } from 'react-router-dom';


//mostramos la carta con la info del dog
const Card = (props) => {

    
    return (
        <div className={style.card}>
            <img className={style.img} src={props.image} alt={props.name} />
            <h2 className={style.name}>{props.name}</h2>
            <p className={style.temperaments}>{props.temperaments}</p>
            <p className={style.weightProps}>{props.minWeight} - {props.maxWeight} kg</p>
            {props.id === "no-info" ? (
                <><p>No hay detalles para mostrar</p></>) :
                <Link to={`/detail/${props.id}`}>
                    <p className={style.enlace}>Detalles</p>
                </Link>}
        </div>
    )
}

export default Card;