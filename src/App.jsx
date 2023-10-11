import React, { useEffect, useState } from 'react'
import './App.css'
import { api } from './lib/axios'



const App = () => {

  const [idPokemon,setIdPokemon] = useState (1)
  const [namePokemon,setNamePokemon] = useState ("")
  const [data,setData] = useState ([])
  const getPokemon = async() => {
    const response = await api(`/pokemon/${idPokemon}`)
    setData(response.data)
  }
  const inputPokemon = async() => {
    const response = await api(`/pokemon/${namePokemon}`)
    setData(response.data)
  }

  useEffect(()=>{
    getPokemon()
    inputPokemon()
  },[idPokemon, namePokemon])

  const somar = () => {
    setIdPokemon(idPokemon+1)
  }

  const subtrair = () => {
    setIdPokemon(idPokemon-1)
    if (idPokemon < 1) {
      setIdPokemon(1)
    }
  }


  return (

    
    <main>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />

      <img src={data.sprites.front_default} className='pokemon'/>
      
      <h1 className='data'>
        <span className="pokemonId">{data?.id}</span> - <span className="pokemonName">{data?.name}</span>
      </h1>

      <form className='form'>
          <input type='search' className='pokemon-search' placeholder='Name or Id' value={namePokemon} onChange={(e)=>setNamePokemon(e.target.value)} required></input>
      </form>

    <div className="button-clear">
      <button className="button-circle btn-clear"></button>
    </div>

    <div className='button-left'>
      <button className='button btn-left' onClick={subtrair}></button>
    </div>

    <div className='button-right'>
      <button className='button btn-right' onClick={somar}></button>
    </div>

    <div className="button-up">
      <button className='button btn-up'></button>
    </div>

    <div className="button-down">
      <button className='button btn-down'></button>
    </div>

      <img src="../src/assets/pokedex.png" alt='Pokedex' className='pokedex'/>
    </main>
  )
}

export default App