import React, {Component} from 'react';
import fire from '../config';
import {ListCard} from "./ListCard";

class EventList extends Component {
  state = {
    events: []
  };
  firestore = fire.firestore();

  componentDidMount() {
    this.setEventListener();
  }

  setEventListener() {
    this.unsubscribe = this.firestore.collection("events").onSnapshot(snapshot => {
      const events = snapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }));
      this.setState({events});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <ul className="list-card-container">
        {
          this.state.events.map(event =>
            <ListCard key={event.id} {...event}/>
          )
        }
      </ul>
    );
  }
}

export default EventList;