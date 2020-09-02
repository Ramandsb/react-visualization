const initialState = {
    initState: 'Testing the initial state'
}

const appReducer = (
    state = initialState,
    action
) => {
    if (action.type === 'CHANGE_STATE') {
        const { initState } = action.data
        return {
            ...state,
            initState
        }
    }

    return state
}

export default appReducer