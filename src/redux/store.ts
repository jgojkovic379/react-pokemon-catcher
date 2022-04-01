import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../pages/counter/counterSlice';
import appLayout from '../app-layout.slice';
import pokemonList from '../pages/pokemon-list/pokemon-list.slice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appLayout,
    pokemonList,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
