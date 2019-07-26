import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { signIn } from '../api'
import messages from '../messages'
import styled from 'styled-components'
import { transparentize, lighten } from 'polished'

const baseColor = '#485ccf'
const borderRadius = '3px'

const Input = styled.input`
  border-radius: ${borderRadius};
  border: 1px solid lightgray;
  padding: .5rem .75rem;
  font-size: 100%;
  display: block;
  width: 100%;
  margin: 0 0 1rem;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 0.2rem ${transparentize('0.7', baseColor)};
  }
`
const Form = styled.form`
  max-width: 500px;
  margin: 1rem auto;

  > h3 {
    margin: 3rem 0 1rem;
  }
`
const Button = styled.button`
  border: 0;
  border-radius: ${borderRadius};
  padding: .65rem 1rem;
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

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => enqueueSnackbar(messages.signInSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        enqueueSnackbar(messages.signInFailure, { variant: 'error' })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <Form className='auth-form' onSubmit={this.onSignIn}>
        <h3>Sign In</h3>
        <label htmlFor="email">Email</label>
        <Input
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <Input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <Button type="submit">Sign In</Button>
      </Form>
    )
  }
}

export default withSnackbar(withRouter(SignIn))
