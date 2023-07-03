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
  const { _id } = params;

  // Fetch data for the specific exercise using _id

  // Assuming you are using axios, make the API request
  const response = await axios.get(`http://localhost:3001/exercise/${_id}`);
  const myExercise = response.data;

  // Return the exercise data as props along with the params
  return {
    props: {
      myExercise,
      params,
    },
  };
}




export default function ExerciseId({params, myExercise}) {

  const [exercise, setExercise] = useState(myExercise);

  useEffect(() => {
    // Function to call when the component mounts
    getExercise();

  }, []);

  console.log(params)

  function getExercise() {
    axios.get('http://localhost:3001/exercise/' + params._id)
      .then(response => {
        setExercise(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const [resMenuOpen, setResMenuOpen] = useState({
    resOneMenu : false,
    resTwoMenu : false,
    resThreeMenu : false,
    repOneMenu : false,
    repTwoMenu : false,
    repThreeMenu : false
  })


  function handleClick (e) {
    // Create a new copy of the state object
    const newState = { ...resMenuOpen };
    let menuName = e.target.name + "Menu"
    console.log(menuName)
    // Modify the desired property in the new state object
    newState[menuName] = !newState[menuName];

    for (let key in newState) {
      if (key !== menuName) {
        newState[key] = false
      }
    }
    // Update the state with the new state object
    setResMenuOpen(newState)

    console.log(resMenuOpen)
  }

  return (
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-start mt-60 ml-5">
          <h1 className="text-3xl text-bold">{exercise[0].name}</h1>
        </div>
        <h3 className="flex flex-row justify-center text-2xl">Resistance</h3>
        <div className="flex flex-row justify-center m-5 mt-10">
          <div className="flex flex-col w-1/3 justify-center">
            <button className="border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full" name="resOne" onClick={handleClick}>None</button>
            {resMenuOpen.resOneMenu && <div>resOne</div>}
          </div>
          <div className="flex flex-col w-1/3 justify-center">
            <button className="border border-r-0 border-gray-300 px-6 py-4 rounded-l text-xl w-full"  name="resTwo" onClick={handleClick}>Weights</button>
            {resMenuOpen.resTwoMenu && <div>resTwo</div>}
          </div>
          <div className="flex flex-col w-1/3 justify-center">
            <button className="border border-gray-300 px-6 py-4 rounded-r text-xl w-full"  name="resThree" onClick={handleClick}>Bands</button>
            {resMenuOpen.resThreeMenu && <div>resThree</div>}
          </div>
        </div>
        <div className="flex flex-row justify-center m-5 mt-10">
          <div className="flex flex-col w-1/3 justify-center">
              <button className="border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full" name="repOne" onClick={handleClick}>None</button>
              {resMenuOpen.repOneMenu && <div>repOne</div>}
            </div>
            <div className="flex flex-col w-1/3 justify-center">
              <button className="border border-r-0 border-gray-300 px-6 py-4 rounded-l text-xl w-full"  name="repTwo" onClick={handleClick}>Weights</button>
              {resMenuOpen.repTwoMenu && <div>repTwo</div>}
            </div>
            <div className="flex flex-col w-1/3 justify-center">
              <button className="border border-gray-300 px-6 py-4 rounded-r text-xl w-full"  name="repThree" onClick={handleClick}>Bands</button>
              {resMenuOpen.repThreeMenu && <div>repThree</div>}
            </div>
        </div>
      </div>

    )
  }
