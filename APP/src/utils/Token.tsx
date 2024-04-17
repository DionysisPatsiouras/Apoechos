export const token = localStorage.getItem('auth-token')?.slice(0, -1)?.slice(1);
export const config = {
    headers: { Authorization: `Bearer ${token}` }
};


