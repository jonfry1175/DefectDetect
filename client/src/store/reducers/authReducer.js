const valToken = localStorage.getItem("token")

const DEFAULT_STATE = {
    token: valToken,
    isAuthenticated: !!valToken, // true or false/convert to boolean
    roleId: null
}

export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                roleId: action.payload.roleId
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                roleId: null
            }
        default:
            return state
    }
}