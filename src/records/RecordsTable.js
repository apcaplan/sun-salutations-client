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
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteRounded'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650,
    fontSize: '2rem'
  },
  cell: {
    fontSize: '1.2rem'
  },
  fab: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
    // bottom: theme.spacing(2)
  },
  label: {
    fontSize: '1.5rem'
  }
}))

const SimpleTable = (props) => {
  const classes = useStyles()
  const { enqueueSnackbar, records, user, refresh } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.label}>Date</TableCell>
            <TableCell className={classes.label}>Rounds completed</TableCell>
            <TableCell className={classes.label}>Rounds set</TableCell>
            <TableCell className={classes.label}>Notes</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map(row => (
            <TableRow key={row.id} className={classes.tablerow}>
              <TableCell className={classes.cell} component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell className={classes.cell}>{row.rounds_completed}</TableCell>
              <TableCell className={classes.cell}>{row.rounds_set}</TableCell>
              <TableCell className={classes.cell}>{row.notes}</TableCell>
              <TableCell className={classes.cell}>
                <Link to={`/records/${row.id}/edit-record`}>
                  <EditIcon style={ { color: '#000', paddingRight: '6px' } } />
                </Link>
                <DeleteIcon color="secondary" onClick={() => {
                  destroy(row.id, user)
                  // .then(() => setDeleted(true))
                    .then(() => enqueueSnackbar(messages.destroySuccess, { variant: 'success' }))
                    .then(() => refresh())
                    .catch(error => {
                      console.error(error)
                      enqueueSnackbar(messages.destroyFailure, { variant: 'error' })
                    })
                }
                }/>
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
