import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import fire from '../config';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    btnState: 'Sign In'
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    this.setState({btnState: 'Loading...'});
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("Success!");
        this.setState({btnState: 'Sign In'})
      })
      .catch(err => console.log(err));
  };

  render() {
    const {email, password, btnState} = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <h2>Sign In</h2>
        <input name="email"
               type="text"
               placeholder="eMail"
               value={email}
               onChange={this.handleChange}
               className="text-input"
        />
        <input name="password"
               type="password"
               placeholder="Password"
               value={password}
               onChange={this.handleChange}
               className="text-input"
        />
        <input type="submit" value={btnState} className="dark-blue-btn"/>
        <Link to="/sign-up">Sign up here...</Link>
      </form>
    );
  }
}

export default SignIn;