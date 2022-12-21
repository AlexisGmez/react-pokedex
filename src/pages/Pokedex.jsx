import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ListPokemons from '../components/ListPokemons';
import { paginationLogic } from '../helpers/paginationLogic';
import './styles/Pokedex.scss';


const Pokedex = () => {

 const nameTrainer = useSelector( state => state.nameTrainer);
 
  const [ pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]); 
  const [namePokemon, setNamePokemon] = useState("");
  const [pokemonsFilter, setPokemonsFilter] = useState([]);
  const [pokemonType,setPokemonType]= useState("");
  const [currentPage, setCurrentPage ] = useState(1);

  
 
  const handleSubmit = (e) =>{

      e.preventDefault();
      const name = e.target.namePokemon.value;
      setNamePokemon(name);
      
  }

  const handleChangeSelect =(e)=>{
      setPokemonType(e.target.value);
      e.nativeEvent.path[1].reset();
      setNamePokemon('');
      
  }

  const { PagesInBlock, lastPage, pokemonsInPage } = paginationLogic(currentPage, pokemonsFilter);
  
  
  const handleClickPage = ( newPage ) =>{
    setCurrentPage(newPage);
  }

  const handleNextPage = ( ) =>{
    const newPage = currentPage +1;
    if (newPage>lastPage) {
        setCurrentPage(1)
    }else{
      setCurrentPage(newPage)
    }
  }


  const handlePreviousPage =()=>{
    const newPage = currentPage -1;
    if (newPage<1) {
      setCurrentPage(lastPage);
    }else{
      setCurrentPage(newPage);
    }
  } 

  const handleFirstPage = () =>{
    setCurrentPage(1);
  }

  const handleLastPage = () =>{
    setCurrentPage(lastPage);
  }

  useEffect(()=>{
    const URL = `https://pokeapi.co/api/v2/${pokemonType ? `type/${pokemonType}/`:'pokemon/?limit=200'}`;

    console.log(URL)
    axios.get(URL)
      .then(res => {
        if (pokemonType) {
         const newPokemons = res.data.pokemon.map(pokemon => pokemon.pokemon);
         setPokemons( newPokemons );
        } else {
          setPokemons( res.data.results )
        }
      })
      .catch(error=>console.error(error))

  },[pokemonType]);

  useEffect(()=>{
    const URL = `https://pokeapi.co/api/v2/type/`;
    axios.get(URL)
      .then(res => setTypes(res.data.results))
      .catch(err=>console.log(err))
  },[]);

  useEffect(()=>{

    const newPokemons = pokemons.filter(pokemon => pokemon.name.includes(namePokemon));
    setPokemonsFilter(newPokemons);

  },[ namePokemon, pokemons]);
  
  
  
    useEffect(() => {

        // Options for the Typed object
        const options = {
            strings: [`${nameTrainer.toUpperCase()}`,'TRAINER'],
            typeSpeed: 200,
            backSpeed:100,
            loop: true
        };

        // New Typed instance
        const typed = new Typed('#typed',options);

        // Destroy Typed instance on unmounting the component to prevent memory leaks
        return () => {
            typed.destroy();
        };

    }, []);


  return (
    <main>
      <header className='pokedex__header'>
        <h1>Pokedex </h1>
        <p>Welcome <span id='typed'></span> here you can find your favorite pokemon</p>

        <form className='pokedex__form' onSubmit={ handleSubmit }>
          <div className='pokedex__search'>

            <input 
              type="text"
              id='namePokemon'
              className='pokedex__input'
              
            />

            <button 
              type='submit'
              className='pokedex__btn'
            > Search </button>
          </div>
          <select onChange={ handleChangeSelect } className='pokedex__select' name="" id="">
            <option value="">All pokemons</option>
            {
              types.map(type => <option value={ type.name } key={ type.url }> { type.name } </option>)
            }
          </select>
        </form>

      </header>
      <ListPokemons pokemons={ pokemonsInPage } />

      <ul className='pokedex__listPages'>
        <li onClick={ handlePreviousPage} > {'<'} </li>
        <li onClick={handleFirstPage}>...</li>
        {
          PagesInBlock.map(pageInBlock => <li className={`${currentPage===pageInBlock?'actualPage':''}`} onClick={ ()=> handleClickPage(pageInBlock) } key={pageInBlock}> {pageInBlock} </li>)
        }
        <li onClick={handleLastPage}>...</li>
        <li onClick={ handleNextPage}> {'>'} </li>
      </ul>
    </main>
  )
}

export default Pokedex
