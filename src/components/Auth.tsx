import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkAuth from "../utils/checkAuth";

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

    const formData = { username, password };
    const data = new URLSearchParams(formData);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Username or password is invalid");

      const { token } = await res.json();
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      setUsername("");
      setPassword("");
      setErrorMessage("");
      navigate("/");
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 mt-5 items-start"
      >
        <label
          className="flex flex-col text-left gap-1.5"
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
          className="flex flex-col text-left gap-1.5"
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
