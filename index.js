require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
  console.log("Mongo URI:", process.env.MONGO_URI);


// Root Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Routes
const UserRoute = require("./Route/UserRoute");
app.use("/api/users", UserRoute);

const BookRoute = require("./Route/BookRoute");
app.use("/api/books", BookRoute);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
});
