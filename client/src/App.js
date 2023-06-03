import "./app.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Activity from "./pages/activity/Activity";
import Events from "./pages/events/Events";
import Explore from "./pages/explore/Explore";
import Friends from "./pages/friends/Friends";
import Groups from "./pages/groups/Groups";
import Market from "./pages/market/Market";
import Messages from "./pages/messages/Messages";
import Saved from "./pages/saved/Saved";
import Settings from "./pages/settings/Settings";

import "./style.scss";
import { useContext, useState, useEffect} from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from 'react-query'
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { RxLockClosed } from 'react-icons/rx';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { BsPersonLinesFill } from 'react-icons/bs';
import { Si1Password } from 'react-icons/si';
import { IoTrashOutline } from 'react-icons/io5';

import { useActivitiesStore } from "./activitiesStore";

function App() {
  const {currentUser} = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient()

  const [mainBody, setMainBody] = useState([
     {icon: <RxLockClosed fontSize={20}/>,  label: "Private Account", type: "option", clicked: false},
      {icon: <HiOutlineStatusOnline fontSize={24}/>,  label: "Show Online Status", type: "option", clicked: false},
      {icon: <ShareOutlinedIcon/>,  label: "Allow Sharing", type: "option", clicked: false},
      {icon: <BsPersonLinesFill fontSize={20}/>,  label: "Edit Profile", type: "click"},
      {icon: <Si1Password fontSize={20}/>,  label: "Change Password", type: "click"},
      {icon: <IoTrashOutline fontSize={20}/>, label: "Delete Account", type: "option"}
    ])

  const [settings, setSettings]  = useState([
    {key: 0, label: "Language", key: "English", type: "dropdown", clicked: "false"},
    {key: 1, label: "Posts Visible To", key: "Friends", type: "dropdown", clicked: "false"},
    {key: 2, label: "Payments", key: "Add Card", type: "button", clicked: "false"},
    {key: 3, label: "Content Preferences", type: "button", clicked: "false"},
    {key: 4, label: "Privacy Settings", type: "button", clicked: "false"},
    {key: 5, label: "Push Notifications", type: "option", clicked: "false"},
    {key: 6, label: "Email Notifications", type: "option", clicked: "false"},
    {key: 7, label: "Share Location", type: "option", clicked: "false"},
    {key: 8, label: "Enable Shortcuts", type: "option", clicked: "false"},
    {key: 9, label: "Allow Ads", type: "option", clicked: "false"},
    {key: 10, label: "Block Messages", type: "option", clicked: "false"},
    {key: 11, label: "Restricted Mode", type: "option", clicked: "false"},
  ])

  const [saved, setSaved] = useState([
    {key: 1, label: "All Saved",
     img3: "https://images.unsplash.com/photo-1567131349667-933eb56baec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGZhcm1lcnMlMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
     img2: "https://images.unsplash.com/photo-1604226397821-a620f9b9348c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGhpa2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
     img4: "https://images.unsplash.com/photo-1594058573823-d8edf1ad3380?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60", 
     img1: "https://plus.unsplash.com/premium_photo-1682681906293-2113d2e6cc82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFydHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"},
    {key: 2, label: "Favorites", 
    img1: "https://images.unsplash.com/photo-1529424601215-d2a3daf193ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU0fHxmcmllbmRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60", 
    img2: "https://images.unsplash.com/photo-1597067135728-8c16ae71ff71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGdvbGRlbiUyMHJldHJlaXZlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
    img3: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxwYXJ0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60", 
    img4: "https://images.unsplash.com/photo-1619538036719-af01c2eb1f41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY3fHxmcmllbmRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
    {key: 3, label: "Friends", 
    img1: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZW5kc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60", 
    img2: "https://images.unsplash.com/photo-1600265360004-c16515250359?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGZyaWVuZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60", 
    img3: "https://images.unsplash.com/photo-1602742398695-745b5864dada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHBvc2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60", 
    img4: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHBhcnR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
    {key: 4, label: "Tagged", 
    img3: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHBhcnR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60", 
    img2: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGZyaWVuZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60", 
    img1: "https://images.unsplash.com/photo-1563433792993-4721561154b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fGZyaWVuZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60", 
    img4: "https://images.unsplash.com/photo-1484373030460-8de45ac8796d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwcmlkZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"},
    {key: 5, label: "Discovered", 
    img1: "https://images.unsplash.com/photo-1574737685024-7b53d9828481?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGV1cm9wZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60", 
    img2: "https://images.unsplash.com/photo-1520024146169-3240400354ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9zZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60", 
    img3: "https://images.unsplash.com/photo-1434648957308-5e6a859697e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c29jY2VyJTIwbWF0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60", 
    img4: "https://images.unsplash.com/photo-1616098851253-01a1e1570101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGhpa2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"},
  ])

  const [groups, setGroups] = useState([
    {key: 1, label: "Work Friends", members: 8, img: "https://images.unsplash.com/photo-1633113092754-523fd2d9a90c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHx3b3JrJTIwZnJpZW5kc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"},
    {key: 2, label: "Music Group", members: 5, img: "https://images.unsplash.com/photo-1592448741782-82dbeca860aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjEzfHxndWl0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"},
    {key: 3, label: "Online Class", members: 18, img: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b25saW5lJTIwY2xhc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"},
    {key: 4, label: "Morning Workout", members: 13, img: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya291dCUyMGdyb3VwfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
  ])


  const setActivities = useActivitiesStore((state) => state.setActivities);
  var activities = []
  const storedArray = localStorage.getItem("Latest Activity");
  if (storedArray) {activities = JSON.parse(storedArray);}

  function addActivity(object) {
    activities.push(object);
    setActivities(activities);
    localStorage.setItem("Latest Activity", JSON.stringify(activities));
  } 


  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient} className="body">
        <div className={`theme-${darkMode ? "dark" : "light"}`} id="body">
          <Navbar mainBody={mainBody} setMainBody={setMainBody} addActivity={addActivity}/>
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar addActivity={addActivity}/>
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home addActivity={addActivity}/>,
        },
        {
          path: "/profile/:id",
          element: <Profile addActivity={addActivity}/>,
        },
        {
          path: "/activity",
          element: <Activity />,
        },
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/explore",
          element: <Explore addActivity={addActivity}/>,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
        {
          path: "/groups",
          element: <Groups groups={groups} setGroups={setGroups} addActivity={addActivity}/>,
        },
        {
          path: "/market",
          element: <Market />,
        },
        {
          path: "/messages",
          element: <Messages addActivity={addActivity}/>,
        },
        {
          path: "/saved",
          element: <Saved saved={saved} setSaved={setSaved} addActivity={addActivity}/>,
        },
        {
          path: "/settings",
          element: <Settings settings={settings} setSettings={setSettings} addActivity={addActivity}/>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login addActivity={addActivity}/>,
    },
    {
      path: "/register",
      element: <Register addActivity={addActivity}/>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
