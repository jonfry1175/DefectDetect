# DefectDetect Refactoring Documentation

## Overview

This document describes the refactoring performed on the DefectDetect application codebase to improve maintainability, code organization, and implement new features.

## Key Improvements

1. **Modular Code Structure**

   - Created constant files for centralized configuration
   - Implemented utility functions for common operations
   - Added custom hooks for logic reuse

2. **Enhanced Features**

   - Improved filtering functionality
   - Added dark mode support
   - Enhanced responsive design for mobile
   - Implemented pagination for bug listing

3. **Code Quality**
   - Added JSDoc comments for better documentation
   - Standardized component structure
   - Improved error handling

## Directory Structure

```
src/
  ├── constants/        # Constants and configuration values
  ├── utils/            # Utility functions
  ├── hooks/            # Custom React hooks
  │   ├── useBugOperations.js         # Bug CRUD operations
  │   ├── useFilterAndPagination.js   # Filtering and pagination logic
  │   ├── uiHooks.js                  # UI-related hooks (dark mode, responsive)
  │   └── useTheme.jsx                # Theme context provider
  ├── components/       # Reusable components
  │   └── cards/        # Card components
  │       └── BadgeStatus.jsx         # Standardized badge component
  └── store/            # Redux state management
      ├── actions/      # Redux actions
      └── reducers/     # Redux reducers
```

## Custom Hooks

### 1. `useBugOperations`

Centralizes all API operations related to bugs, including:

- Fetching all bugs
- Getting bug details
- Changing bug status

### 2. `useFilterAndPagination`

Handles filtering and pagination logic:

- Status filtering (solved/unsolved)
- Priority level filtering
- Text search
- Pagination controls

### 3. `useDarkMode` and `useTheme`

Manages application theming:

- Dark/light mode toggle
- Persistent theme preferences
- Global theme context

## Reusable Components

### `BadgeStatus`

A standardized badge component for consistent styling of:

- Status indicators (solved/unsolved)
- Priority levels (high/medium/low)
- Severity levels (high/medium/low)

## Usage Examples

### Filtering Bugs

```jsx
const {
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  searchQuery,
  setSearchQuery,
  clearFilters,
  currentItems,
  totalPages,
} = useFilterAndPagination(bugs);
```

### Dark Mode

```jsx
const { darkMode, toggleDarkMode } = useTheme();

return (
  <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
    {/* Component content */}
    <button onClick={toggleDarkMode}>
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  </div>
);
```

### Text Coloring in Dark Mode

For consistent text coloring in both light and dark modes, a standardized approach has been implemented using CSS classes:

```jsx
// Using the text-muted-adaptive class for consistent muted text appearance
<small className="text-muted-adaptive">Created on May 15, 2024</small>

// Previous approach with conditional classes (now replaced)
// <small className={darkMode ? "text-light opacity-75" : "text-muted"}>Created on May 15, 2024</small>
```

CSS implementation:

```css
/* Class for adaptive muted text based on theme */
.text-muted-adaptive {
  color: var(--text-muted-light) !important;
  transition: color 0.3s ease;
}

body.dark-theme .text-muted-adaptive {
  color: var(--text-muted-dark) !important;
}
```

### Bug Operations

```jsx
const { getAllBugs, getBugDetails, changeStatus } = useBugOperations(
  token,
  setLoading
);

// Fetch all bugs
useEffect(() => {
  getAllBugs();
}, [getAllBugs]);

// Change bug status
const handleStatusChange = async (id) => {
  const success = await changeStatus(id);
  if (success) {
    // Handle success
  }
};
```

## Future Improvements

1. Implement automated testing
2. Add data caching for improved performance
3. Enhance search functionality with fuzzy search
4. Add user preferences for default filters and view options

## Contributors

- DefectDetect Development Team
