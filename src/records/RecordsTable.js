import React from 'react'
import MaterialTable from 'material-table'

export default function MaterialTableDemo () {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Date', field: 'date' },
      { title: 'Rounds Completed', field: 'roundsCompleted' },
      { title: 'Rounds Planned', field: 'roundsSet', type: 'numeric' },
      {
        title: 'Notes', field: 'notes',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }
      }
    ],
    data: [
      {recordsList}
    ]
  })

  return (
    <MaterialTable
      title="Editable Example"
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
