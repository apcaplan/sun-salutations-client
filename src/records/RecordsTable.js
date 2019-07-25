import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link, withRouter } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { destroy } from './recordApi'
import { withSnackbar } from 'notistack'
import messages from '../auth/messages'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  fab: {
    margin: theme.spacing(1),
    justifyContent: 'center'
  }
}))

const SimpleTable = (props) => {
  const classes = useStyles()
  const { enqueueSnackbar, records, user } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Rounds completed</TableCell>
            <TableCell>Rounds set</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>{row.rounds_completed}</TableCell>
              <TableCell>{row.rounds_set}</TableCell>
              <TableCell>{row.notes}</TableCell>
              <TableCell>
                <Link to={`/records/${row.id}/edit-record`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => {
                  destroy(row.id, user)
                  // .then(() => setDeleted(true))
                    .then(() => enqueueSnackbar(messages.destroySuccess, { variant: 'success' }))
                    .then(() => (props.history.push('./records')))
                    .catch(error => {
                      console.error(error)
                      enqueueSnackbar(messages.destroyFailure, { variant: 'danger' })
                    })
                }
                }>Delete Record</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Fab color="primary" aria-label="add" className={classes.fab} component={Link} to='/add-record'>
          <AddIcon />
        </Fab>
      </Table>
    </Paper>
  )
}

export default withSnackbar(withRouter(SimpleTable))
