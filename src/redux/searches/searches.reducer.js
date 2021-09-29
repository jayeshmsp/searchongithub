import { searchActionTypes } from "./search.types";

const INITIAL_STATE = {
    currentSearched: "",
};

const searchesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case searchActionTypes.SET_CURRENT_SEARCH:
            return {
                ...state,
                currentSearched: action.payload,
            };
        default:
            return state;
    }
};

export default searchesReducer;