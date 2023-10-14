import axios from "axios";

const checkAuth = async () => {
  let isLoggedIn = false;

  try {
    const token = localStorage.getItem("token");
    console.log(import.meta.env.VITE_API_URL);
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/login`, {
      headers: { authorization: `Bearer ${token}` },
    });
    isLoggedIn = res.data;
  } catch (e) {
    console.error("Error: ", e);
  }

  return isLoggedIn;
};

export default checkAuth;
