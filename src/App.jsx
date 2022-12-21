
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import './App.scss'
import RouterApp from './router/RouterApp'
import 'animate.css';

function App() {
  const nameTrainer = useSelector(state=>state.nameTrainer);

  useEffect(()=>{
    localStorage.setItem('nameTrainer',nameTrainer);
  },[nameTrainer]);
  
  return (
    <div className="App">
      <RouterApp />
    </div>
  )
}

export default App
