const Subject = require("../models/subject");
const Std = require("../models/std");

const addsubject = async (req, res) => {
    try {
        const { stdId, subjectName } = req.body;
        const { filename: img } = req.file;

        const data = await Std.findByPk(stdId);

        if (!data) {
            return res.status(404).json({ error: "data not found" });
        }

        const subject = new Subject({
            stdId: data.stdId,
            subjectName,
            img
        });
        await subject.save();

        res.status(201).json({ subject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = addsubject;
