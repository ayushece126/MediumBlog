import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Blogs from "./pages/Blogs"
import Blog from "./pages/Blog"
import BlogCard from "./reusableComponents/BlogCard"
import AppBar from "./reusableComponents/AppBar"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route
          path="/blog/:id"
          element={<Blog />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
