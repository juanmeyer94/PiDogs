import React from "react";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs } from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.css"
// import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import FilterByTemp from "../Filtros/FilterByTemp";
import From from "../Filtros/From";
import SortAz from "../Filtros/SortAz";
import SortWeight from "../Filtros/SortWeight";
import CardsContainer from "../CardContainer/CardCointainer";


export default function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogs);
    

  useEffect(() => {

    dispatch(getAllDogs());

  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());

  }

  return (
    <div className={styles.container}>

      <img className={styles.img} src={"https://images-platform.99static.com/dPlEkv5FCkC2yyGgbwtDh5kWXhw=/158x0:1018x860/500x500/top/smart/99designs-contests-attachments/101/101596/attachment_101596820"} alt="noCry" />
      
      <NavLink to='/create'><button className={styles.button53}>¡Creá tu perro!</button></NavLink>
      <SearchBar className={styles.SearchBar} /> 
      <div className={styles.filtersContainer}>
      <FilterByTemp className={styles.filter} />
        <From className={styles.filter} />
        <SortAz className={styles.filter}/>
        <SortWeight className={styles.filter} dogs={dogs}/>
        <button className={styles.button} onClick={handleClick}>¡Vuelvan perritos!</button>
       
        </div>
        <div>


        <CardsContainer className={styles.cardsContainer} dogs={dogs} />
        

      </div>

    </div>
  )
}