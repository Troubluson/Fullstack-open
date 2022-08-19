import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
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
  console.log('rendered ' + blog.title)
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
        {blog.url} {blog.id}
      </p>
      <p>
        likes: {blog.likes} <button onClick={likeBlog}>like</button>
      </p>
      <p>{blog.author}</p>
    </div>
  );
};

export default Blog;
