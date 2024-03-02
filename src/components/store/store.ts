import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import filterReducer from './reducers/FilterSlice'
import AsideFilter from "./reducers/AsideFilter";

const rootReducer = combineReducers({
   filterReducer,
   AsideFilter
})


export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']



