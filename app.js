const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const signUpRoute = require("./routes/signUpRoute")


app.use(express.json());
app.use(signUpRoute)

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.listen(port,()=>{
    console.log("server start on port 3000")
})