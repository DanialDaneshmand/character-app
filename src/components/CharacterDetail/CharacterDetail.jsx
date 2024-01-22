import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCircle } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";

function CharacterDetail({ selectedId, onAddToFavorite, favorites }) {
  const [character, setCharacter] = useState();
  const [loading, setLoading] = useState(false);
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

  if (loading) {
    return <div>Loding ...</div>;
  }
  return (
    <div className="px-16">
      {selectedId ? (
        <div>
          {character && (
            <Detail
              character={character}
              onAddToFavorite={onAddToFavorite}
              favorites={favorites}
            />
          )}
          {character && <ListOfEpisodes character={character} />}
        </div>
      ) : (
        <p>NO ITEM SELECTED</p>
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
      <div>
        <img
          src={character.image}
          alt={character.name}
          className=" rounded-l-lg"
        />
      </div>
      <div className="flex flex-col justify-around pl-8 ">
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
          <p className="text-xl text-slate-800">last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div>
          {isAddedToFavoraite ? (
            <p className=" text-white font-bold text-lg">Already added to favorite !</p>
          ) : (
            <button
              onClick={() => onAddToFavorite(character)}
              className=" bg-slate-700 text-white py-2 px-8 rounded-xl font-bold"
            >
              add to favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ListOfEpisodes({ character }) {
  return (
    <div className=" p-4 my-8 bg-slate-600 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-slate-800">List of Episodes :</p>
        <FaCircleArrowDown className="text-white" />
      </div>
      <div className="flex justify-between">
        <div>
          {character.episode.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <div>
        {character.episode.map((item, index) => (
            <p key={index}>{item.air_data}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
