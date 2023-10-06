import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import NewBlog from "./components/NewBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/new-blog" element={<NewBlog />} />
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
    </div>
  );
}

export default App;

// TODO:
/*
- Add nav component
- Add loading spinner when fetching all blogs
- Add delete comment
- Replace body text with a rich text editor like TinyMCE or TipTap
- Modularize code into different folders

*/
