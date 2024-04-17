import AppBar from "@/reusableComponents/AppBar";
import BlogCard from "@/reusableComponents/BlogCard";
import axios from "axios";
import { useState, useEffect } from "react";

interface Blog {
  content: string;
  createdAt: string;
  title: string;
  id: string;
  author: {
    name: string | null;
  };
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loader, setloader] = useState(false);
  async function fetchBlogs() {
    try {
      setloader(true);
      const response = await axios.get(
        "https://backend.mayush9652.workers.dev/api/v1/blog/bulk",
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setBlogs(response.data);
      setloader(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // Optionally, you can set an error state or display an error message to the user
      setloader(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <AppBar />
      {loader && (
        <div className="flex flex-col justify-center h-screen">
          <div className="flex justify-center">`...loading`</div>
        </div>
      )}

      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "anonymous"}
              publishedDate={blog.createdAt}
              Title={blog.title}
              Description={blog.content}
            />
          </div>
        );
      })}
    </>
  );
};

export default Blogs;
