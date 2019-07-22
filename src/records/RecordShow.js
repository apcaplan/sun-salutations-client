import React, { Component } from 'react'
import apiUrl from '../apiConfig'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Layout from '../Layout'

class RecordShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      records: [],
      loaded: false,
      error: null
    }
  }

  async componentDidMount () {
    try {
      const response = await axios(`${apiUrl}/records`)
      this.setState({ records: response.data.records, loaded: true })
    } catch (err) {
      console.error(err)
      this.setState({ error: err.message })
    }
  }

  render () {
    const { records, error, loaded } = this.state
    const recordsList = records.map(record => (
      <li key={record.id}>
        <Link to={`/records/${record.id}`}>{record.title}</Link>
      </li>
    ))

    if (!loaded) {
      return <p>Loading...</p>
    }

    if (records.length === 0) {
      return <p>No records to display yet</p>
    }

    if (error) {
      return <p>ERROR: {error}</p>
    }

    return (
      <Layout>
        <h4>Record/Progress</h4>
        <ul>
          {recordsList}
        </ul>
      </Layout>
    )
  }
}

export default RecordShow
