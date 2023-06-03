import { useContext, useEffect, useState } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { CgClose } from 'react-icons/cg'
import { useLeftStore } from "../../activitiesStore";
import { Link } from 'react-router-dom'
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Stories = ({addActivity}) => {

  const {currentUser} = useContext(AuthContext)

  const { isLoading: sIsLoading, error: sError, data: sData } = useQuery(
    ["stories"],
    () =>
      makeRequest.get("/stories").then((res) => {
        return res.data;
      })
  ); 

  const relationshipsQuery = useQuery(["relationships"], () =>
    makeRequest.get("/relationships/find").then((res) => res.data)
  );

  const [followingIds, setFollowingIds] = useState([]);

  useEffect(() => {
    if (relationshipsQuery.data) {
      const ids1 = relationshipsQuery.data
        .filter((item) => item.followerUserId === currentUser.id)
        .map((item) => item.followedUserId);
      ids1.push(currentUser.id);
      setFollowingIds(ids1);
    }
  }, [currentUser.id, relationshipsQuery.data]);

  
    // Display image
  const { isLoading: pLoading, error: pError, data: profileData } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
       return res.data;
    })
  )

  const [storyOpen, setStoryOpen] = useState(false);
  const [story, setStory] = useState([{userId: 0, name: "", username: "", profilePic: "", img: ""}]);

  var left = useLeftStore((state) => state.left);

  useEffect(() => {
    var storyDisplay = document.getElementById("storyDisplay");
    if (storyDisplay && window.innerWidth < 600) {storyDisplay.style.width = left ? "calc(100% - 73px)" : "100%";}    
  }, [left]);

  useEffect(() => {
    const handleWindowResize = () => {
      var storyDisplay = document.getElementById("storyDisplay");
      if (storyDisplay) {
        if (window.innerWidth <= 600) {storyDisplay.style.width = left ? "calc(100% - 73px)" : "100%";}    
        else if (window.innerWidth > 600 && window.innerWidth <= 960) {storyDisplay.style.width = "calc(100% - 160px)"}   
        else {storyDisplay.style.width = "calc((100% - 160px) * 6/9)"}   
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  function manageSize() {
    setTimeout(() => {
      var storyDisplay = document.getElementById("storyDisplay");
      if (storyDisplay && window.innerWidth < 600) {
        storyDisplay.style.width = left ? "calc(100% - 73px)" : "100%";
      }
      if (storyDisplay) {
        if (story[1] === undefined) {
          storyDisplay.style.cursor = "auto";
        } else {storyDisplay.style.cursor = "pointer";}
      }
    }, 0);
  }

  const [file, setFile] = useState(null);
  const [newStory, setNewStory] = useState(false);

  const uploadStory = async () => { 
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/stories", newStory);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (storyId) => {
      return makeRequest.delete("/stories/" + storyId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );


  const postStory = async e => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await uploadStory();
    if (file) {
      mutation.mutate({ img: imgUrl })
      addActivity({label: "Posted a new story", moment: moment(), link: "/"})
    }
    setFile(null);
    setStoryOpen(false);
    setNewStory(false)
  }

  const [count, setCount] = useState(0);

  var move = true;
  function moveToNext() {
    if (move) {
    setMenuOpen(false)
    var storyDisplay = document.getElementById("storyDisplay")
    if (count >= story.length - 2) {
      storyDisplay.style.cursor = "auto";
    } else {storyDisplay.style.cursor = "pointer"}
    if (story[count + 1] !== undefined) {setCount(count + 1)}
    }
    move = true
  }
  const [menuOpen, setMenuOpen] = useState(false)

  const handleDelete = () => {
    deleteMutation.mutate(story[count].id);
    addActivity({label: "Deleted story", moment: moment(), link: "/"})
    if (count === story.length - 1) {setStoryOpen(false)};
  }

  if (relationshipsQuery.isLoading || sIsLoading || pLoading) {
    return <div></div>;
  }

  if (relationshipsQuery.isError || pError || sError) {
    return <div></div>;
  }

  const collectedStories = sData
    .filter((story) => followingIds.includes(story.userId))
  
  var myStories = []
  const prevIds = []
  const updatedStories = []
  for (let i=0;i<collectedStories.length;i++) {
    // not our story and not already collected
    if (!prevIds.includes(collectedStories[i].userId) && collectedStories[i].userId !== currentUser.id) {
      updatedStories.push([collectedStories[i]])
      prevIds.push(collectedStories[i].userId)
    }
    // User already has a most recent story
    else if (prevIds.includes(collectedStories[i].userId) && collectedStories[i].userId !== currentUser.id) {
      var found = false;
      for (let j=0;j<updatedStories.length;j++) {
        if (!found) {
          if (updatedStories[j][0].userId === collectedStories[i].userId) {
            found = true;
            updatedStories[j].push(collectedStories[i])
          }
        }
      }
    }

    // Is our story
    if (collectedStories[i].userId === currentUser.id) {
      myStories.push(collectedStories[i]);
    } 
  }

  return (
    <div className="storyPage">
      {storyOpen ? 
      <div className="storyDisplay" id="storyDisplay" onClick={()=>{moveToNext()}}>
        <div className="close">  
          <CgClose fontSize={30} onClick={()=>{
            setStoryOpen(false)
            setMenuOpen(false)
          }}/>
        </div>
        
        {story[0].userId === currentUser.id && !newStory ? 
        <div className="menu">
          {menuOpen ? <div className="menuButton" onClick={handleDelete}>Delete</div>
          : <MoreHorizIcon className="dots" onClick={() => {setMenuOpen(true); move = false}} />}
        </div> : <></>} 

        {newStory ? 
        <Link 
          className="topLeft"
          to={`/profile/${currentUser.id}`}
          style={{textDecoration: "none", color: "inherit"}}
        >
          <img src={"/upload/" + currentUser.profilePic} alt=""/>
          <p>{currentUser.username} {currentUser.name}</p>
        </Link> 
        : 
        <Link 
          className="topLeft"
          to={`/profile/${story[0].userId}`}
          style={{textDecoration: "none", color: "inherit"}}
        >
          <img src={"/upload/" + story[0].profilePic} alt=""/>
          <p>{story[0].username} {story[0].name}</p>
        </Link> 
        }

        {file && newStory ? 
          (<img src={URL.createObjectURL(file)} alt=""/>)
        : <></>}

        {!newStory ?     
          <img src={"/upload/" + story[count].img} alt=""/>
        : <></> }

        {newStory ?     
          <button onClick={postStory}>Post</button>
        : <></> }
        
      </div> 
      : <></>}

      <div className="storiesContainer">
        <div className="stories">
          <input
            type="file"
            id="storyfile"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
              setStoryOpen(true)
              setNewStory(true)
              manageSize()
            }}
          />
          
          <div className="story story1">
              {myStories.length > 0 ?
              <>
              <img src={"/upload/" + myStories[0].img} alt="" title="My Story" onClick={()=>{
                setStoryOpen(true);
                setNewStory(false)
                setStory(myStories)
                setCount(0)
                manageSize()
              }}/>
              <label htmlFor="storyfile">
                <div className="button" title="Add Story"><p>+</p></div>
              </label> 
              </>
              : 
              <>
              <label htmlFor="storyfile" title="Add Story">
                {pLoading? <img src="" alt="" /> : <img src={"/upload/" + profileData.profilePic} alt=""/>}
                <div className="button"><p>+</p></div>
              </label>
              </>
              }
          </div>

          {updatedStories.length > 0 ? updatedStories.map((storyArray, index)=>(
            <div className="story" title={storyArray[0].username + " " + storyArray[0].name} key={index} onClick={()=>{
              setStoryOpen(true);
              setNewStory(false)
              setStory(storyArray)
              setCount(0)
              manageSize()
            }}>
              <img src={"/upload/" + storyArray[0].img} alt="" />
            </div>
          ))  : <></>}   
        </div> 
      </div>
    </div>
  )
}

export default Stories