import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../pages/counter/counterSlice';
import appLayout from '../app-layout.slice';
import pokemonList from '../pages/pokemon-list/pokemon-list.slice';
import pokemonDetail from '../pages/pokemon-detail/pokemon-detail.slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appLayout,
    pokemonList,
    pokemonDetail
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
