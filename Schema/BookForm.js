const mongose = require ("mongoose")
const BookSchema = new mongose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:Number, required:true, length:10},
    companyname:{type:String},
    service:{type:String, required:true},
    message:{type:String, required:true},
    dateOfEnquiry:{type:Date, default:Date.now}
})

const BookForm = mongose.model("BookForm",BookSchema)
module.exports = BookForm