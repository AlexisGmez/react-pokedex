import React from 'react'
import PokemonCard from './PokemonCard'
import './styles/ListPokemons.scss';
const ListPokemons = ({ pokemons }) => {

  
  return (
    <section className='listPokemons '>
      
      {
        pokemons.map(pokemon=>(
            
            <PokemonCard key={ pokemon.name } pokemon ={ pokemon }/>
            
        ))
      }
    </section>
  )
}

export default ListPokemons
