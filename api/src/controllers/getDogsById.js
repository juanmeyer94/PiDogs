const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";

const getDogsById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios.get(`${URL}`);

    const dog = data.find((dog) => dog.id === Number(id));

    if (dog) {
      const perro = {
        id: dog.id,
        name: dog.name,
        image: dog.image?.url,
        height: dog.height.metric,
        weight: dog.weight.metric,
        lifespan: dog.life_span,
        temperament: dog.temperament,
      };

      res.status(200).json(perro);
    } else {
      res.status(404).json({ message: "perro not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = getDogsById;
