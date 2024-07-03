const DEFAULT_STATE = {
    bugs: []
}

export const bugReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "ADD_BUG":
            return {
                ...state,
                bugs: action.payload.bugs
                // bugs: [...state.bugs, ...action.payload.bugs]
            }
        default:
            return state
    }
}