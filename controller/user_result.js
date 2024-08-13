const Question = require("../models/questions");
const UserHistory = require("../models/UserHistory");
const UserResult = require("../models/userResult")
const SignUp = require("../models/signUp");
const Chepter = require("../models/chepter");
const Std = require("../models/std");
const Subject = require("../models/subject");

const user_result = async (req, res) => {
    try {
        const { userId, stdId, subId, chepterId, questions } = req.body;

        // Check if user exists
        if (userId) {
            const user = await SignUp.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        }

        // Fetch questions with related data
        const dbQuestions = await Question.find({
            stdId: stdId,
            subId: subId,
            chepterId: chepterId
        }).populate({
            path: 'chepterId',
            populate: [
                { path: 'subjectId', populate: 'stdId' }
            ]
        });

        if (dbQuestions.length === 0) {
            return res.status(404).json({ message: "Data not found" });
        }

        let totalCorrect = 0;
        let totalWrong = 0;
        const totalQuestions = questions.length;

        const questionDataArray = [];
        let stdName, subjectName, chepterNo, content;

        // Process user questions
        for (const userQuestion of questions) {
            const dbQuestion = dbQuestions.find(q => q._id.equals(userQuestion.queid));
            if (!dbQuestion) {
                return res.status(404).json({ message: `Question with ID ${userQuestion.queid} not found in the database` });
            }

            const correct = dbQuestion.rightAns === userQuestion.user_answer;
            if (correct) {
                totalCorrect += 1;
            } else {
                totalWrong += 1;
            }

            const questionData = {
                questionNo: dbQuestion.questionNo,
                question: dbQuestion.questions,
                options: dbQuestion.options,
                user_answer: userQuestion.user_answer,
                correct_answer: dbQuestion.rightAns,
                is_correct: correct
            };

            questionDataArray.push(questionData);

            if (!stdName || !subjectName || !chepterNo || !content) {
                const chepter = dbQuestion.chepterId;
                stdName = chepter.subjectId.stdId.std;
                subjectName = chepter.subjectId.subjectName;
                chepterNo = chepter.chepterNo;
                content = chepter.content;
            }
        }

        const results = {
            stdName: stdName,
            subjectName: subjectName,
            chepterNo: chepterNo,
            content: content,
            questionsData: questionDataArray
        };

        // Save user results and history
        for (const userQuestion of questions) {
            const dbQuestion = dbQuestions.find(q => q._id.equals(userQuestion.queid));
            const correct = dbQuestion.rightAns === userQuestion.user_answer;

            await UserResult.create({
                userId: userId,
                stdId: stdId,
                subId: subId,
                chepterId: chepterId,
                queid: dbQuestion._id,
                user_answer: userQuestion.user_answer,
                correct_answer: dbQuestion.rightAns,
                is_correct: correct,
            });

            await UserHistory.create({
                userId: userId,
                stdId: stdId,
                subId: subId,
                chepterId: chepterId,
                queid: dbQuestion._id,
                user_answer: userQuestion.user_answer,
                correct_answer: dbQuestion.rightAns,
                is_correct: correct,
            });
        }

        res.status(200).json({ results, totalCorrect, totalWrong, totalQuestions });

    } catch (error) {
        console.error("Error processing user results:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = user_result;
