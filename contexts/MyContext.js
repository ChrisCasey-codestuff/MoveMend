import React, { createContext, useState } from 'react';

// Create the context
const MyContext = createContext();

// Create a custom hook to use the context
export const useMyContext = () => {
  return React.useContext(MyContext);
};

// Create the context provider component
export const MyContextProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState(/* Your initial state here */);
  const [userData, setUserData] = useState();
  const [patients, setPatients] = useState([]);
  const [patientHeps, setPatientHeps] = useState()
  const [ therapistData, setTherapistData ] = useState();
  const [hep, setHep] = useState({hep: []})
  const [user, setUser] = useState(null)
  return (
    <MyContext.Provider value={{ hep, setHep, user, setUser, patients, setPatients, userData, setUserData, therapistData, setTherapistData, patientHeps, setPatientHeps }}>
      {children}
    </MyContext.Provider>
  );
};
