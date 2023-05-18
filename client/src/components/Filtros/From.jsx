import { useDispatch, useSelector } from 'react-redux';
import { fromFilter } from '../../redux/actions/actions';
import styles from "./Filters.module.css"

const From = () => {



const dogs = useSelector(state => state.dogs);
const dispatch = useDispatch();
    
    return (
        <div>
           <select className={styles.select} value="default" onChange={(event) => {
              const value = event.target.value;
              dispatch(fromFilter(dogs, value));
           }}>
              <option disabled value="default">Extraer desde: Api o BDD</option>
              <option value="API">Extraer desde la Api</option>
              <option value="DataBase">Extraer de la Base de Datos</option>
           </select>
           
           </div>
);

}

export default From;