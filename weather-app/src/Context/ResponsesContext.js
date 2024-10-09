// src/Context/ResponsesContext.js
/* createContext is a method provided by React's Context API that
 facilitates a way to pass data through the component tree without 
 having to pass props down manually at every level.
It's especially useful for passing down state, functions, or other data 
to deeply nested child components without prop drilling. */

import React, { createContext, useState } from "react";

import { dummyData } from "../Components/UsersData"; // Make sure this import points to your dummy data
export const ResponsesContext = createContext();

export const ResponsesProvider = ({ children }) => {
  const [responses, setResponses] = useState({});
  const [usersData, setUsersData] = useState(dummyData); // Initialize with dummy data

  return (
    <ResponsesContext.Provider
      value={{ responses, setResponses, usersData, setUsersData }}
    >
      {children}
    </ResponsesContext.Provider>
  );
};
