const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userSignUp = require('../controller/userSignUp');
const deleteUser = require('../controller/userDelete');
const varifyUser = require('../controller/varifyUser');
const loginUser = require('../controller/loginUser');
const getProfile = require('../controller/profile');
const updateProfile = require("../controller/updateProfile")
const addstd = require("../controller/addstd")
const addsubject = require("../controller/addSubject")
const getStd = require("../controller/getStd")
const addChepter = require("../controller/addChepter")
const getChepter = require("../controller/getChepter")
const addQuestions = require("../controller/addQuestions")
const getQuestions = require("../controller/getQuestions")
const user_result = require("../controller/user_result")
const profession = require("../controller/profession")
const gender = require("../controller/gender")
const history = require("../controller/history")
const logOut = require("../controller/logout")


const verifyAuthToken = require('../middleware/auth');

const uploadDir = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = function (req, file, cb) {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("File must be PNG, JPEG, or JPG format"));
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/users/signUp', upload.single('userProfile'), userSignUp);
router.post('/users/verify', varifyUser);
router.post('/users/login', loginUser);
router.delete('/users/delete', deleteUser);
router.get('/profile', verifyAuthToken, getProfile);
router.patch("/profile/update", verifyAuthToken, upload.single('userProfile'), updateProfile)
router.post("/addstd",verifyAuthToken,addstd)
router.post("/addsubject", upload.single('img'),addsubject)
router.get("/std",getStd)
router.post("/std/subject/addChepter",verifyAuthToken,addChepter)
router.get("/std/subject/chepter",getChepter)
router.post("/std/subject/chepter/addQuestions",verifyAuthToken,addQuestions)
router.get("/std/subject/chepter/questions",getQuestions)
router.post("/results",verifyAuthToken,user_result)
router.get("/users/profession",profession)
router.get("/users/gender",verifyAuthToken,gender)
router.get("/history",verifyAuthToken,history)
router.post("/user/logout",verifyAuthToken,logOut)



module.exports = router;
