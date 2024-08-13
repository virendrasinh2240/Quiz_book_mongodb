const SignUp = require('../models/signUp');

const updateProfile = async (req, res) => {
    try {
        // Extract user details from the request body
        const { firstname, lastname, email, genderId, DOB, mobileNumber, professionId } = req.body;
        console.log(req.body);

        // Extract user profile filename if it exists
        const userProfile = req.file ? req.file.filename : null;

        // Find the user by their ID
        const user = await SignUp.findById(req.userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.genderId = genderId;
        user.DOB = DOB;
        user.mobileNumber = mobileNumber;
        user.professionId = professionId;
        if (userProfile) {
            user.userProfile = userProfile;
        }

        // Save the updated user details
        await user.save();

        // Send success response
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        // Handle errors and send error response
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = updateProfile;
