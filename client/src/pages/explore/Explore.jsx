import ExplorePost from "../../components/explorePost/ExplorePost";
import "./explore.scss";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/authContext';
import {BsFillSuitHeartFill} from 'react-icons/bs';
import { FaComment } from 'react-icons/fa';

export var fill = "";
export var wasOpen = false;

const Explore = ({userId, addActivity}) => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []); 

  const { currentUser } = useContext(AuthContext);

  const { isLoading: postsLoading, error: postsError, data: postsData } = useQuery(["posts", userId], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      const filteredPosts = res.data.filter(post => post.userId !== currentUser.id && post.img !== "");
      return filteredPosts;
    })
  );

  const [popupOpen, setPopupOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) 
      ) {
        setPopupOpen(false);
        const grid = document.getElementById("grid")
        grid.style.filter = "brightness(100%)";
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
          box.style.cursor = "pointer";
          box.style.pointerEvents = "all";
        });
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const [post, setPost] = useState(null);

  const handleBoxClick = () => {
    setPopupOpen(!popupOpen);
    const grid = document.getElementById("grid")
    const boxes = document.querySelectorAll(".box");
    if (popupOpen) {
      wasOpen = false;
      grid.style.webkitFilter = "brightness(100%)";
      grid.style.filter = "brightness(100%)";
      boxes.forEach((box) => {
        box.style.cursor = "pointer";
        box.style.pointerEvents = "all";
      });
    } else {
      wasOpen = true;
      grid.style.webkitFilter = "brightness(50%)";
      grid.style.filter = "brightness(50%)";
      boxes.forEach((box) => {
        box.style.cursor = "auto";
        box.style.pointerEvents = "none";
      });
    }
  };

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (postsLoading) {
    return <div>Loading...</div>;
  }

  if (postsError) {
    return <div>Error loading posts.</div>;
  }

  return (
    <div className="explore">

      <div className="title">
        Explore
      </div>

      <div className="grid" id="grid">
      {postsData.length === 0 
        ? <></> : 
          postsData.map((post) => { 

          var likeNum = getRandomNumber(70,230)
          var commentNum = getRandomNumber(3,14)

          return (
          <div
            key={post.id}
            className="box bin"
            id="box"
            onClick={(event) => {
              event.stopPropagation();
              handleBoxClick();
              setPost(post);
            }}
          >
            <img 
              src={"/upload/" + post.img} 
              alt="" 
              loading="lazy"
              />
            
            <div className="p">
              <BsFillSuitHeartFill style={{marginTop: "4.3px", fontSize: "17px"}}/> 
              <p> {likeNum}    </p>
              <FaComment style={{marginTop: "3px"}}/> 
              <p> {commentNum}</p>
            </div>
          </div>
          )})
        }
        
      </div>

      {popupOpen ? (
        <div ref={wrapperRef}>
          <ExplorePost post={post} addActivity={addActivity}/>
        </div>
      ) : null}
    </div>
  );
};

export default Explore;
