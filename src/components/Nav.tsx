import { Link, useNavigate } from "react-router-dom";
import checkAuth from "../utils/checkAuth";
import { useEffect, useState } from "react";

function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoggedIn(await checkAuth());
    })();
  }, [navigate]);

  return (
    <nav className="mb-6">
      <ul className="flex gap-3 text-lg">
        <li className="mr-auto">
          <Link to="/">Home</Link>
        </li>
        {loggedIn ? (
          <>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/create-blog">Create Blog</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
