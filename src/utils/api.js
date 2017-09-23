let authorization = localStorage.Authorization
const host = process.env.REACT_APP_HOST
const upVote = 'upVote'
const downVote = 'downVote'
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

export const getPostsCategory = category => {
  return fetch(`http://${host}:3001/${category}/posts`, {headers})
    .then(data => data.json())
}

export const getAllPost = () => {
  return fetch(`http://${host}:3001/posts`, {headers})
      .then(data => data.json())
}

export const getCommentsPost = post => {
    return fetch(`http://${host}:3001/posts/${post}/comments`, {headers})
        .then(data => data.json())
}

export const getComment = comment => {
  return fetch(`http://${host}:3001/comments/${comment}`, {headers})
        .then(data => data.json())
}

export const getPost = post => {
  return fetch(`http://${host}:3001/posts/${post}`, {headers})
        .then(data => data.json())
}

export const addPost = ({
    id,
    title,
    timestamp,
    body,
    author = authorization,
    category
  }) => {
  return fetch(`http://${host}:3001/posts`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      id,
      title,
      timestamp,
      body,
      author,
      category
    })
  })
    .then(data => data.json())
}

const votePost = (post, option) => {
  return fetch(`http://${host}:3001/posts/${post}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      option
    })
  })
    .then(data => data.json())
}

export const voteUpPost = post => votePost(post, upVote)

export const voteDownPost = post => votePost(post, downVote)
