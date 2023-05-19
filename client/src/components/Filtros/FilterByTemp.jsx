
import React, { useEffect}from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, filterDogsByTemperament } from "../../redux/actions/actions"
import styles from "./Filters.module.css"


const FilterByTemp = () => {

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const dogs = useSelector(state => state.dogs)
    
   

    const handleFilterByTemperament = (event) => {
        const temperament = event.target.value;
        dispatch(filterDogsByTemperament(temperament, dogs));
      };

    useEffect(() => {
        dispatch(getTemperaments());
        }, [dispatch])
    
        const showTemps = (
            <select className={styles.select} value="default" onChange={handleFilterByTemperament}>
              <option disabled value="default">Filtrar por temperamento</option>
              {temperaments.map((temperament) => (
                <option key={temperament.id} value={temperament.name}>
                  {temperament.name}
                </option>
              ))}
            </select>
          );
    



                  


return(
    
        <div >
            {showTemps}
       
        
    </div>
)
} 

export default FilterByTemp;