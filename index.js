require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const mongoURL = process.env.MONGO_URI;
const path = require("path");


const app = express();

// Middleware
app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// MongoDB Connection
mongoose.connect("mongodb+srv://smar07482:wuvc8ywKWPHWVGTg@cluster0.v9myh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
console.log("Mongo URI:", mongoURL);

// Root Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Routes
const UserRoute = require("./Route/UserRoute");
app.use("/api", UserRoute);

const BookRoute = require("./Route/BookRoute");
app.use("/api/data", BookRoute); 

const ImageRoute = require("./Route/ImageRoute");
app.use("/api", ImageRoute);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
});
