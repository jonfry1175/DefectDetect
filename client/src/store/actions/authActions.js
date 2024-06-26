const login = (valToken, valRoleId) => ({
    type: "LOGIN",
    payload: { token: valToken, roleId: valRoleId },
})

const logout = () => ({
    type: "LOGOUT",
})

export { login, logout }