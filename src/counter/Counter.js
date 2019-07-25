import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
// import axios from 'axios'
// import apiUrl from '../apiConfig'
import { Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import messages from '../auth/messages'
import { create } from '../records/recordApi'

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

  // RecordCreate()

  // axios({
  //   url: `${apiUrl}/records`,
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Token token=${this.props.user.token}`
  //   },
  //   data: {
  //     record: {
  //       date: dateToday,
  //       roundsCompleted: roundsCompleted,
  //       roundsSet: '',
  //       notes: ''
  //     }
  //   }
  // })

  render () {
    const { count } = this.state
    const roundsCompleted = this.state.count
    // const dateToday = new Date().getDate()
    const { enqueueSnackbar, user } = this.props
    const data = {
      record: {
        date: '2010-11-11',
        rounds_completed: roundsCompleted,
        notes: ''
      }
    }
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
        <button onClick={() => {
          console.log(user)
          create(user, data)
            .then(() => <Redirect to={
              { pathname: '/records', state: { msg: messages.saveSuccess } }
            } />
            )
            .catch(error => {
              console.error(error)
              enqueueSnackbar(messages.saveFailure, { variant: 'error' })
            })
        }
        }>
        Save
        </button>
      </nav>
    )
  }
}

export default withSnackbar(Counter)
