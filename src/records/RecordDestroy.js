// import { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { withSnackbar } from 'notistack'
// import { destroy } from '../api'
// import messages from '../messages'
// import Records from './Records'
//
// const Destroy = props => {
//   const [deleted, setDeleted] = useState(false)
//
//   const { enqueueSnackbar } = this.props
//
//    destroy(props)
//       .then(() => setDeleted(true))
//       .then(() => enqueueSnackbar(messages.destroySuccess, { variant: 'success' }))
//       .catch(error => {
//         enqueueSnackbar(messages.destroyFailure, { variant: 'danger' })
//       })
//       .catch(console.error)
//   }
//
//   if (!record) {
//     return <p>Loading...</p>
//   }
//
//   return (
//     <Records>
//     )
//   }
// }
//
// export default withSnackbar(withRouter(Destroy))
