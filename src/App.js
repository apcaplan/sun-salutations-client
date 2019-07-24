import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import RecordCreate from './records/RecordCreate'
import Records from './records/Records'
import Record from './records/Record'
import RecordEdit from './records/RecordEdit'
import Counter from './counter/Counter'
import SuryaNamaskar from './suryaNamaskar/SuryaNamaskar'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  render () {
    const { user } = this.state

    return (
      <SnackbarProvider maxSnack={3}>
        <Header user={user} />
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/add-record' render={() => (
            <RecordCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/records' render={() => (
            <Records alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/records/:id' render={() => (
            <Record alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/records/:id/edit-record' render={() => (
            <RecordEdit alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/counter' render={() => (
            <Counter alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/SuryaNamaskar' render={() => (
            <SuryaNamaskar alert={this.alert} user={user} />
          )} />
        </main>
      </SnackbarProvider>
    )
  }
}

export default App
