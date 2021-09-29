import { searchActionTypes } from "./user.types";
export const setCurrentSearch = (searchString) => {
    console.log("setCurrentUser", searchString);
    return {
        type: searchActionTypes.SET_CURRENT_USER,
        payload: searchString,
    };
};