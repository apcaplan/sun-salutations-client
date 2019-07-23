import React from 'react'
import { Link } from 'react-router-dom'

const RecordForm = ({ record, handleChange, handleSubmit, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Date</label>
    <input
      placeholder="Enter date"
      value={record.date}
      name="date"
      onChange={handleChange}
    />

    <label>Rounds completed</label>
    <input
      placeholder="Number of rounds"
      value={record.rounds_completed}
      name="rounds_completed"
      onChange={handleChange}
    />
    <label>Rounds set</label>
    <input
      placeholder="Enter number of rounds set"
      value={record.rounds_set}
      name="rounds_set"
      onChange={handleChange}
    />
    <label>Notes</label>
    <input
      placeholder="Enter notes"
      value={record.notes}
      name="notes"
      onChange={handleChange}
    />

    <button type ="submit">Submit</button>
    <Link to={cancelPath}>
    </Link>
  </form>
)

export default RecordForm