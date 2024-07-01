const DEFAULT_STATE = {
    authData: localStorage.getItem("user") || null
}

export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            return {
                ...state,
                authData: action.payload.user,
            }
        case "LOGOUT":
            localStorage.removeItem("user")
            return {
                ...state,
                authData: null,
            }
        default:
            return state
    }
}