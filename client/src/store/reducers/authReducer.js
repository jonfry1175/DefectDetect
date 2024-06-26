const DEFAULT_STATE = {
    isAuthenticated: !!localStorage.getItem("token"), // true or false/convert to boolean
}

export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("roleId", action.payload.roleId)
            return {
                ...state,
                isAuthenticated: true,
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            localStorage.removeItem("roleId")
            return {
                ...state,
                isAuthenticated: false,
            }
        default:
            return state
    }
}