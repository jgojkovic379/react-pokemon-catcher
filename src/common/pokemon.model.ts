import { Url } from "url"

export interface Pokemon {
  id: number,
  name: string,
  height: number,
  weight: number,
  order: number,
  base_experience: number,
  is_default: boolean,
  abilities: PokemonAbility[],
  moves: PokemonMove[],
  forms: PokemonForm[],
  game_indices: PokemonGameIndice[],
  species: PokemonSpecies,
  sprites: PokemonSprites,
  stats: PokemonStat[],
  types: PokemonType[],
  owned?: number
}

export interface PokemonSpecies {
  name: string,
  url: Url,
  owned?: number
}

export interface PokemonForm {
  name: string,
  url: Url
}

export interface PokemonGameIndice {
  game_index: number,
  version: object,
}

export interface PokemonMove {
  move: object,
  version_group_details: Array<object>
}

export interface PokemonAbility {
  ability: object,
  is_hidden: boolean,
  slot: number
}

export interface PokemonSprites {
  back_default: Url | null,
  back_female: Url | null,
  back_shiny: Url | null,
  back_shiny_female: Url | null,
  front_default: Url | null,
  front_female: Url | null,
  front_shiny: Url | null,
  front_shiny_female: Url | null,
  other: object,
  versions: object
}

export interface PokemonStat {
  base_stat: number,
  effort: number,
  stat: object
}

export interface PokemonType {
  slot: number,
  type: object
}