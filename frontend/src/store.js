import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer } from "./reducers/ProductReducer";
import { profileReducer, userReducer } from "./reducers/userReducer";
import { blogDetailsReducer, blogsReducer } from "./reducers/BlogReducers";
import { cartReducer } from "./reducers/CartReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  blogs: blogsReducer,
  blogDetails: blogDetailsReducer,
  cart: cartReducer,
})

let initialState = {
 
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;