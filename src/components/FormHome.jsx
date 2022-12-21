import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice';
import './styles/FormHome.scss';

const FormHome = () => {

  const dispatch = useDispatch();

  const handleSubmit = (e) =>{
    
    e.preventDefault();
    const name = e.target.nameTrainer.value.trim()
    dispatch(setNameTrainerGlobal(name));
   
  }

  return (
    <form className='home__form' onSubmit={ handleSubmit }>
        <input id='nameTrainer' className='home__input' type="text" placeholder='Your name...'/>
        <button className='home__btn'>Start</button>
    </form>
  )
}

export default FormHome
