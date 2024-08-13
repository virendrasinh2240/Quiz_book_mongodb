const SignUp = require("../models/signUp");

const deleteUser = async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        // Find and delete the user
        const user = await SignUp.findOneAndDelete({ mobileNumber });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with a success message
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = deleteUser;
