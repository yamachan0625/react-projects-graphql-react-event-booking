import React from 'react';

import './BookingList.css';

const bookingList = (props) => {
  return (
    <ul className="booking__list">
      {props.bookings.map((booking) => {
        return (
          <li key={booking._id} className="bookings__item">
            <div className="booking__item-data">
              {booking.event.title} -{' '}
              {new Date(booking.createdAt).toLocaleDateString()}
            </div>
            <div className="bookings__item-actions">
              <button onClick={props.onDelete.bind(this, booking._id)}>
                Cancel
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default bookingList;
