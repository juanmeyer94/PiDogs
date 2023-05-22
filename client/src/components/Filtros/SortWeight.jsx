import React from "react";
import { sortFilterLH } from "../../redux/actions/actions"; 
import { useDispatch } from "react-redux";
import styles from "./Filters.module.css"

const SortWeight = ({ dogs }) => {
    const dispatch = useDispatch();

    //se hace un dispatch de la action del reducer con los parametros que requiere
    const sortHandlerLH = (event) => {
        const value = event.target.value;
        dispatch(sortFilterLH(dogs, value));
    }

    
    return (
       
            <select className={styles.select} value="default" onChange={sortHandlerLH}>
                <option disabled value="default">Filtrar por peso</option>
                <option name="low-high" value="low-high">Low to high</option>
                <option name="high-low" value="high-low">High to low</option>
            </select>
        
    )
}

export default SortWeight;