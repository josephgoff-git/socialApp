import Message from "../message/Message";
import "./messageDisplay.scss";
import { useQuery } from 'react-query';
import { makeRequest } from "../../axios";
import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const MessageDisplay = ({ receiverId, scrollToBottom, friend }) => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(
    ["messages"],
    () =>
      makeRequest.get("/messages").then((res) => {
        return res.data;
      })
  );

  useEffect(()=>{
    scrollToBottom();
  },[data])


  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  const filteredMessages = data
    .filter(
      (item) =>
        (item.userId === currentUser.id && item.receiverId === receiverId) ||
        (item.userId === receiverId && item.receiverId === currentUser.id)
    )
    .reverse();

  return (
    <div className="messageDisplay" id="scrollableDiv">      

      <div className="top">
        <Link 
          style={{textDecoration: "none", color: "inherit"}}
          to={`/profile/${receiverId}`}
        >
          <img src={"/upload/" + friend.profilePic} alt="" />
        </Link>
      </div>
      <div className="top2">
        <Link 
          style={{textDecoration: "none", color: "inherit"}}
          to={`/profile/${receiverId}`}
        >
          <p>{friend.username} {friend.name}</p>
        </Link>
      </div>  
      <div className="display">
      {filteredMessages.map((message) => (
        <Message post={message} key={message.id} />
      ))}
      </div>
    </div>
  );
};

export default MessageDisplay;
