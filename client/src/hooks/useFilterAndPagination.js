import { useCallback, useState, useMemo } from 'react';
import { FILTER_OPTIONS } from '../constants';

/**
 * Custom hook for filtering and pagination of bug data
 * @param {Array} bugs - Array of bug objects
 * @param {number} itemsPerPage - Number of items to display per page
 * @returns {Object} - Object containing filter and pagination state and handlers
 */
export const useFilterAndPagination = (bugs = [], itemsPerPage = 6) => {
    // Filter states
    const [statusFilter, setStatusFilter] = useState(FILTER_OPTIONS.ALL);
    const [priorityFilter, setPriorityFilter] = useState(FILTER_OPTIONS.ALL);
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Clear all filters
     */
    const clearFilters = useCallback(() => {
        setStatusFilter(FILTER_OPTIONS.ALL);
        setPriorityFilter(FILTER_OPTIONS.ALL);
        setSearchQuery("");
    }, []);

    /**
     * Apply filters to bug data
     */
    const filteredBugs = useMemo(() => {
        if (!bugs || !bugs.length) return [];

        let filtered = [...bugs];

        // Filter by status
        if (statusFilter !== FILTER_OPTIONS.ALL) {
            const isSolved = statusFilter === FILTER_OPTIONS.SOLVED;
            filtered = filtered.filter(bug => bug.is_solved === isSolved);
        }

        // Filter by priority level
        if (priorityFilter !== FILTER_OPTIONS.ALL) {
            filtered = filtered.filter(bug =>
                bug.PriorityLevel?.name?.toLowerCase() === priorityFilter.toLowerCase()
            );
        }

        // Filter by search query
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(bug =>
                bug.title?.toLowerCase().includes(query) ||
                bug.actual_result?.toLowerCase().includes(query) ||
                bug.expected_result?.toLowerCase().includes(query) ||
                bug.User?.name?.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [bugs, statusFilter, priorityFilter, searchQuery]);

    // Get current page of bugs
    const { currentItems, totalPages } = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const current = filteredBugs.slice(indexOfFirstItem, indexOfLastItem);
        const total = Math.ceil(filteredBugs.length / itemsPerPage);

        return {
            currentItems: current,
            totalPages: total
        };
    }, [filteredBugs, currentPage, itemsPerPage]);

    /**
     * Change the current page
     * @param {number} pageNumber - Page number to go to
     */
    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    // Reset to page 1 when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [statusFilter, priorityFilter, searchQuery]);

    // Check if filtering is active
    const isFilterActive = useMemo(() => {
        return statusFilter !== FILTER_OPTIONS.ALL ||
            priorityFilter !== FILTER_OPTIONS.ALL ||
            searchQuery.trim() !== "";
    }, [statusFilter, priorityFilter, searchQuery]);

    return {
        // Filter states
        statusFilter,
        setStatusFilter,
        priorityFilter,
        setPriorityFilter,
        searchQuery,
        setSearchQuery,
        clearFilters,
        isFilterActive,

        // Pagination states
        currentPage,
        setCurrentPage,
        handlePageChange,
        totalPages,

        // Results
        filteredBugs,
        currentItems,
        totalFilteredItems: filteredBugs.length
    };
};

export default useFilterAndPagination;
