import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortAz } from "../../redux/actions/actions";
import styles from "./Filters.module.css"

const SortAz = ({dogs}) => {
    const dispatch = useDispatch();



    const handleFilter = (event) => {
        const value = event.target.value;
        dispatch(sortAz(dogs, value))

    }


    return (

        <select className={styles.select} value="default" onChange={handleFilter}>
            <option disabled value="default" >Orden alfabetico</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
        </select>

    )

}

export default SortAz;