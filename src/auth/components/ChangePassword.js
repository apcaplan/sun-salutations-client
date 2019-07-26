import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { changePassword } from '../api'
import messages from '../messages'
import styled from 'styled-components'
import { transparentize, lighten } from 'polished'

const baseColor = '#03a5fc'
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

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, user } = this.props

    changePassword(this.state, user)
      .then(() => enqueueSnackbar(messages.changePasswordSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .catch(() => {
        this.setState({ oldPassword: '', newPassword: '' })
        enqueueSnackbar(messages.changePasswordFailure, { variant: 'error' })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <Form className='auth-form' onSubmit={this.onChangePassword}>
        <h3>Change Password</h3>

        <label htmlFor="oldpw">Old Password</label>
        <Input
          required
          name="oldPassword"
          value={oldPassword}
          type="password"
          placeholder="Old Password"
          onChange={this.handleChange}
        />
        <label htmlFor="newPassword">New Password</label>
        <Input
          required
          name="newPassword"
          value={newPassword}
          type="password"
          placeholder="New Password"
          onChange={this.handleChange}
        />
        <Button type="submit">Change Password</Button>
      </Form>
    )
  }
}

export default withSnackbar(withRouter(ChangePassword))
