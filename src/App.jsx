import React, { useEffect, useState } from 'react'
import './App.css'
import { api } from './lib/axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

const App = () => {

  const [idPokemon,setIdPokemon] = useState (1)
  const [namePokemon,setNamePokemon] = useState ("")
  const [data,setData] = useState ([])

  const getPokemon = async() => {
    const response = await api(`/pokemon/${idPokemon}`)
    setData(response.data)
  }

   const getPokemonByName = async () => {
    setNamePokemon(namePokemon);
  };

  const buttonSearch = async () => {
    const id = toast.loading("Buscando pokemon");
    try {
      const response = await api.get(`/pokemon/${namePokemon.toLowerCase()}`);
      toast.update(id, {
        render: "Pokemon encontrado",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setData(response.data);
      setIdPokemon(response.data.id);
      setNamePokemon('');
    } catch (error) {
      toast.update(id, {
        render: "Pokemon não encontrado",
        type: "warning",
        isLoading: false,
        autoClose: 2000,
      });
      setNamePokemon('');
    }
  };

  useEffect(() => {
      getPokemon();
  }, [idPokemon]);

  const proximo = () => {
    if (idPokemon < 1010) {
    setIdPokemon(idPokemon+1)
    }
  }

  const anterior = () => {
    if (idPokemon > 1) {
      setIdPokemon(idPokemon - 1);
    }
  }


  return (

    
    <main>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />

      <img src={data?.sprites?.front_default} className='pokemon'/>
      
      <h1 className='data'>
        <span className="pokemonId">{data?.id}</span> - <span className="pokemonName">{data?.name}</span>
      </h1>

      <form className='form'>
          <input type='search' className='pokemon-search' placeholder='Name or Id' value={namePokemon} onChange={(e)=>setNamePokemon(e.target.value)} required></input>
      </form>

    <div className="button-clear">
      <button className="button-circle btn-clear" onClick={buttonSearch}>Buscar</button>
    </div>

    <div className='button-left'>
      <button className='button btn-left' onClick={anterior}><FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} /></button>
    </div>

    <div className='button-right'>
      <button className='button btn-right' onClick={proximo}><FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} /></button>
    </div>

      <img src="../src/assets/pokedex.png" alt='Pokedex' className='pokedex'/>

      <ToastContainer/>
    </main>
  )
}

export default App