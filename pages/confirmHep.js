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
      <div className="text-2xl border-2 border-black p-6 rounded-md">Exercise: {item.exerciseName}
        <div className="text-2xl">Patient Id:{item.patientId}</div>
        <div className="text-2xl">{item.reps}</div>
        <div className="text-2xl">{item.weight}</div>
        <div className="text-2xl">{item.bands}</div>
        <div className="text-2xl">Hold: {item.hold}</div>
        <div className="text-2xl">{item.sets}</div>
        <div className="text-2xl">{item.times}</div>
        <div className="text-2xl">{item.day}</div>
        <div className="text-2xl">{item.week}</div>
        <div className="text-2xl">{item.hour}</div>
      </div>
      </div>
      )}
      <div className="flex flex-row justify-center">
      <Link href="/index">
      <input type="submit" value="Create Hep" onClick={createHep} className="text-2xl bg-blue-300 rounded-lg p-6"/>
      </Link>
      </div>
     </div>
    </main>
  )
}
