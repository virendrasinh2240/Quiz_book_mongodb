const UserHistory = require("../models/UserHistory");
const Question = require("../models/questions");
const Chepter = require("../models/chepter");
const Subject = require("../models/subject");
const Std = require("../models/std");

const historyData = async (req, res) => {
    try {
        const { userId, stdId, subId, chepterId } = req.body;

        // Validate required parameters
        if (!userId || !stdId || !subId || !chepterId) {
            return res.status(400).json({ error: "All parameters are required" });
        }

        // Fetch user history and populate related documents
        const data = await UserHistory.find({
            userId: userId,
            stdId: stdId,
            subId: subId,
            chepterId: chepterId
        })
            .populate({
                path: 'queid', 
                populate: {
                    path: 'chepterId',
                    populate: {
                        path: 'subId',
                        populate: {
                            path: 'stdId'
                        }
                    }
                }
            });

        // Check if data is found
        if (data.length === 0) {
            return res.status(404).json({ message: "No records found" });
        }

        let totalCorrect = 0;
        let totalWrong = 0;
        const totalQuestions = data.length;

        // Map data to response format and calculate correct/incorrect answers
        const historyData = data.map(history => {
            console.log("Processing history record:", history);

            const isCorrect = history.correct_answer === history.user_answer;
            if (isCorrect) {
                totalCorrect += 1;
            } else {
                totalWrong += 1;
            }

            return {
                userId: history.userId,
                historyId: history._id, // Use _id for Mongoose ObjectId
                std: history.queid.chepterId.subId.stdId.std,
                subId: history.subId,
                subjectName: history.queid.chepterId.subId.subjectName,
                chepterNo: history.queid.chepterId.chepterNo,
                content: history.queid.chepterId.content,
                questionNo: history.queid.questionNo,
                question: history.queid.questions,
                options: history.queid.options,
                user_answer: history.user_answer,
                correct_answer: history.queid.rightAns,
                is_correct: isCorrect
            };
        });

        console.log("Total Correct: ", totalCorrect);
        console.log("Total Wrong: ", totalWrong);

        res.status(200).json({
            historyData,
            summary: {
                totalQuestions: totalQuestions,
                totalCorrect: totalCorrect,
                totalWrong: totalWrong
            }
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: e.message });
    }
};

module.exports = historyData;
