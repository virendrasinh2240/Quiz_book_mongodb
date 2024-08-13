const mongoose = require('mongoose');
const SignUp = require("../models/signUp");
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save file with its original name
    }
});

const upload = multer({ storage: storage });

const userSignUp = async (req, res) => {
    try {
        const { firstname, lastname, email, genderId, DOB, mobileNumber, professionId } = req.body;
        const userProfile = req.file ? req.file.filename : null; // Handle file uploads

        // Define the gender and profession mappings
        const genderMap = {
            1: "male",
            2: "female",
            3: "other"
        };

        const professionMap = {
            1: "student",
            2: "teacher",
            3: "admin"
        };

        // Create a new user in the database
        const signUpData = await SignUp.create({
            firstname,
            lastname,
            email,
            genderId, // Store as integer
            DOB,
            mobileNumber,
            professionId, // Store as integer
            userProfile,
        });

        // Prepare the response
        const responseData = {
            userId: signUpData._id, // Mongoose uses `_id` as the identifier
            firstname: signUpData.firstname,
            lastname: signUpData.lastname,
            email: signUpData.email,
            gender: genderMap[signUpData.genderId] || "unknown",
            DOB: signUpData.DOB,
            mobileNumber: signUpData.mobileNumber,
            profession: professionMap[signUpData.professionId] || "unknown",
            userProfile: signUpData.userProfile,
        };

        res.status(201).json(responseData);
        console.log("User signed up:", responseData);

    } catch (e) {
        console.error("Error during user sign up:", e.message);
        res.status(500).json({ error: e.message });
    }
};

module.exports = userSignUp;
