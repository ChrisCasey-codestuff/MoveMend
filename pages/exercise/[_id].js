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
import { useMyContext } from '/Users/tomwhiteman/Desktop/movemend/contexts/MyContext.js';


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

const initialState = {
  hep: [],
};


export default function ExerciseId({params, myExercise}) {
  const { hep, setHep } = useMyContext(initialState);
  const [exercise, setExercise] = useState(myExercise);

  useEffect(() => {
    // Function to call when the component mounts
    getExercise();

  }, []);

  //console.log(params)

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
  })

  const [repMenuOpen, setRepMenuOpen] = useState({
    resOneMenu : false,
    resTwoMenu : false,
    resThreeMenu : false,
  })

  const [repMenuBg, setRepMenuBg] = useState({
    repOneMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
    repTwoMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
    repThreeMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
  })

  const [resMenuBg, setResMenuBg] = useState({
    resOneMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
    resTwoMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
    resThreeMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
  })

  const [timeMenuSelect, setTimeMenuSelect] = useState({
    timeOneMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
    timeTwoMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
    timeThreeMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
  })

  function resHandleClickGreen (e) {

   const newState = {...resMenuBg}
   let menu = e.target.name + "MenuClass"
   newState[menu] = "bg-green-300 border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full"

   for (let key in newState) {
    if (key !== menu) {
      newState[key] = "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full"
    }
   }

  setResMenuBg(newState)

  }

  function repHandleClickGreen (e) {

    const newState = {...repMenuBg}
    let menu = e.target.name + "MenuClass"
    newState[menu] = "bg-green-300 border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full"

    for (let key in newState) {
     if (key !== menu) {
       newState[key] = "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full"
     }
    }

   setRepMenuBg(newState)

   }

   function altHandleClick(e) {
    e.preventDefault();
    const newState = { ...timeMenuSelect };
    const menu = e.target.name + "MenuClass";

    // Set the selected menu to true and others to false
    newState[menu] = "bg-green-200 border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full";
    for (let key in newState) {
      if (key !== menu) {
        newState[key] = "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full";
      }
    }

    // Update the state with the new state object
    setTimeMenuSelect(newState);
  }


  function repHandleClick (e) {
    event.preventDefault();
    repHandleClickGreen(e)

    // Create a new copy of the state object
    const newState = { ...repMenuOpen };
    let menuName = e.target.name + "Menu"

    // Modify the desired property in the new state object
    newState[menuName] = !newState[menuName];

    for (let key in newState) {
      if (key !== menuName) {
        newState[key] = false
      }
    }
    // Update the state with the new state object
    setRepMenuOpen(newState)

  }

  function handleClick (e) {
    event.preventDefault();
    resHandleClickGreen(e)

    // Create a new copy of the state object
    const newState = { ...resMenuOpen };
    let menuName = e.target.name + "Menu"

    // Modify the desired property in the new state object
    newState[menuName] = !newState[menuName];

    for (let key in newState) {
      if (key !== menuName) {
        newState[key] = false
      }
    }
    // Update the state with the new state object
    setResMenuOpen(newState)
    //console.log(resMenuBg)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const hepData = {};

    for (let [key, value] of formData.entries()) {
      hepData[key] = value;
    }

    const hepObject = {
      patientId: "123456789"
      exercise: exercise.name,
      reps: hepData.reps,
      weight: hepData.weight,
      bands: hepData.bands,
      hold: hepData.hold,
      sets: hepData.sets,
      times: hepData.times,
      day: timeMenuSelect.timeOneMenuClass.includes("bg-green-200") ? true : false,
      week: timeMenuSelect.timeTwoMenuClass.includes("bg-green-200") ? true : false,
      hour: timeMenuSelect.timeThreeMenuClass.includes("bg-green-200") ? true : false,
    };

    // Spread the previous hepArray and add the new hepObject
    const updatedHepArray = [...hep.hep, hepObject];

    // Update the state with the accumulated hepArray
    setHep({ ...hep, hep: updatedHepArray });

    console.log(updatedHepArray); // This will show all accumulated objects
  }

  return (
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-start mt-60 ml-5">
          <h1 className="text-3xl text-bold">{exercise[0].name}</h1>
        </div>
        <div id="form holder">
          <form onSubmit={handleSubmit}>
            <h3 className="flex flex-row justify-center text-2xl">Resistance</h3>
            <div className="flex flex-row justify-center m-5 mt-10">
              <div className="flex flex-col w-1/3 justify-center">
                <button className={resMenuBg.resOneMenuClass} name="resOne" onClick={handleClick}>None
                  <input type="checkbox" className="hidden" name="resOne"/>
                </button>
              </div>
              <div className="flex flex-col w-1/3 justify-center">
                <button className={resMenuBg.resTwoMenuClass}  name="resTwo" onClick={handleClick}>Weights</button>
              </div>
              <div className="flex flex-col w-1/3 justify-center">
                <button className={resMenuBg.resThreeMenuClass}  name="resThree" onClick={handleClick}>Bands</button>
              </div>
            </div>
        <div className="flex flex-col justify-center items-center w-full">
        {resMenuOpen.resTwoMenu && <div className="w-full max-w-sm mx-auto">resTwo
            <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500" name="weight">
              <option value="0">0</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          }
        {resMenuOpen.resThreeMenu && <div className="w-full max-w-sm mx-auto">resThree
            <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500" name="bands" >
              <option value="0">0</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          }
        </div>
          <div className="flex flex-row justify-center m-5 pt-20">
            <div className="flex flex-col w-1/3 justify-center">
              <button className={repMenuBg.repOneMenuClass} name="repOne" onClick={repHandleClick}>Reps
              </button>
            </div>
            <div className="flex flex-col w-1/3 justify-center">
              <button className={repMenuBg.repTwoMenuClass}  name="repTwo" onClick={repHandleClick}>Holds</button>
            </div>
            <div className="flex flex-col w-1/3 justify-center">
              <button className={repMenuBg.repThreeMenuClass}  name="repThree" onClick={repHandleClick}>Both</button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
          {repMenuOpen.repOneMenu && <div className="w-full max-w-sm mx-auto">reps
              <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500" name="reps">
                <option value="0">0</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          }
        {repMenuOpen.repTwoMenu && <div className="w-full max-w-sm mx-auto">holds
            <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500" name="hold">
              <option value="0">0</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          }
        {repMenuOpen.repThreeMenu && <div className="flex flex-row w-full max-w-sm mx-auto m-5">both
            <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500" name="reps">
              <option value="0">0</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500" name="hold">
              <option value="0">0</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          }
          <h3>perform</h3>
          <div className="flex flex-row w-full">
            <div className="w-full max-w-sm mx-auto">sets
              <select id="setsDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 m-5" name="sets">
                <option value="0">0</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="w-full max-w-sm mx-auto">Times
              <select id="timesDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 m-5" name="times">
                <option value="0">0</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
          <h3>Every</h3>
          <div className="flex flex-row justify-center m-5 mt-10 w-full">
            <div className="flex flex-col w-1/3 justify-center">
              <button className={timeMenuSelect.timeOneMenuClass} name="timeOne" onClick={altHandleClick}>Day
                <input type="checkbox" className="hidden" name="timeOne"/>
              </button>
            </div>
            <div className="flex flex-col w-1/3 justify-center">
              <button className={timeMenuSelect.timeTwoMenuClass} name="timeTwo" onClick={altHandleClick}>Week
                <input type="checkbox" className="hidden" name="timeTwo"/>
              </button>
            </div>
            <div className="flex flex-col w-1/3 justify-center">
              <button className={timeMenuSelect.timeThreeMenuClass} name="timeThree" onClick={altHandleClick}> Hour
                <input type="checkbox" className="hidden" name="timeThree"/>
              </button>
            </div>
          </div>
          <input type="submit" value="Add to program +" className="bg-blue-300 border border-gray-300 p-5 m-5 w-full hover:drop-shadow-lg drop-shadow-sm"/>
          </div>
          </form>
        </div>
      </div>
    )
}
