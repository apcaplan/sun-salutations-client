import React, { Component } from 'react'
import apiUrl from '../apiConfig'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import Layout from '../Layout'
// import { ReactVirtualizedTable }, { MuiVirtualizedTablen } from './RecordsTable2'
import SimpleTable from './RecordsTable'
// import ReactVirtualizedTable from './RecordsTable2'
// import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
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

class Records extends Component {
  constructor (props) {
    super(props)

    this.state = {
      records: [],
      error: null,
      deleted: false
    }
  }

  refresh = () => {
    axios(`${apiUrl}/records`, {
      headers: { Authorization: `Token token=${this.props.user.token}` }
    })
      .then(res => this.setState({ records: res.data.records }))
      .catch(err => this.setState({ error: err.stack }))
  }

  componentDidMount () {
    this.refresh()
  }

  render () {
    const { records, error } = this.state
    // const recordsList = records.map(record => (
    //   <li key={record.id}>
    //     <Link to={`/records/${record.id}`}>{record.date} {record.rounds_completed} {record.rounds_set} {record.notes}</Link>
    //   </li>
    // ))

    // if (!loaded) {
    //   return <p>Loading...</p>
    // }

    if (records.length === 0) {
      return <div className='recordless'>
        <p>No records to display yet</p>
        <Button color="primary" aria-label="add" component={Link} to='/add-record'>
          Add a record
        </Button>
      </div>
    }

    if (error) {
      return <p className='recordless'>ERROR: {error}</p>
    }

    return (
      <nav className='salute'>
        <h1>Progress Record</h1>
        <SimpleTable
          records={ records }
          user={this.props.user}
          refresh={ this.refresh }
        />
      </nav>
    )
  }
}

export default Records
