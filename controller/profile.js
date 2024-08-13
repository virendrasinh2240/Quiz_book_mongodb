const SignUp = require('../models/signUp');

const getProfile = async (req, res) => {
    try {
        // Get userId from the request (assuming it's stored in req.userId)
        const { userId } = req;

        // Fetch the user by userId
        const user = await SignUp.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user data as response
        res.status(200).json(user);
        
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching user profile:', error.message);
        
        // Send an error response
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = getProfile;
