const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";


const getAllDogs = (req, res) => {
    //intentamos traer la data de la api
    try {
        axios.get(URL).then(({data}) => {
            //si existe esta data guardamos en una constante todos los perros con los datos pedidos en el .map()
            if(data){
                const dogs = data.map((ch) => {
                    const dog = {
                        id: ch.id,
                        name: ch.name,
                        image: ch.image,
                        height: ch.height,
                        weight: ch.weight,
                        lifespan: ch.life_span,
                        temperament: ch.temperament
                    };
                    return dog
                });
                res.status(200).json(dogs);
            } else {
                //en caso que no se encuentre
                res.status(400).json({message: "no se encontró el perro"})
            }
        })
        
    } catch (error) {
        //si hay algun error motramos el mensaje del error
        res.status(500).json({message: error})
    }
    

}


module.exports = 
    getAllDogs;