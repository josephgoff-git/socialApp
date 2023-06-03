import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Post = ({ post, addActivity }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
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
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
    if (data.includes(currentUser.id)) {
      addActivity({label: "Unliked " + post.username + " " + post.name + "'s post", moment: moment(), link: `/profile/${post.userId}`})
    }
    else {
      addActivity({label: "Liked " + post.username + " " + post.name + "'s post", moment: moment(), link: `/profile/${post.userId}`})
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
    addActivity({label: "Deleted post", moment: moment(), link: `/profile/${currentUser.id}`})
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link
              to={`/profile/${post.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={"/upload/" + post.profilePic} alt="" />
            </Link>
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username} {post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon className="dots" onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>Delete</button>
          )}
          {menuOpen && post.userId !== currentUser.id && (
            <button onClick={()=>{setMenuOpen(false)}}>Save</button>
          )}
        </div>
        <div className="content">
          {post.img? <img src={"/upload/" + post.img} alt="" /> : <img alt="" src="" style={{display: "none"}}/>}
          <p>{post.desc}</p>
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "themed('textColor')" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            <span>{data?.length} Like{data?.length===1? "" : "s"}</span>
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <span>See Comments</span>
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            <span>Share</span>
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} addActivity={addActivity} post={post}/>}
      </div>
    </div>
  );
};

export default Post;