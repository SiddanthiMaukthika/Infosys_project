import React, { useState } from "react";
import axios from "axios";
import "../styles/Videorecommend.css";

const VideoRecommendations = () => {
    const [query, setQuery] = useState("");
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = [
        "Self help", "Reducing stress", "Anxiety", 
        "Panic attacks", "Breathing exercises", 
        "Stretching", "Calm music", "Meditation"
    ];

    const fetchVideos = async (searchTerm) => {
        const API_KEY = "AIzaSyDmWtrozq7y3mISm9uXg5k-QsGvCOYapu8"; // Replace with your YouTube API key
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&maxResults=6&key=${API_KEY}`
        );
        setVideos(response.data.items);
    };

    const handleSearch = () => {
        fetchVideos(query);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        fetchVideos(category); // Fetch videos based on category selection
    };

    return (
        <div className="video-page">
            <div className="container">
                <h2>Video Recommendations</h2>

                <div className="search-bar">
                    <input 
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Search videos..." 
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                <div className="categories">
                    {categories.map((category, index) => (
                        <button 
                            key={index} 
                            className={selectedCategory === category ? "active" : ""}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="video-grid">
                    {videos.map((video) => (
                        <div key={video.id.videoId} className="video-card">
                            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                            <h4>{video.snippet.title}</h4>
                            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                                Watch
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoRecommendations;
