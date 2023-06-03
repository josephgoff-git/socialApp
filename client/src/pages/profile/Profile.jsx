import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import { FiSend } from "react-icons/fi"
import Posts from "../../components/posts/Posts"
import { useQuery, useMutation, useQueryClient} from 'react-query'
import { makeRequest } from "../../axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import Share from "../../components/share/Share";
import moment from "moment";

const Profile = ({addActivity}) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext)

  const location = useLocation()
  const userId = parseInt(location.pathname.split("/")[2])

  const { isLoading: userLoading, data: userData } = useQuery(["users", userId], () =>
    makeRequest.get("/users/find/" + userId).then((res)=> {
      return res.data;
    })
  )

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(["relationships", userId], () =>
  makeRequest.get("/relationships?followedUserId=" + userId).then((res)=> {
    return res.data;
  })
  )

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationships"]);
      },
    }
  );

  const handleFollow = () => {
      mutation.mutate(relationshipData.includes(currentUser.id))
      if (relationshipData.includes(currentUser.id)) {
        addActivity({label: "Unfollowed " + userData.username + " " + userData.name, moment: moment(), link: `/profile/${userId}`})
      } else {
        addActivity({label: "Started following " + userData.username + " " + userData.name, moment: moment(), link: `/profile/${userId}`})
      }
    }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  var updatePage = false;
  useEffect(() => {
    updatePage = location.state;
    if (updatePage) {
      setOpenUpdate(true);
    }
    updatePage = false;
  }, [location.state, updatePage]);

  return (
    <div className="profile">
      {userLoading || rIsLoading 
      ? "" 
      : ( <> 
      {userId !== currentUser.id ? 
      <Link
        to="/messages"
        state={{receiverId: userId}} 
        style={{textDecoration: "none"}} 
      >
        <FiSend fontSize={24} className="send"/>
      </Link> 
      : null }
      <div className="images">
        <img
          src={"/upload/" + userData.coverPic}
          alt=""
          className="cover"
        />
        <img
          src={"/upload/" + userData.profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          
          <div className="top">
            <span>{userData.username} {userData.name}</span>
          </div>
          
          <div className="middle">
            <div className="info">
              <div className="city">
                <div className="city-div">
                  <PlaceIcon />
                  <span>{userData.city}</span>
                </div>
              </div>
              <div className="website">
                <div className="website-div">
                  <LanguageIcon />
                  <span>{userData.website}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="links">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon />
            </a>
            <a href="http://instagram.com">
              <InstagramIcon />
            </a>
            <a href="http://twitter.com">
              <TwitterIcon />
            </a>
            <a href="http://linkedin.com">
              <LinkedInIcon />
            </a>
            <a href="http://pinterest.com">
              <PinterestIcon />
            </a>
          </div>

          <div className="bottom">
              {rIsLoading ? "loading..." : 
                userId === currentUser.id 
                ? (<button onClick={()=>setOpenUpdate(true)}>Update</button>) 
                : (<button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id) 
                      ? "Unfollow"
                      : "Follow"
                    } 
                  </button>)}
          </div>

        </div>
      </div>
      {userId === currentUser.id? <Share addActivity={addActivity}/> : <></>}
      <Posts userId={userId} addActivity={addActivity}/>
      </>)}
      {userLoading? <></> : <div>{openUpdate && <Update addActivity={addActivity} setOpenUpdate={setOpenUpdate} user={userData}/>}</div>}
    </div>
  );
};

export default Profile;
