const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quizbook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log("Database connected and synchronized");
})
.catch((err) => {
    console.error("Error connecting to database:", err);
});

module.exports = mongoose;
