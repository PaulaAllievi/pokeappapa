import { Link } from 'react-router-dom'
import '../index.css'

export const CardPokemon = ({pokemon}) => {
  return (

    <Link to={`/pokemon/${pokemon.id}`} className='card'>		
        <div className='card-img'>
				<img
					src={pokemon.sprites.other.dream_world.front_default}
					alt={`Pokemon ${pokemon.name}`}
				/>
			</div>
			<div className='card-info'>
				<span className='pokemon-id'>N° {pokemon.id}</span>
				<h3>{pokemon.name}</h3>
		</div>
    </Link>
  )
}

