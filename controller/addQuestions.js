const Question = require("../models/questions");

const addQuestions = async (req, res) => {
    try {
        const { stdId, subId, chepterId, questionNo, questions, options, rightAns } = req.body;

        const rightAnsIndex = options.indexOf(rightAns);

        if (rightAnsIndex === -1) {
            throw new Error("The right answer does not exist in the options array");
        }

        const question = new Question({
            stdId,
            subId,
            chepterId,
            questionNo,
            questions,
            options,
            rightAns: rightAnsIndex
        });

        const data = await question.save();
        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = addQuestions;
