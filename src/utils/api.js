let authorization = localStorage.Authorization
const host = process.env.REACT_APP_HOST
if (!authorization) {
  authorization = localStorage.Authorization = Math.ceil(Math.random() * 100)
}

const headers = {
  'Accept': 'application/json',
  'Authorization': authorization
}

export const getCategories = () => {
  return fetch(`http://${host}:3001/categories`, { headers })
    .then(data => data.json())
    .then(raw => raw.categories)
}

export const getPost = category => {
  return fetch(`http://${host}:3001/${category}/posts`, {headers})
    .then(data => data.json())
}
