import React, { useState, useEffect } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Layout from '../Layout'
// import { destroy } from '../api'
import styled from 'styled-components'
import { transparentize, lighten } from 'polished'

const baseColor = '#485ccf'
const borderRadius = '3px'

const Button = styled.button`
  border: 0;
  border-radius: ${borderRadius};
  margin: 1rem;
  padding: 1rem;
  font-size: 100%;
  color: white;
  background-color: ${lighten(-0.125, baseColor)};

  &:hover {
    background-color: ${baseColor};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${transparentize('0.7', baseColor)};
  }
`

const Record = props => {
  const [record, setRecord] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
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
      <Button onClick={destroy}>Delete Record</Button>
      <Link to={`/records/${props.match.params.id}/edit-record`}>
        <Button>Edit</Button>
      </Link>
      <Link to="/records">Back to all records</Link>
    </Layout>
  )
}

export default withRouter(Record)
