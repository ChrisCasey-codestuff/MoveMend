import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link  from 'next/link';
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
        <p className="ml-4 text-lg">Recent Patients</p>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col w-full">
            <div className="flex flex-row bg-gray-100 rounded-lg p-6 m-4">
              <div className="bg-green-200 p-8 rounded-xl">

              </div>
              <div className="ml-5">
                <p className="font-bold">Angela Feldman</p>
                <p className="text-gray-500">Ankle Pathology</p>
                <p className="text-green-600 text-md">Week 24</p>
              </div>
            </div>
            <div className="flex flex-row bg-gray-100 rounded-lg p-6 m-4">
              <div className="bg-green-200 p-8 rounded-xl">

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

          <div className="bg-gray-100 p-10 m-4 w-1/2 rounded-lg">
            <Link href="/bodyAreas">
              <div className="flex flex-col bg-green-200 p-4 pt-10 rounded-xl">

              </div>
              <p className="font-bold text-lg text-center mt-8">Create new</p>
              <p className="font-bold text-lg text-center">HEP</p>
            </Link>
          </div>

          <div className="flex flex-col bg-gray-100 p-10 m-4 w-1/2 rounded-lg">
            <Link href="/">
              <div className="bg-orange-200 p-4 pt-10 rounded-xl">

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
