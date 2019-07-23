import React, { useState, useEffect } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Layout from '../Layout'

const Record = props => {
  const [record, setRecord] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    console.log('token is:', props.user.token)
    axios(`${apiUrl}/records/${props.match.params.id}`, {
      headers: { Authorization: `Token token=${props.user.token}` }
    })
      .then(res => setRecord(res.data.record))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/records/${props.match.params.id}`,
      headers: { Authorization: `Token token=${props.user.token}` },
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!record) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'Record successfully deleted!' } }
    } />
  }

  return (
    <Layout>
      <h4>{record.date}</h4>
      <p> Rounds completed: {record.rounds_completed}</p>
      <p> Rounds set: {record.rounds_set}</p>
      <p> Notes: {record.notes}</p>
      <button onClick={destroy}>Delete Record</button>
      <Link to={`/records/${props.match.params.id}/edit-record`}>
        <button>Edit</button>
      </Link>
      <Link to="/records">Back to all records</Link>
    </Layout>
  )
}

export default withRouter(Record)
