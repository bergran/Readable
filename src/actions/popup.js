export const UPDATE_CHILDREN = 'UPDATE_CHILDREN'
export const DELETE_CHILDREN = 'DELETE_CHILDREN'

export const updateChildren = dialog => ({
    type: UPDATE_CHILDREN,
    dialog
})

export const deleteChildren = () => ({
    type: DELETE_CHILDREN
})