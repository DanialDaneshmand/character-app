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
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        setLoading(false);
        setCharacters(data.results.slice(0, 7));
        setSearchItems(data.results.slice(0, 7));
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    getCharacters();
  }, []);

  const handlAddToFavorite = (character) => {
    setFavorites([...favorites, character]);
  };

  const handleDelete = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <div style={{ minHeight: "100vh" }} className="bg-slate-800  py-8">
      <Toaster />
      <Navbar
        onDelete={handleDelete}
        characters={characters}
        setSearchItems={setSearchItems}
        favorites={favorites}
      />
      <section className="grid grid-cols-2 mt-6">
        <div>
          <CharactersList
            characters={searchItems}
            onSetSelectedId={setSelectedId}
            loading={loading}
            selectedId={selectedId}
          />
        </div>
        <div>
          <CharacterDetail
            selectedId={selectedId}
            favorites={favorites}
            onAddToFavorite={handlAddToFavorite}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
