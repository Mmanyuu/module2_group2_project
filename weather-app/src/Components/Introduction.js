// src/Components/Introduction.js

import React, { useState, useContext } from "react";
import { ResponsesContext } from "../Context/ResponsesContext";
import { Navigate } from "react-router-dom";
import styles from "./Introduction.module.css";

const questions = [
  { question: "What's your name?", type: "text" },
  { question: "Where do you live?", type: "text" },
  { question: "Where do you work?", type: "text" },
  { question: "Any planned activity for the next 24 hours?", type: "text" },
];

const Introduction = () => {
  const { setUsersData, usersData } = useContext(ResponsesContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleNext = (event) => {
    event.preventDefault();
    const answer = event.target.elements.answer.value;
    //Validate if the field is not empty
    if (!answer.trim()) {
      setError("This field is required."); // Set error message
      return;
    }

    setError(""); // Clear error message
    // Update answers state
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].question]: answer,
    }));

    if (currentQuestion + 1 === questions.length) {
      // Create a new user with the collected responses
      const newUser = {
        id: usersData.length + 1, // Simple ID assignment
        name: answers["What's your name?"] || answer,
        homeLocation: answers["Where do you live?"] || answer,
        workLocation: answers["Where do you work?"] || answer,
        addedLocation: '',
        responses: {
          ...answers,
          [questions[currentQuestion].question]: answer,
        },
      };

      // Add the new user to the context's usersData
      setUsersData((prevUsers) => [...prevUsers, newUser]);
      setSubmitted(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
    event.target.reset();
  };

  if (submitted) {
    return <Navigate to="/MainPage" />;
  }

  return (
    <>
      <div className={styles.title}>Accu Weather App</div>
      <div className={styles.questionnaireContainer}>
        {currentQuestion < questions.length ? (
          <form onSubmit={handleNext}>
            <label>
              {questions[currentQuestion].question}
              <input
                name="answer"
                type={questions[currentQuestion].type}
                required
              />
            </label>
            {/* Display error message */}
            {error && <div style={{ color: 'red' }}>{error}</div>} 
            <button type="submit">Next</button>
          </form>
        ) : (
          <Navigate to="/MainPage" />
        )}
      </div>
    </>
  );
};

export default Introduction;