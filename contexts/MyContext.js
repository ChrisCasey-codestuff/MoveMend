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
  const [hep, setHep] = useState({hep: []})
  return (
    <MyContext.Provider value={{ hep, setHep }}>
      {children}
    </MyContext.Provider>
  );
};
