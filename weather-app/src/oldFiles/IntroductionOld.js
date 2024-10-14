import React, { useState, useContext } from "react";
import { ResponsesContext } from "../Context/ResponsesContext";
import { Navigate } from "react-router-dom";
import styles from "./Introduction.module.css";

const questions = [
  { question: "What's your name?", type: "text" },
  { question: "Where do you stay?", type: "text" },
  { question: "Where do you work?", type: "text" },
  {
    question: "Any Outdoor activity planned for the next 24 hrs? (yes/no)",
    type: "text",
  },
  {
    question:
      "What's the  activity planned?",
    type: "text",
  },
  { question: "At which Location?", type: "text" },
  // { question: "On which day?", type: "text" },
];

const Introduction = () => {
  const { setUsersData, usersData } = useContext(ResponsesContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleNext = (event) => {
    event.preventDefault();
    const answer = event.target.elements.answer.value.trim();

    if (!answer) {
      setError("This field is required.");
      return;
    }

    setError("");
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].question]: answer,
    }));

    if (currentQuestion === 3) {
      //Any  Outdoor activity planned for the next 24 hrs? (yes/no)
      if (answer.toLowerCase() === "yes") {
        setCurrentQuestion(4); // Move to activity details// setting to next ques Q.No:5
        // setCurrentQuestion((prev) => prev + 1); // Move to the next question
      } else if (answer.toLowerCase() === "no") {
        // If "no", create the user and submit
        console.log("Answers for no:", answers);
        createNewUser();
        // setSubmitted(true);
      } else {
        setError("Please answer with 'yes' or 'no'.");
        return;
      }
    } 
    else if (currentQuestion + 1 === questions.length) {
      console.log("Entering the last question:", usersData);
      const newUser = {
        id: usersData.length + 1, // Simple ID assignment
        name: answers["What's your name?"] || answer,
        homeLocation: answers["Where do you stay?"] || answer,
        workLocation: answers["Where do you work?"] || answer,
        plannedActivity:
          answers[
            "Any Outdoor activity planned for the next 24 hrs? (yes/no)"
          ] || answer,
        activityDetails:
          answers[
            "What's the  activity planned?"
          ] || answer,
        activityLocation: answers["At which Location?"] || answer,
        // activityDay: answers["On which day"] || answer,
        responses: {
          ...answers,
          [questions[currentQuestion].question]: answer,
        },
      };

      // Add the new user to the context's usersData
      setUsersData((prevUsers) => [...prevUsers, newUser]);
      setSubmitted(true);
      console.log("Current users details:", usersData);
    } 
    else {
      // setCurrentQuestion((prev) => prev + 1);
      setCurrentQuestion(currentQuestion + 1);
    }

    event.target.reset(); // Reset form fields after submission
  };
  const createNewUser = () => {
    console.log("Creating answers:", answers);
    const newUser = {
      id: usersData.length + 1,
      name: answers["What's your name?"] || "",
      homeLocation: answers["Where do you stay?"] || "",
      workLocation: answers["Where do you work?"] || "",
      plannedActivity:
        answers["Any Outdoor activity planned for the next 24 hrs? (yes/no)"] ||
        "NO",
      activityDetails:
        answers[
          "What's the  activity that you have planned? (running/Swimming/jogging or any..)"
        ] || "",
      activityLocation: answers["At which location?"] || "",
      // activityDay: answers["On which day?"] || "",
      responses: { ...answers },
    };
    // Log user details for debugging
    console.log("Creating new user:", newUser);
    setUsersData((prevUsers) => [...prevUsers, newUser]);
    setSubmitted(true);
  };

  if (submitted) {
    console.log("Current users details:", usersData);
    return <Navigate to="/MainPage" />;
  }

  return (
    <>
      <div className={styles.title}>Accu Weather App</div>
      <div className={styles.questionnaireContainer}>
        <form onSubmit={handleNext}>
          <label>
            {questions[currentQuestion].question}
            <input name="answer" type="text" required />
          </label>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit" className={styles.nextButton}>
            Next
          </button>
        </form>
      </div>
    </>
  );
};

export default Introduction;