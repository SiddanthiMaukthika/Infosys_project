import React, { useState, useEffect } from "react";
import "../styles/ChatbotSupport.css";

const responses = {
  "hello": "Hi there! How can I assist you today?",
  "how are you": "I'm just a bot, but I'm here to help! How are you feeling?",
  
  // 🧠 Stress
  "i feel stressed": "It's okay to feel stressed sometimes. Try deep breathing or taking a short walk. If it feels overwhelming, consider watching this: <a href='https://www.youtube.com/watch?v=O-6f5wQXSu8' target='_blank'>How to Reduce Stress</a>.",
  "how to handle stress": "Managing stress is important for mental well-being. Exercise, mindfulness, and proper rest can help. Here's a helpful guide: <a href='https://www.youtube.com/watch?v=Wemm-i6XHr8' target='_blank'>Techniques to Manage Stress</a>.",
  
  // 😟 Anxiety
  "i have anxiety": "You're not alone! Try practicing mindfulness and breathing exercises. If it's severe, this video might help: <a href='https://www.youtube.com/watch?v=ZToicYcHIOU' target='_blank'>Mindfulness for Anxiety</a>.",
  "how to reduce anxiety": "Reducing anxiety takes time. Try meditation, journaling, or speaking to someone you trust. Watch this for more tips: <a href='https://www.youtube.com/watch?v=WWloIAQpMcQ' target='_blank'>Overcoming Anxiety</a>.",
  
  // 💤 Sleep Issues
  "i can't sleep": "A good sleep routine is essential. Try avoiding screens before bed and drinking warm tea. If insomnia persists, watch this: <a href='https://www.youtube.com/watch?v=1nPmWah5yF4' target='_blank'>Tips for Better Sleep</a>.",
  
  // 🤕 Headache
  "i have a headache": "Try drinking water, resting, or massaging your temples. If it’s frequent, consult a doctor.",
  
  // 😞 Sadness / Depression
  "i feel sad": "I'm sorry you're feeling this way. Talking to a friend or therapist might help. You can also check this video: <a href='https://www.youtube.com/watch?v=4AoFA19gbLo' target='_blank'>Coping with Sadness</a>.",
  "i feel depressed": "You're not alone. Please consider talking to someone you trust. If you're feeling overwhelmed, this might help: <a href='https://www.youtube.com/watch?v=7Hs2sjIx2OI' target='_blank'>Managing Depression</a>.",
  
  // 💭 Overthinking
  "i am overthinking": "Overthinking can be exhausting. Try shifting focus with activities like journaling or meditation. Here's a helpful video: <a href='https://www.youtube.com/watch?v=EaswWiwMVs8' target='_blank'>How to Stop Overthinking</a>.",
  
  // ✅ Positive Vibes
  "thank you": "You're welcome! Take care and stay positive! 😊",
  
  // Default Response
  "default": "I'm not sure how to respond to that. Can you ask something else?"
};


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load chat history from localStorage when component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([{ text: "Hello! How can I help you?", sender: "bot" }]);
    }
  }, []);

  // Save messages to localStorage whenever messages update
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const botResponse = responses[input.toLowerCase()] || responses["default"];

    const updatedMessages = [...messages, userMessage, { text: botResponse, sender: "bot" }];
    setMessages(updatedMessages);
    setInput(""); // Clear input field
  };

  // Function to clear chat history
  const clearHistory = () => {
    localStorage.removeItem("chatHistory");
    setMessages([{ text: "Hello! How can I help you?", sender: "bot" }]);
  };

  return (
    <div className="chat-container">
      <h2>🧠 Mental Health Chatbot</h2>
      <button className="clear-btn" onClick={clearHistory}>Clear Chat History</button>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "chat-message user" : "chat-message bot"}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
