import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCircle } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";

function CharacterDetail({ selectedId, onAddToFavorite, favorites }) {
  const [character, setCharacter] = useState();
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    const getCharacter = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );

        setCharacter(data);
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedId) getCharacter();
  }, [selectedId]);

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/episode`
        );

        setEpisodes(data.results.slice(0, 6));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    selectedId && getEpisodes();
  }, [selectedId]);

  if (loading) {
    return (
      <div className="text-white w-full flex justify-center pt-4">
        Loding ...
      </div>
    );
  }
  return (
    <div className="px-8 sm:pr-16">
      {selectedId ? (
        <div>
          {character && (
            <Detail
              character={character}
              onAddToFavorite={onAddToFavorite}
              favorites={favorites}
            />
          )}
          {episodes && <ListOfEpisodes episodes={episodes} />}
        </div>
      ) : (
        <p className="text-white">NO ITEM SELECTED</p>
      )}
    </div>
  );
}

export default CharacterDetail;

function Detail({ character, onAddToFavorite, favorites }) {
  const isAddedToFavoraite = favorites
    .map((item) => item.id)
    .includes(character.id);
  return (
    <div className="mt-4 rounded-lg flex bg-slate-600">
      <div className="grid grid-cols-2 sm:grid-cols-1  md:grid-cols-2">
        <div>
          <img
            src={character.image}
            alt={character.name}
            className=" rounded-t-none sm:rounded-t-lg md:rounded-tr-none sm:rounded-tl-lg   rounded-l-lg sm:rounded-l-none md:rounded-l-lg h-full w-full lg:w-64 lg:h-64"
          />
        </div>
        <div className="flex flex-col justify-around pl-8 pr-2 py-4">
          <div className="text-white">
            <p>{character.name}</p>
            <p className="flex items-center text-white">
              <span>
                <FaCircle
                  className={`text-sm ${
                    character.status === "Alive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                />
              </span>
              <span>{character.status}-</span>
              <span>{character.species}</span>
            </p>
          </div>
          <div className="text-white">
            <p className="md:text-xl text-slate-800">last known location:</p>
            <p>{character.location.name}</p>
          </div>
          <div>
            {isAddedToFavoraite ? (
              <p className=" text-white font-bold md:text-lg">
                Already added to favorite !
              </p>
            ) : (
              <button
                onClick={() => onAddToFavorite(character)}
                className=" bg-slate-700 text-white py-2 px-2 lg:px-8 rounded-xl lg:font-bold"
              >
                add to favorite
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListOfEpisodes({ episodes }) {
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className=" p-4 my-8 bg-slate-600 rounded-lg">
      <div className="flex  justify-between items-center">
        <p className="text-xl font-bold text-slate-800">List of Episodes :</p>
        <button onClick={() => setSortBy(!sortBy)}>
          <FaCircleArrowDown
            className={`text-white ${
              sortBy ? "rotate-180 transition" : "rotate-0 transition"
            }`}
          />
        </button>
      </div>
      <ul className="mt-4">
        {sortedEpisodes.map((item, index) => (
          <li key={item.id} className="lg:flex-row flex-col flex text-white justify-between my-2">
            <div>
              {String(index + 1).padStart(2, "0")}
              {"-"}
              {item.episode} : <strong>{item.name}</strong>
            </div>
            <div className="bg-slate-700 py-1 w-8/12 sm:w-8/12 md:w-8/12 lg:w-4/12 flex justify-center items-center rounded-2xl">
              {item.air_date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
