import { useQuery } from "react-query";
import "./friends.scss";
import { makeRequest } from "../../axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
 
const Friends = () => {

  const { currentUser } = useContext(AuthContext);

  const [followerIds, setFollowerIds] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);
  const [users, setUsers] = useState([]);

  const relationshipsQuery = useQuery(["relationships"], () =>
    makeRequest.get("/relationships/find").then((res) => res.data)
  );

  const usersQuery = useQuery(["users"], () =>
    makeRequest.get("/users/get").then((res) => res.data)
  );

  useEffect(() => {
    if (relationshipsQuery.data) {
      const ids1 = relationshipsQuery.data
        .filter((item) => item.followerUserId === currentUser.id)
        .map((item) => item.followedUserId);
      setFollowingIds(ids1);

      const ids2 = relationshipsQuery.data
        .filter((item) => item.followedUserId === currentUser.id)
        .map((item) => item.followerUserId);
      setFollowerIds(ids2);
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

  const updatedFollower = users
    .filter((user) => followerIds.includes(user.id))
    .map((user, index) => ({
      key: index + 1,
      firstName: user.username,
      lastName: user.name,
      src: user.profilePic,
      id: user.id,
    }))
    .sort((a, b) => {
      const firstNameComparison = a.firstName.localeCompare(b.firstName);
      if (firstNameComparison !== 0) {
        return firstNameComparison;
      } else {
        return a.lastName.localeCompare(b.lastName);
      }
    });

  const updatedFollowing = users
    .filter((user) => followingIds.includes(user.id))
    .map((user, index) => ({
      key: index + 1,
      firstName: user.username,
      lastName: user.name,
      src: user.profilePic,
      id: user.id,
    }))
    .sort((a, b) => {
      const firstNameComparison = a.firstName.localeCompare(b.firstName);
      if (firstNameComparison !== 0) {
        return firstNameComparison;
      } else {
        return a.lastName.localeCompare(b.lastName);
      }
    });

  return (
    <div className="friends">
      <div className="title">Followers</div>

      <div className="container">
        {updatedFollower.map((follower) => (
          <Link
            to={`/profile/${follower.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            className="box"
            key={follower.key}
          >
            <div className="top">
              <img src={"/upload/" + follower.src} alt="" />
            </div>
            <div className="bottom">
              <p>{follower.firstName}</p>
              <p>{follower.lastName}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="title">Following</div>

      <div className="container">
        {updatedFollowing.map((following) => (
          <Link
            to={`/profile/${following.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            className="box"
            key={following.key}
          >
            <div className="top">
              <img src={"/upload/" + following.src} alt="" />
            </div>
            <div className="bottom">
              <p>{following.firstName}</p>
              <p>{following.lastName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Friends;
