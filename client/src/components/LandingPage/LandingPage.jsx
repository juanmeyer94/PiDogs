import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'

const LandingPage = () => {
    
    return (
        <div className={style.LandingPage}>
            <title>GO DOGS!</title>
            <div className={style.container}>
                <br />
                <h1>GO DOGS App!</h1>
                <br />
                <p>¡Aquí encontraremos un montón de información acerca de nuestros perros y sus caracteristicas!</p>
                <Link to="/home">
                    <button>GO DOGS!</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;