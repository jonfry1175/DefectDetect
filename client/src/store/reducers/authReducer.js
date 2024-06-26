const valToken = localStorage.getItem("token")

const DEFAULT_STATE = {
    token: valToken,
    isAuthenticated: !!valToken, // jika token ada, isAuthenticated bernilai true
    roleId: null
}

export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                roleId: action.payload.roleId
            }
        case "LOGOUT":
            return {
                ...state,
                token: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}