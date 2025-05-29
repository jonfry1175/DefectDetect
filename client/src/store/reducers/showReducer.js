import { MODAL_ACTIONS } from '../../constants';
import { getFromStorage, saveToStorage } from '../../utils/helpers';
import { STORAGE_KEYS } from '../../constants';

// Initial state with persisted dark mode preference
const DEFAULT_STATE = {
    showBugModal: false,
    showBugModalCreate: false,
    darkMode: getFromStorage(STORAGE_KEYS.DARK_MODE, false),
};

/**
 * Reducer for UI display state
 * @param {Object} state - Current state
 * @param {Object} action - Dispatched action
 * @returns {Object} New state
 */
export const showReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case MODAL_ACTIONS.SHOW_BUG_MODAL_DETAIL:
            return {
                ...state,
                showBugModal: true
            };

        case MODAL_ACTIONS.HIDE_BUG_MODAL_DETAIL:
            return {
                ...state,
                showBugModal: false
            };

        case MODAL_ACTIONS.SHOW_BUG_MODAL_CREATE:
            return {
                ...state,
                showBugModalCreate: true
            };

        case MODAL_ACTIONS.HIDE_BUG_MODAL_CREATE:
            return {
                ...state,
                showBugModalCreate: false
            };

        case MODAL_ACTIONS.TOGGLE_DARK_MODE: {
            const newDarkMode = !state.darkMode;
            // Persist the dark mode preference
            saveToStorage(STORAGE_KEYS.DARK_MODE, newDarkMode);
            return {
                ...state,
                darkMode: newDarkMode
            };
        }

        case MODAL_ACTIONS.HIDE:
            return {
                ...state,
                show: false
            };

        default:
            return state;
    }
};