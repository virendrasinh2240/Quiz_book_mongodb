const Chepter = require("../models/chepter");

const getChepter = async (req, res) => {
    try {
        // Fetch all chapters from the Chepter collection
        const findChepter = await Chepter.find({});

        // Check if chapters are found
        if (findChepter.length === 0) {
            return res.status(404).json({ error: "Chepter not found" });
        }

        // Respond with the retrieved chapters
        res.status(200).json({ data: findChepter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getChepter;
