const SignUp = require('../models/signUp');

const profession = async (req, res) => {
    try {
        // Fetch professions from the database
        const professions = await SignUp.find({}, { professionId: 1, _id: 0 }).distinct('professionId');
        
        // Optional: You can map profession IDs to readable names if needed
        // const professionMap = {
        //     1: "student",
        //     2: "teacher",
        //     3: "admin"
        // };

        // const professionArray = professions.map(professionId => ({
        //     id: professionId,
        //     name: professionMap[professionId] || "unknown"
        // }));

        res.status(200).json({ professions });
    } catch (error) {
        console.error('Error fetching professions:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = profession;
