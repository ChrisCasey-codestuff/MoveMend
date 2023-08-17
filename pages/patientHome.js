import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { login, logout } from "../src/firebase.js";
import { useMyContext } from '../contexts/MyContext.js';
import { auth } from '../src/firebase.js';

const mongoURL = process.env.DATABASE_URL;

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useMyContext();
  const { userData, setUserData } = useMyContext();
  const { patientHeps, setPatientHeps } = useMyContext();

  async function getHeps(patientName) {
    try {
      const response = await axios.get(`https://move-back-4c06dfb415c7.herokuapp.com/heps/${patientName}`);
      setPatientHeps(response.data);
      // Assuming the response contains an array of HEP data
    } catch (error) {
      console.error("Error fetching HEPs:", error);
      return [];
    }
  }

  useEffect(() => {
    sessionStorage.setItem('patientHeps', JSON.stringify(patientHeps));
  }, [user]);


  useEffect(() => {
    if (user === null) {
      router.push('/home');
      return;
    }

    auth.onAuthStateChanged(user => setUser(user));

    const storedPatientHeps = sessionStorage.getItem('patientHeps');
    getHeps(userData[0].name);
    if (storedPatientHeps == 'undefined') {
      getHeps(userData[0].name);
    } else {
      setPatientHeps(JSON.parse(storedPatientHeps));
    }
  }, [user]);


  return (
    <main>
      <div className="flex flex-row justify-center">
        <h1 className="text-2xl font-semibold m-5">All Exercises</h1>
        <div className="flex flex-row justify-end mr-5 font-semibold text-xl">
          {user === null ? <button onClick={login} className="cursor-pointer m-5">Login</button> : <button onClick={logout} className="cursor-pointer m-5">Logout</button>}
        </div>
      </div>


      {patientHeps ? patientHeps.map((item, index) => {
        const thisHep = item.hep[0]


        if (thisHep != undefined) {
          return(
            <div key={index} className="w-full">
      <div className="border-2 border-gray-400 p-6 border-l-0 border-r-0 border-t-0 mr-6 ml-6">
        <div className="font-semibold text-2xl mb-4"> {thisHep.exerciseName}</div>
        <div className="flex flex-row">
          {thisHep.reps == undefined ? <div></div> :
        <div className="text-md text-orange-400 bg-orange-200 p-2 rounded-xl mr-1 ml-1">{thisHep.reps}</div>
         }
         {thisHep.weight == undefined ? <div></div> :
        <div className="text-md text-orange-400 bg-orange-200 p-2 rounded-xl mr-1 ml-1">{thisHep.weight}</div>
         }
        {thisHep.bands == undefined ? <div></div> :
        <div className="text-md text-orange-400 bg-orange-200 p-2 rounded-xl mr-1 ml-1">{thisHep.bands}</div>
         }
        {thisHep.sets == undefined ? <div></div> :
        <div className="text-md text-orange-400 bg-orange-200 p-2 rounded-xl mr-1 ml-1">{thisHep.sets}</div>
         }
        {thisHep.times == undefined ? <div></div> :
        <div className="text-md text-orange-400 bg-orange-200 p-2 rounded-xl mr-1 ml-1">{thisHep.times}</div>
         }
        </div>
      </div>
      </div>)
        } else {
          <p>loading</p>
        }



  }) : <div></div>}

    </main>
  )
}
