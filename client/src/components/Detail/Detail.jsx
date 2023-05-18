import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogById } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/";
import styles from "./Detail.module.css"

const Detail = () => {
  const dogById = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  const { id } = useParams(); // Obtener el id del perro a través de React Router
 
  useEffect(() => {
    // Llamar a la acción getDogById con el id del perro y dispatch
    dispatch(getDogById(id));
  }, [dispatch, id]);
    
    return (
      <div className={styles.card}>

        <div className={styles.container}>
           <img className={styles.img} src={dogById.image} alt={dogById.name} />
           <h1 className={styles.name}>{dogById.name}</h1>
           <h4 className={styles.weight}>Peso:</h4>
           <span className={styles.span}>{dogById.minWeight} - {dogById.maxWeight} kgs </span>
           <h4 className={styles.height}>Altura:</h4>
           <span className={styles.span}>{dogById.minHeight} - {dogById.maxHeight} cms</span>
           <h4 className={styles.lifeSpan}>Promedio de vida:</h4>
           <span className={styles.span}>{dogById.minLifeSpan} - {dogById.maxLifeSpan} años</span>
           <h4 className={styles.temperaments}>Temperamentos:</h4>
           <span className={styles.span} >{dogById.temperaments}</span>
           <br />
          
        
        </div>
            <Link to="/home"><button className={styles.button}>Home</button></Link>
        </div>



        
    )
    
}


export default Detail;