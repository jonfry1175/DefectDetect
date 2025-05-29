const DEFAULT_STATE = {
    showBugModal: false,
    showBugModalCreate: false,
    darkMode: false,
}

export const showReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SHOW_BUG_MODAL_DETAIL":
            return {
                ...state,
                showBugModal: true
            }
        case "HIDE_BUG_MODAL_DETAIL":
            return {
                ...state,
                showBugModal: false
            }
        case "SHOW_BUG_MODAL_CREATE":
            return {
                ...state,
                showBugModalCreate: true
            }
        case "HIDE_BUG_MODAL_CREATE":
            return {
                ...state,
                showBugModalCreate: false
            }
        case "TOGGLE_DARK_MODE":
            return {
                ...state,
                darkMode: !state.darkMode
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