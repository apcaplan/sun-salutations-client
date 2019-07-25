import apiUrl from '../apiConfig'
import axios from 'axios'

export const destroy = (user) => {
  axios({
    url: `${apiUrl}/records/${props.match.params.id}`,
    headers: { Authorization: `Token token=${user.token}` },
    method: 'DELETE'
  })
    .then(() => setDeleted(true))
    .catch(console.error)
}
