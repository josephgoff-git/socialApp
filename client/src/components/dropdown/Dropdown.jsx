import "./dropdown.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { reRendered } from "../messageText/MessageText";
import moment from "moment";

export var clickedOutside = false;

function Dropdown({page, userId, isLoading, mainBody, setMainBody, addActivity}) {

  const { currentUser } = useContext(AuthContext);

  const usersQuery = useQuery(["users"], () =>
  makeRequest.get("/users/get").then((res) => {
    return res.data
  })
  );

  //Get all messages
  const { isLoading: mLoading, error: mError, data: mData } = useQuery(["messages"], () =>
    makeRequest.get("/messages?userId=" + userId).then((res)=> {
      var filteredMessages = res.data.filter((item)=> item.userId === currentUser.id || item.receiverId === currentUser.id)
      return filteredMessages;
    })
  )

  const [followersIds, setFollowersIds] = useState([]);
  const [users, setUsers] = useState([]);
  const relationshipsQuery = useQuery(["relationships"], () =>
    makeRequest.get("/relationships/find").then((res) => res.data)
  );

  useEffect(() => {
    if (relationshipsQuery.data) {
      const ids1 = relationshipsQuery.data
        .filter((item) => item.followedUserId === currentUser.id)
        .map((item) => item.followerUserId);
      setFollowersIds(ids1);
    }
  }, [currentUser.id, relationshipsQuery.data]);

  useEffect(() => {
    if (usersQuery.data) {
      setUsers(usersQuery.data);
    }
  }, [usersQuery.data]);

  
  var messageData = mData? mData : [];
  var messageDropArray = [];
  var recipients = []
  for (let i=0; i<messageData.length; i++) {
    var alreadyFound = false; 
    if (messageData[i].userId === currentUser.id) {
     for (let j=0;j<recipients.length;j++) {
        if (recipients[j] === messageData[i].receiverId) {alreadyFound = true;}
      }
    } else if (messageData[i].receiverId === currentUser.id) {
     for (let j=0;j<recipients.length;j++) {
        if (recipients[j] === messageData[i].userId) {alreadyFound = true;}
      }
    }
    if (!alreadyFound) {
      if (messageData[i].userId === currentUser.id) {recipients.push(messageData[i].receiverId)}
      else if (messageData[i].receiverId === currentUser.id) {recipients.push(messageData[i].userId)}
      messageDropArray.push(messageData[i]);
    }
  }

  const ref = useRef();
  clickedOutside = false;

  const useOutsideClick = (ref, callback) => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClick);
  
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };

  useOutsideClick(ref, () => {
    clickedOutside = true;
  });


  var title = "";
  if (page === 1) {title = "Account Settings"} 
  else if (page === 2) {title = "Messages"} 
  else if (page === 3) { title = "Notifications"} 


  const [bodyChanged, setBodyChanged] = useState(0);
  function handleClick(item, index) {
    if (item.type === "option") {
      var newMainBody = mainBody
      newMainBody[index].clicked = !newMainBody[index].clicked;
      setMainBody(newMainBody)
      setBodyChanged(bodyChanged + 1)
    } 
    if (item.label === "Private Account") {
      var action = item.clicked? "Enabled" : "Disabled";
      addActivity({label: action +  " private account from the dropdown menu", moment: moment(), link: "/activity"})
    }
    if (item.label === "Show Online Status") {
      var action = item.clicked? "visible" : "hidden";
      addActivity({label: "Set online status to " + action + " from the dropdown menu", moment: moment(), link: "/activity"})
    }
    if (item.label === "Allow Sharing") {
      var action = item.clicked? "Enabled" : "Disabled";
      addActivity({label: action +  " sharing from the dropdown menu", moment: moment(), link: "/activity"})
    }
    if (item.label === "Delete Account") {
      if (window.confirm(`Delete ${currentUser.username} ${currentUser.name}'s account?`)) {
        deleteMutation.mutate(currentUser.id);
        window.location.href = "http://localhost:3000/login"
      } 
    }
  }

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (id) => {
      return makeRequest.delete("/users/" + id);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  if (relationshipsQuery.isLoading || usersQuery.isLoading) {
    return <div></div>;
  }

  if (relationshipsQuery.isError || usersQuery.isError) {
    return <div></div>;
  }

  var users2 = users.filter((item) => item.id !== currentUser.id)
  // notifications
  var count = 0;
  var displayNotifications = []
  var times = ["2m", "3m", "5m", "10m", "12m", "21m", "30m", " 56m", "1h", "3h", "6h", "12h", "1d","2d", "4d"]
  var event = [" liked your post", " commented on your post", " shared your post"]
  while (count < 15) {
    if (users2.length > 0) {
      var person = users2[Math.floor(Math.random() * users2.length)]
      displayNotifications.push({userId: person.id, userPic: person.profilePic, name: person.username + " " + person.name, notification: event[Math.floor(Math.random() * 3)], time: times[count]})
    }
    count += 1;
  }

  return (
    <div className="dropdown-wrapper" ref={ref}>
      <div className="title">
        {title}
      </div>
      <hr />
      {page === 1 ?
      <div className="body">
        {mainBody && mainBody.map((item, index) => {
          let link = "/";
          let update = false;
          if (item.label === "Edit Profile" || item.label === "Change Password") {
            update = true;  
            link = `/profile/${currentUser.id}`
          } 

          return (
          <div key={index} onClick={() => {clickedOutside = true; handleClick(item, index)}}>
          {item.type==="click" ? (
            <Link 
            to={link}
            state={{
              update,
              firstRender: true
            }}
            style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item" >
                <div className="left">
                  <div className="icon">
                    <div>{item.icon}</div>
                  </div>
                  <div className="label">
                    <div>{item.label}</div>
                  </div>
                </div>
                <div className="right">
                  <FiChevronRight fontSize={18}/>
                </div>
              </div>
            </Link>
            ):(
            <div className="item">
              <div className="left">
                <div className="icon">
                  {item.icon}
                </div>
                <div className="label">
                  {item.label}
                </div>
              </div>
              <div className="right">
                {isLoading? <></> : bodyChanged !== null? <div>
                  {item.label === "Private Account" ? item.clicked === false? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Show Online Status" ? item.clicked === false? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Allow Sharing" ? item.clicked === false? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Delete Account" ? <FiChevronRight fontSize={18}/> : <></>}
              </div> : <></>}
              </div>
            </div>
          )}</div>
          )
        })} 
      </div>
      : <></>}

      {page === 2?
      <div className="body">
        {messageDropArray && messageDropArray.map((item, index) => {
          clickedOutside = true;
          var allUsers = usersQuery ? usersQuery.data : [];
          var friend = allUsers[0]
          for (let i=0;i<allUsers.length;i++) {
            if (allUsers[i].id === recipients[index]) {
              friend = allUsers[i];
            } 
          }
          
          return (
          <div key={item.id} onClick={() => {
            clickedOutside = true;
            reRendered(true)
          }}>
            <Link
            to="/messages"
            state={{
              receiverId: recipients[index]
            }}
            style={{textDecoration: "none", color: "inherit"}}
            >
              <div className="item" >
                <div className="left">
                  <div className="icon">
                    <img src={"/upload/" + friend.profilePic} alt="" /> 
                  </div>
                  <div className="label">
                    <div>
                      <div className="top">{friend.username} {friend.name}</div>
                      <div className="bottom">{item.desc}</div>
                    </div>         
                  </div>
                </div>
                <div className="right">
                  <FiChevronRight fontSize={18}/>
                </div>
              </div>
            </Link>
          </div>
          )
        })} 
      </div>
      : <></>}

      {page === 3 ? 
      <div className="body">
        {displayNotifications.length > 0 && displayNotifications.map((item, index) => {
          clickedOutside = true;
          
          return (
          <div key={index} onClick={() => {clickedOutside = true}}>
            <Link 
            to={`/profile/${item.userId}`}
            style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="item" >
                <div className="left">
                  <div className="icon">
                   <img src={"/upload/" + item.userPic} alt="" />
                  </div>
                  <div className="label">
                    <div className="page3"><span>{item.name}</span>{item.notification}</div> 
                  </div>
                </div>
                <div className="right date">
                  <div className="text">{item.time}</div>
                </div>
              </div>
          </Link>
        </div>
        )
        })} 
      </div>
      : <></>}

    </div>
  )
}

export default Dropdown;