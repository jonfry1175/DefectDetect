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
        default:
            return state
    }
}