import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from 'react-query'
import { makeRequest } from "../../axios";

const Posts = ({userId, addActivity}) => {

  const { isLoading, error, data } = useQuery(["posts", userId], () =>
  makeRequest.get("/posts?userId=" + userId).then((res) => {
    const returnData = [];
    const postIds = [];
    for (let i = 0; i < res.data.length; i++) {
      const post = res.data[i];
      if (!postIds.includes(post.id)) {
        returnData.push(post);
        postIds.push(post.id);
      }
    }
    return returnData;
  })
);

  return (
    <div className="posts">
      {error
        ? "Something went wrong..."
        : isLoading 
        ? "" 
        : data.map(post=>(
          <Post post={post} key={post.id} addActivity={addActivity}/>
      ))}
    </div>
  );
};

export default Posts;
