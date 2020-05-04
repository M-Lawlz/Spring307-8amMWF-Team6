import React, {Component} from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, NavLink, HashRouter } from 'react-router-dom'
import About from './About'
import Tours from './Tours'
import Home from './Home'


export default function App()  {
  return (
     <div className="App">
     <div>
        <NavBar />
      </div>



      
      <HashRouter>
      <div>
          <h2>Basic Routes</h2>
          <ul className="header">
            
            <li><NavLink to="/About">About</NavLink></li>
            <li><NavLink to="/Tours">Tours</NavLink></li>
          </ul>

          <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path = "/About" component = {About} />
              <Route path = "/Tours" component = {Tours} />
          </div>
        </div>
        </HashRouter>

      <h2>SimTrek: Travel Anywhere, Easily</h2>
        <h3> What is SimTrek? </h3>
          <p>SimTrek is a platform that will allow users to access virtual tours from the comfort of one’s home. 
          Users will have the ability to create a “vtravelr” account and connect with other users, potentially 
          being able to take virtual tours together. Furthermore, users will be able to rate tours in order to 
          enable user feedback. Virtual tours will contain a description of the city, pictures of the city, and 
          a virtual tour that is AR accessible. 
        </p>
 
        <h3> New Features Coming Soon </h3>
        <p>Profile page for each user
          Login (allows user virtual tour uploading, commenting, saving fav places, etc.)
        Message other users
        Forum - where tours are uploaded
        </p>
     
        
      </div>
  



  );
}