const DEFAULT_STATE = {
    show: false
}

export const showReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SHOW":
            return {
                ...state,
                show: true
            }
        case "HIDE":
            return {
                ...state,
                show: false
            }
        default:
            return state
    }
}