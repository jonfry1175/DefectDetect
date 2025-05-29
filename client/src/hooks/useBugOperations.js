import { useCallback } from 'react';
import axiosInstance from '../lib/axios';
import { useDispatch } from 'react-redux';
import { setBug } from '../store/actions/bugActions';
import { toast } from 'sonner';

/**
 * Custom hook for bug data fetching and manipulation
 * @param {string} token - Authentication token
 * @param {Function} setIsLoading - Loading state setter
 * @returns {Object} - Object containing bug related functions
 */
export const useBugOperations = (token, setIsLoading) => {
    const dispatch = useDispatch();

    /**
     * Fetch all bugs from the API
     */
    const getAllBugs = useCallback(async () => {
        if (!token) return;

        try {
            setIsLoading(true);
            const result = await axiosInstance.get(`/bugs`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(setBug(result.data));
        } catch (error) {
            console.error('Error fetching bugs:', error);
            toast.error("Server error saat mengambil data");
        } finally {
            setIsLoading(false);
        }
    }, [token, dispatch, setIsLoading]);

    /**
     * Get details of a specific bug
     * @param {number} id - Bug ID
     * @returns {Promise<Object>} - Bug details
     */
    const getBugDetails = useCallback(async (id) => {
        if (!token || !id) return null;

        try {
            const result = await axiosInstance.get(`/bugs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return result.data;
        } catch (error) {
            console.error('Error fetching bug details:', error);
            toast.error("Server error saat mengambil detail bug");
            return null;
        }
    }, [token]);

    /**
     * Change the status of a bug (solved/unsolved)
     * @param {number} id - Bug ID
     * @returns {Promise<boolean>} - Success status
     */
    const changeStatus = useCallback(async (id) => {
        if (!token || !id) return false;

        try {
            const result = await axiosInstance.put(
                `/bugs/status/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (result.status === 200) {
                toast.success("Bug telah ditandai sebagai solved");
                await getAllBugs();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error changing bug status:', error);
            toast.error("Server error saat mengubah status");
            return false;
        }
    }, [token, getAllBugs]);

    return {
        getAllBugs,
        getBugDetails,
        changeStatus
    };
};

export default useBugOperations;
