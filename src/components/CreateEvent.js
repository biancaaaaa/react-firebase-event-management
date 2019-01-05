import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import fire from '../config';

class CreateEvent extends Component {
  state = {
    title: '',
    description: '',
    date: '',
    location: '',
    image: new Blob(),
    btnState: 'Create'
  };
  firestore = fire.firestore();
  storage = fire.storage();

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleFileChange = e => {
    this.setState({image: e.target.files.item(0)});
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.image);
    this.setState({btnState:'Loading...'});
    this.addToStorage()
      .then(url => this.addToDB(url))
      .catch(err => console.log(err));
  };

  addToStorage = () => {
    const randomId = new Date().getTime();
    const ref = this.storage.ref(`event-photos/${randomId}`);
    return ref.put(this.state.image)
      .then(snap => {
        return snap.ref.getDownloadURL();
      });
  };

  addToDB = image => {
    const {btnState, ...data} = this.state;
    console.log(btnState);
    this.firestore.collection('events').add({
      ...data,
      image,
      createdAt: new Date(),
      createdBy: this.props.user.uid
    })
      .then(() => {
        console.log('Added event');
        this.setState({btnState: 'Create'});
        this.props.history.replace('/');
      })
      .catch(err => console.log(err));
  };

  render() {
    const {title, location, date, description, btnState} = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <h2>Create Event</h2>
        <input name="title"
               type="text"
               placeholder="Title"
               value={title}
               onChange={this.handleChange}
               className="text-input"
               required
        />
        <input name="location"
               type="text"
               placeholder="Location"
               value={location}
               onChange={this.handleChange}
               className="text-input"
               required
        />
        <input name="date"
               type="date"
               placeholder="Date"
               value={date}
               onChange={this.handleChange}
               className="text-input"
               required
        />
        <textarea name="description"
                  placeholder="Description"
                  value={description}
                  onChange={this.handleChange}
                  className="text-input"
                  required
        />
        <input type="file"
               name="image"
               onChange={this.handleFileChange}
               required
        />
        <input type="submit"
               value={btnState}
               disabled={btnState === 'Loading...'}
               className={`dark-blue-btn${btnState === 'Loading...' ? ' disabled' : ''}`}
        />
        <Link to="/" className="dark-blue-btn">Cancel</Link>
      </form>
    )
  }
}

export default CreateEvent;