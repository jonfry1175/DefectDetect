const DEFAULT_STATE = {
    roles: []
}

export const roleReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_ROLE":
            return {
                ...state,
                roles: action.payload.roles
            }
        default:
            return state
    }
}