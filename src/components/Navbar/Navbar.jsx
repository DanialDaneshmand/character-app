import React, { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ characters }) {
  const [value, setValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  
//   const handleSearch = (e) => {
//     setValue(e.target.value);
//     const updatedCharacters = characters.filter((item) =>
//       item.name.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setSearchItems(updatedCharacters);
//   };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-600 rounded-xl mx-8 md:mx-16  justify-between px-8 py-6 items-center ">
      {/* {modalShow && (
        <Modal
          onDelete={onDelete}
          favorites={favorites}
          modalShow={modalShow}
          setModalShow={setModalShow}
        />
      )} */}
      <LogoAndInputComp value={value}  />
      <FavouriteComp
        
        characters={characters}
      />
    </div>
  );
}

export default Navbar;

const LogoAndInputComp = ({ value }) => {
  return (
    <div className="flex mb-16 md:mb-0 items-center justify-between md:justify-around w-full ">
      <div className="text-white font-bold">logo</div>
      <input
        value={value}
        // onChange={onSearch}
        type="text"
        placeholder="search ..."
        className="bg-slate-500 px-2 py-1 md:px-4 md:py-2 rounded-lg  focus:outline-none"
      />
    </div>
  );
};

const FavouriteComp = ({  characters }) => {
  return (
    <div className="flex items-center justify-between md:justify-around w-full">
      <p className="text-slate-400">found {characters.length} character</p>
      <button className="flex" >
        <HeartIcon className="text-red-600 w-8 h-8" />
        <span className="badge font-bold inline-block text-sm bg-red-600 text-white px-1 rounded-full">
          4
        </span>
      </button>
    </div>
  );
};
