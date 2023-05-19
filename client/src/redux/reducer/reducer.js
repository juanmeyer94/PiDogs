import { GET_ALL_DOGS, GET_BY_ID, GET_BY_NAME, CREATE_DOG, GET_TEMPERAMENTS, FILTER_DOGS_BY_TEMPERAMENT, FILTER_DOGS_BY_FROM, SORT_AZ, SORT_FILTER_WEIGHT} from "../actions/actions";


const initialState = {
    dogs: [],
    dog: [],
    temperaments: [],
    loading: false,
    filter: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_DOGS: 
        return {
            ...state,
            dogs: action.payload,
            filter: true,
            loading: true
            }

        case GET_BY_ID:
            return {
                ...state,
                dogs: action.payload,
                filter: true,
                loading: false
            }

        case GET_BY_NAME: 
        return {
            ...state,
            dogs: action.payload,
            filter: true,
            loading: true,            
        }
        case CREATE_DOG:
            return {
                ...state,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
                filter: true,
                loading: true
            }
            
        case FILTER_DOGS_BY_TEMPERAMENT:
            return {
                ...state,
                dogs: action.payload,
                filter: true,
                loading: true
            }

        case FILTER_DOGS_BY_FROM:
            return {
                ...state,
                dogs: action.payload,
                filter: true,
                loading: true,
            }

        case SORT_AZ: 
        return {

            ...state,
            dogs: action.payload,
            filter: true,
            loading: true,
        }
        case SORT_FILTER_WEIGHT: 
        return {
            ...state,
            dogs: action.payload,
            filter: true,
            loading: true,
            
            
        }
            default:
                return { ...state };
    };

    
}

export default reducer;
