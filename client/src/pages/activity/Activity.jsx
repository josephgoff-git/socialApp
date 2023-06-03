import { Link } from "react-router-dom";
import "./activity.scss";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useActivitiesStore } from "../../activitiesStore";
import moment from "moment";

const Activity = () => {

  var activities = useActivitiesStore((state) => state.activities);

  if (activities.length === 0) {
    const storedArray = localStorage.getItem("Latest Activity");
    if (storedArray) {
      activities = JSON.parse(storedArray);
    }
  }

  var displayArray = [...activities].reverse()


  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);

  const { currentUser } = useContext(AuthContext);
 
  //Display image
  const { isLoading: pLoading, data: profileData } = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
      return res.data;
  })
  )

  const clearActivities = useActivitiesStore((state) => state.clearActivities);
  function clear() {
    clearActivities()
  }

  return (
    <div className="activity">
      <div className="title">
        Latest Activity
      </div>

      <div className="clear">
        <button onClick={()=>{clear()}}>Clear</button>
      </div>
      
      <div className="container">
        {displayArray.length > 0 ?
        displayArray.map((item, index) => {
          if (item.label === "Logged in") {
            item.label = "Logged in as " + currentUser.username + " " + currentUser.name
            item.link = `/profile/${currentUser.id}`
          }
          if (item.label === "Successfully registered") {
            item.label = "Successfully registered as " + currentUser.username + " " + currentUser.name
            item.link = `/profile/${currentUser.id}`
          }
          
          return (
          <Link to={item.link} key={index} className="item">
            <div className="left">
                <div className="icon">
                {pLoading? <></> : <img src={"/upload/" + profileData.profilePic} alt="" />}
                </div>
                <div className="label">
                  {item.label}
                </div>
              </div>
              <div className="right">
                {moment(item.moment).fromNow()}
              </div>
          </Link>
        )})
        : <></>
        }
      </div>

    </div>
  );
};

export default Activity;
