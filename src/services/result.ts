// src/services/result.ts (or add to existing admission service)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const resultService = {
    getMyResult: async () => {
        const response = await fetch(`${API_URL}/admissions/my/result`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }
};