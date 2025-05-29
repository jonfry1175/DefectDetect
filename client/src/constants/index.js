// Constants for action types
export const MODAL_ACTIONS = {
    SHOW_BUG_MODAL_DETAIL: "SHOW_BUG_MODAL_DETAIL",
    HIDE_BUG_MODAL_DETAIL: "HIDE_BUG_MODAL_DETAIL",
    SHOW_BUG_MODAL_CREATE: "SHOW_BUG_MODAL_CREATE",
    HIDE_BUG_MODAL_CREATE: "HIDE_BUG_MODAL_CREATE",
    TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
    HIDE: "HIDE"
};

// Constants for severity and priority levels
export const SEVERITY_LEVELS = {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low"
};

export const PRIORITY_LEVELS = {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low"
};

// UI colors mapping
export const UI_COLORS = {
    [SEVERITY_LEVELS.HIGH]: "danger",
    [SEVERITY_LEVELS.MEDIUM]: "warning",
    [SEVERITY_LEVELS.LOW]: "info",
    DEFAULT: "secondary"
};

// Constants for filter options
export const FILTER_OPTIONS = {
    ALL: "all",
    SOLVED: "solved",
    UNSOLVED: "unsolved"
};

// Item counts per page for pagination
export const ITEMS_PER_PAGE = 6;

// Local storage keys
export const STORAGE_KEYS = {
    DARK_MODE: "defect_detect_dark_mode"
};
