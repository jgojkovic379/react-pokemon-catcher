import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Pokemon, PokemonSpecies } from "../../common/pokemon.model"
import { AppThunk } from "../../redux/store"
import PokemonListApi from "./pokemon-list.api"

interface PokemonListState {
  limit: number,
  offset: number,
  totalCount: number,
  pokemons: Array<PokemonSpecies|Pokemon>,
  isLoading: boolean,
  error: string | null
}

const initialState: PokemonListState = {
  limit: 18,
  offset: 0,
  totalCount: 0,
  pokemons: [],
  isLoading: false,
  error: null
}

const slice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true
    },
    setPokemons: (state, action: PayloadAction<Array<PokemonSpecies|Pokemon>>) => {
      state.pokemons = action.payload
      state.isLoading = false
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    }
  }
})

export const { startLoading, setPokemons, setError, setOffset, setTotalCount } = slice.actions

export const getPokemons = (): AppThunk => (dispatch, getStates) => {
  dispatch(startLoading())
  const limit = getStates().pokemonList.limit
  const offset = getStates().pokemonList.offset
  PokemonListApi.getPokemonList(limit, offset)
    .then((res: any) => {
      dispatch(setPokemons(res.results))
      dispatch(setTotalCount(res.count))
    })
    .catch((err: any) => {
      console.log(err)
      dispatch(setError(err?.message))
    })
}

export const markCatchedPokemons = (): AppThunk<PokemonSpecies[] | Pokemon[]> => (dispatch, getStates) => {
  
  return []
}

export default slice.reducer