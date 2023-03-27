import React from 'react';
import './App.css';
import Home from './component/Home/Home';
import WebFont from "webfontloader";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from './component/Products/ProductDetails';
import BlogDetails from './component/Blogs/BlogDetails';
import LoginSignup from './component/Authentication/LoginSignup';
import { useSelector } from 'react-redux';
import UserData from './more/UserData';
import store from './store';
import { loadUser } from './actions/userActions';
import ProtectedRoute from './route/ProtectedRoute';
import Profile from './component/user/Profile';
import UpdatePassword from './component/user/UpdatePassword';
import EditProfile from './component/user/EditProfile';
import About from './component/About/About';
import Products from './component/Products/Products';
import Search from './component/Products/Search';
import Blogs from './component/Blogs/Blogs';
import Support from './more/Support';

function App() {

  const {isAuthenticated,user} = useSelector((state) =>state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

  }, []);

  return (
    // <div className="App">
    //   <Header />
    //   <Home />
    // </div>

    <Router>

      {isAuthenticated && <UserData user={user} />}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Products" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/Blogs" component={Blogs} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/blog/:id" component={BlogDetails} />
        <Route exact path="/login" component={LoginSignup} />
        <Route exact path="/support" component={Support} />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} /> 
        <ProtectedRoute exact path="/me/update/info" component={EditProfile} />
      </Switch>
    </Router>

  );
}

export default App;
