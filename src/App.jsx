import React, { useEffect, useState } from "react";
import "./App.css";
import CharactersList from "./components/CharactersList/CharactersList";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToFavorite = (character) => {
    console.log(character);
  };
  useEffect(() => {
    const getCharacters = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        setLoading(false);
        setCharacters(data.results.slice(0, 4));
        setSearchItems(data.results.slice(0, 4));
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    getCharacters();
  }, []);

  return (
    <div style={{ minHeight: "100vh" }} className="bg-slate-800  py-8">
      <Toaster />
      <Navbar characters={characters} setSearchItems={setSearchItems} />
      <section className="grid grid-cols-2 mt-6">
        <div>
          <CharactersList
            characters={searchItems}
            onSetSelectedId={setSelectedId}
            loading={loading}
          />
        </div>
        <div>
          <CharacterDetail
            selectedId={selectedId}
            favorites={favorites}
            onAddToFavorite={addToFavorite}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
