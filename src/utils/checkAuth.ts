const checkAuth = async () => {
  let isLoggedIn = false;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/login", {
      headers: { authorization: `Bearer ${token}` },
    });
    isLoggedIn = await res.json();
  } catch (e) {
    console.error("Error: ", e);
  }

  return isLoggedIn;
};

export default checkAuth;
