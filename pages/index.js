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
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { login, logout } from "../src/firebase.js"
import { useMyContext } from '/Users/tomwhiteman/Desktop/movemend/contexts/MyContext.js';
import { auth } from '../src/firebase.js'


const mongoURL = process.env.DATABASE_URL;

export default function Home() {


  const router = useRouter();
  const { user, setUser } = useMyContext();
  const { userData, setUserData } = useMyContext();

  function updateUserSessionStorage(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  useEffect (() => {
    auth.onAuthStateChanged(user => setUser(user));

    if (user === null) {
      router.push('/home')
      return
    }

    let userId = user.uid

    console.log(user)
    //check if users first time
    axios.get('http://localhost:3001/therapistUsers/' + userId)
      .then(response => {

        // Handle successful response
        if (response.data.length === 0) {
          axios.get('http://localhost:3001/patientUsers/' + userId)
          .then(response => {
            console.log(userId)
            if (response.data.length === 0) {
              router.push('/createProfile')
              return
            } else {
              setUserData(response.data);
              updateUserSessionStorage(response.data);
              router.push('/patientHome')
              return
            }
          })
        } else {
          setUserData(response.data);
          updateUserSessionStorage(response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    //?separte therapist user routes?
    //if so redirect to role choice page
    //on role choise page, if they select patient have therapist select dropdown appear
    //get therapist add id to patient,
  }, [user])

  return (
    <main>
      <div className="flex flex-col">
        <div className="flex flex-row justify-end mr-5 font-semibold text-xl">
        {user === null ? <button onClick={login} className="cursor-pointer m-5">Login</button> : <button onClick={logout} className="cursor-pointer m-5">Logout</button>}

        </div>
        <div className="flex flex-row justify-center m-5">
        <div className="relative w-full mt-20">
          <input
            type="text"
            className="px-4 py-2 pr-10 pl-10 w-full border border-gray-300 rounded-lg focus:outline-none drop-shadow-xl h-14 p-6"
            placeholder="Search..."
          />
           <span className="absolute right-3 top-4">
             <TiDeleteOutline className="text-2xl"/>
           </span>
           <span className="absolute left-3 top-4 mr-2">
             <AiOutlineSearch className="text-2xl"/>
           </span>
          </div>
        </div>
        <p className="ml-4 text-lg">Recent Patients</p>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col w-full">
            <div className="flex flex-row bg-gray-100 rounded-lg p-6 m-4">
              <div className="bg-green-200 p-6 rounded-xl">
                <BiUser className="text-3xl text-green-500"/>
              </div>
              <div className="ml-5">
                <p className="font-bold">Angela Feldman</p>
                <p className="text-gray-500">Ankle Pathology</p>
                <p className="text-green-600 text-md">Week 24</p>
              </div>
            </div>
            <div className="flex flex-row bg-gray-100 rounded-lg p-6 m-4">
            <div className="bg-green-200 p-6 rounded-xl">
                <BiUser className="text-3xl text-green-500"/>
            </div>
              <div className="ml-5">
                <p className="font-bold">Ryan Davies</p>
                <p className="text-gray-500">Ankle Pathology</p>
                <p className="text-green-600 text-md">Week 16</p>
              </div>
            </div>
          </div>
        </div>
        <p className="ml-4 text-lg">Tools</p>
        <div className="flex flex-row justify-center">

          <div className="bg-gray-100 p-8 m-4 w-1/2 rounded-lg">
            <Link href="/bodyAreas">
            <div className="flex justify-center items-center bg-green-200 p-6 rounded-xl">
              <AiOutlinePlus className="text-3xl text-green-500"/>
            </div>
              <p className="font-bold text-lg text-center mt-8">Create new</p>
              <p className="font-bold text-lg text-center">HEP</p>
            </Link>
          </div>

          <div className="flex flex-col bg-gray-100 p-8 m-4 w-1/2 rounded-lg">
            <Link href="/">
            <div className="flex justify-center items-center bg-orange-200 p-6 rounded-xl">
              <BsLightningCharge className="text-3xl text-orange-500"/>
            </div>
            <p className="font-bold text-lg text-center mt-8">Your Program</p>
            <p className="font-bold text-lg text-center">Templates</p>
            </Link>
          </div>
        </div>
        <p className="ml-4 text-lg">Upcoming Appointments</p>
        <div className="flex flex-col w-full">
            <div className="bg-gray-100 rounded-lg p-6 m-4">
              <p>Appointment 1</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 m-4">
              <p>Appointment 2</p>
            </div>
          </div>
      </div>
    </main>
  )
}
