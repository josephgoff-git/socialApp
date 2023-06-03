import { useEffect, useState } from "react";
import "./settings.scss";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi';
import moment from "moment";

const Settings = ({settings, setSettings, addActivity}) => {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);

  const [bodyChanged, setBodyChanged] = useState(0);

  function handleClick(item) {
    if (item.type === "option") {
      if (settings[item.key]) {
        var newSettings = settings
        newSettings[item.key].clicked = !newSettings[item.key].clicked;
        setSettings(newSettings)
      }
      setBodyChanged(bodyChanged + 1)
    }

    if(item.label === "Push Notifications") {
      var action = item.clicked? 'Disabled' : 'Enabled';
      addActivity({label: action + " push notifications in settings", moment: moment(), link: "/settings"})
    }
    if(item.label === "Email Notifications") {
      var action = item.clicked? 'Disabled' : 'Enabled';
      addActivity({label: action + " email notifications in settings", moment: moment(), link: "/settings"})
    }
    if(item.label === "Share Location") {
      var action = item.clicked? 'Disabled' : 'Enabled';
      addActivity({label: action + " share location in settings", moment: moment(), link: "/settings"})
    }
    if(item.label === "Enable Shortcuts") {
      var action = item.clicked? 'Disabled' : 'Enabled';
      addActivity({label: action + " shortcuts in settings", moment: moment(), link: "/settings"})
    }
    if(item.label === "Allow Ads") {
      var action = item.clicked? 'Disabled' : 'Enabled';
      addActivity({label: action + " ads in settings", moment: moment(), link: "/settings"})
    }
    if(item.label === "Block Messages") {
      var action = item.clicked? 'Disabled' : 'Enabled';
      addActivity({label: action + " block messages in settings", moment: moment(), link: "/settings"})
    }
    if(item.label === "Restricted Mode") {
      var action = item.clicked? 'Disabled' : 'Enabled';
      addActivity({label: action + " restricted mode in settings", moment: moment(), link: "/settings"})
    }
  }

  function handleLanguage(event) {
    addActivity({label: "Set language to " + event.target.value + " in settings", moment: moment(), link: "/settings"})
  }

  function handleVisible(event) {
    addActivity({label: "Set posts visible to: " + event.target.value + " in settings", moment: moment(), link: "/settings"})
  }

  return (
    <div className="settings">
      <div className="title">
        Settings
      </div>
      
      <div className="container">
        {settings && settings.map((item) => (
          <div key={item.key} onClick={() => {handleClick(item)}} className="item">
            <div className="left">
                <div className="icon">
                  {item.icon}
                </div>
                <div className="label">
                  {item.label}
                </div>
              </div>
              <div className="right">
                {bodyChanged !== null? 
                <div>
                  {item.label === "Language" ? <div className="button">
                    <select name="language" onChange={(event)=>{handleLanguage(event)}}>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Italian</option>
                      <option>Chinese</option>
                    </select>
                    <FiChevronDown fontSize={20} style={{marginBottom: "-3px", marginLeft: "-27px", userSelect: "none", zIndex: 10, paddingRight: "5px"}}/>
                    </div>: <></>}
                  {item.label === "Posts Visible To" ? <div className="button">
                    <select name="posts" onChange={(event)=>{handleVisible(event)}}>
                      <option>Followers</option>
                      <option>Anyone</option>
                      <option>None</option>
                    </select>
                    <FiChevronDown fontSize={20} style={{marginBottom: "-3px", marginLeft: "-27px", userSelect: "none", zIndex: 10, paddingRight: "5px"}}/>
                    
                     </div>: <></>}
                  {item.type === "button" ? <FiChevronRight fontSize={20} style={{marginBottom: "-2px"}}/> : <></>}
                  {item.label === "Push Notifications" ? item.clicked? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Email Notifications" ? item.clicked? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Share Location" ? item.clicked? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Enable Shortcuts" ? item.clicked? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Allow Ads" ? item.clicked? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Block Messages" ? item.clicked? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Restricted Mode" ? item.clicked? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  </div> : <></>}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;