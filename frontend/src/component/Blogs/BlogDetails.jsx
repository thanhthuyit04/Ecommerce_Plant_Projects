import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../more/Metadata'
import Header from '../Home/Header'
import Footer from '../Home/Footer'
import "./BlogDetails.css"
import { clearErrors, getBlogDetails } from '../../actions/BlogActions';
import SideBar from './SideBar';

const BlogDetails = ({match}) => {
  const dispatch = useDispatch();

  const { blog, loading, error } = useSelector(
    (state) => state.blogDetails
  );

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getBlogDetails(match.params.id));
  }, [error]);

  return (
    <>
    <MetaData title={`${blog.title}`} />
      <Header />
      <div className="container" style={{display: 'flex'}}>
        <div className="containerBlogDetail">
        <div className="singlePost">
          <div className="singlePostWrapper">

            <h1 className="singlePostTitle">
              {blog.title}
            </h1>
            
            {blog.images &&
              blog.images.map((item, i) => (
                <img
                  className="singlePostImg"
                  key={i}
                  src={item.url}
                  alt={blog.title}
                />
            ))}

            <div className="singlePostInfo">
              <span className="singlePostAuthor">
                {blog.numOfCommentBlog} comment
              </span>
              <span className="singlePostDate">
                Date: {blog.createAt}
              </span>
            </div>
            
            <p className="singlePostDesc">{blog.content}</p>
          </div>
        </div>
        
          {/* Reviews */}
          <div className="reviews__heading">
            <h1 className='h1Comment'>Reviews</h1>
          </div>
          <div>
            <div style={{padding: "1vmax",}}>
                {/* {product.reviews && product.reviews[0] ? (
                  <div className="review__option">
                    {product.reviews &&
                      product.reviews.map((review) => (
                        <ReviewCard review={review} />
                      ))}
                  </div>
                ) : ( */}
              <p className="noReviews" style={{fontFamily: "Poppins,sans-serif",}}>
                No Reviews Yet *
              </p>
                {/* )} */}

              <div className='formCommentBox'>
                <span className='titleCommentBox'>
                  Add a Review
                </span>
                <textarea className='inputCommentBox' cols="30" rows="6" placeholder="Comment *"
                    // value={comment}
                    // onChange={(e) => setComment(e.target.value)}                  
                ></textarea>
                <button
                  type="submit"
                  style={{
                    width: "12vmax",
                    margin: "1vmax 0px",
                    fontFamily: "sans-serif",
                    padding: "10px 15px",
                    background: "#3BB77E",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                    // onClick={reviewSubmitHandler}
                >
                  Submit
                </button>
              </div>

            </div>
          </div>
          
        </div>
        <SideBar />
      </div>
      


      <Footer />
    </>
  )
}

export default BlogDetails