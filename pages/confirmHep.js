import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link  from 'next/link';
const inter = Inter({ subsets: ['latin'] })
const axios = require('axios');
import { BiUser } from 'react-icons/bi'
import { BsLightningCharge } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useMyContext } from '/Users/tomwhiteman/Desktop/movemend/contexts/MyContext.js';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { auth } from '../src/firebase.js'

export default function confirmHep() {

  const { user, setUser } = useMyContext();
  const { hep, setHep } = useMyContext();
  const { patients, setPatients } = useMyContext();
  const router = useRouter();
  const [ therapistId, setTherapistId ] = useState();
  const { userData, setUserData } = useMyContext();
  //get therapistId

  function updateHepFromSessionStorage() {
    const storedHepData = sessionStorage.getItem('hepData');
    if (storedHepData) {
      setHep({ hep: JSON.parse(storedHepData) });
    }
  }

  function getUserFromSessionStorage() {
    const storedUserData = sessionStorage.getItem('userData');
    console.log(storedUserData)
    setUserData(storedUserData)
    console.log(userData)
  }

  async function getPatients(therapistName) {
    try {
      const response = await axios.get(`http://localhost:3001/therapistPatients/${therapistName}`);
      console.log(therapistName)
      setPatients(response.data);
      console.log(response.data); // Assuming the response contains an array of patient data
    } catch (error) {
      console.error("Error fetching patients:", error);
      return []; // Return an empty array or handle the error as needed
    }
  }
  //get all therapist patients
  const createHep = () => {
    // Assuming the hep data is already held in the 'hep' state variable
    axios.post('http://localhost:3001/heps', hep)
      .then((response) => {
        console.log('HEP created successfully:', response.data);
        //''
        //check patient in hep
        // get patient
        // add hep to user
        setHep({ hep: [] });
        sessionStorage.removeItem('hepData');
        // you can do it here using setHep function from useMyContext.

      })
      .catch((error) => {
        console.error('Error creating HEP:', error);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user));
  }, [user]);

  useEffect(() => {
    getUserFromSessionStorage();
    console.log(userData[0].name)
    getPatients(userData[0].name);
  }, [user, userData]);
   //!!!!! make sure hep is reset in session storage upon creation!!!!!

  return (
    <main>
     <div>
      {hep.hep.map((item, index) =>
      <div key={index} className="flex flex-row justify-center items-center">
      <div className="border-2 border-gray-400 p-6 w-full m-5 border-l-0 border-r-0">
        <div className="font-semibold text-2xl"> {item.exerciseName}</div>
        <div className="text-xl">Patient Id: {item.patientId}</div>
        <div className="text-xl">{item.reps}</div>
        <div className="text-xl">{item.weight}</div>
        <div className="text-xl">{item.bands}</div>
        <div className="text-xl">{item.hold}</div>
        <div className="text-xl">{item.sets}</div>
        <div className="text-xl">{item.times}</div>
        <div className="text-xl">{item.day}</div>
        <div className="text-xl">{item.week}</div>
        <div className="text-xl">{item.hour}</div>
      </div>
      </div>
      )}

      <Link href="/" className="flex flex-row justify-center w-full">
      <input type="submit" value="Add to Patient" onClick={createHep} className="w-full text-2xl bg-green-500 rounded-lg text-white p-6 m-5 drop-shadow-xl"/>
      </Link>

     </div>
    </main>
  )
}
