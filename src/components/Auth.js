

import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext);

  const handleUsername = (event) => {
    setUsername(event.target.value)
  };

  const handlePassword = (event) => {
    setPassword(event.target.value)
  };

  const handleClick = (event) => {
    setRegister(!register)
  };

  const submitHandler = async(e) => {
    e.preventDefault();

    let response;

    const body = {
      username,
      password
    };

    // const url = "https://socialmtn.devmountain.com";

    try {
      if(register) {
        response = await axios.post('/register', body)
      } else {
        response = await axios.post ('/login', body)
      }
    } catch (error) {
      console.log(error);
      setUsername("");
      setPassword("");
    }

    console.log("response auth FE", response);
    authCtx.login(response.data.token, response.data.exp, response.data.userId)
    
  };
  
      // axios
      //   .post(register ? `/register` : `/login`, body)
      //   .then((res) => {
      //     console.log(res.data);
      //     authCtx.login(res.data.token, res.data.exp, res.data.userId);
      //   })
      //   .catch((err) => {
      //     setUsername("");
      //     setPassword("");
      //   });
  
      // console.log("submitHandler called");

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          value={username}
          placeholder="Username"
          type="text"
          className="form-input"
          onChange={handleUsername}
        />
        <input
          value={password}
          placeholder="Password"
          type="text"
          className="form-input"
          onChange={handlePassword}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={handleClick}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
