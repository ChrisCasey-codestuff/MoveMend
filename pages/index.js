import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className="flex flex-col">
        <div className="flex flex-row justify-center m-5">
        <div className="relative w-full mt-20">
          <input
            type="text"
            className="px-4 py-2 pr-10 pl-10 w-full border border-gray-300 rounded-lg focus:outline-none drop-shadow-xl h-14 p-6"
            placeholder="Search..."
          />
           <span className="absolute right-3 top-4">
             <p>x</p>
           </span>
           <span className="absolute left-3 top-4 mr-2">
             <p>e</p>
            </span>
          </div>
        </div>
        <p className="ml-4">recent patients</p>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col w-full">
            <div className="bg-gray-100 rounded-lg p-6 m-4">
              <p>Patient 1</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 m-4">
              <p>Patient 2</p>
            </div>
          </div>
        </div>
        <p className="ml-4">Tools</p>
        <div className="flex flex-row justify-center">
          <div className="bg-gray-100 p-10 m-4 w-1/2 rounded-lg">
            <p>Create new HEP</p>
          </div>
          <div className="bg-gray-100 p-10 m-4 w-1/2 rounded-lg">
            <p>Your Program Templates</p>
          </div>
        </div>
        <p className="ml-4">Upcoming Appointments</p>
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
