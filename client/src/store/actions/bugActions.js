const addBug = (bugs) => ({
    type: "SET_BUGS",
    payload: {bugs},
})

export {addBug}