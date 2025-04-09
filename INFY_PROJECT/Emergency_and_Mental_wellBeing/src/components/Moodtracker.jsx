// MoodTracker.jsx

import React, { useState, useEffect } from 'react';
import '../styles/Moodtracker.css';

function MoodTracker() {
  const [mood, setMood] = useState(3);
  const [moodDescription, setMoodDescription] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [sleepHours, setSleepHours] = useState(8); // Default sleep hours
  const [waterIntake, setWaterIntake] = useState(2000); // Default water intake (ml)
  const [moodHistory, setMoodHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Load mood history from local storage on component mount
    const storedHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
    setMoodHistory(storedHistory);
  }, []);

  useEffect(() => {
    // Save mood history to local storage whenever it changes
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  const handleMoodChange = (event) => {
    setMood(parseInt(event.target.value));
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      mood,
      moodDescription,
      journalEntry,
      sleepHours,
      waterIntake,
      date: new Date().toLocaleDateString(),
    };
    setMoodHistory([...moodHistory, newEntry]);
    setMood(3);
    setMoodDescription('');
    setJournalEntry('');
    setSleepHours(8); // Reset sleep hours
    setWaterIntake(2000); // Reset water intake
  };

  const handleDelete = (index) => {
    const updatedHistory = moodHistory.filter((_, i) => i !== index);
    setMoodHistory(updatedHistory);
  };
  const generateWeeklyReport = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const weeklyData = moodHistory.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= lastWeek && entryDate <= today;
    });

    if (weeklyData.length === 0) {
      setWeeklyReport(null);
      setRecommendations([]);
      return;
    }
    const moodScores = weeklyData.map((entry) => entry.mood);
    const averageMood = moodScores.reduce((a, b) => a + b, 0) / moodScores.length;

    setWeeklyReport({
      averageMood,
      weeklyData,
    });

    generateRecommendations(averageMood, weeklyData);
  };

  const generateRecommendations = (averageMood, weeklyData) => {
    let newRecommendations = [];

    if (averageMood < 3) {
      newRecommendations.push("Consider trying relaxation techniques like meditation or deep breathing.");
    }

    const lowSleepDays = weeklyData.filter((entry) => entry.sleepHours < 7).length;
    if (lowSleepDays > 2) {
      newRecommendations.push("Prioritize getting enough sleep. Aim for 7-9 hours per night.");
    }

    const lowWaterDays = weeklyData.filter((entry) => entry.waterIntake < 1500).length;
    if (lowWaterDays > 2) {
      newRecommendations.push("Stay hydrated by drinking plenty of water throughout the day.");
    }

    setRecommendations(newRecommendations);
  };
  const renderWeeklyReport = () => {
    if (!weeklyReport) {
      return <p>No data for the past week.</p>;
    }

    const dates = weeklyReport.weeklyData.map((entry) => entry.date);
    const moodScores = weeklyReport.weeklyData.map((entry) => entry.mood);

    const chartData = {
      labels: dates,
      datasets: [
        {
          label: 'Mood Score',
          data: moodScores,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };


    return (
        <div>
          <h2>Weekly Mood Report</h2>
          <p>Average Mood: {weeklyReport.averageMood.toFixed(2)}</p>
          <Line data={chartData} />
          {recommendations.length > 0 && (
            <div>
              <h3>Recommendations:</h3>
              <ul>
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    };

  return (
    <div className="mood-tracker">
      {!showHistory ? (
        <>
          <h1>Mood Tracker</h1>
          <form onSubmit={handleSubmit}>
            {/* Input fields as before */}
            <div className="mood-input">
              <label htmlFor="mood">Rate Your Mood:</label>
              <input
                type="range"
                id="mood"
                min="1"
                max="5"
                value={mood}
                onChange={handleMoodChange}
              />
              <p>Mood: {mood}</p>
            </div>
            <div className="mood-description">
              <label htmlFor="moodDescription">Mood Description:</label>
              <textarea
                id="moodDescription"
                value={moodDescription}
                onChange={(e) => setMoodDescription(e.target.value)}
              />
            </div>
            <div className="journal-entry">
              <label htmlFor="journalEntry">Journal Entry:</label>
              <textarea
                id="journalEntry"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
              />
            </div>
            <div className="sleep-hours">
              <label htmlFor="sleepHours">Sleep Hours:</label>
              <input
                type="number"
                id="sleepHours"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
              />
            </div>
            <div className="water-intake">
              <label htmlFor="waterIntake">Water Intake (ml):</label>
              <input
                type="number"
                id="waterIntake"
                value={waterIntake}
                onChange={(e) => setWaterIntake(e.target.value)}
              />
            </div>
            <button type="submit">Submit Mood</button>
          </form>
          <button className="history-button" onClick={() => setShowHistory(true)}>
            View Previous Mood Reports
          </button>
        </>
      ) : (
        <div className="history-view">
          <h1>Previous Mood Reports</h1>
          <button className="back-button" onClick={() => setShowHistory(false)}>
            Back to Mood Tracker
          </button>
          <div className="history-entries">
            {moodHistory.map((entry, index) => (
              <div key={index} className="history-entry">
                <p>Date: {entry.date}</p>
                <p>Mood Score: {entry.mood}</p>
                <p>Journal Entry: {entry.journalEntry}</p>
                <p>Sleep Hours: {entry.sleepHours}</p>
                <p>Water Intake: {entry.waterIntake} ml</p>
                <button className="delete-button" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodTracker;