/* eslint-disable @typescript-eslint/no-explicit-any */
// src/queries/seminar/registration.ts
export const seminarRegistration = async (data: any, seminarId?: string) => {
    try {
        // If seminarId is provided, use it, otherwise get active seminar
        const seminarIdToUse = seminarId || await getActiveSeminarId();
        
        const response = await fetch('/seminars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                seminarId: seminarIdToUse,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                error: {
                    message: result.message || 'Registration failed',
                    status: response.status,
                },
            };
        }

        return result;
    } catch (error: any) {
        return {
            error: {
                message: error.message || 'Network error',
            },
        };
    }
};

// Helper function to get active seminar ID
const getActiveSeminarId = async () => {
    try {
        const response = await fetch('/seminars/active');
        const result = await response.json();
        
        if (result.success && result.data) {
            return result.data._id || result.data.id;
        }
        throw new Error('No active seminar found');
    } catch (error: any) {
        throw new Error('Failed to get active seminar: ' + error.message);
    }
};