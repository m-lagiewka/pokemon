import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/styles/pokemon.css';
import reportWebVitals from './reportWebVitals';
import Loader from './components/Loader';
import Test from './components/Test';
import PokemonList from './pages/PokemonList';
import PokemonContextProvider from './components/PokemonContextProvider';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PokemonContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="pokemon-list" element={<PokemonList />} />
        <Route path="testing" element={<Test />} />
        <Route path="/" element={<Loader />} exact />
      </Routes>
    </BrowserRouter>
  </PokemonContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
