import React, { useEffect, useState } from 'react'
import './App.css'
import { api } from './lib/axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const id = toast.loading('Searching Pokemon');
    try {
      const response = await api.get(`/pokemon/${namePokemon.toLowerCase()}`);
      toast.update(id, {
        render: 'Pokemon found',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      setData(response.data);
      setIdPokemon(response.data.id);
      setNamePokemon('');
    } catch (error) {
      toast.update(id, {
        render: 'Pokemon not found',
        type: 'warning',
        isLoading: false,
        autoClose: 2000,
      });
      setNamePokemon('');
    }
  };

  useEffect(() => {
    getPokemon();
}, [idPokemon]);

  const buttonEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      buttonSearch();
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    buttonSearch(); 
  };

  const next = () => {
    if (idPokemon < 1010) {
    setIdPokemon(idPokemon+1)
    }
  }

  const previous = () => {
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

      <form className='form' onSubmit={handleFormSubmit}>
          <input type='search' className='pokemon-search' placeholder='Name or Id' value={namePokemon} onChange={(e)=>setNamePokemon(e.target.value)} onKeyPress={buttonEnter} required></input>
      </form>

    <div className="button-search">
      <button className="button-circle btn-search" onClick={buttonSearch}>Search</button>
    </div>

    <div className='button-left'>
      <button className='button btn-left' onClick={previous}></button>
    </div>

    <div className='button-right'>
      <button className='button btn-right' onClick={next}></button>
    </div>

      <img src="https://lh3.googleusercontent.com/pw/ADCreHeHaBomeikipLrZ-s1pF6cHQ_iMIc_FaBgEC7ALpPJsWWrsb0BHugtpKr9SyXErJZzTW_tDiDeP9RqtesbCVGaRmQ7fgDlaqTQ_MwDR4Eiak35SUrKJs4z9ZUO6HqB3HHKxdVCXgXtvZve0zTTK_LcevLyKfQVmyEXvtHwqizObvUgBpKMEacHgwbZ_OQe7GQltLw3nxlUncX1_9YJbwu74bc0JWAIn7xmlZBgdbqAHalyB_ies4SQ4z3kwHPe0Ltgnk1leouqN3jcAvHi8JnSXLF9TFQK-t0h6BflAySfqOW5X3KmITFQx7MDZzpHBKcD9s9vqeZ51SVMmHb9Y2wp3tLNHK7koD9OfI0kTRj9Dy5KcYk0Y0JJeEx6GMuCt6bhJFV8GZSTbvkAL49DC1ROucbdpNG7kx_3Emmbp4wgY6SqET6DLbF2k6yKi7VjzZkpI1xrXX-cewLVNSPKO_YVAIFbUSymDcjEoVTLkh17Mb10OxiDVnVYMVFExZLaJMoC4Uj9-_mMasZTTnXUvchuSgH01h6aViIv_JV0ahvxStRx2HuLxwtVUl2swFJXsYltinYhcGGq0zjEGllkh653AL5a5o5KKsFq84n6z9ZQhm5FGpPZMj2rWCS1j_2FnjMWKiZZIAhU3QL2B6FTvMt6laxacWF4zXhPR0nrnj6F7p-YWBlHlTcTO6r9i-Lsg2OeZe0xPq4QOczWUE2fd10yNo5w-ojJ4Z4lFMZnRngZhFW1DTMjKKeHNzvhlv7HUZzWS4HgJKusOvrY85yzP-F2Ro7GLIk7esAMv2Matv_wP-OsHpJl3NhcbV09NGSVjrsGNoKruNQ0hDBfuU63NPGjOXQYh2YdYbTNVy_diW7trIco6sTwQ90PFtsv_L1aIrTnrI4nRNa9OMSiZWnEdt_gyWhTnEVW-4SYus7SE1a-EuMxHDZT71ODZ7zmHo_o=w425-h637-s-no?authuser=0" alt='Pokedex' className='pokedex'/>

      <ToastContainer/>
    </main>
  )
}

export default App