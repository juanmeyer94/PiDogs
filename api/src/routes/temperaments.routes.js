const { Router } = require('express');
// Importamos la función del controlador necesaria
const { getTemperaments } = require('../controllers/controller.js');
// Importamos el modelo Temperament de la base de datos
const { Temperament } = require('../db.js');

// Creamos una instancia del objeto Router
const router = Router();

// Definimos la ruta GET a la URL principal
router.get('/', async (req, res) => {
    try {

        // ejecutamos la función del controlador que obtiene los temperamentos existentes
        await getTemperaments();

        // buscamos todos los temperamentos en la tabla de temperamentos
        const allTemperaments = await Temperament.findAll()

        // respondemos con un código 200 y un objeto JSON que incluye todos los temperamentos existentes
        res.status(200).json(allTemperaments);
        
    } catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ error: error.message });
    }
})

// Exportamos el objeto router para que pueda ser utilizado en otros archivos
module.exports = router;