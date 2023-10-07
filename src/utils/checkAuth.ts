import axios from "axios";

const checkAuth = async () => {
  let isLoggedIn = false;

  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:3000/api/login", {
      headers: { authorization: `Bearer ${token}` },
    });
    isLoggedIn = res.data;
  } catch (e) {
    console.error("Error: ", e);
  }

  return isLoggedIn;
};

export default checkAuth;
