const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getAllDogs = require("../controllers/getAllDogs")
const getDogsById = require("../controllers/getDogsById")
const getDogByName = require("../controllers/getDogByName")
const getTemperaments = require("../controllers/getTemperaments")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/getAll", getAllDogs)
router.get("/dog/:id", getDogsById)
router.get("/dogs/name", getDogByName)
router.get("/temperaments", getTemperaments)

module.exports = router;
