import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import checkAuth from "../utils/checkAuth";

type User = {
  username: string;
  email: string;
};

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("username") || "";
    const query = new URLSearchParams({ username: storedUser });

    const res = await axios.get("http://localhost:3000/api/user?" + query, {
      headers: { authorization: `Bearer ${token}` },
    });

    const userData = await res.data;
    return userData;
  };

  useEffect(() => {
    (async () => {
      const authStatus = await checkAuth();
      if (!authStatus) return;

      setLoggedIn(authStatus);
      setUser(await getUser());
    })();
  }, [loggedIn]);

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Blog editor for admins to manage blogs.
      </h1>
      <h2 className="mt-4 text-2xl">
        {loggedIn && user
          ? `Welcome, ${user.username || "cold"}!`
          : "You are not logged in"}
      </h2>

      {loggedIn && <Link to="/blogs">View blogs</Link>}
    </div>
  );
}

export default Home;
