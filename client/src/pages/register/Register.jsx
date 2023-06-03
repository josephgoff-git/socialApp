import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import moment from "moment";

const Register = ({addActivity}) => {
  
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    profilePic: "",
    coverPic: "",
    city: "",
    website: ""
    // ids: []
  });
  
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  };

  const { login } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    if (inputs.username !== "" && inputs.name !== "" && inputs.email !== "" && inputs.password !== "") {
      try {
        await axios.post("http://localhost:8800/api/auth/register", inputs);
        try {
          // await login(inputs);
          addActivity({label: "Successfully registered", moment: moment(), link: "/activity"})
          navigate("/")
        } catch (err) {
          setErr("Error");
        }
      } catch (err) {
        setErr("Error");
      }
    } else {
      setErr("All inputs are required!");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Welcome</h1>
          <span>Already have account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="First Name" name="username" onChange={handleChange}/>
            <input type="text" placeholder="Last Name" name="name" onChange={handleChange}/>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <div style={{color: "#666", fontSize: "14px"}}>{err && err}</div>
            <button onClick={handleClick}>Register</button>
          </form>

          <Link to="/login" style={{textDecoration: "none"}}>
              <p>Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
