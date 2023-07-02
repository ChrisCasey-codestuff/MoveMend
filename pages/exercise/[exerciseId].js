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
  const { id } = params;
  // Fetch data for the specific exercise


  // Return the data as props
  return {
    props: {
      params,
    },
  };
}




export default function ExerciseId({params}) {

  let exercise
  const [exercise, setxEercise] = useState([]);
  function getExercises () {
    axios.get('http://localhost:3001/exercises/' + params.id)
    .then(response => {
      //console.log(response.data);
      setExercise(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <div className="flex flex-col justify-center mr-2">

    </div>
    )
  }
