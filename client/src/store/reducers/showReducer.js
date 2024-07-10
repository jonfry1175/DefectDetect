const DEFAULT_STATE = {
    showBugModal: false,
    showBugModalCreate: false,
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
        case "HIDE":
            return {
                ...state,
                show: false
            }
        default:
            return state
    }
}