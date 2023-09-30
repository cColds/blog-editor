import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import checkAuth from "../utils/checkAuth";

type User = {
  username: string;
  email: string;
};

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    const cachedUser = localStorage.getItem("username") || "";
    const query = new URLSearchParams({ username: cachedUser });

    const res = await fetch("http://localhost:3000/api/user?" + query, {
      headers: { authorization: `Bearer ${token}` },
    });

    const userData = await res.json();
    return userData;
  };

  useEffect(() => {
    (async () => {
      const authStatus = await checkAuth();
      if (!authStatus) return;

      setIsLoggedIn(authStatus);
      setUser(await getUser());
    })();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Blog editor for admins to manage blogs.
      </h1>
      <h2 className="text-2xl mt-4">
        {isLoggedIn ? `Welcome, ${user?.username}!` : "You are not logged in"}
      </h2>
      {!isLoggedIn && <Link to="/login">Login</Link>}

      {isLoggedIn && <Link to="/blogs">View blogs</Link>}
    </div>
  );
}

export default Home;
