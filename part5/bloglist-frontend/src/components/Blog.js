import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [detailsVisible, setDetailsVisible] = useState(false);
  const buttonText = detailsVisible ? "hide" : "view";

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(updatedBlog);
  };

  const deleteBlogHandler = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      deleteBlog(blog.id);
    }
  };

  const showHideButton = () => {
    return (
      <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {buttonText}
      </button>
    );
  };

  if (!detailsVisible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} {showHideButton()}
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {showHideButton()}
      </p>
      <p>
        {blog.url}
      </p>
      <p>
        likes: {blog.likes} <button onClick={likeBlog}>like</button>
      </p>
      <p>{blog.author}</p>
      <button onClick={deleteBlogHandler}>remove</button>
    </div>
  );
};

export default Blog;
