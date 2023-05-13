const { Router } = require('express');

// Importamos las funciones de los controladores necesarias
const { getAllDogs, getTemperaments, getAllDogsByName, getDogByID, postDog, deleteDog, putDog } = require('../controllers/controller.js');

// Importamos el modelo Temperament de la base de datos
const { Temperament } = require('../db.js')

// Creamos una instancia del objeto Router
const router = Router();

// Definimos la ruta GET a la URL principal
router.get('/', async (req, res) => {
    // obtenemos el parámetro name de la petición
    const { name } = req.query;
    try {
        // obtenemos los temperamentos existentes para poder asociarlos a los perros
        await getTemperaments();
        // si hay un parámetro name, buscamos los perros que coincidan con ese nombre
        if (name) {
            const dogsName = await getAllDogsByName(name);
            res.status(200).send(dogsName);
        // si no hay parámetro name, buscamos todos los perros en la base de datos
        } else if (!name) {
            const allDogs = await getAllDogs();
            res.status(200).send(allDogs);
        };
    }
    catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ message: "Hubo un error al obtener información de los perros."  });
    };
});

// Definimos la ruta GET a la URL /id
router.get('/:id', async (req, res) => {
    // obtenemos el parámetro id de la petición
    const { id } = req.params;
    try {
        // buscamos el perro con el id correspondiente
        const dogFind = await getDogByID(id);
        res.status(200).send(dogFind);
    } catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ error: error.message });
    }
})

// Definimos la ruta POST a la URL principal
router.post('/', async (req, res) => {
    try {
        // obtenemos los temperamentos existentes para poder asociarlos a los perros
        await getTemperaments();

        // obtenemos los datos del perro a agregar
        const { name, image, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, temperaments } = req.body;

        // validamos que el perro tenga al menos un temperamento asociado
        if (temperaments.length === 0) {
            throw new Error("El perro tiene que tener al menos un temperamento");
        }
        // creamos un nuevo perro en la tabla de perros
        const newDog = await postDog(name, image, parseInt(minHeight), parseInt(maxHeight), parseInt(minWeight), parseInt(maxWeight), parseInt(minLifeSpan), parseInt(maxLifeSpan));


        // buscamos los objetos de temperamento correspondientes y los asociamos a la nueva entrada del perro
        const temp = await Temperament.findAll({
            where: {
                name: temperaments
            }
        })
        await newDog.addTemperament(temp);


        // respondemos con un código 200 y un objeto JSON que incluye un mensaje de éxito
        res.status(200).json({ message: `El perro ${newDog.name} fue creado con la id = ${newDog.id}` });


    } catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ error: error.message });
    }
})

// Definimos la ruta DELETE a la URL /id
router.delete('/:id', async (req, res) => {
    try {
        // obtenemos el parámetro id de la petición y eliminamos el perro correspondiente
        const { id } = req.params;
        const delDog = await deleteDog(id);


        // respondemos con un código 200 y un objeto JSON que incluye un mensaje de éxito
        res.status(200).json({ message: `El perro con la id ${id} fue eliminado con éxito` });


    } catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ error: error.message });
    }
});

// Definimos la ruta PUT a la URL /id
router.put('/:id', async (req, res) => {
    try {

        // obtenemos los parámetros de la petición PUT
        const { id } = req.params;
        const { name, image, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, temperaments, temperamentsLast } = req.body;

        // validamos que el perro tenga al menos un temperamento asociado
        if (temperaments.length === 0) {
            throw new Error("El perro tiene que tener al menos un temperamento");
        }

        // actualizamos la entrada de la tabla de perros correspondient
        const updatedog = await putDog(id, name, image, parseInt(minHeight), parseInt(maxHeight), parseInt(minWeight), parseInt(maxWeight), parseInt(minLifeSpan), parseInt(maxLifeSpan));


        // buscamos los objetos de temperamento correspondentes a agregar y quitar y los asociamos a la entrada actualizada del perro
        const tempLast = await Temperament.findAll({
            where: {
                name: temperamentsLast
            }
        })
        const temp = await Temperament.findAll({
            where: {
                name: temperaments
            }
        })
        await updatedog.removeTemperament(tempLast);
        await updatedog.addTemperament(temp);

        // respondemos con un código 200 y un objeto JSON que incluye un mensaje de éxito
        res.status(200).json({ message: `El perro ${updatedog.name} fue actualizado con éxito` },);


    } catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ error: error.message });
    }
})


// Exportamos el objeto router para que pueda ser utilizado en otros archivos
module.exports = router;