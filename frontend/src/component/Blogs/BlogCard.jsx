import * as React from 'react';
import { Link } from 'react-router-dom';
import "./BlogCard.css"

const BlogCard = ({ blog }) => {

  return (
    <>
    <Link className='Blog' to={`/blog/${blog._id}`}>
      <img
        className="blogImg"
        src={blog.images[0].url}
        alt={blog.title}
      />
      <div className="blogInfo">
        <span className="blogTitle">
          {blog.title}
        </span>
        <hr />
        <span className="blogDate">{blog.createAt}</span>
      </div>
      <p className="blogShort">
        {blog.short}
      </p>
      <p className='blogNumComment'>
        ({blog.numOfCommentBlog} comment)
      </p>

    </Link>
    </>
  );
}

export default BlogCard
