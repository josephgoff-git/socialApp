import "./message.scss";
import moment from "moment";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Message = ({ post }) => {
 
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
    {post.userId === currentUser.id ? (
    <div className="message" style={{marginLeft: "35%"}}>
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
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img !== null && post.img !== "" ? <img src={"/upload/" + post.img} alt="" style={{margin: "0"}}/> : <></>}
        </div>
      </div>
    </div>
    ) : ( 
    <div className="message">
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
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img !== null && post.img !== "" ? <img src={"/upload/" + post.img} alt="" style={{margin: "0"}}/> : <></>}
        </div>
      </div>
    </div>
    )}

    </div>
  );
};

export default Message;