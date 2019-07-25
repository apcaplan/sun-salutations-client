import React, { Component } from 'react'
import apiUrl from '../apiConfig'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import Layout from '../Layout'
// import { ReactVirtualizedTable }, { MuiVirtualizedTablen } from './RecordsTable2'
import SimpleTable from './Test'
// import ReactVirtualizedTable from './RecordsTable2'
// import MaterialTable from 'material-table'

class Records extends Component {
  constructor (props) {
    super(props)

    this.state = {
      records: [],
      error: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/records`, {
      headers: { Authorization: `Token token=${this.props.user.token}` }
    })
      .then(res => this.setState({ records: res.data.records }))
      .catch(err => this.setState({ error: err.stack }))
  }

  render () {
    const { records, error } = this.state
    console.log(records)
    // const recordsList = records.map(record => (
    //   <li key={record.id}>
    //     <Link to={`/records/${record.id}`}>{record.date} {record.rounds_completed} {record.rounds_set} {record.notes}</Link>
    //   </li>
    // ))

    // if (!loaded) {
    //   return <p>Loading...</p>
    // }

    if (records.length === 0) {
      return <p>No records to display yet</p>
    }

    if (error) {
      return <p>ERROR: {error}</p>
    }

    return (
      <nav>
        <h1>Progress Record</h1>
        <SimpleTable
          records={ records }
          user={this.props.user}
        />
      </nav>
    )
  }
}

export default Records
