require('dotenv').config();
const express = require ("express");
const mongoose = require("mongoose");
const app = express()
const cors =require("cors")
const cookieParser = require("cookie-parser");
const bodyParser=require('body-parser')
// const cookieParser = require('cookie-parser')








app.use(cookieParser())
app.use(bodyParser.json())


app.use(cors())
app.use (express.json())
app.use(express.urlencoded({ extended: true }))


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected!");

}

app.get("/",(req,res)=>{
    res.send("API is working!")
})

// importing the usermodel//

const UserRoute =require("./Route/UserRoute")
app.use("/api",UserRoute)

const BookRoute =require("./Route/BookRoute")
app.use("/api",BookRoute)




const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server wroking on the port ${PORT}`)
})
