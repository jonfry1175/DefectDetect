import { useEffect, useState } from 'react';
import { saveToStorage } from '../utils/helpers';
import { STORAGE_KEYS } from '../constants';
import { toggleDarkMode } from '../store/actions/showAction';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Custom hook for dark mode functionality
 * @returns {Object} - Object containing dark mode state and handlers
 */
export const useDarkMode = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.show.darkMode);

    /**
     * Toggle dark mode in Redux and apply to document
     */
    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };

    // Apply dark mode class to body when dark mode state changes
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Save preference to localStorage
        saveToStorage(STORAGE_KEYS.DARK_MODE, darkMode);
    }, [darkMode]);

    return {
        darkMode,
        toggleDarkMode: handleToggleDarkMode
    };
};

/**
 * Custom hook for responsive design detection
 * @param {number} breakpoint - Breakpoint in pixels (default: 992)
 * @returns {boolean} - Whether the viewport is below the breakpoint
 */
export const useResponsive = (breakpoint = 992) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
};

export default { useDarkMode, useResponsive };
