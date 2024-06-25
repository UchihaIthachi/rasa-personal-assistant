import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import axios from 'axios';
import "react-chat-widget/lib/styles.css";
import './App.css';
import { Widget, addResponseMessage } from "react-chat-widget";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    addResponseMessage("Welcome to the chatbot");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    // Send the user message to Rasa server
    axios.post('http://localhost:5005/webhooks/rest/webhook', {
      sender: 'user',
      message: newMessage
    })
    .then(response => {
      // Process the response from Rasa server
      if (response.data && response.data.length > 0) {
        const botResponse = response.data[0].text;
        addResponseMessage(botResponse);
      }
    })
    .catch(error => {
      console.error('Error communicating with Rasa:', error);
    });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={"https://avatars.dicebear.com/api/male/1.svg?background=%23000000&color=%23ffffff"}
        title="Welcome to the chatbot"
        subtitle="We are here to help you"
      />
    </>
  );
}

export default App;
