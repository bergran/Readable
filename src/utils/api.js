const localAuthorization = localStorage.Authorization

const authorizationRaw = localAuthorization ? localAuthorization : Math.ceil(Math.random() * 100)
const authorization = {
    'Authorization': `Bearer ${authorizationRaw}`
}

export const getCategories = () => {
    return fetch('http://localhost:3001/categories', {
        "Content-type": "application/json",
        headers: authorization
    })
        .then(data => {
            if (data.status !== 200) {
                console.log(data)
                return data
            } else {
                return data.json()
            }
        })
}