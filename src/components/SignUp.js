import React, {Component} from 'react';
import fire from '../config';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
    btnState: 'Sign Up'
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({btnState: 'Loading...'});
    const {email, password, password2} = this.state;
    if (password === password2) {
      fire.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User created!');
          this.setState({btnState: 'Sign Up'});
        })
        .catch(err => console.log(err));
    } else {
      console.log('passwords don\'t match');
    }
  };

  render() {
    const {email, password, password2, btnState} = this.state;
    return (
      <form onSubmit={this.handleSubmit} className='form'>
        <h2>Sign Up</h2>
        <input name='email'
               type='text'
               placeholder='eMail'
               value={email}
               onChange={this.handleChange}
               className='text-input'
        />
        <input name='password'
               type='password'
               placeholder='Password'
               value={password}
               onChange={this.handleChange}
               className='text-input'
        />
        <input name='password2'
               type='password'
               placeholder='Repeat password'
               value={password2}
               onChange={this.handleChange}
               className='text-input'
        />
        <input type='submit' value={btnState} className='dark-blue-btn'/>
      </form>
    );
  }
}

export default SignUp;