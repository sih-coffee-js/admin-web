import React from 'react';

const RecordDetails = ({ records }) => {
  return (
    <div>
      <h3>Record Details</h3>
      <ul>
        {records.map((record) => (
          <li key={record._id}>
            <p>
              <strong>User:</strong> {record.user.fullName} ({record.user.email})<br />
              <strong>Location:</strong> {record.location.name} <br />
              <strong>Type:</strong> {record.type} <br />
              <strong>Time:</strong> {new Date(record.time).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordDetails;
