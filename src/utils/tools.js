export const Capitalize = word => `${word[0].toUpperCase()}${word.slice(1)}`

export const getUTCFormat = timestamp => {
    const date = new Date(timestamp)
    const day = date.getUTCDate().toString().padStart(2, '0')
    const month = date.getMonth().toString().padStart(2, '0')
    return `${month}/${date.getUTCDate()}/${date.getFullYear()}`
}