import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
import './Header.scss'

const useStyles = makeStyles(theme => ({
  root: {
    color: '#03a5fc !important',
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white'
  },
  title: {
    flexGrow: 1
  }
}))

const Header = ({ user }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
             Sun Salutations
          </Typography>
          { user && <span>Welcome, {user.email}</span>}
          { user ? (
            <React.Fragment>
              <Button className={classes.menuButton} component={Link} to="/suryaNamaskar">Practice!</Button>
              <Button className={classes.menuButton} component={Link} to="/counter">Rounds Tracker</Button>
              <Button className={classes.menuButton} component={Link} to="/records">Show Records</Button>
              <Button className={classes.menuButton} component={Link} to="/change-password">Change Password</Button>
              <Button className={classes.menuButton} component={Link} to="/sign-out">Sign Out</Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button className={classes.menuButton} component={Link} to="/sign-up">Sign Up</Button>
              <Button className={classes.menuButton} component={Link} to="/sign-in">Sign In</Button>
            </React.Fragment>
          ) }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
