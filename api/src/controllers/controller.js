// Importamos las librerías necesarias:
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
require('dotenv').config();
const URL = process.env.URL;
const KEY = process.env.KEY;

// Función que devuelve una lista con los perros de la API:
const getDogsApi = async () => {
    try {
        // Realizamos la petición a la API:
        const api = await axios.get(URL, {
            headers: {
                'x-api-key': KEY
            }});
       
        // Utilizamos el operador opcional "?." por si api.data es undefined:
        const allDogs = api.data?.map(dog => {

            // Mapeamos los datos que queremos de los perros:
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                minHeight: parseInt(dog.height.metric.split("-")[0]),
                maxHeight: parseInt(dog.height.metric.split("-")[1]),
                minWeight: parseInt(dog.weight.metric.split("-")[0]),
                maxWeight: parseInt(dog.weight.metric.split("-")[1]),
                minLifeSpan: parseInt(dog.life_span.split("-")[0]),
                maxLifeSpan: parseInt(dog.life_span.split("-")[1]),
                temperaments: dog.temperament,
                from: "API"
            };
        });
        return allDogs;
    } catch {
        throw new Error("No se pueden obtener los datos de la API");
    }
}

// Función que devuelve una lista con todos los perros en al base de datos y en la API:
const getAllDogs = async () => {
    try {

        // Obtenemos la lista completa de perros de la API y la base de datos:
        const allDogsApi = await getDogsApi();
        const allDogsDb = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });

        // Mapeamos la lista de perros de la base de datos y agregamos los temperamentos:
        const allDogsDbWithTemps = allDogsDb.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image,
                minHeight: dog.minHeight,
                maxHeight: dog.maxHeight,
                minWeight: dog.minWeight,
                maxWeight: dog.maxWeight,
                minLifeSpan: dog.minLifeSpan,
                maxLifeSpan: dog.maxLifeSpan,
                temperaments: dog.temperaments.map(temp => { return temp.name }).join(', '),
                from: dog.from
            }
        })

        // Concatenamos ambas listas y las retornamos:
        return [...allDogsApi, ...allDogsDbWithTemps];
    } catch (error) {
        throw new Error(error);
    };
};

// Función que devuelve una lista con los perros que incluyen el `name` en su nombre:
const getAllDogsByName = async (name) => {
    try {

        // Obtenemos la lista completa de perros:
        const allDogs = await getAllDogs();

        // Filtramos los perros que contienen el `name` en su nombre:
        const filterName = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));

        if (filterName.length > 0) {
            return filterName;
        } else {
            throw new Error(`Perro no encontrado: ${name}`);
        }
    } catch (error) {
        throw new Error(error); 
    }
}

// Función que devuelve el perro con el `id` especificado:
const getDogByID = async (id) => {
    try {

        // Obtenemos la lista completa de perros:
        const allDogs = await getAllDogs();

        // Filtramos el perro con el `id` especificado:
        const filterName = allDogs.filter(dog => dog.id == id)
        if (filterName.length > 0) {
            return filterName[0];
        } else {
            throw new Error(`ID del perro no encontrada, ID = ${id}`)
        }
    } catch (error) {
        throw new Error(error);
    }
};

// Función que obtiene los tempamentos de la base de datos y los almacena:
const getTemperaments = async () => {
    try {

        // Obtenemos la lista completa de perros de la API:
        const dogsApi = await getDogsApi();

        // Inicializamos un array para guardar los temperamentos:
        let arrayTemperament = [];
        dogsApi.map(dog => {
            
            // Si el perro tiene temperamentos, agregamos cada uno a nuestro array:
            if (dog.temperaments) {
                arrayTemperament.push(...dog.temperaments.split(", "))
            };
        });
        // Iteramos por cada temperamento y lo almacenamos en la base de datos si no existe previamente:
        arrayTemperament.map(temperamentName => {
            Temperament.findOrCreate({
                where: {
                    name: temperamentName,
                },
            });
        });
    } catch (error) {
        throw new Error(error);
    }
}

// Función que agrega un nuevo perro a la base de datos:
const postDog = async (name, image, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan) => {
    try {
        // Obtenemos la lista completa de perros:
        const dogsApiDB = await getAllDogs();
        // Convertimos el nombre a minúsculas:
        const nameLowerCase = name.toLowerCase();
        // Buscamos si ya existe un perro con el mismo nombre:
        const dogName = dogsApiDB.find(dog => dog.name.toLowerCase() === nameLowerCase.trim());
        if (dogName) {
            throw new Error(`El perro ${name} ya existe`);
        }
        // Verificamos que se hayan completado todos los campos:
        else if (!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !minLifeSpan || !maxLifeSpan) {
            throw new Error("Necesitas rellenar toda la información");
        }
        // Verificamos que los valores ingresados no sean negativos:
        else if (minHeight <= 0 || maxHeight <= 0 || minWeight <= 0 || maxWeight <= 0 || minLifeSpan <= 0 || maxLifeSpan <= 0) {
            throw new Error("Los valores no pueden ser negativos");
        }
        // Verificamos que el valor mínimo no sea mayor que el valor máximo:
        else if (minHeight >= maxHeight) {
            throw new Error("El valor mínimo de altura es mayor que el valor máximo");
        }
        else if (minWeight >= maxWeight) {
            throw new Error("El peso mínimo es mayor o igual al peso máximo, por favor verifique los datos");
        }
        else if (minLifeSpan >= maxLifeSpan) {
            throw new Error("La expectativa de vida mínima es mayor o igual a la expectativa de vida máxima, por favor verifique los datos");
        }
        // Si todo está bien, creamos el nuevo perro en la base de datos:
        const newDog = await Dog.create({
            name,
            image,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minLifeSpan,
            maxLifeSpan,
            from: "DataBase"
        });
        return newDog;
    } catch (error) {
        throw new Error(error);
    }
}

// Función que elimina un perro de la base de datos por su ID:
const deleteDog = async (id) => {
    try {
        const delDog = await Dog.destroy({
            where: {
                id,
            }
        })
        return delDog;
    } catch (error) {
        throw new Error(error);
    }
}

// Función que actualiza los datos de un perro en la base de datos por su ID:
const putDog = async (id, name, image, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan) => {
    try {
        const updateDog = await Dog.findByPk(id);
        updateDog.name = name;
        updateDog.image = image;
        updateDog.minHeight = minHeight;
        updateDog.maxHeight = maxHeight;
        updateDog.minWeight = minWeight;
        updateDog.maxWeight = maxWeight;
        updateDog.minLifeSpan = minLifeSpan;
        updateDog.maxLifeSpan = maxLifeSpan;
        await updateDog.save();
        return updateDog;
    } catch (error) {
        throw new Error(error);
    }
}

// Exportamos todas las funciones:
module.exports = {
    getAllDogsByName,
    getDogByID,
    getTemperaments,
    getAllDogs,
    postDog,
    deleteDog,
    putDog
}