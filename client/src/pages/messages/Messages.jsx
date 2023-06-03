import "./messages.scss";
import MessageDisplay from "../../components/messageDisplay/MessageDisplay";
import MessageText from "../../components/messageText/MessageText";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";

export var lastId = 19;

const Messages = ({addActivity}) => { 
  const location = useLocation();

  const { isLoading: uIsLoading, error: uError, data: uData } = useQuery(
    ["users"],
    () =>
      makeRequest.get("/users/get").then((res) => {
        return res.data;
      })
  );

  const messageContainerRef = useRef(null);

  if( uIsLoading) {
    return <div></div>;
  }

  if (uError) {
    return <div></div>;
  }

  var receiverId = location.state.receiverId;
  var newId = lastId;
  if (lastId !== receiverId) {
    newId = receiverId;
  }
  lastId = receiverId

  var friend = uData[0];
  for (let i=0;i<uData.length;i++) {
    if (uData[i].id === newId) {friend = uData[i]}
  }

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
    const messageD = document.getElementById("messageD");
    const userTop = document.getElementById("userTop");
    const scrollPosition = messageD.scrollTop;

    if (scrollPosition > 118) {
      userTop.style.display = "flex"
      displayName = true;
    } else if (scrollPosition <= 118) {
      userTop.style.display = "none";
      displayName = false;
    }
  };
 
  var barHeight = 60;
  function setBar(value) {
    barHeight = value; 
    const messageD = document.getElementById("messageD");
    messageD.style.height = `calc(100% - ${barHeight}px)`
    scrollToBottom();
  }

  var displayName = true;
  const handleScroll = () => {
    const messageD = document.getElementById("messageD");
    const userTop = document.getElementById("userTop");
    const scrollPosition = messageD.scrollTop;

    if (scrollPosition > 118 && !displayName) {
      userTop.style.display = "flex"
      displayName = true;
    } else if (scrollPosition <= 118 && displayName) {
      userTop.style.display = "none";
      displayName = false;
    }
  };

  return ( 
    <div className="messages">

      <div id="userTop" className="userTop">
        <div className="userTopContent">
          <img src={"/upload/" + friend.profilePic} alt="" />
          <p>{friend.username} {friend.name}</p>
        </div>
      </div> 

      <div className="messageDisplayDiv" id="messageD" ref={messageContainerRef} onScroll={handleScroll}>
          <MessageDisplay receiverId={newId} scrollToBottom={scrollToBottom} friend={friend}/>
      </div> 
      <div className="messageTextDiv">
        <MessageText receiverId={newId} setBar={setBar} scrollToBottom={scrollToBottom} addActivity={addActivity} friend={friend}/>
      </div>
    </div>
  );
};

export default Messages;
