import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import { AiFillHome } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { MdOutlineExplore } from 'react-icons/md';
import { RiDownloadCloudLine } from 'react-icons/ri';
import { RiSettings5Fill } from 'react-icons/ri';
import { IoPersonCircle } from 'react-icons/io5';
import { GoDashboard } from 'react-icons/go';
import { MdEventAvailable } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { MdOutlineChat } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useActivitiesStore, useLeftStore } from "../../activitiesStore";

const LeftBar = () => {

  var left = useLeftStore((state) => state.left);
  const setLeft = useLeftStore((state) => state.setLeft);
  
  useEffect(() => {
    var leftComponent = document.getElementById("leftBar");
    if (leftComponent) { 
      if (window.innerWidth <= 600) {leftComponent.style.width = left ? "73px" : "0";}
      else {leftComponent.style.width = "160px"}
    }
  }, [left]);

  function manageLeft() {
    var leftComponent = document.getElementById("leftBar");
    if (window.innerWidth <= 600) {leftComponent.style.width = 0}
    setLeft(false);
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  var tracker = true;
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setTitles([profile, home, explore, saved, friends, groups, events, market, activity, settings, logout])
      const leftComponent = document.getElementById("leftBar")
      if (window.innerWidth > 600) {leftComponent.style.width = "160px"} 
      else {leftComponent.style.width = left? "73px" : 0;}

      if (window.innerWidth > 600 && tracker) {setLeft(false); tracker = false;}
      if (window.innerWidth <= 600) {tracker = true;} 
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  let profile = windowWidth <= 600 ? "Profile" : "";
  let home = windowWidth <= 600 ? "Home" : "";
  let explore = windowWidth <= 600 ? "Explore" : "";
  let saved = windowWidth <= 600 ? "Saved" : "";
  let friends = windowWidth <= 600 ? "Friends" : "";
  let groups = windowWidth <= 600 ? "Groups" : "";
  let events = windowWidth <= 600 ? "Events" : "";
  let market = windowWidth <= 600 ? "Market" : "";
  let activity = windowWidth <= 600 ? "Activity" : "";
  let settings = windowWidth <= 600 ? "Settings" : "";
  let logout = windowWidth <= 600 ? "Logout" : "";

  const [titles, setTitles] = useState([home, explore, saved, friends, groups, events, market, activity, settings, logout])


  const { currentUser } = useContext(AuthContext);

  // Display image
  const { isLoading: pLoading, data: profileData } = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
     return res.data;
  })
  )

  const clearActivities = useActivitiesStore((state) => state.clearActivities);
  const handleAlert = () => {
    if (window.confirm(`Logout as ${currentUser.username} ${currentUser.name}?`)) {
      localStorage.clear();
      clearActivities();
      window.location.href = "http://localhost:3000/login"
    //  await axios.post("http://localhost:8800/api/auth/logout");
    } 
  }


  return (
    
    <div className="leftBar" id="leftBar">
      {/* Irrelevant line to enact screen width */}
      {windowWidth < 600 ? <div/> : <div/> }

      <div className="container">
        <div className="menu">
          <Link
            to={`/profile/${currentUser.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={()=>{manageLeft()}}
          >
            <div className="item" title={profile}>
              {pLoading? <img src="" alt="" /> : <img src={"/upload/" + profileData.profilePic} alt="" />}
              <span>{currentUser.username}</span>
            </div>       
          </Link>   
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={()=>{manageLeft()}}
          >
            <div className="item" title={home}>
              <AiFillHome size={24} color="white"/>
              <span>Home</span>
            </div>
          </Link> 
          <Link
            to="/explore"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={()=>{manageLeft()}}
          >
            <div className="item" title={explore}>
              <MdOutlineExplore size={24} color="white"/>
              <span>Explore</span>
            </div>
          </Link> 
          <Link
            to="/saved"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={()=>{manageLeft()}}
          >
            <div className="item" title={saved}>
              <RiDownloadCloudLine size={24} color="white"/>
              <span>Saved</span>
            </div>
          </Link>        
        </div>
        <hr />
        <div className="menu">
          <span>Social</span>
          <Link
            to="/friends"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={()=>{manageLeft()}}
          >
            <div className="item" title={friends}>
              <FaUserFriends size={24} color="white"/>
              <span>Friends</span>
            </div>
          </Link> 
          <Link
          to="/groups"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={()=>{manageLeft()}}
          >
            <div className="item" title={groups}>
              <MdOutlineChat size={24} color="white"/>
              <span>Groups</span>
            </div>
          </Link> 
          <Link
            to="/events"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={()=>{manageLeft()}}
          >
            <div className="item" title={events}>
              <MdEventAvailable size={24} color="white"/>
              <span>Events</span>
            </div>
          </Link> 
          <Link
            to="/market"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={()=>{manageLeft()}}
          >
            <div className="item" title={market}>
              <GiShoppingBag size={24} color="white"/>
              <span>Market</span>
            </div>
          </Link> 
        </div>
        
        <hr />
        
        <div className="menu">
          <span>Account</span>  
          <Link
            to="/activity"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={()=>{manageLeft()}}
          >
            <div className="item" title={activity}>
              <GoDashboard size={24} color="white"/>
              <span>Activity</span>
            </div>
          </Link> 
          <Link
            to="/settings"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={()=>{manageLeft()}}
          >
            <div className="item" title={settings}>
              <RiSettings5Fill size={24} color="white"/>
              <span>Settings</span>
            </div>
          </Link> 
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div onClick={handleAlert} className="item" title={logout}>
              <IoPersonCircle size={24} color="white"/>
              <span>Logout</span>
            </div>
          </Link> 

        </div>
      </div>
    </div>  
  );
};

export default LeftBar;
