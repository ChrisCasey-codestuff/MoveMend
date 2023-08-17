import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import { useMyContext } from '../contexts/MyContext.js';
import { auth } from '../src/firebase.js';

export default function CreateProfile() {
  const router = useRouter();
  const { user, setUser } = useMyContext();
  const { userData, setUserData } = useMyContext();
  const [selection, setSelection] = useState("");
  const [showTherapistDropdown, setShowTherapistDropdown] = useState(false);
  const [therapists, setTherapists] = useState([{name:"tom", id:"1234"},{name:"dick", id:"1235"},{name:"harry", id:"1236"}]); // Store therapist data here
  const [selectedTherapist, setSelectedTherapist] = useState(""); // Store selected therapist ID
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value.toLowerCase()); // Convert to lowercase
  };

  const handleSelectionChange = (value) => {
    setSelection(value);
    setShowTherapistDropdown(value === "patient");
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user));
    // Fetch therapist data and update therapists state
    const fetchTherapists = async () => {
      try {
        const response = await axios.get(`https://move-back-4c06dfb415c7.herokuapp.com/therapistUsers`);
        setTherapists(response.data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };

    if (selection === "patient") {
      fetchTherapists();
    }

  }, [selection]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userId = user.uid
    console.log(userId)
    let data
    // Construct the data to be sent in the POST request
    if (selection === 'patient') {
       data = {
        name: name,
        therapistId: selectedTherapist,
        id: userId,
        heps: []
      // Add other form data fields here
      };
    } else {
     data = {
      name: name,
      userType: selection,
      id: userId
      // Add other form data fields here
    };
  }
    //if selection
   if (selection === 'patient') {
    try {
      const response = await axios.post('https://move-back-4c06dfb415c7.herokuapp.com/patientUsers', data);
      console.log('POST request successful', response);
      router.push('/patientHome')
      // Redirect or perform any other actions as needed
    } catch (error) {
      console.error('Error sending POST request', error);
    }
   } else {

    try {
      const response = await axios.post('https://move-back-4c06dfb415c7.herokuapp.com/therapistUsers', data);
      console.log('POST request successful', response);
      router.push('/')
      // Redirect or perform any other actions as needed
    } catch (error) {
      console.error('Error sending POST request', error);
    }
   }

  };

  return (
    <main>
      <div className="m-5 flex flex-col">
        <p>Are you a patient or a therapist?</p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
        <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="patient"
              checked={selection === "patient"}
              onChange={() => handleSelectionChange("patient")}
            />
            Patient
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="therapist"
              checked={selection === "therapist"}
              onChange={() => handleSelectionChange("therapist")}
            />
            Therapist
          </label>
          {showTherapistDropdown && (
            <select
              className="p-4 border-2 border-black"
              value={selectedTherapist}
              onChange={(e) => setSelectedTherapist(e.target.value)}
            >
              <option value="">Select therapist</option>
              {therapists.map((therapist, index) => (
                <option key={index} value={therapist.id}>
                  {therapist.name}
                </option>
              ))}
            </select>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
