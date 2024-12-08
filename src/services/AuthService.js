const AuthService = {
    login: async (email, password) => {
        /*  const response = await fetch('https://your-api.com/login', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email, password }),
         });
 
         if (!response.ok) {
             throw new Error('Login failed');
         }
         const { token } = await response.json(); */
        const { token } = {
            token: "jwt-token-here",
            user: { id: 1, name: "John Doe", email: "email@example.com" }
        }
        localStorage.setItem('authToken', token);
        //throw new Error("Invalid username or password");
    },

    logout: () => {
        localStorage.removeItem('authToken');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

    getToken: () => {
        return localStorage.getItem('authToken');
    },
};

export default AuthService;
