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
  return fetch(`http://${host}/categories`, { headers })
    .then(data => data.json())
    .then(raw => raw.categories)
}

export const getPostsCategory = category => {
  return fetch(`http://${host}/${category}/posts`, {headers})
    .then(data => data.json())
}

export const getAllPost = () => {
  return fetch(`http://${host}/posts`, {headers})
      .then(data => data.json())
}

export const getCommentsPost = post => {
    return fetch(`http://${host}/posts/${post}/comments`, {headers})
        .then(data => data.json())
}

export const getComment = comment => {
  return fetch(`http://${host}/comments/${comment}`, {headers})
        .then(data => data.json())
}

export const getPost = post => {
  return fetch(`http://${host}/posts/${post}`, {headers})
        .then(data => data.json())
}

export const addPost = ({
    id,
    title,
    body,
    author,
    category
  }) => {
  const timestamp = Date.now()
  return fetch(`http://${host}/posts`, {
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
  return fetch(`http://${host}/posts/${post}`, {
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

export const editPost = (id, title, body) => {
  return fetch(`http://${host}/posts/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      title: title,
      body
    })
  })
    .then(
      data => data.json(),
      error => error
  )
}

export const deletePost = postId => {
  return fetch(`http://${host}/posts/${postId}`, {
    headers,
    method: 'DELETE'
  })
    .then(
      data => data.json(),
      error => error
  )
}

export const addComment = ({
  id,
  timestamp,
  title,
  body,
  author,
  parentId
}) => {
  return fetch(`http://${host}/comments`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      id,
      timestamp,
      title,
      body,
      author,
      parentId
    })
  })
    .then(
      data => data.json(),
      error => error
  )
}

const voteComment = (comment, option) => {
  return fetch(`http://${host}/comments/${comment}`, {
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

export const voteUpComment = comment => voteComment(comment, upVote)

export const voteDownComment = comment => voteComment(comment, downVote)

export const editComment = (id, timestamp, body) => {
  return fetch(`http://${host}/comments/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      timestamp: timestamp,
      body: body
    })
  })
  .then(
    data => data.json(),
    error => error
  )
}

export const deleteComment = comment => {
  return fetch(`http://${host}/comments/${comment}`, {
    headers,
    method: 'DELETE'
  })
    .then(
      data => data.json(),
      error => error
  )
}
