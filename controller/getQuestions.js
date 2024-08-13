const Question = require("../models/questions");

const getQuestions = async (req, res) => {
    try {
        const { stdId, subId, chepterId } = req.body;

        // Fetch questions based on query parameters
        const data = await Question.find({
            stdId: stdId,
            subId: subId,
            chepterId: chepterId
        });

        // Check if any questions are found
        if (data.length === 0) {
            return res.status(404).json({ error: "Data not found" });
        }

        // Prepare response object
        const response = {
            stdId: stdId,
            subId: subId,
            chepterId: chepterId,
            questions: data.map(item => ({
                id: item._id, // Use _id for Mongoose ObjectId
                questionNo: item.questionNo,
                questions: item.questions,
                options: item.options,
                rightAns: item.rightAns,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }))
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getQuestions;
