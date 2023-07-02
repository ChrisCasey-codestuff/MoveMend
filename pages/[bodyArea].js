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


export async function getServerSideProps(context) {
  const { params } = context;
  const { bodyArea } = params;
  // Fetch data for the specific bodyArea


  // Return the data as props
  return {
    props: {
      params,
    },
  };
}



export default function Exercises({params}) {

  let exercises
  const [areaExercises, setAreaExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    // Filter the exercise list based on the search query
    const filteredExercises = areaExercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(value.toLowerCase()) ||
        exercise.bodyArea.toLowerCase().includes(value.toLowerCase()) ||
        exercise.type.toLowerCase().includes(value.toLowerCase())
    );
    if (value === '') {
      axios.get('http://localhost:3001/exercises/' + params.bodyArea)
    .then(response => {
      //console.log(response.data);
      setAreaExercises(response.data)
    })
    .catch(error => {
      console.error(error);
    });
    }
    setAreaExercises(filteredExercises);
  };

  function getExercises () {
    axios.get('http://localhost:3001/exercises/' + params.bodyArea)
    .then(response => {
      //console.log(response.data);
      setAreaExercises(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  }

  const handleSearchClick = (e) => {


    // Filter the exercise list based on the search query
    const filteredExercises = areaExercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.bodyArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setAreaExercises(filteredExercises);
  };

  useEffect(() => {
    // Function to call when the component mounts
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
        {areaExercises.map((item, index) =>
        <div key={index}>
          <Link href={"/exercise/" + item._id}>
            <div className="flex flex-row bg-gray-200 rounded-lg p-7 w-full m-2 justify-between">
              <p className="text-2xl font-bold">{item.name}</p>
              <BsChevronCompactRight className="text-3xl"/>

            </div>
          </Link>
        </div>
        )}
      </div>
    </div>
    )
  }
