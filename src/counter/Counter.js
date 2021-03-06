import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
// import axios from 'axios'
// import apiUrl from '../apiConfig'
// import { Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import messages from '../auth/messages'
import { create } from '../records/recordApi'
// import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { transparentize, lighten } from 'polished'

const baseColor = '#3f51b5'
const borderRadius = '3px'

const sun = require('../img/sun-button.jpeg')

const Button = styled.button`
border: 0;
border-radius: ${borderRadius};
margin-top: 2rem;
padding: .65rem 1rem;
`

const Button2 = styled.button`
  border: 0;
  border-radius: ${borderRadius};
  margin-bottom: 2rem;
  margin-left: 2rem;
  margin-top: 7rem;
  padding: .65rem 1rem;
  font-size: 200%;
  color: white;
  background-color: ${lighten(-0.125, baseColor)};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${baseColor};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${transparentize('0.7', baseColor)};
  }
`

// const useStyles = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(1)
//   }
// }))

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

  options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }
  dateToday = new Date()
  formattedDate = this.dateToday.toLocaleDateString(undefined, this.options)

  render () {
    const { count } = this.state
    const roundsCompleted = this.state.count
    // const dateToday = new Date().getDate()
    const { enqueueSnackbar, user } = this.props
    const data = {
      record: {
        date: this.formattedDate,
        rounds_completed: roundsCompleted,
        notes: ''
      }
    }

    // const classes = () => { useStyles() }

    return (
      <nav>
        <Grid container justify = "center">
          <h2 style={ { fontSize: '3rem', textAlign: 'center' } } > Count: { count } </h2>
        </Grid>
        <Grid container justify = "center">
          <Button>
            <img src={sun} width="350" alt="+" onClick={() => this.incrementCounter()} />
          </Button>
        </Grid>
        {roundsCompleted === 0 &&
        <h4 style={ { color: 'white', fontSize: '1.3rem', textAlign: 'center' } } >Click on the sun at the end of each round of sun salutations.
          <br />
          When you&#39;re done, click the save button to log your practice!
        </h4>
        }
        <Button2 class="secondButton" onClick={() => {
          create(user, data)
            .then(() => {
              // this.props.history.push('/records')
              enqueueSnackbar(messages.saveSuccess, { variant: 'success' })
            })
            .catch(error => {
              console.error(error)
              enqueueSnackbar(messages.saveFailure, { variant: 'error' })
            })
        }
        }>
        Save
        </Button2>
      </nav>
    )
  }
}

export default withSnackbar(Counter)
