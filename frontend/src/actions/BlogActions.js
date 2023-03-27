import axios from "axios";
import {
  ALL_BLOG_FAIL,
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constans/BlogConstans";

export const getBlog = (keyword = "", currentPage = 1) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_BLOG_REQUEST,
    });

    let link = `/api/v2/blogs?keyword=${keyword}&page=${currentPage}`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Blogs Details
export const getBlogDetails= (id) => async (dispatch)=>{
  try {
      dispatch({ type: BLOG_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/v2/blog/${id}`);

      dispatch({
        type: BLOG_DETAILS_SUCCESS,
        payload: data.blog,
      });
    } catch (error) {
      dispatch({
        type: BLOG_DETAILS_FAIL,
        payload: error.response.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
