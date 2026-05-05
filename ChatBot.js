import React, { useState } from "react";
import "./ChatBot.css"; // we'll define styles

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate bot response (replace with real AI API later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "You said: " + input },
      ]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-container">
      {open && (
        <div className="chatbox">
          <div className="chat-header">Chat with AI</div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.from === "bot" ? "bot-msg" : "user-msg"}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      <button className="chat-toggle-btn" onClick={toggleChat}>
        {open ? "✖" : "💬"}
      </button>
    </div>
  );
};

export default ChatBot;
