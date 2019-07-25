import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import messages from '../auth/messages'

class Counter extends Component {
  constructor (props) {
    super()
    this.state = {
      count: 0
    }
  }

  incrementCounter = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  onSave = () => {
    const roundsCompleted = this.state.count
    const dateToday = new Date().getDate()
    const { enqueueSnackbar } = this.props

    // RecordCreate()

    axios({
      url: `${apiUrl}/records`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        record: {
          date: dateToday,
          roundsCompleted: roundsCompleted,
          roundsSet: '',
          notes: ''
        }
      }
    })
      .then(() => <Redirect to={
        { pathname: '/records', state: { msg: messages.saveSuccess } }
      } />
        .catch(error => {
          console.error(error)
          enqueueSnackbar(messages.saveFailure, { variant: 'error' })
        }))
  }

  render () {
    const { count } = this.state
    return (
      <nav>
        <Grid container justify = "center">
          <h2> Count: { count } </h2>
        </Grid>
        <Grid container justify = "center">
          <button onClick={() => this.incrementCounter()}>
            +
          </button>
        </Grid>
        <button>
        Save
        </button>
      </nav>
    )
  }
}

export default withSnackbar(Counter)
