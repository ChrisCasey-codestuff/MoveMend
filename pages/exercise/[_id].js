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
    console.log(exercise)

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



  return (
    <div className="flex flex-col justify-center items-center mr-2 w-full">

      <h1>{exercise[0].name}</h1>

    </div>
    )
  }
