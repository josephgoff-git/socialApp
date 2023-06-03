import React, { useContext, useState } from 'react';
import "./explorePost.scss";
import { makeRequest } from '../../axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthContext } from '../../context/authContext';
import { FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import moment from 'moment';


const ExplorePost = ({post, addActivity}) => {

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
  makeRequest.get("/comments?postId=" + post.id).then((res) => {
    return res.data;
  })
  );

  const { isLoading: likesIsLoading, error: LikesError, data: likesData } = useQuery(["likes", post.id], () =>
  makeRequest.get("/likes?postId=" + post.id).then((res) => {
    return res.data;
  })
  );


  const [desc, setDesc] = useState("")

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  var postId = post.id
  const handleClick = async (e) => {
    e.preventDefault();
    if (desc !== "") {
      mutation.mutate({ desc, postId });
      addActivity({label: "Commented on " + post.username + " " + post.name + "'s post", moment: moment(), link: `/profile/${post.userId}`})
    }
    setDesc("");
  };


  const likeMutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    likeMutation.mutate(likesData.includes(currentUser.id));
    if (likesData.includes(currentUser.id)) {
      addActivity({label: "Unliked " + post.username + " " + post.name + "'s post", moment: moment(), link: `/profile/${post.userId}`})
    }
    else {
      addActivity({label: "Liked " + post.username + " " + post.name + "'s post", moment: moment(), link: `/profile/${post.userId}`})
    }
  };

  if (isLoading) {return <div></div>}
  if (error) {return <div></div>}

  var displayComments = [...data].reverse()

  return (
    <div className="explorePost">
      
      <div className="content">
        <div className="left">
          <div className="top">
            <Link
              className="link"
              to={`/profile/${post.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={"/upload/" + post.profilePic} alt=""/>
              <p>{post.username} {post.name}</p>
            </Link>
          </div>
        
          <div className="img">
            <div className="content">
              <img src={"/upload/" + post.img} alt="" />
              <div className="desc">
                {likesIsLoading ? (
                "loading"
                ) : likesData.includes(currentUser.id) ? (
                  <FavoriteOutlinedIcon
                    style={{ color: "red" }}
                    onClick={handleLike}
                    className="heart"
                    // fontSize={20}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon 
                  onClick={handleLike} 
                  className="heart"
                  // fontSize={20}
                  />
                )}
                <p>{post.desc}</p>
              </div>
            </div>
          </div>
        
        </div>
       
        <div className="right">
          <div className="comments">
             {displayComments && displayComments.map((comment, index) => {
                var timeFromNow = "";
                var time = moment(comment.createdAt).fromNow()
                var momentSplit = time.split(" ");
                if (momentSplit[2] === "seconds") {timeFromNow = "30s"}
                else if (momentSplit[1] === "minutes") {timeFromNow = momentSplit[0] + "m"}
                else if (momentSplit[1] === "hours") {timeFromNow = momentSplit[0] + "h"}
                else if (momentSplit[1] === "days") {timeFromNow = momentSplit[0] + "d"}
                else if (momentSplit[1] === "weeks") {timeFromNow = momentSplit[0] + "w"}
                else if (momentSplit[1] === "months") {timeFromNow = momentSplit[0] + "m"}
                else if (momentSplit[1] === "years") {timeFromNow = momentSplit[0] + "y"}

                return (
                <div className="commentBox" key={index}>
              
                  <Link 
                  to={`/profile/${comment.userId}`}
                  style={{textDecoration: "none", color: "inherit"}}
                  >
                  <img src={"/upload/" + comment.profilePic} alt="" />
                  </Link>
              
                  <div className="info">
                    <Link 
                      to={`/profile/${comment.userId}`}
                      style={{textDecoration: "none", color: "inherit"}}
                    >
                      <span>{comment.username} {comment.name}</span>
                    </Link>
                    <p>{comment.desc}</p>
                  </div>
              
                  <span className="date">{timeFromNow}</span>
                </div>
              )}
              )}
              <div className="space"></div>
          </div>
          <div className="addComment">
            <input
            type="text"
            placeholder="Write a comment..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={handleClick}><FiSend fontSize={18} className="send"/></button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ExplorePost;