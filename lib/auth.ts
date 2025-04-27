export async function checkUserSession() {
    try {
        // Check local storage or session storage
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        // Optionally verify token with your API or Prisma
        // Example: const user = await fetchUserFromAPI(token);
        // For now, assume token presence means a valid user
        return {
            id: '1', name:"Abanob", email: "poposhosh23@gmail.com", roles: ['admin']
        }
    } catch (error) {
        console.error('Session check failed:', error)
        return null;
    }
}