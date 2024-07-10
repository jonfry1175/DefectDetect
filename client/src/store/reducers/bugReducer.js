const DEFAULT_STATE = {
    bugs: []
}

export const bugReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_BUGS":
            return {
                ...state,
                bugs: action.payload.bugs
                // bugs: [...state.bugs, ...action.payload.bugs]
            }
        case "ADD_BUG":
            return {
                ...state,
                bugs: [...state.bugs, action.payload.bug]
            }
        default:
            return state
    }
}