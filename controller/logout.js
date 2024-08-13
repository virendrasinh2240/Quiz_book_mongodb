const logout = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie('jwt');
        
        // Send a success response
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        // Log the error for debugging
        console.error('Logout error:', error.message);

        // Send an error response
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = logout;
