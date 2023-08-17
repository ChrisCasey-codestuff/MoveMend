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
import { useMyContext } from '../contexts/MyContext.js';
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
  const myUserData = []
  function updateHepFromSessionStorage() {
    const storedHepData = sessionStorage.getItem('hepData');
    if (storedHepData) {
      setHep({ hep: JSON.parse(storedHepData) });
    }
  }

  function getUserFromSessionStorage() {
    let storedUserData = sessionStorage.getItem('userData');
    storedUserData = JSON.parse(storedUserData)
    myUserData.push(storedUserData)
    console.log(setUserData(storedUserData))
    console.log(myUserData)
  }

  async function getPatients(therapistName) {
    try {
      const response = await axios.get(`https://move-back-4c06dfb415c7.herokuapp.com/therapistPatients/${therapistName}`);
      console.log(therapistName)
      setPatients(response.data);
      console.log(response.data); // Assuming the response contains an array of patient data
    } catch (error) {
      console.error("Error fetching patients:", error);
      return []; // Return an empty array or handle the error as needed
    }
  }
  //get all therapist patients
  const createHep = (event) => {
    event.preventDefault()
    console.log(event.target.patientSelect.value)
    const selectedPatient = event.target.patientSelect.value;
    // Assuming the hep data is already held in the 'hep' state variable
    axios.post('https://move-back-4c06dfb415c7.herokuapp.com/heps', { ...hep, patient: selectedPatient })
      .then((response) => {
        console.log('HEP created successfully:', response.data);
        //''
        //check patient in hep
        // get patient
        // add hep to user
        setHep({ hep: [] });
        sessionStorage.removeItem('hepData');
        // you can do it here using setHep function from useMyContext.
        router.push('/')
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
    console.log(myUserData[0][0].name)
    getPatients(myUserData[0][0].name);
    updateHepFromSessionStorage();
  }, [user]);
   //!!!!! make sure hep is reset in session storage upon creation!!!!!

  return (
    <main>
     <div className="w-full flex flex-col items-center">
      <h2 className="text-3xl mt-5">Confirm Hep</h2>
      {hep.hep.map((item, index) =>
      <div key={index} className="w-full">
      <div className="border-2 border-gray-400 p-6 border-l-0 border-r-0 border-t-0 mr-6 ml-6">
        <div className="font-semibold text-2xl mb-4"> {item.exerciseName}</div>
        <div className="flex flex-row">
          {item.reps == undefined ? <div></div> :
        <div className="text-sm text-orange-400 bg-orange-200 p-2 rounded-xl mr-1 ml-1">{item.reps}</div>
         }
         {item.weight == undefined ? <div></div> :
        <div className="text-sm text-orange-400 bg-orange-200 p-2 rounded-xl mr-1 ml-1">{item.weight}</div>
         }
        {item.bands == undefined ? <div></div> :
        <div className="text-sm text-orange-400 bg-orange-200 p-2 rounded-xl mr-1 ml-1">{item.bands}</div>
         }
        {item.sets == undefined ? <div></div> :
        <div className="text-sm text-orange-400 bg-orange-200 p-2 rounded-xl mr-1 ml-1">{item.sets}</div>
         }
        {item.times == undefined ? <div></div> :
        <div className="text-sm text-orange-400 bg-orange-200 p-2 rounded-xl mr-1 ml-1">{item.times}</div>
         }
        </div>
      </div>
      </div>


      )}
      <div className="flex flex-col items-center">
      <p className="text-xl mt-5">Select Patient</p>


        <form onSubmit={(event) => createHep(event)}>
        <div className="flex flex-row justify-center">
          <select className="text-3xl p-4" id="patientSelect">
            {patients.map((patient, index) => (
              <option key={index} value={patient.name}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row justify-center w-full">
        <input type="submit" value="add to patient" className="w-full text-2xl bg-green-500 rounded-lg text-white p-6 m-5 drop-shadow-xl"/>
        </div>
        </form>

      </div>


     </div>
    </main>
  )
}
