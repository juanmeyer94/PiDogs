const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";

const getDogByName = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(URL);
    const dogs = response.data.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
    res.status(200).json(dogs);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "No se encontraron perros con ese nombre" });
  }
};

module.exports = getDogByName;
