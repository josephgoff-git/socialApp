import "./share.scss";
import { useContext, useEffect, useLayoutEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { BsFillImageFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { BsFillTagsFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import moment from "moment";
// import { compressImage } from "../../compressImage.js"

export var filePost = "";
export var fill = "";
export var rendered = false;
export function reRendered(value) {
  rendered = value
};

const Share = ({addActivity}) => {

  const { currentUser } = useContext(AuthContext);
  
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  
  const textareaRef = useRef(null);
  useEffect(() => {
    if (rendered) {
      filePost = "";
      fill = "";
      reRendered(false)
    } else {
      if (filePost !== "") {
        setFile(filePost)
      }
      if (fill !== "") {
        setDesc(fill)
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }
    }
  }, []); 

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setTitles([addImage, location, tags])
    };
    var textarea = document.getElementById("textarea");
    if (window.innerWidth < 500 && file) {textarea.placeholder = "Write here..."}
    else {textarea.placeholder = `What's on your mind ${currentUser.username}?`}
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  let addImage = windowWidth < 700 ? "Add Image" : "";
  let location = windowWidth < 700 ? "Location" : "";
  let tags = windowWidth < 700 ? "Tags" : "";

  const [titles, setTitles] = useState([addImage, location, tags])

  const upload = async () => { 
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
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async e => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    if (file || desc !== "") {
      mutation.mutate({ desc, img: imgUrl })
      addActivity({label: "Created a new post", moment: moment(), link: `/profile/${currentUser.id}`})
    }
    setDesc("");
    setFile(null);
    filePost = "";
    fill = "";
  };

  // Added
  const { isLoading: pLoading, data: profileData } = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
    return res.data;
  })
  )

  useLayoutEffect(() => {
    textarea_height()
  });

  function textarea_height() {
    var textarea = document.getElementById("textarea");
    if (fill === "") {textarea.style.height = "25px";}
    else {
      textarea.style.width = "40%"
      textarea.style.height = "auto";
      if (textarea.scrollHeight <= 44) {
        textarea.style.width = "92%"
        textarea.style.height = "25px";
      } else {
        textarea.style.width = "92%"
        textarea.style.height = "auto";
        var height;
        if (textarea.scrollHeight <= 176) {height = textarea.scrollHeight} 
        else { height = 176}
        textarea.style.height = height + "px";
      }
    }
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <Link
             to={`/profile/${currentUser.id}`}
             style={{ textDecoration: "none", color: "inherit" }}
            >
              {pLoading? <img src="" alt="" /> : <img src={"/upload/" + profileData.profilePic} alt="" />}
            </Link>
             <textarea 
              id="textarea" 
              ref={textareaRef} 
              placeholder={`What's on your mind ${currentUser.username}?`}
              onChange={(e)=>{
                textarea_height(); 
                fill=e.target.value
                setDesc(e.target.value)}}
              value={desc}
            ></textarea>
          </div>
          <div className="right" id="topRight">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
                filePost = e.target.files[0];
                textarea_height(); 
              }}
            />
            <label htmlFor="file">
              <div className="item">
                <BsFillImageFill className="item-icon" title={addImage}/>
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <MdLocationPin className="item-icon" title={location}/>
              <span className="location">Location</span>
            </div>
            <div className="item">
              <BsFillTagsFill className="item-icon" title={tags}/>
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;