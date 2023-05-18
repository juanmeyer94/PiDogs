import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getDogsByName } from '../../redux/actions/actions';
import styles from "./SearchBar.module.css"


const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
  
  const handleInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
    
  }
    
const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getDogsByName(name))
    
}
   

    return (
        <div className={styles.searchBox}>

            <input className={styles.searchInput}  type="text" placeholder="¡Busca tu perro!" onChange={(e) => handleInputChange(e)} />
            <button className={styles.button} type="submit" onClick={(e) => handleSubmit(e)}>GO DOGS!</button>
          
        
        </div>
    )
}

export default SearchBar;