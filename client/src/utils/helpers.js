/**
 * Utility function to get badge color based on severity or priority level
 * @param {string} level - The severity or priority level (high, medium, low)
 * @param {Object} colorMap - The color mapping object
 * @returns {string} - Bootstrap color class
 */
export const getBadgeColor = (level, colorMap) => {
    const normalizedLevel = level?.toLowerCase();
    return colorMap[normalizedLevel] || colorMap.DEFAULT;
};

/**
 * Utility function to safely access nested properties
 * @param {Object} obj - The object to access
 * @param {string} path - The path to the property, dot-separated
 * @param {*} defaultValue - The default value if the property doesn't exist
 * @returns {*} - The property value or the default value
 */
export const getNestedProperty = (obj, path, defaultValue = undefined) => {
    if (!obj || !path) return defaultValue;

    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
        if (current === null || current === undefined || typeof current !== 'object') {
            return defaultValue;
        }
        current = current[key];
    }

    return current !== undefined ? current : defaultValue;
};

/**
 * Format date to a readable string
 * @param {string|Date} dateString - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Persist a value to localStorage
 * @param {string} key - The localStorage key
 * @param {*} value - The value to store
 */
export const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error("Error saving to localStorage:", e);
    }
};

/**
 * Retrieve a value from localStorage
 * @param {string} key - The localStorage key
 * @param {*} defaultValue - Default value if key not found
 * @returns {*} - The stored value or defaultValue
 */
export const getFromStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error("Error retrieving from localStorage:", e);
        return defaultValue;
    }
};
