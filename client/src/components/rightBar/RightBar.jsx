import { useMutation, useQuery, useQueryClient } from "react-query";
import "./rightBar.scss";
import { makeRequest } from "../../axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import moment from "moment";


const RightBar = ({addActivity}) => {
  const { currentUser } = useContext(AuthContext);

  const [followingIds, setFollowingIds] = useState([]);
  const [users, setUsers] = useState([]);

  const relationshipsQuery = useQuery(["relationships"], () =>
    makeRequest.get("/relationships/find").then((res) => res.data)
  );

  const usersQuery = useQuery(["users"], () =>
    makeRequest.get("/users/get").then((res) => res.data)
  );

  const queryClient = useQueryClient();
  var userId;
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

  function handleFollow(id, first, last) {
    userId = id;
    mutation.mutate(followingIds.includes(currentUser.id));
    addActivity({label: "Started following " + first + " " + last, moment: moment(), link: `/profile/${id}`})
  }

  useEffect(() => {
    if (relationshipsQuery.data) {
      const ids1 = relationshipsQuery.data
        .filter((item) => item.followerUserId === currentUser.id)
        .map((item) => item.followedUserId);
      setFollowingIds(ids1);
    }
  }, [currentUser.id, relationshipsQuery.data]);

  useEffect(() => {
    if (usersQuery.data) {
      setUsers(usersQuery.data);
    }
  }, [usersQuery.data]);

  if (relationshipsQuery.isLoading || usersQuery.isLoading) {
    return <div></div>;
  }

  if (relationshipsQuery.isError || usersQuery.isError) {
    return <div></div>;
  }

  const updatedFollowing = users
  .filter((user) => followingIds.includes(user.id))
  .map((user, index) => ({
    key: index + 1,
    firstName: user.username,
    lastName: user.name,
    src: user.profilePic,
    id: user.id,
  }))

  const notFollowing = users
  .filter((user) => !followingIds.includes(user.id) && user.id !== currentUser.id)
  .map((user, index) => ({
    key: index + 1,
    firstName: user.username,
    lastName: user.name,
    src: user.profilePic,
    id: user.id,
  }));

  // Suggested Followers
  var count = 0;
  var displayNotFollowing = []
  while (count < 3) {
    if (notFollowing[count]) {displayNotFollowing.push(notFollowing[count])}
    count += 1;
  }

  // Recent Updates 
  count = 0;
  var count2 = 0;
  var displayUpdates = []
  var reverse = [...updatedFollowing].reverse()
  while (count < 2) {
    if (reverse.length <= 2) {
      if (reverse[count]) {displayUpdates.push(reverse[count])}
    }
    else {
      if (reverse[count2]) {displayUpdates.push(reverse[count2])}
      count2 += 1;;
    }
    count += 1;
    count2 += 1;
  }
  var updateText = ["changed their profile picture", "changed their cover picture"]
  var timeStamp = [2, 6];

  // Show Online
  count = 0;
  var displayOnline = []
  while (count < 10) {
    if (updatedFollowing[count]) {displayOnline.push(updatedFollowing[count])}
    count += 1;
  } 

  return (
    <div className="rightBar">
      <div className="container">
        {displayNotFollowing.length > 0 ?
        <div className="item">
          <span>Suggested Friends</span>
          {displayNotFollowing.map((outsideUser) => ( 
              <div className="user" key={outsideUser.key}>
                <Link
                className="userInfo"
                to={`/profile/${outsideUser.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img src={"/upload/" + outsideUser.src} alt="" />
                  <span>{outsideUser.firstName} {outsideUser.lastName}</span>
                </Link>
                <div className="buttons">
                  <button onClick={()=> {handleFollow(outsideUser.id, outsideUser.firstName, outsideUser.lastName)}}>
                    {followingIds.includes(currentUser.id) 
                      ? "Unfollow"
                      : "Follow"
                    } 
                  </button>
                </div>
              </div>
          ))}
        </div>
        : <></>
        }

        {displayUpdates.length > 0 ?
        <div className="item">
          <span>Recent Updates</span>
          {displayUpdates.map((updatedUser, index)=>(
          <Link 
          className="user"
          key={updatedUser.key}
          to={`/profile/${updatedUser.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="userInfo">
              <img alt="" src={"/upload/" + updatedUser.src}/>
              <p>
                <span>{updatedUser.firstName} {updatedUser.lastName}</span> {updateText[index]}
              </p>
            </div>
            <span>{timeStamp[index]}m</span>
          </Link>
          ))}
        </div>

        : <></>
        }

        {displayOnline.length > 0 ?
        <div className="item">
          <span>Online Friends</span>

          {displayOnline.map((user) => (
          <Link 
          className="user" 
          key={user.key}
          to={`/profile/${user.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="userInfo">
              <img alt="" src={"/upload/" + user.src}/>
              <div className="online" />
              <span>{user.firstName} {user.lastName}</span>
            </div>
          </Link>
          ))}
        </div>
        : <></>
        }
      </div>
    </div>
  );
};

export default RightBar;
