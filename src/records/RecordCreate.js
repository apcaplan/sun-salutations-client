import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../Layout'
import RecordForm from './RecordForm'
import axios from 'axios'
import apiUrl from '../apiConfig'
// import apiUrl from '../apiConfig'

class RecordCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      record: {
        date: new Date(),
        roundsCompleted: 0,
        roundsSet: 0,
        notes: ''
      },
      createdRecordId: null
    }
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedRecord = Object.assign(this.state.record, updatedField)
    this.setState({
      record: editedRecord
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/records`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        record: this.state.record
      }
    })
      .then(res => this.setState({ createdRecordId: res.data.record.id }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { record, createdRecordId } = this.state

    if (createdRecordId) {
      return <Redirect to={
        {
          pathname: `/records/${createdRecordId}`
        }
      } />
    }

    return (
      <Layout>
        <h2>Create new record </h2>
        <RecordForm
          record = {record}
          handleChange = {handleChange}
          handleSubmit = {handleSubmit}
          cancelPath = '/'
        />
      </Layout>
    )
  }
}
export default RecordCreate
