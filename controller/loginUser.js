const jwt = require('jsonwebtoken');
const signUp = require('../models/signUp');

const loginUser = async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        // Find user by mobileNumber
        const user = await signUp.findOne({ mobileNumber });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'thisismyproject', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = loginUser;
