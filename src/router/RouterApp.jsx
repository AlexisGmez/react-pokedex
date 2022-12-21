import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeProtected from '../components/HomeProtected'
import ProtectedRoute from '../components/ProtectedRoute'
import Footer from '../layout/footer'
import Home from '../pages/Home'
import Pokedex from '../pages/Pokedex'
import Pokemon from '../pages/Pokemon'

const RouterApp = () => {
  return (
    <div>
      <Routes>
        
        <Route element={ <HomeProtected /> }>
            <Route path='/' element={ <Home /> } />
        </Route>
            
        
        
        <Route element={ <ProtectedRoute /> }>
            <Route path='/pokedex' element={ <Pokedex/> } />
            <Route path='/pokedex/:id' element={ <Pokemon/> } />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default RouterApp
