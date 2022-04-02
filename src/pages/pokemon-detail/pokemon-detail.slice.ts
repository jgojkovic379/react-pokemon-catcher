import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon, PokemonSpecies } from "../../common/pokemon.model";
import { AppThunk } from "../../redux/store";
import PokemonDetailApi from "./pokemon-detail.api";

interface PokemonDetailState {
  pokemon: Pokemon | null,
  isLoading: boolean,
  error: string | null
}

const initialState: PokemonDetailState = {
  pokemon: null,
  isLoading: false,
  error: null
}

const slice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true
    },
    setPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.pokemon = action.payload
      state.isLoading = false
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

export const { startLoading, setPokemon, setError } = slice.actions

export const getPokemon = (name: string): AppThunk => dispatch => {
  dispatch(startLoading())
  PokemonDetailApi.getPokemonDetail(name)
    .then((pokemon: Pokemon) => {
      dispatch(setPokemon(pokemon))
      PokemonDetailApi.getPokemonSpecies(name)
        .then((species: PokemonSpecies) => {
          const existingPokemon: Pokemon = JSON.parse(JSON.stringify(pokemon))
          existingPokemon.species = species
          dispatch(setPokemon(existingPokemon))
        })
        .catch((err: any) => {
          console.log('Failed to fetch species data',err)
        })
    })
    .catch((err: any) => {
      console.log(err)
      dispatch(setError(err?.message))
    })
}

export const catchPokemon = (): AppThunk => (dispatch, getStates) => {
  
  const existedCatchedPokemonStorage = localStorage.getItem('catchedPokemons')
  let catchedPokemons: Array<Pokemon | null> = []
  if(existedCatchedPokemonStorage) {
    catchedPokemons = JSON.parse(existedCatchedPokemonStorage)
  }
  catchedPokemons.push(getStates().pokemonDetail.pokemon)
  localStorage.setItem('catchedPokemons', JSON.stringify(catchedPokemons))
}

export default slice.reducer