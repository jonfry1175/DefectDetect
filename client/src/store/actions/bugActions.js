const setBug = (bugs) => ({
    type: "SET_BUGS",
    payload: {bugs},
})
const addBug = (bugs) => ({
    type: "ADD_BUGS",
    payload: {bugs},
})



export {setBug,addBug}