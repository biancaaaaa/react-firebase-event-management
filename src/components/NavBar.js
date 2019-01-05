import React, {Component} from 'react';
import fire from '../config';
import {Link} from 'react-router-dom';

class NavBar extends Component {
  signout = () => {
    fire.auth().signOut()
      .catch(err => console.log('sign out error'));
  };

  render() {
    return (
      <div className="nav-bar">
        <div>
          <Link to="/">Home</Link>
          <Link to="/create-event">Create Event</Link>
        </div>
        <button onClick={this.signout} className="dark-blue-btn">Sign out</button>
      </div>
    );
  }
}

export default NavBar;
