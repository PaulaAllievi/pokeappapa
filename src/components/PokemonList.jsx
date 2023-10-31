import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { CardPokemon } from './CardPokemon'
import { Loader } from '../components/Loader'
import '../index.css'

export const PokemonList = () => {

    const {allPokemons, loading, onClickLoadMore} = useContext(PokemonContext)
     
  return (
    
    <div>
      {loading ? (
        <Loader/>
      ) : (
        <>
        <div className='list'>
            {allPokemons && allPokemons.map((pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id} />))}
        </div>
        <div className='button-cargar'>
              <button onClick={onClickLoadMore}>
                Cargar más
              </button>
            </div><div className='footer'>
              <p>A.P.A.</p>
        </div>
        </>
      )
    }
    </div>
    
  )
}

export default PokemonList
