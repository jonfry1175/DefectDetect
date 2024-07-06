const DEFAULT_STATE = {
    level: []
}

export const levelReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_LEVEL":
            return {
                ...state,
                level: action.payload.level
            }
        default:
            return state
    }
}