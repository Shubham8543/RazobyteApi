const Bookform = require('../Schema/BookForm');
const express = require('express');
const router = express.Router();

router.post("/bookform", async (req, res) => {
    try {
        const { name, email, phone, companyname, service, message } = req.body;
        const bookform = await Bookform.create({
            name,
            dateOfEnquiry: new Date(),
            email,
            phone,
            companyname,
            service,
            message
        });
        res.status(201).json({ msg: "Data saved to database", bookform });
        console.log(bookform);
    } catch (error) {
        res.status(500).json({ msg: "Error saving data", error });
    }
});

router.get("/get", async (req, res) => {
    try {
        const bookform = await Bookform.find();
        res.status(201).json({msg:"data get done", bookform });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching data", error });
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        const bookform = await Bookform.findByIdAndDelete(req.params.id);
        if (!bookform) {
            return res.status(404).json({ msg: "Data not found" });
        }
        res.status(201).json({ msg: "Data deleted successfully", bookform });
        console.log(bookform);
    } catch (error) {
        res.status(500).json({ msg: "Error deleting data", error });
    }
});




module.exports = router;