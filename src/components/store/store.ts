import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import Aritcles from './reducers/AritcleSlice';
import UserSlice from './reducers/UserSlice';
import LikesArticle from './reducers/LikesArticle';
const rootReducer = combineReducers({
  Aritcles,
  UserSlice,
  LikesArticle,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
