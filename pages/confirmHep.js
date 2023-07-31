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
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function confirmHep() {

  const { hep, setHep } = useMyContext();
  const router = useRouter();

  const createHep = () => {
    // Assuming the hep data is already held in the 'hep' state variable
    axios.post('http://localhost:3001/heps', hep)
      .then((response) => {
        console.log('HEP created successfully:', response.data);
        // If you want to update the state context with the newly created hep,
        setHep({ hep: [] });
        sessionStorage.removeItem('hepData');
        // you can do it here using setHep function from useMyContext.

      })
      .catch((error) => {
        console.error('Error creating HEP:', error);
      });
  };

  useEffect(() => {
    // Function to fetch and update the hep state from session storage
    function updateHepFromSessionStorage() {
      const storedHepData = sessionStorage.getItem('hepData');
      if (storedHepData) {
        setHep({ ...hep, hep: JSON.parse(storedHepData) });
      }
    }

    // Call the function when the component mounts
    updateHepFromSessionStorage();
  }, []);
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
