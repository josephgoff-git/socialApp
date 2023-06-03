import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import moment from "moment";

const Login = ({addActivity}) => {
  localStorage.clear()
  
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      addActivity({label: "Logged in", moment: moment(), link: "/activity"})
      navigate("/")
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome</h1>
          <p>
            
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Email"
              name="email"
              autoComplete="off"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="new-password"
              onChange={handleChange}
            />
            <div style={{color: "#666", fontSize: "14px"}}>{err && err}</div>
            <button onClick={handleLogin}>Login</button>
          </form>

          <Link to="/register" style={{textDecoration: "none"}}>
              <p>Create Account</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;