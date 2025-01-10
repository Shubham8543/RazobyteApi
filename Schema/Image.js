const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        trim: true,
    },
});


const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;