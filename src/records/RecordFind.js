import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Layout from '../Layout'

const RecordFind = props => {
  const [record, setRecord] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/records/${props.match.params.id}`)
      .then(res => setRecord(res.data.record))
      .catch(console.error)
  }, [])

  if (!record) {
    return <p>Loading...</p>
  }

  return (
    <Layout>
      <h4>{record.date}</h4>
      <p> Rounds completed: {record.rounds_completed}</p>
      <p> Rounds set: {record.rounds_set}</p>
      <p> Notes: {record.notes}</p>
      <Link to={`/records/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/records">Back to all records</Link>
    </Layout>
  )
}

export default RecordFind
