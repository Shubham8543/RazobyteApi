const express = require("express");
const router = express.Router();
const Book = require("../Schema/BookForm"); // Replace with your actual model

// GET route
router.get("/get", async (req, res) => {
  try {
    const books = await Book.find(); // Adjust query as needed
    res.status(200).json({ msg: "Data fetched successfully", data: books });
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ msg: "Error fetching books", error: error.message });
  }
});

// POST route
router.post("/add", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json({ msg: "Data added successfully", data: savedBook });
  } catch (error) {
    console.error("Error saving book:", error.message);
    res.status(500).json({ msg: "Error saving book", error: error.message });
  }
});

// DELETE route
router.delete("/delete/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id); // Fixed here
    if (!book) {
      return res.status(404).json({ msg: "Data not found" });
    }
    res.status(201).json({ msg: "Data deleted successfully", book });
  } catch (error) {
    console.error("Error deleting book:", error.message);
    res.status(500).json({ msg: "Error deleting book", error: error.message });
  }
});

module.exports = router;
