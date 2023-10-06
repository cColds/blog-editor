import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import NewBlog from "./components/NewBlog";

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
    </div>
  );
}

export default App;
