
const { Router } = require('express');
const dogsRoutes = require('./dogs.routes.js');
const temperamentsRoutes = require('./temperaments.routes.js');


const router = Router();

// Configurar los routers

router.use('/dogs', dogsRoutes);
router.use('/temperaments', temperamentsRoutes);


module.exports = router;
