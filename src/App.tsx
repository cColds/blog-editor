import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Nav";
import Blog from "./pages/Blog";

function App() {
  return (
    <>
      <Nav />

      <main className="flex h-full flex-col items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blogs/:blogId" element={<Blog />} />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
