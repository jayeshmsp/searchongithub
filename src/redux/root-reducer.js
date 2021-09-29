import { combineReducers } from "redux";
import searchesReducer from "./searches/searches.reducer";

const rootReducer = combineReducers({
    searches: searchesReducer,
});

export default rootReducer;