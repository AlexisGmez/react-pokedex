import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/Pokemon.scss';


const Pokemon = () => {

  const [ pokemon, setPokemon ] = useState();
  const {id} = useParams();
  
 
  const getPercentBarProgress = ( valueStat)=>{
    const maxValue = 150;
    return `${( valueStat * 100)/maxValue}%`;
  }
  useEffect(()=>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => setPokemon(res.data))
      .catch(err=>console.error(err))
  },[])

  return (
    <main className='pokemon'>
      
      <section className="pokemonId animate__animated animate__fadeInLeft">
        
        <section className={`pokemonId__header bg-lg-${pokemon?.types[0].type.name}`}>
        </section>
          <img  src={`${pokemon?.sprites.other['official-artwork'].front_default}`} alt="" className="pokemonId__img" />
          <h3 className="pokemonId__id">#{id}</h3>
          <h2 className="pokemonId__name"> { pokemon?.name } </h2>

          <div className="pokemonId__features">
            <div className="pokemonId__feature">
              <p className="pokemonId__feature--name">Weight</p>
              <p className="pokemonId__feature--value"> { pokemon?.weight } </p>
            </div>
            <div className="pokemonId__feature">
              <p className="pokemonId__feature--name">heigh</p>
              <p className="pokemonId__feature--value"> { pokemon?.height } </p>
            </div>
          </div>
        

        <section className="pokemonId__info">
          
          <div className='pokemonId__info--container'>
            <h4 className='pokemonId__info--title'>Types</h4>
            <div className='pokemonId__info--data'>

              {
                pokemon?.types.map(type=>(
                 <p className={`pokemonId__info--value bg-${type.type.name}`} key={type.type.url}>{type.type.name}</p>
                ))
              }
              
            </div>
          </div>

          <div className='pokemonId__info--container'>
            <h4 className='pokemonId__info--title'>Abilities</h4>
            <div className='pokemonId__info--data'>

              {
                pokemon?.abilities.map(ability=>(
                  <p className='pokemonId__info--value' key={ ability.ability.url }>{ ability.ability.name }</p>
                ))
              }
              
            </div>
          </div>
        </section>

        <section className="pokemonId__stats">
          <h3 className="pokemonId__stats--title">Stats</h3>
          <div className='pokemonId__stats--container'>

            {
              pokemon?.stats.map(stat=>(
                <div key={stat.stat.url} className='pokemonId__stat'>
                  <div className='pokemonId__stat--header'>
                    <p className='pokemonId__stat--name'>{stat.stat.name}</p>
                    <p className='pokemonId__stat--value'>{stat.base_stat}</p>
                  </div>
                  <div className='pokemonId__stat--bar'>
                    <div style={ {width: getPercentBarProgress(stat.base_stat)} } className='pokemonId__stat--barProgress'></div>
                  </div>
                </div>
              ))
            }
            
          </div>
        </section>


      </section>
    </main>
  )
}

export default Pokemon
