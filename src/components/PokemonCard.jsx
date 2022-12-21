import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles/PokemonCard.scss';
const PokemonCard = ({ pokemon }) => {

  const[ pokemonData, setPokemonData]= useState();
  const navigate = useNavigate();
  const types = pokemonData?.types.map(type=> type.type.name).join('/');

  const handleClickPokemon = () =>{
    navigate(`/pokedex/${pokemonData?.id}`);
  }
  
  useEffect(()=>{
    axios.get(pokemon.url)
      .then(res => setPokemonData(res.data) )
      .catch( error=>console.log(error))
  },[]);

  return (
    <article onClick={ handleClickPokemon } className={`pokeCard boder-${ pokemonData?.types[0].type.name } animate__animated animate__zoomIn`}>
      <section className="pokeCard__header">

        <div className={`pokeCard__img--container bg-lg-${pokemonData?.types[0].type.name}`}>
          <img className="pokeCard__img" src={`${pokemonData?.sprites.other['official-artwork'].front_default}`} alt="" />
        </div>
        <section className="pokeCard__content">
          
          <h3 className="pokeCard__name"> { pokemon.name } </h3>
          <p className="pokeCard__types"> { types } </p>
          <p className="pokeCard__types-title"> Type </p>
          <hr />
          
        </section>
        
      </section>
      <section className="pokeCard__stats">

            {
              pokemonData?.stats.map(stat=>(
                
                <div className="pokeCard__stat" key={stat.stat.url}>
                  <p className="pokeCard__stat--name"> { stat.stat.name } </p>
                  <p className="pokeCard__stat--value"> { stat.base_stat} </p>
                </div>
              ))
            }
            
      </section>
      
    </article>
  )
}

export default PokemonCard
