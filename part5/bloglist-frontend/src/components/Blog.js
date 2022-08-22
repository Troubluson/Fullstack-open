import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [detailsVisible, setDetailsVisible] = useState(false)
  const buttonText = detailsVisible ? 'hide' : 'view'

  const likeBlogHandler = () => {
    likeBlog(blog)
  }

  const deleteBlogHandler = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const showAndHideButton = () => {
    return (
      <button className="showAndHideButton" onClick={() => setDetailsVisible(!detailsVisible)}>
        {buttonText}
      </button>
    )
  }

  if (!detailsVisible) {
    return (
      <div style={blogStyle} className="blog">
        {blog.title} {blog.author} {showAndHideButton()}
      </div>
    )
  }
  return (
    <div style={blogStyle} className="blog">
      <p>
        {blog.title} {showAndHideButton()}
      </p>
      <p>
        {blog.url}
      </p>
      <p>
        likes: {blog.likes} <button className="likeButton" onClick={likeBlogHandler}>like</button>
      </p>
      <p>{blog.author}</p>
      <button onClick={deleteBlogHandler}>remove</button>
    </div>
  )
}

export default Blog
