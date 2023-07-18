import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link  from 'next/link';
const inter = Inter({ subsets: ['latin'] })
const axios = require('axios');
import { useEffect } from 'react'
import { useState } from 'react';
import { BsChevronCompactRight } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'

export default function BodyAreas() {
  const [exercises, setExercises] = useState([]);
  const [areas, setAreas] = useState(["elbow and hand", "hip and knee", "lumbar thoracic"]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    // Filter the exercise list based on the search query
    const filteredAreas = areas.filter(
      (area) =>
        area.toLowerCase().includes(value.toLowerCase())
    );
    if (value === '') {
      setAreas(["elbow and hand", "hip and knee", "lumbar thoracic"])
      return
    }
    setAreas(filteredAreas);
  };

  const handleSearchClick = (e) => {
    // Filter the exercise list based on the search query
    const filteredExercises = exercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.bodyArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setExercises(filteredExercises);
  };

  function getExercises () {
    axios.get('http://localhost:3001/exercises')
    .then(response => {
      //console.log(response.data);
      setExercises(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    getExercises();

  }, []);


  return (
    <div className="flex flex-col justify-center mr-2">


      <h1 className="font-bold text-center text-4xl mt-20">New HEP</h1>
      <div className="flex flex-row justify-center m-5">
        <div className="relative w-full mt-20">
          <form>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 pr-10 pl-10 w-full border border-gray-300 rounded-lg focus:outline-none drop-shadow-xl h-14 p-6"
            placeholder="Search..."
          />
           <span className="absolute right-3 top-4">
             <TiDeleteOutline className="text-2xl"/>
           </span>
           <button type="submit" className="absolute left-3 top-4 mr-2" onClick={handleSearchClick}>
             <AiOutlineSearch className="text-2xl"/>
           </button>
           </form>
          </div>
        </div>
      <div className="flex flex-col justify-center mr-2 mt-5">
        {areas.map((item, index) =>
        <div key={index}>
          <Link href={"/" + item}>
            <div className="flex flex-row bg-gray-200 rounded-lg p-7 w-full m-2 justify-between">
              <p className="text-2xl font-bold">{item}</p>
              <BsChevronCompactRight className="text-3xl"/>
            </div>
          </Link>
        </div>
        )}
      </div>
    </div>
    )
  }
