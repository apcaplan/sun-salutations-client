import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Layout from '../Layout'
import RecordForm from './RecordForm'
import axios from 'axios'
import apiUrl from '../apiConfig'

const RecordEdit = props => {
  const [record, setRecord] = useState({
    date: new Date(),
    roundsCompleted: 0,
    roundsSet: 0,
    notes: ''
  })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/records/${props.match.params.id}`, {
      headers: { Authorization: `Token token=${props.user.token}` }
    })
      .then(res => setRecord(res.data.record))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setRecord(record => ({ ...record, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/records/${props.match.params.id}`,
      headers: { Authorization: `Token token=${props.user.token}` },
      method: 'PATCH',
      data: { record }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/records/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <RecordForm
        record={record}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/records/${props.match.params.id}`}
      />
    </Layout>
  )
}

export default withRouter(RecordEdit)
