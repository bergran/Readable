export const Capitalize = word => `${word[0].toUpperCase()}${word.slice(1)}`

export const getUTCFormat = timestamp => {
    const date = new Date(timestamp)
    const day = date.getUTCDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${month}/${day}/${date.getFullYear()}`
}