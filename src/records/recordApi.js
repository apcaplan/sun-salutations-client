import apiUrl from '../apiConfig'
import axios from 'axios'

export const destroy = (id, user) => {
  return axios({
    url: `${apiUrl}/records/${id}`,
    headers: { Authorization: `Token token=${user.token}` },
    method: 'DELETE'
  })
}
