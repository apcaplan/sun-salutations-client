import React from 'react'
import MaterialTable from 'material-table'

export default function RecordsTableFunction ({ records }) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Date', field: 'date' },
      { title: 'Rounds Completed', field: 'rounds_completed' },
      { title: 'Rounds Planned', field: 'rounds_set', type: 'numeric' },
      { title: 'Notes', field: 'notes' }
    ],
    data: [
      { records }
    ]
  })

  return (
    <MaterialTable
      title="Record/Progress"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              const data = [...state.data]
              data.push(newData)
              setState({ ...state, data })
            }, 600)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              const data = [...state.data]
              data[data.indexOf(oldData)] = newData
              setState({ ...state, data })
            }, 600)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              const data = [...state.data]
              data.splice(data.indexOf(oldData), 1)
              setState({ ...state, data })
            }, 600)
          })
      }}
    />
  )
}
