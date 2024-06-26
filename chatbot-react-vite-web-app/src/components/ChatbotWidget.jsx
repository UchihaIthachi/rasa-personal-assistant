import React, { useEffect } from 'react';
import { Widget, addResponseMessage, addUserMessage, addLinkSnippet, setQuickButtons, toggleWidget, toggleInputDisabled, toggleMsgLoader, deleteMessages, markAllAsRead, setBadgeCount } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import axios from 'axios';
import './custom-styles.css';


const ChatbotWidget = () => {
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

  // Additional UI methods for experimentation
  const sendLinkSnippet = () => {
    addLinkSnippet({
      title: 'Learn more about react-chat-widget',
      link: 'https://github.com/Wolox/react-chat-widget',
      target: '_blank'
    });
  };

  const setButtons = () => {
    setQuickButtons([
      { label: 'Button 1', value: '1' },
      { label: 'Button 2', value: '2' }
    ]);
  };

  return (
    <div>
      <button onClick={toggleWidget}>Toggle Widget</button>
      <button onClick={toggleInputDisabled}>Toggle Input Disabled</button>
      <button onClick={toggleMsgLoader}>Toggle Message Loader</button>
      <button onClick={() => deleteMessages(1)}>Delete Last Message</button>
      <button onClick={markAllAsRead}>Mark All as Read</button>
      <button onClick={() => setBadgeCount(5)}>Set Badge Count to 5</button>
      <button onClick={sendLinkSnippet}>Send Link Snippet</button>
      <button onClick={setButtons}>Set Quick Buttons</button>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={"https://avatars.dicebear.com/api/male/1.svg?background=%23000000&color=%23ffffff"}
        title="Welcome to the chatbot"
        subtitle="We are here to help you"
        senderPlaceHolder="Type your message here..."
        profileClientAvatar={"https://avatars.dicebear.com/api/female/2.svg?background=%23000000&color=%23ffffff"}
        titleAvatar={"https://avatars.dicebear.com/api/initials/JS.svg?background=%23000000&color=%23ffffff"}
        showCloseButton={true}
        fullScreenMode={true}
        autofocus={true}
        showTimeStamp={true}
        chatId="rcw-chat-container"
        launcherOpenLabel="Open chat"
        launcherCloseLabel="Close chat"
        sendButtonAlt="Send"
        emojis={true}
        showBadge={true}
      />
    </div>
  );
};

export default ChatbotWidget;

