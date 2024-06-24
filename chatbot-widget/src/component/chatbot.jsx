import React, { useEffect } from 'react';
import $ from 'jquery';
import 'materialize-css/dist/css/materialize.min.css';
import 'font-awesome/css/font-awesome.min.css';
//import './Chatbot.css';

const Chatbot = () => {
  useEffect(() => {
    // Load external scripts
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeChatbot = async () => {
      try {
        await loadScript('/static/js/lib/materialize.min.js');
        await loadScript('/static/js/lib/uuid.min.js');
        await loadScript('/static/js/script.js');
        await loadScript('/static/js/lib/chart.min.js');
        await loadScript('/static/js/lib/showdown.min.js');
      } catch (error) {
        console.error('Failed to load script', error);
      }
    };

    initializeChatbot();
  }, []);

  return (
    <div className="container">
      <div id="modal1" className="modal">
        <canvas id="modal-chart"></canvas>
      </div>

      <div className="widget">
        <div className="chat_header">
          <span className="chat_header_title">Sara</span>
          <span className="dropdown-trigger" href="#" data-target="dropdown1">
            <i className="material-icons">more_vert</i>
          </span>

          <ul id="dropdown1" className="dropdown-content">
            <li><a href="#" id="clear">Clear</a></li>
            <li><a href="#" id="restart">Restart</a></li>
            <li><a href="#" id="close">Close</a></li>
          </ul>
        </div>

        <div className="chats" id="chats">
          <div className="clearfix"></div>
        </div>

        <div className="keypad">
          <textarea id="userInput" placeholder="Type a message..." className="usrInput"></textarea>
          <div id="sendButton">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div className="profile_div" id="profile_div">
        <img className="imgProfile" src="/static/img/botAvatar.png" alt="Bot Avatar" />
      </div>

      <div className="tap-target" data-target="profile_div">
        <div className="tap-target-content">
          <h5 className="white-text">Hey there 👋</h5>
          <p className="white-text">
            I can help you get started with Rasa and answer your technical questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
