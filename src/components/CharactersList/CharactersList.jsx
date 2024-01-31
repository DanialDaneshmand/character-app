import React from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";

function CharactersList({ characters, onSetSelectedId, loading, selectedId }) {
  return (
    <div className=" sm:pl-8 md:pl-16 ">
      {loading ? (
        <p className="text-white">Loading ...</p>
      ) : (
        <div className="flex flex-col items-center">
          {characters.map((item) => (
            <CharacterItem item={item} key={item.id}>
              <button
                onClick={() =>
                  onSetSelectedId(selectedId === item.id ? null : item.id)
                }
              >
                {selectedId === item.id ? (
                  <FaEyeSlash className="text-red-600" />
                ) : (
                  <FaEye className="text-red-600" />
                )}
              </button>
            </CharacterItem>
          ))}
        </div>
      )}
    </div>
  );
}

export default CharactersList;

export const CharacterItem = ({ item, children }) => {
  return (
    <div className=" bg-slate-600 my-4 p-2 rounded-lg md:w-9/12 sm:w-10/4 w-8/12 flex justify-between items-center">
      <div className="flex">
        <div>
          <img className=" w-16 rounded-lg" src={item.image} alt={item.name} />
        </div>
        <div className="flex flex-col justify-between ml-2 text-white">
          <p className=" sm:font-bold">{item.name}</p>
          <p className="flex items-center text-white">
            <span >
              <FaCircle
                className={` sm:text-sm ${
                  item.status === "Alive" ? "text-green-600" : "text-red-600"
                }`}
              />
            </span>
            <span>{item.status}-</span>
            <span>{item.species}</span>
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};
