import apiUrl from '../apiConfig'
import axios from 'axios'

export const destroy = (id, user) => {
  return axios({
    url: `${apiUrl}/records/${id}`,
    headers: { Authorization: `Token token=${user.token}` },
    method: 'DELETE'
  })
}

export const update = (id, user, data) => {
  return axios({
    url: `${apiUrl}/records/${id}`,
    headers: { Authorization: `Token token=${user.token}` },
    method: 'PATCH',
    data: { data }
  })
}

export const create = (user, data) => {
  return axios({
    url: `${apiUrl}/records`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${user.token}`
    },
    data: { record: data.record }
  })
}
