import React, { useEffect, useState } from "react";
import "./App.css";
import CharactersList from "./components/CharactersList/CharactersList";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const getCharacters = async () => {
      try {
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        console.log(data);
        setCharacters(data.results.slice(0,4))
      } catch (error) {
        console.log(error);
      }
    };
    getCharacters();
  }, []);
  return (
    <div>
      <Navbar characters={characters}/>
      <section className="grid grid-cols-3">
        <div>
          <CharactersList />
        </div>
        <div className=" col-span-2 bg-slate-500">
          <CharacterDetail />
        </div>
      </section>
    </div>
  );
}

export default App;
