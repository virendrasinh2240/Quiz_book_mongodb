const Std = require("../models/std");
const Subject = require("../models/subject");

const getStd = async (req, res) => {
    try {
        // Fetch all std documents and populate related subjects
        const data = await Std.find().populate('subjects');

        if (data.length === 0) {
            return res.status(404).json({ error: "Data not found" });
        }

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getStd;
