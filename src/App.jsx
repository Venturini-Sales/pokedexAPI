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

      <img src="https://lh3.googleusercontent.com/pw/ADCreHcp_k8Bo2aiQxcjYzEoHLlv5pBS_2V5hUPx6SmsAM-PDwscN8qMJ7Y5wvG-KlM6hFqGHDVN334S4qZ_PW-4KjUmDPKUsG9RodpNub15xABEbHBvytNWWtN6RnftVFTPAP1iArPvyqaLja8WDj_wCPOw6ieiCK1tfbeEo--8or2uK4SEjQuL45UhLM7pcurJ8Vt2lu80u8h29InvNoxhhRn__ULgBlVAN_BCtHTjIKEihHZMkFB3haMS2ROuRUlqXG5bV3vIP6T7IyAgB_0tgGjks-W3mSNpS8GIKTsGdczkHSYmBTGrGePoWxlxNiXSqye0YPOEy5SASOhNNooYjcGPLjmdrOZQLhnBjOYZ-jWdp8K-w17UCHkAW4l3sHTtPBp5Nlseb7XWrj-Ml9t3My9ESMKLzJ67gXpDtW4u2klAxfWt3vdiw8UKh9lZRGZjNob3DK5-jVGvoaw4760UGtVlX-tO9KWMohpsNvHcsGNiqxG1Zf1ryB-jCvaxLOl5fve1MKeoeOOmVPfxfRMg6qr1f6Wvgr2YVfF52OTiYA8W04oT7wnw8wq49wQrqqBo6TZ87gNdv9jPRZmbBw6qRPO_QGvZpBecUvF4qiAMtc4ec3PQemNwyOo50HfmsGSZWtZaidmoDxJ7gHMR84hWYeZIZUylN7t7sz3aejMs2Kt4KN3q-DsDCuQ_GINLUDaICGf_FAkV1Vin9ty9rtj3xpcs4eCG9oCYZ9TB0xyHKLBo2avgGJZQ0UbbSPdUsKxzJ8dFbR9STGTXFB3c4jC5b8uK8aXqmSm_r_xYIUpmBKp54TxLxGdl3E1aqO2YqFzS4dRdaZ1oWNBXql8t8PnAEiOfFw1NUGWbYANgVJlJrL5JAYQaX5oIo9usFzG3FPIoD8b9d3P2woO6RNIgFVWg45FXWrorebeCWyX8qrVk7QpMxLFgKk7AWJuHTUfLBOk=w425-h637-s-no?authuser=0" alt='Pokedex' className='pokedex'/>

      <ToastContainer/>
    </main>
  )
}

export default App