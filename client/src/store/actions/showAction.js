import { MODAL_ACTIONS } from '../../constants';

/**
 * Action creator to show bug detail modal
 * @returns {Object} Action object
 */
export const showModalBugdetail = () => ({
    type: MODAL_ACTIONS.SHOW_BUG_MODAL_DETAIL,
});

/**
 * Action creator to hide bug detail modal
 * @returns {Object} Action object
 */
export const hideModalBugdetail = () => ({
    type: MODAL_ACTIONS.HIDE_BUG_MODAL_DETAIL,
});

/**
 * Action creator to show bug creation modal
 * @returns {Object} Action object
 */
export const showModalCreate = () => ({
    type: MODAL_ACTIONS.SHOW_BUG_MODAL_CREATE,
});

/**
 * Action creator to hide bug creation modal
 * @returns {Object} Action object
 */
export const hideModalCreate = () => ({
    type: MODAL_ACTIONS.HIDE_BUG_MODAL_CREATE,
});

/**
 * Action creator to toggle dark mode
 * @returns {Object} Action object
 */
export const toggleDarkMode = () => ({
    type: MODAL_ACTIONS.TOGGLE_DARK_MODE,
});

