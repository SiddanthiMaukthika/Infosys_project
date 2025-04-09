import React, { useState, useEffect } from "react";
import "../styles/AssessmentPage.css";

const Assessment = ({ username }) => {
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedUser, setSelectedUser] = useState(username);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    loadUserHistory(username);
    loadAllUsers();
  }, [username]);

  const loadUserHistory = (user) => {
    const storedHistory = JSON.parse(localStorage.getItem(`history_${user}`)) || [];
    setHistory(storedHistory);
  };

  const loadAllUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setAllUsers(storedUsers);
  };

  const questions = [
    "Do you have any suicidal thoughts?",
    "Would you like to end your life?",
    "Do you have a plan for harming yourself?",
    "Do you often feel hopeless or empty?",
    "Do you struggle to find pleasure in activities you once enjoyed?",
    "Do you have difficulty concentrating or making decisions?",
    "Do you feel constantly tired or have low energy?",
    "Have you been experiencing changes in appetite or weight?",
    "Do you feel anxious or restless frequently?",
    "Do you have trouble sleeping or sleep too much?"
  ];

  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const handleSubmit = () => {
    if (Object.keys(responses).length < questions.length) {
      alert("Please answer all the questions before submitting.");
      return;
    }

    const totalScore = Object.values(responses).reduce((acc, curr) => acc + curr, 0);
    setScore(totalScore);

    const newEntry = {
      username,
      timestamp: new Date().toISOString(),
      score: totalScore
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem(`history_${username}`, JSON.stringify(updatedHistory));

    // Store user in the list of users if not already present
    if (!allUsers.includes(username)) {
      const updatedUsers = [...allUsers, username];
      setAllUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    setStep(4);
  };

  const handleUserChange = (event) => {
    const selected = event.target.value;
    setSelectedUser(selected);
    loadUserHistory(selected);
  };

  return (
    <div className="assessment-page">
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md text-center">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold">Assess Your Mental Well-being</h2>
          <p>Take a simple, reliable test to understand your emotional state.</p>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setStep(2)}
          >
            Start Your Assessment
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold">Your Data is Safe</h2>
          <p>
            Your answers are confidential and will only be used to generate your personal score.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setStep(3)}
          >
            Take Test Now
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold">Mental Health Questionnaire</h2>
          <div className="container">
            <div>
              {questions.slice(0, 5).map((question, index) => (
                <div key={index} className="question">
                  <p className="font-semibold">{question}</p>
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3, 4].map((value) => (
                      <button
                        key={value}
                        className={`answer-button ${responses[index] === value ? "selected" : ""}`}
                        onClick={() => handleChange(index, value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              {questions.slice(5, 10).map((question, index) => (
                <div key={index + 5} className="question">
                  <p className="font-semibold">{question}</p>
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3, 4].map((value) => (
                      <button
                        key={value}
                        className={`answer-button ${responses[index + 5] === value ? "selected" : ""}`}
                        onClick={() => handleChange(index + 5, value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}

      {step === 4 && score !== null && (
        <div>
          <h2 className="text-xl font-bold">Test Results</h2>
          <p className="mt-2">Your total score: {score}</p>
          <p className="text-red-500 font-bold">
            Depression Level:{" "}
            {score > 40 ? "Severe depression" : score > 20 ? "Moderate depression" : "Mild depression"}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setStep(5)}
          >
            View Test History
          </button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-xl font-bold">Test History</h2>

          {/* User selection dropdown */}
          <div className="mt-2">
            <label className="font-semibold">View history for: </label>
            <select className="border p-1" value={selectedUser} onChange={handleUserChange}>
              {allUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          {history.length === 0 ? (
            <p>No previous tests found for {selectedUser}.</p>
          ) : (
            history.map((entry, index) => (
              <div key={index} className="mt-2 p-2 border rounded">
                <p>Date: {new Date(entry.timestamp).toLocaleDateString()}</p>
                <p>Score: {entry.score}</p>
                <p className="text-red-500 font-bold">
                  Depression Level:{" "}
                  {entry.score > 40 ? "Severe depression" : entry.score > 20 ? "Moderate depression" : "Mild depression"}
                </p>
              </div>
            ))
          )}
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setStep(1)}
          >
            Take New Test
          </button>
        </div>
      )}
    </div>
  </div>
  );
};

export default Assessment;
