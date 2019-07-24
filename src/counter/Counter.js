import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

export default class Counter extends Component {
  constructor (props) {
    super()
    this.state = {
      count: 0
    }
  }

incrementCounter= () => {
  this.setState({
    count: this.state.count + 1
  })
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
    </nav>
  )
}
}
