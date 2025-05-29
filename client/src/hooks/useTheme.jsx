import { useEffect, createContext, useContext, useState } from 'react';
import { useDarkMode } from './uiHooks';

// Theme context
const ThemeContext = createContext();

/**
 * Provider component for theme context
 * @param {Object} props - Component props
 */
export const ThemeProvider = ({ children }) => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [theme, setTheme] = useState({
        bgColor: 'bg-light',
        textColor: 'text-dark',
        borderColor: 'border-secondary-subtle',
        cardBgColor: 'bg-white',
    });

    // Update theme based on dark mode
    useEffect(() => {
        if (darkMode) {
            setTheme({
                bgColor: 'bg-dark',
                textColor: 'text-light',
                borderColor: 'border-dark',
                cardBgColor: 'bg-dark bg-opacity-75',
            });
            document.body.classList.add('dark-theme');
        } else {
            setTheme({
                bgColor: 'bg-light',
                textColor: 'text-dark',
                borderColor: 'border-secondary-subtle',
                cardBgColor: 'bg-white',
            });
            document.body.classList.remove('dark-theme');
        }
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Custom hook to access theme context
 * @returns {Object} - Theme context values
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default useTheme;
