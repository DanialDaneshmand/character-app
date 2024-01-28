import React from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";

function CharactersList({ characters, onSetSelectedId, loading, selectedId }) {
  return (
    <div className="pl-16 pr-2">
      {loading ? (
        <p className="text-white">Loading ...</p>
      ) : (
        <div>
          {characters.map((item) => (
            <CharacterItem
              item={item}
              key={item.id}
            >
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

export const CharacterItem = ({
  item,
  children,
  onSetSelectedId,
  selectedId,
}) => {
  return (
    <div className=" bg-slate-600 my-4 p-2 rounded-lg w-[420px] flex justify-between items-center">
      <div className="flex">
        <div>
          <img className="w-16 rounded-lg" src={item.image} alt={item.name} />
        </div>
        <div className="flex flex-col justify-between ml-2 text-white">
          <p className=" font-bold">{item.name}</p>
          <p className="flex items-center text-white">
            <span>
              <FaCircle
                className={`text-sm ${
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
