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
import { useEffect } from "react";
import {login, logout } from "../src/firebase.js"
import { useMyContext } from '/Users/tomwhiteman/Desktop/movemend/contexts/MyContext.js';
import { auth } from '../src/firebase.js'
const mongoURL = process.env.DATABASE_URL;

export default function Home() {

  const router = useRouter();
  const { user, setUser } = useMyContext();

  useEffect (() => {

  }, [])


  return (
    <main>
      <div className="flex flex-row justify-center">
        <h1 className="text-2xl font-semibold m-5">All Exercises</h1>
        <div className="flex flex-row justify-end mr-5 font-semibold text-xl">
        {user === null ? <button onClick={login} className="cursor-pointer m-5">Login</button> : <button onClick={logout} className="cursor-pointer m-5">Logout</button>}

        </div>
      </div>


    </main>
  )
}