import React from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { CharacterItem } from "../CharactersList/CharactersList";


function Modal({ setModalShow, favorites, onDelete }) {
  return (
    <div className="modalContainer">
      <div className="modal">
        <div className="w-10/12 sm:w-8/12 md:w-5/12 rounded-2xl bg-slate-800">
          <div className="w-full flex justify-end p-2 ">
            <button
              onClick={() => setModalShow(false)}
              className="text-lg text-red-600"
            >
              <FaCircleXmark />
            </button>
          </div>
          <div className="w-full flex flex-col items-center mb-4">
            {
              favorites.length?favorites.map((item) => (
                <CharacterItem item={item} key={item.id} >
                  <div>
                    <button
                      className="mr-2 text-red-600 text-lg"
                      onClick={() => onDelete(item.id)}
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                </CharacterItem>
              )):<p className="text-white font-bold">no item added!</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
