import React, {Component} from 'react';
import fire from '../config';
import {Loading} from "./Loading";

class Event extends Component {
  state = {
    id: this.props.match.params.id,
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    createdAt: '',
    createdBy: '',
    dataLoaded: false
  };
  firestore = fire.firestore();

  componentDidMount() {
    this.setListener();
  }

  setListener() {
    this.unsubscribe = this.firestore
      .collection("events")
      .doc(this.state.id)
      .onSnapshot(snapshot => {
        this.setState({...snapshot.data(), dataLoaded: true});
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {title, description, date, location, image, dataLoaded} = this.state;
    return (
      dataLoaded ?
        <div className="info-container">
          <div className="header-image"
               style={{backgroundImage: `url(${image})`}}
          >
            <h1 className="title">{title}</h1>
          </div>
          <div className="content">
            <p>{description}</p>
            <p className="small-grey-text">At {date} in {location}</p>
          </div>
        </div> :
        <Loading/>
    )
  }
}

export default Event;