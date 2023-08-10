import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { login, logout } from "../src/firebase.js";
import { useMyContext } from '/Users/tomwhiteman/Desktop/movemend/contexts/MyContext.js';
import { auth } from '../src/firebase.js';

const mongoURL = process.env.DATABASE_URL;

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useMyContext();
  const { userData, setUserData } = useMyContext();
  const { patientHeps, setPatientHeps } = useMyContext();

  async function getHeps(patientName) {
    try {
      const response = await axios.get(`http://localhost:3001/heps/${patientName}`);
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

      {/* Render patientHeps */}
      {patientHeps ? patientHeps.map((item, index) => {
        const thisHep = item.hep[0]


        if (thisHep != undefined) {
          return(
          <div key={index}>
            <p>{thisHep.exerciseName}</p>
          </div>)
        } else {
          <p>loading</p>
        }



  }) : <div></div>}

    </main>
  )
}
