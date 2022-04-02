import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { setHasMenu, setTitle } from '../../app-layout.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPokemon, setError } from './pokemon-detail.slice';
import { Box, CircularProgress, Table, TableBody, TableCell, TableRow, Typography, Fab, Snackbar, Alert, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

interface SnackbarState {
  isOpen: boolean,
  type: "info" | "warning" | "success" | "error",
  message: string
}

export function PokemonDetail(): JSX.Element {
  const params = useParams()
  // const location = useLocation()
  // const theme = useTheme()

  // redux states
  const { pokemon, isLoading, error } = useAppSelector(state => state.pokemonDetail)
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(setTitle(''))
    dispatch(setHasMenu(false))  
    if(params.species) {
      dispatch(getPokemon(params.species))
    } else {
      dispatch(setError('Please supply the Pokemon name in url path!'))
    }
  }, [params.species]) // eslint-disable-line react-hooks/exhaustive-deps

  // local states
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({ isOpen: false, type: 'info', message: ''})
  const [isCatchable, setIsCatchable] = React.useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const catchPokemon = () => {
    // 255 is the capture rate number. see https://pokeapi.co/docs/v2#pokemon-species
    // if the capture rate doesn't exist, the capture rate value set to 127.5 (50%)
    const catchNumber = Math.floor(Math.random() * 255)
    const isCatched = catchNumber <= (pokemon?.species?.capture_rate || 127.5)
    console.log('capture rate', `${pokemon?.species?.capture_rate} / 255` )
    console.log('catch number', catchNumber)
    console.log(`Pokemon will be captured if catch number <= ${pokemon?.species?.capture_rate}`)
    if (isCatched) {
      setSnackbar({ isOpen: true, type: 'success', message: `${pokemon?.name} is captured` })
      setIsModalOpen(true)
    } else {
      setSnackbar({ isOpen: true, type: 'error', message: `Failed to capture ${pokemon?.name}. Try again!` })
    }
  }

  const closeSnackbar = (event: any, reason: string = '') => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ isOpen: false, type: 'info', message: ''})
  }

  return (
      <Box sx={{
          height: '100%',
          overflow: 'auto'
        }}>
          {
            isLoading ?
              <Box height="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <CircularProgress />
              </Box>
            :
              error ?
                <Box height="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                  <Typography paragraph sx={{ textAlign: 'center', maxWidth: '300px', fontSize:14, color: 'error.main' }}>
                    {error}
                  </Typography>
                </Box>
              :
                pokemon ?
                  <Box minHeight="100%" height="max-content" pb="50px">
                    <Box p={2} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                      <img src={pokemon.sprites.other.dream_world.front_default || ''} alt={pokemon.name} width="200" style={{ marginBottom: '15px'}}/>
                      <Typography variant="h3" fontSize={21} fontWeight="bold" textTransform="capitalize">{pokemon.name}</Typography>
                      <Typography paragraph fontSize={14} textTransform="capitalize">
                        Types: {
                          pokemon.types.map((type: any, index: number) => (pokemon.types.length === index + 1) ? `${type.type.name}` : `${type.type.name}, `)
                        }
                      </Typography>
                    </Box>
                    <Box>
                      <Table size="small">
                        <TableBody>
                          {
                            pokemon.stats.map((stat: any, index: number) => 
                              (
                                <TableRow key={index}>
                                  <TableCell sx={{textTransform: 'capitalize', fontWeight: 'bold', whiteSpace: 'nowrap'}}>{stat.stat?.name}</TableCell>
                                  <TableCell align="right">{stat.base_stat}</TableCell>
                                </TableRow>
                              )
                            )
                          }
                          <TableRow>
                            <TableCell sx={{textTransform: 'capitalize', fontWeight: 'bold', verticalAlign: 'top'}}>Moves</TableCell>
                            <TableCell align="right">
                              {
                                pokemon.moves.map((move: any, index: number) => (pokemon.moves.length === index + 1) ? `${move.move.name}` : `${move.move.name}, `)
                              }
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                    {
                      isCatchable ?
                        <Fab 
                          color="error"
                          variant="extended"
                          aria-label="Catch"
                          sx={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: '20px', whiteSpace: 'nowrap'}}
                          onClick={catchPokemon}
                        >
                          <CatchingPokemonIcon sx={{ mr: 1 }}/> Catch this Pokemon
                        </Fab>
                      : null
                    }
                    
                    <Snackbar
                      open={snackbar.isOpen}
                      onClose={closeSnackbar}
                      autoHideDuration={5000}
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                      >
                        {
                          snackbar.isOpen ?
                            <Alert onClose={closeSnackbar} severity={snackbar.type} sx={{ width: '100%' }}>
                              {snackbar.message}
                            </Alert>
                          : <div></div>
                        }
                      </Snackbar>
                      <Dialog
                        // fullScreen={true}
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{width: '100%'}}
                        >
                          <DialogTitle>asdasd</DialogTitle>
                          <DialogContent>
                            <TextField sx={{width: '100%'}}></TextField>
                          </DialogContent>
                          <DialogActions>
                            <Button variant="outlined">Release</Button>
                            <Button variant="contained">Save to Pokedex</Button>
                          </DialogActions>
                      </Dialog>
                  </Box>
                : null
          }
      </Box>
        
  )
}