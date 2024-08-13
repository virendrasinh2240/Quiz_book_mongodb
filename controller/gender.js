const SignUp = require("../models/signUp");

const gender = async (req, res) => {
    try {
        // // Mapping for genderId
        // const genderMap = {
        //     "1": "male",
        //     "2": "female",
        //     "3": "other"
        // };

        // Fetch distinct genderId from SignUp model
        const getGenders = await SignUp.find().distinct('genderId');

        // Map genderId to gender names
        // const genderArray = getGenders.map(genderId => ({
        //     id: genderId,
        //     name: genderMap[genderId] || "unknown"
        // }));

        res.status(200).json({ getGenders });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = gender;
