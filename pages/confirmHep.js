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

export default function confirmHep() {

  const { hep, setHep } = useMyContext();



  return (
    <main>
     <div>
      {console.log(hep)}
      {hep.hep.map((item, index) =>
      <div key={index}> {item.exerciseName}</div>
      )}
      <h2></h2>
     </div>
    </main>
  )
}
