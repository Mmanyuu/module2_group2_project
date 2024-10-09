// src/Components/MainPage.js

//Its just a sample of display of the  userdatas from the introduction page and the dummydatas . Team can delete the code ,Its just to make sure 
// the datas passed in the first page can be called here  

import React, { useContext } from "react";
import { ResponsesContext } from "../Context/ResponsesContext";

const MainPage = () => {
  const { usersData } = useContext(ResponsesContext); // Get usersData from context

  return (
    <div>
      <h1>Main Page</h1>
      <h2>User Responses</h2>
      {usersData && usersData.length > 0 ? ( // Check if usersData is defined
        <ul>
          {usersData.map((user) => (
            <li key={user.id}>
              <strong>Name:</strong> {user.name}<br />
              <strong>Home Location:</strong> {user.homeLocation}<br />
              <strong>Work Location:</strong> {user.workLocation}<br />
              <strong>Added Location:</strong> {user.addedLocation}<br />
              <strong>Responses:</strong>
              <ul>
                {user.responses && Object.entries(user.responses).length > 0 ? (
                  Object.entries(user.responses).map(([question, answer]) => (
                    <li key={question}>
                      <strong>{question}:</strong> {answer}
                    </li>
                  ))
                ) : (
                  <li>No responses available.</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No user responses available.</p>
      )}
    </div>
  );
};

export default MainPage;