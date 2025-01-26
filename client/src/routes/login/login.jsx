import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";

import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      if (res && res.data) {
        updateUser(res.data); // Update user context with the response data
        navigate("/");
      } else {
        throw new Error("Unexpected response structure");
      }

      // updateUser(res.data)

      // navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="login">
      
      <div className="formContainer">

        <form onSubmit={handleSubmit}>
          <h1>Welcome back!</h1>

          <input
            name="username"
            type="text"
            required
            minLength={3}
            placeholder="Username" />

          <input
            name="password"
            type="password"
            required
            placeholder="Password" />

          <button disabled={isLoading}>Login</button>

          {error && <span>{error}</span>}

          <Link to="/register">{"Don't"} have an account?</Link>
        </form>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt=""/>
      </div>
    </div>
  );
}

export default Login;
