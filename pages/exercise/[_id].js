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
import { useMyContext } from '.../contexts/MyContext.js';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { params } = context;
  const { _id } = params;

  // Fetch data for the specific exercise using _id

  // Assuming you are using axios, make the API request
  const response = await axios.get(`https://move-back-4c06dfb415c7.herokuapp.com/${_id}`);
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

function updateSessionStorage(updatedHepArray) {
  sessionStorage.setItem('hepData', JSON.stringify(updatedHepArray));
}

export default function ExerciseId({params, myExercise}) {
  const { hep, setHep } = useMyContext(initialState);
  const [exercise, setExercise] = useState(myExercise);
  const router = useRouter();

  useEffect(() => {
    // Function to call when the component mounts
    getExercise();

    // Get the stored hep data from session storage on component mount
    const storedHepData = sessionStorage.getItem('hepData');
    if (storedHepData) {
      setHep({ ...hep, hep: JSON.parse(storedHepData) });
    }
  }, []);

  //console.log(params)

  function getExercise() {
    axios.get('https://move-back-4c06dfb415c7.herokuapp.com/exercise/' + params._id)
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
    repThreeMenuClass : "bg-white border border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
  })

  const [resMenuBg, setResMenuBg] = useState({
    resOneMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
    resTwoMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
    resThreeMenuClass : "bg-white border border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
  })

  const [timeMenuSelect, setTimeMenuSelect] = useState({
    timeOneMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
    timeTwoMenuClass : "bg-white border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
    timeThreeMenuClass : "bg-white border border-gray-300 px-6 py-4 rounded-sm text-xl w-full",
  })

  function resHandleClickGreen (e) {

   const newState = {...resMenuBg}
   let menu = e.target.name + "MenuClass"
   newState[menu] = "bg-green-500 border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full"

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
    newState[menu] = "bg-green-500 border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full"

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
    newState[menu] = "bg-green-500 border border-r-0 border-gray-300 px-6 py-4 rounded-sm text-xl w-full";
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
      patientId: "123456789",
      exerciseId: exercise[0]._id,
      exerciseName: exercise[0].name,
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
    updateSessionStorage(updatedHepArray);
    console.log(updatedHepArray);
    router.push('/bodyAreas')
     // This will show all accumulated objects
  }

  return (
      <div className="flex flex-col bg-black w-full sm:w-full">
        <div className="mt-60 bg-white rounded-3xl sm:w-full">
        <div className="flex flex-row justify-start ml-5">
          <h1 className="text-4xl text-bold mt-4 mb-4 font-semibold">{exercise[0].name}</h1>
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
        {resMenuOpen.resTwoMenu && <div className="w-full p-4">
            <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-4 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xl" name="weight">
              <option value="0 lbs">0 lbs</option>
              <option value="5 lbs">5 lbs</option>
              <option value="10 lbs">10 lbs</option>
              <option value="20 lbs">20 lbs</option>
            </select>
          </div>
          }
        {resMenuOpen.resThreeMenu && <div className="w-full p-4">
            <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-4 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xl" name="bands" >
              <option value="very light">very light</option>
              <option value="light">light</option>
              <option value="medium">medium</option>
              <option value="heavy">heavy</option>
            </select>
          </div>
          }
        </div>
          <div className="flex flex-row justify-center m-5 pt-6">
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
          {repMenuOpen.repOneMenu && <div className="w-full p-4">
              <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-4 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xl" name="reps" placeholder="Repetitions">
                <option value="0 reps">2 repetitions</option>
                <option value="5 reps">5 repetitions</option>
                <option value="10 reps">10 repetitions</option>
                <option value="20 reps">20 repetitions</option>
              </select>
            </div>
          }
        {repMenuOpen.repTwoMenu && <div className="w-full p-4">
            <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-4 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xl" name="hold" placeholder="Hold">
              <option value="2 seconds">2 seconds</option>
              <option value="5 seconds">5 seconds</option>
              <option value="10 seconds">10 seconds</option>
              <option value="20 seconds">20 seconds</option>
            </select>
          </div>
          }
        {repMenuOpen.repThreeMenu && <div className="flex flex-row w-full p-4 m-5">
            <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-4 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xl m-2" name="reps" placeholder="Repetitiions">
              <option value="2 reps">2 repetitions</option>
              <option value="5 reps">5 repetitions</option>
              <option value="10 reps">10 repetitions</option>
              <option value="20 reps">20 repetitions</option>
            </select>
            <select id="myDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-4 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xl m-2" name="hold" placeholder="Hold">
              <option value="2 seconds">2 seconds</option>
              <option value="5 seconds">5 seconds</option>
              <option value="10 seconds">10 seconds</option>
              <option value="20 seconds">20 seconds</option>
            </select>
          </div>
          }
          <h3 className="text-2xl">Perform</h3>
          <div className="flex flex-row w-full p-2 m-2">
              <select id="setsDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 rounded-md leading-tight py-4 px-4 focus:outline-none focus:bg-white focus:border-blue-500 m-2 text-xl" name="sets" placeholder="Sets">
                <option value="0 sets">0 sets</option>
                <option value="2 sets">2 sets</option>
                <option value="4 sets">4 sets</option>
                <option value="6 sets">6 sets</option>
              </select>

              <select id="timesDropdown" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 rounded-md leading-tight py-4 px-4 focus:outline-none focus:bg-white focus:border-blue-500 m-2 text-xl" name="times" placeholder="Times">
                <option value="0 times">0 times</option>
                <option value="1 times">1 times</option>
                <option value="2 times">2 times</option>
                <option value="3 times">3 times</option>
              </select>

          </div>
          <h3 className="text-2xl">Every</h3>
          <div className="flex flex-row justify-center pt-6 w-full m-5">
            <div className="flex flex-col w-1/3 justify-center ml-4">
              <button className={timeMenuSelect.timeOneMenuClass} name="timeOne" onClick={altHandleClick}>Day
                <input type="checkbox" className="hidden" name="timeOne"/>
              </button>
            </div>
            <div className="flex flex-col w-1/3 justify-center">
              <button className={timeMenuSelect.timeTwoMenuClass} name="timeTwo" onClick={altHandleClick}>Week
                <input type="checkbox" className="hidden" name="timeTwo"/>
              </button>
            </div>
            <div className="flex flex-col w-1/3 justify-center mr-5">
              <button className={timeMenuSelect.timeThreeMenuClass} name="timeThree" onClick={altHandleClick}> Hour
                <input type="checkbox" className="hidden" name="timeThree"/>
              </button>
            </div>
          </div>
          <div className="w-full pr-4 pl-4">
          <input type="submit" value="Add to program +" className="bg-green-500 border border-gray-300 p-5 w-full hover:drop-shadow-2xl drop-shadow-lg text-white mt-5 rounded-xl text-xl mb-6"/>
         </div>
          </div>
          </form>
        </div>
        </div>
      </div>
    )
}
