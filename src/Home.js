import React, { useState } from "react"; //for togglebutton
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import "./Home.css"; // for styling by ourself
import "react-chatbot-kit/build/main.css"; // for predifned chatbot styling
import NavigationBar from "./navbar";
import Carousel from "./carousel";



const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);  //initially showchatbot is false,this acn be changed by setshowchatbot function

  // Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div>
       <NavigationBar/>
       <Carousel/>
       

      {/* Chatbot Toggle Button */}
      <button className="chatbot-toggle"onClick={toggleChatbot}>
        💬
      </button>

      {/* Chatbot Container */}
      {showChatbot && (                     // if showchatbot is true
        <div className="chatbot-container">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
