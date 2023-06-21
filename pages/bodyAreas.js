import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link  from 'next/link';
const inter = Inter({ subsets: ['latin'] })
const axios = require('axios');
import { useEffect } from 'react'

export default function BodyAreas() {

  let exercises

  function getExercises () {
    axios.get('http://localhost:3001/exercises')
    .then(response => {
      console.log(response.data);
      exercises = response.data
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    // Function to call when the component mounts
    console.log('hello')
    getExercises();

  }, []);


  return (
    <div className="flex flex-col justify-center mr-2">
      <h1 className="font-bold text-center text-4xl mt-20">New HEP</h1>
      <div className="flex flex-row justify-center m-5">
        <div className="relative w-full mt-10">
          <input
            type="text"
            className="px-4 py-2 pr-10 pl-10 w-full border border-gray-300 rounded-lg focus:outline-none drop-shadow-xl h-14 p-6"
            placeholder="Search..."
          />
           <span className="absolute right-3 top-4">
             <p>x</p>
           </span>
           <span className="absolute left-3 top-4 mr-2">
             <p>e</p>
            </span>
          </div>
        </div>
      <div className="flex flex-col justify-center mr-2 mt-5">
        <div>
          <Link href="">
            <div className="flex flex-row bg-gray-200 rounded-lg p-7 w-full m-2">
              <p className="text-2xl font-bold">Shoulders</p>
            </div>
          </Link>
        </div>
        <div>
          <Link href="">
            <div className="flex flex-row bg-gray-200 rounded-lg p-7 w-full m-2">
              <p className="text-2xl font-bold">Chest</p>
            </div>
          </Link>
        </div>
        <div>
          <Link href="">
            <div className="flex flex-row bg-gray-200 rounded-lg p-7 w-full m-2">
              <p className="text-2xl font-bold">Lower back</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
    )
  }
