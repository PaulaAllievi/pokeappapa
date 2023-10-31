import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo pokeapp.png';
import { PokemonContext } from '../context/PokemonContext';
import '../index.css';

const Navigation = () => {
  const { onInputChange, valueSearch, onResetForm } = useContext(PokemonContext);
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    
    if (!valueSearch.trim()) {
      alert('Por favor, ingresa un valor en el campo de búsqueda.');
    } else {
      navigate('/search', {
        state: valueSearch,
      });
      onResetForm();
    }
  };

  return (
    <>
      <div className="navigation">
        <header>
          <Link to="/">
            <img style={{ width: '200px', height: 'auto' }} src={logo} alt="logo pokeapp" />
          </Link>
        </header>
        <form className="form" onSubmit={onSearchSubmit}>
          <input
            type="search"
            placeholder="Buscar Pokemon"
            name="valueSearch"
            id=""
            value={valueSearch}
            onChange={onInputChange}
          />
          <button className="button-form" type="submit">
            Buscar
          </button>
        </form>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
