import React, { useEffect, useState } from "react";
import "./App.css";
import CharactersList from "./components/CharactersList/CharactersList";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedId,setSelectedId]=useState(1)
  const [favorites,setFavorites]=useState([])

  const addToFavorite=(character)=>{
    console.log(character)
  }
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
    <div style={{minHeight:'100vh'}} className="bg-slate-800  py-8">
      <Navbar characters={characters}/>
      <section className="grid grid-cols-2 mt-6">
        <div >
          <CharactersList characters={characters} onSetSelectedId={setSelectedId}/>
        </div>
        <div >
          <CharacterDetail selectedId={selectedId} favorites={favorites} onAddToFavorite={addToFavorite}/>
        </div>
      </section>
    </div>
  );
}

export default App;
