import React from 'react';
import {Link} from 'react-router-dom';

export const ListCard = ({title, date, location, image, id}) => (
  <li className="li-card">
    <div className="li-picture" style={{backgroundImage: `url(${image})`}}/>
    <div>
      <h3>{title}</h3>
      <p><b>Date:</b> {date}</p>
      <p><b>Location:</b> {location}</p>
      <Link to={`/event/${id}`}>Link to Event</Link>
    </div>
  </li>
);
