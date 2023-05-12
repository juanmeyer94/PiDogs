const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";


const getTemperaments = async (req, res) => {
    try {
      const response = await axios.get(URL);
      const breeds = response.data;
      const uniqueTemperaments = [];
  
      breeds.forEach((breed) => {
        if(breed.temperament){
        const temperamentArr = breed.temperament.split(',');
        temperamentArr.forEach((temperament) => {
          const trimmed = temperament.trim();
          if (!uniqueTemperaments.includes(trimmed)) {
            uniqueTemperaments.push(trimmed);
          }
        });
    }
      });
  
      res.json(uniqueTemperaments);
    } catch (error) {
      console.log(error);
    }
  };

module.exports = getTemperaments;