import { useState, useEffect } from "react";

const NewBlogForm = (props) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault(setBlogTitle, setBlogAuthor, setBlogUrl);
    props.createBlog();
    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type={"text"}
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
            name="blogTitle"
          />
        </div>
        <div>
          author:
          <input
            type={"text"}
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
            name="blogAuthor"
          />
        </div>
        <div>
          url:
          <input
            type={"text"}
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
            name="blogUrl"
          />
        </div>
        <div>
          <button type={"submit"}>Create</button>
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;
