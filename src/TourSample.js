import React from 'react'

const TourSample = () => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>TourName data</td>
         <td>Location data</td>
        <td>Description data</td>
        <td>Embed Url</td>
        <td>
          <button className="button muted-button">Add Tour</button>
          <button className="button muted-button">Edit</button>
          <button className="button muted-button">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
)

export default TourSample