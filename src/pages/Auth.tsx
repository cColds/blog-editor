import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkAuth from "../utils/checkAuth";
import axios from "axios";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const isLoggedIn = await checkAuth();

      if (isLoggedIn) {
        navigate("/");
      }
    })();
  }, [navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      const { token } = await res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      setUsername("");
      setPassword("");
      setErrorMessage("");
      navigate("/");
    } catch (e) {
      console.error(e);
      setErrorMessage("Username or password is invalid");
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-5 flex flex-col items-start gap-3 p-4"
      >
        <label
          className="flex flex-col gap-1.5 text-left"
          htmlFor="username-field"
        >
          Username
          <input
            type="text"
            id="username-field"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label
          className="flex flex-col gap-1.5 text-left"
          htmlFor="password-field"
        >
          Password
          <input
            type="password"
            id="password-field"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p className="text-red-400">{errorMessage}</p>

        <button>Login</button>
      </form>
    </div>
  );
}

export default Auth;
