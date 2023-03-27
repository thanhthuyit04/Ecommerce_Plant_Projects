import React, { useEffect, useState } from 'react';
import "./Blogs.css";
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import BlogCard from "./BlogCard";
import SideBar from './SideBar';
import Carousel from "react-material-ui-carousel";
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import background1 from "../../Assets/background1.jpg";
import background2 from "../../Assets/background2.jpg";
import { clearErrors, getBlog } from '../../actions/BlogActions';
import Loading from "../../more/Loader";
import MetaData from '../../more/Metadata';

const Blogs = ({ match }) => {
  const dispatch = useDispatch();
  
  const [currentPage, setCurrentPage] = useState(1);

  const {
    blogs,
    loading,
    error,
    blogsCount,
    resultPerPage,
  } = useSelector((state) => state.blogs);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if(error){
        alert(error);
        dispatch(clearErrors())
    }
    dispatch(getBlog(keyword, currentPage));
  }, [dispatch, keyword, currentPage, alert, error]); 

  return (
    <>
    {loading ? ( <Loading />
    ) : (
      <>
      <MetaData title="Blogs" />
      <Header />
      <div>
      <div className="banner">
        <Carousel>
            <img src={background1} className="bgImg"/>
            <img src={background2} className="bgImg"/>
        </Carousel>
      </div>

      <div>
        {blogs.length === 0 ? 
        ""
        :
        <h2 className='h2Blog'>Featured Blogs</h2>
        }

        <div className="mainBlog" style={{display: "flex"}}>
          {blogs.length === 0 ?
          <span className='conTextW'>No Blog Found ....</span>
          : 
            <div className="container" style={{display:"flex", width: "72%"}}>
              {blogs &&
              blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          }
    
            <SideBar />
        </div>

        <div
          className="pagination__box">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={blogsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="First"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
        </div>
         
      </div>
      </div>
      <Footer />
      </>
    )}
    </>
  );
};

export default Blogs;

