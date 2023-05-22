import axios from 'axios';
export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_BY_ID = "GET_BY_ID"
export const GET_BY_NAME = "GET_BY_NAME"
export const CREATE_DOG = "CREATE_DOG"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const FILTER_DOGS_BY_TEMPERAMENT = "FILTER_DOGS_BY_TEMPERAMENT"
export const FILTER_DOGS_BY_FROM = "FILTER_DOGS_BY_FROM"
export const SORT_AZ = "SORT_AZ"
export const SORT_FILTER_WEIGHT = "SORT_FILTER_WEIGHT"
export const DELETE_DOG = "DELETE_DOG"
export const UPDATE_DOG = "UPDATE_DOG"


//generales
export const getAllDogs = () => {
    return async function (dispatch) {
        const dogs = await axios.get('http://localhost:3001/dogs');
        dispatch({ type: GET_ALL_DOGS, payload: dogs.data })
    }
};

export const getDogById = (id) => {
    return async function (dispatch) {
        const dog = await axios.get(`http://localhost:3001/dogs/${id}`);
        dispatch({ type: GET_BY_ID, payload: dog.data })


    }
}

export const getDogsByName = (name) => async (dispatch) => {
  
        const dogsName = await axios.get("http://localhost:3001/dogs?name=" + name);
        return dispatch({ type: GET_BY_NAME, payload: dogsName.data });
    
}

export const createDog = (payload) => {
    return async function (dispatch) {
        await axios.post("http://localhost:3001/dogs/", payload);
       return dispatch({ type: CREATE_DOG})
       
    }
}

export const getTemperaments = () => {
    return async function (dispatch) {
        const dogs = await axios.get('http://localhost:3001/temperaments');
        return dispatch({ type: GET_TEMPERAMENTS, payload: dogs.data })
    }
}

export const deleteDog = (id) => {
    return async function (dispatch) {
        await axios.delete(`http://localhost:3001/dogs/${id}`);
        return dispatch({ type: DELETE_DOG, payload: id })
    }
}

export const updateDog = (payload) => {
    return async function (dispatch) {
        await axios.put(`http://localhost:3001/dogs/${payload.id}`, payload);
        return dispatch({ type: UPDATE_DOG, payload: payload })
    }
}



//filtros
export const filterDogsByTemperament = (temperament, dogs) => {
    return function (dispatch) {
        let dogFilter = [];
        dogs.forEach(dog => {
            const dogTemp = [];
            if (dog.temperaments) dogTemp.push(...dog.temperaments.split(", "))
            if (dogTemp.includes(temperament)) dogFilter.push(dog)
        })

        return dispatch({
            type: FILTER_DOGS_BY_TEMPERAMENT,
            payload: dogFilter,

        })
    }

};

export const fromFilter = (dogs, value) => {
    return function (dispatch) {
        const dogsFrom = [];
        dogs.forEach(dog => {
            if (dog.from === value) dogsFrom.push(dog);
        });
        return dispatch({
            type: FILTER_DOGS_BY_FROM,
            payload: dogsFrom,
        })
    }

}

export const sortAz = (dogs, value) => {
    let dogsSorted = [];
  
    if (value === "ASC") {
      dogsSorted = [...dogs].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (value === "DESC") {
      dogsSorted = [...dogs].sort((a, b) => b.name.localeCompare(a.name));
    }
  
    return { type: SORT_AZ, payload: dogsSorted };
  };
  

export const sortFilterLH = (dogs, value) => {
   
        let dogsSorted = []
        if (value === "high-low") {
            dogsSorted = [...dogs].sort(
                (a, b) =>
                    (a.minWeight < b.minWeight) ? 1 : (a.minWeight > b.minWeight) ? -1 : 0);
        }
        if (value === "low-high") {
            dogsSorted = [...dogs].sort(
                (a, b) =>
                    (a.minWeight > b.minWeight) ? 1 : (a.minWeight < b.minWeight) ? -1 : 0);
        }
        return function (dispatch) {
            dispatch({ type: SORT_FILTER_WEIGHT, payload: dogsSorted })
        }
}
