import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { TbClockHour4 } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa';
import Dropdown from "../dropdown/Dropdown";
import { clickedOutside } from "../dropdown/Dropdown.jsx";
import { FiSend } from 'react-icons/fi';
import { GoThreeBars } from 'react-icons/go'
import moment from "moment";

import { useLeftStore } from "../../activitiesStore";

export var fill = "";
export var searchResultsFill = [];
export var rendered = false;
export function reRendered(value) {rendered = value};
var wasBelow600 = false;

const Navbar = ({mainBody, setMainBody, addActivity}) => {
  
  useEffect(() => {
    if (rendered) {
      fill = "";
      searchResultsFill = [];
      reRendered(false)
    } else {
      if (fill !== "") {
        setDesc(fill)
        setResults(searchResultsFill);
      }
    }
  }, []); 

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
    return res.data;
  })
)

  const button1 = document.getElementById("button1")
  const button2 = document.getElementById("button2")
  const button3 = document.getElementById("button3")
  const button4 = document.getElementById("button4")
  const button5 = document.getElementById("button5")
  const button6 = document.getElementById("button6")
  const input1 = document.getElementById("input1")
  const input1_input = document.getElementById("input1-input")
  const hamburger = document.getElementById("hamburger")

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth < 600) {wasBelow600 = true};
      if (windowWidth > 600 && wasBelow600) { 
        setSearchOpen(false); 
        fill = "";
        setDesc(fill)
        searchResultsFill = [];
        setResults(searchResultsFill);
        wasBelow600 = false;
      }
      if (windowWidth < 420) {
        setSearchOpen(false); 
        fill = "";
        setDesc(fill)
        searchResultsFill = [];
        setResults(searchResultsFill);
      }
      setButtons([button1, button2, button3, button4, button5, button6, input1, hamburger]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const [buttons, setButtons] = useState([button1, button2, button3, button4, button5, button6, input1, hamburger]);
  const [searchOpen, setSearchOpen] = useState(false);

  if (windowWidth <= 600) {
    if (button1 !== null) {button1.style.opacity = 1};
    if (button2 !== null) {searchOpen ? button2.style.opacity = 0 : button2.style.opacity = 1};
    if (button3 !== null) {searchOpen ? button3.style.opacity = 0 : button3.style.opacity = 1};
    if (button4 !== null) {searchOpen ? button4.style.opacity = 0 : button4.style.opacity = 1};
    if (button5 !== null) {searchOpen ? button5.style.opacity = 0 : button5.style.opacity = 1};
    if (button6 !== null) {searchOpen ? button6.style.opacity = 0 : button6.style.opacity = 1};
    if (input1 !== null) {searchOpen ? input1.style.opacity = 1 : input1.style.opacity = 0};

    if (button1 !== null) {button1.style.pointerEvents = "all"};
    if (button2 !== null) {searchOpen ? button2.style.pointerEvents = "none" : button2.style.pointerEvents = "all" };
    if (button3 !== null) {searchOpen ? button3.style.pointerEvents = "none" : button3.style.pointerEvents = "all" };
    if (button4 !== null) {searchOpen ? button4.style.pointerEvents = "none" : button4.style.pointerEvents = "all" };
    if (button5 !== null) {searchOpen ? button5.style.pointerEvents = "none" : button5.style.pointerEvents = "all" };
    if (button6 !== null) {searchOpen ? button6.style.pointerEvents = "none" : button6.style.pointerEvents = "all" };
    if (input1 !== null) {searchOpen ? input1.style.pointerEvents = "all" : input1.style.pointerEvents = "none"};
    if (hamburger !== null) { hamburger.style.display = "block"};
  }

  if (windowWidth > 600) {
    if (button1 !== null) {button1.style.opacity = 0; button1.style.pointerEvents = "none" };
    if (button2 !== null) {button2.style.opacity = 0; button2.style.pointerEvents = "none"};
    if (button3 !== null) {button3.style.opacity = 0; button3.style.pointerEvents = "none"};
    if (button4 !== null) {button4.style.opacity = 1; button4.style.pointerEvents = "all"};
    if (button5 !== null) {button5.style.opacity = 1; button5.style.pointerEvents = "all"};
    if (button6 !== null) {button6.style.opacity = 1; button6.style.pointerEvents = "all"};
    if (input1 !== null) {input1.style.opacity = 0; input1.style.pointerEvents = "none"};
    if (hamburger !== null) { hamburger.style.display = "none"};
  }

  if (windowWidth <= 420) {
    if (button1 !== null) {button1.style.display = "none"};
    if (button2 !== null) {button2.style.display = "none"};
    if (button3 !== null) {button3.style.display = "none"};
    if (input1 !== null) {input1.style.display = "none"}
  }

  if (windowWidth > 420) {
    if (button1 !== null) {button1.style.display = "block"};
    if (button2 !== null) {button2.style.display = "block"};
    if (button3 !== null) {button3.style.display = "block"};
    if (input1 !== null) {input1.style.display = "block"}
  }


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [source, setSource] = useState(0)

  useEffect(() => {
    window.onclick = (event) => {
      if (event.target.id === "button4") {
        setSource(1);
        setDropdownOpen(true);
      } else if (event.target.id === "button5") {
        setSource(2);
        setDropdownOpen(true);
      } else if (event.target.id === "button6") {
        setSource(3);
        setDropdownOpen(true);
      } else {
        if (clickedOutside) {setDropdownOpen(false)}
      }
      
    }
  }, [])  

  var left = useLeftStore((state) => state.left);
  const setLeft = useLeftStore((state) => state.setLeft);

  function handleClick2() {
    if (left) {setLeft(false)}
    else {setLeft(true)}
  }

  // Search Bar
  const [users, setUsers] = useState([]);
  useQuery(["users"], () =>
  makeRequest.get("/users/get").then((res) => {
    setUsers(res.data);
    return res.data;
  })
);

  function handleInputChange(event) {
    var searchResults = []
    if (event.target.value === "") {searchResults = []}
    else {
      const users2 = users.sort((a, b) => {
        const firstNameComparison = a.username.localeCompare(b.username);
        if (firstNameComparison !== 0) {
          return firstNameComparison;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
      for (let i=0;i<users2.length;i++) {
        var text = users2[i].username + " " + users2[i].name
        const regex = new RegExp(event.target.value.trim(), 'gi');
        const matches = text.match(regex);
        if (matches !== null && users2[i].id !== currentUser.id) {searchResults.push(users2[i])}
      }
    }
    searchResultsFill = searchResults;
    setResults(searchResults);
    setDesc(event.target.value)
  };

  const [desc, setDesc] = useState("")
  const [results, setResults] = useState([]);

  function handleInputClick() {
    setDesc("");
    setResults([]);
    fill = "";
    searchResultsFill = [];
  };

  return (
    <div className="navbar" id="nav">
      <div id="input1" className="input">
        <div className="top">
          <input 
            id="input1-input"
            type="text" 
            placeholder="Search..." 
            onChange={(event)=> {
              handleInputChange(event)
              fill = event.target.value
            }}
            value={desc}/>
        </div>
        <ul>
          {results.map((result) => (
            <li key={result.id}  onClick={() => {handleInputClick()}}>
              <Link
                className="link"
                to={`/profile/${result.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={"/upload/" + result.profilePic} alt="" />
                <p>{result.username} {result.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown">
        {dropdownOpen? <Dropdown page={source} user={data} isLoading={isLoading} mainBody={mainBody} setMainBody={setMainBody} addActivity={addActivity}/> : <></>}
      </div>

      <div className="nav">

        <div className="left">
          <GoThreeBars onClick={()=>{handleClick2()}} fontSize={25} id="hamburger" style={{display: "block", marginRight: "15px"}}/>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>canarysocial</span>
          </Link>
        </div>

        <div className="center">
          <div className="search">
            <div className="top">
              <SearchOutlinedIcon/>
              <input 
                type="text" 
                placeholder="Search..." 
                onChange={(event)=> {
                  handleInputChange(event)
                  fill = event.target.value
                }}
                value={desc}/>
            </div>
            <ul>
              {results.map((result) => (
                <li key={result.id}  onClick={() => {handleInputClick()}}>
                  <Link
                    className="link"
                    to={`/profile/${result.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img src={"/upload/" + result.profilePic} alt="" />
                    <p>{result.username} {result.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="appearance" title="Appearance">
            {darkMode ? (
              <WbSunnyOutlinedIcon onClick={()=>{toggle(); addActivity({label: "Changed theme to Light Mode", moment: moment(), link: "/activity"});}}/>
            ) : (
              <DarkModeOutlinedIcon onClick={()=>{toggle(); addActivity({label: "Changed theme to Dark Mode", moment: moment(), link: "/activity"});}}/>
            )}
          </div>
        </div>

        <div className="right">
          <div>
            <SearchOutlinedIcon id="button1" size={23} title="Search" className="small-screen" onClick={()=>{
              if (!searchOpen) {
                input1_input.focus()
                fill = "";
                setDesc(fill)
                searchResultsFill = [];
                setResults(searchResultsFill);
              }
              setSearchOpen(!searchOpen); 
              setButtons([button1, button2, button3, button4, button5, button6, input1]); 
          }}/></div>
          <div>{darkMode ? (
              <WbSunnyOutlinedIcon id="button2" onClick={()=>{
                toggle(); addActivity({label: "Changed theme to Light Mode", moment: moment(), link: "/activity"});
              }} title="Appearance" className="small-screen"/>
            ) : (
              <DarkModeOutlinedIcon id="button3" onClick={()=>{
                toggle(); addActivity({label: "Changed theme to Dark Mode", moment: moment(), link: "/activity"});
              }} title="Appearance" className="small-screen"/>
            )}</div>
          <div><FaRegUser size={18} title="Account" id="button4"/></div>
          <div><FiSend size={20} title="Messages" id="button5"/></div>
          <div><TbClockHour4 size={25} title="Notifications" id="button6"/></div>
          <Link
              to={`/profile/${currentUser.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
            <div className="user">
              {isLoading? <img src="" alt="" /> : <img src={"/upload/" + data.profilePic} alt="" />}
              <span>{currentUser.username}</span>
            </div>       
          </Link> 
        </div>
      </div>
    </div>
  );
};

export default Navbar;
