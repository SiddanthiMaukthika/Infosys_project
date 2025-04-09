// NewsFeed.jsx

import React, { useState, useEffect } from 'react';
import '../styles/News.css';

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('mental health'); // Default search term
  const [currentSearch, setCurrentSearch] = useState('mental health'); // Track the actual search term used

  const apiKey = '577d289f4baf44f3aaff743899dc8fa9'; // Replace with your News API key
  const apiUrl = `https://newsapi.org/v2/everything?q=${currentSearch}&pageSize=20&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNews();
  }, [currentSearch]); // Fetch news when currentSearch changes

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    setCurrentSearch(searchTerm); // Update the current search term
  };

  if (error) {
    return <div className="news-feed">Error: {error}</div>;
  }

  return (
    <div className="news-feed">
      <div className="header-text">
        <h1>Stay Informed, Stay Empowered: Your Daily Dose of Mental Wellness News</h1>
        <p>Explore the latest stories, insights, and updates on mental health and well-being. Dive in and discover how to nurture your mind and thrive.</p>
      </div>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search news..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <section className="article-cards">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}

export default NewsFeed;