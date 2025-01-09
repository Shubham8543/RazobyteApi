const usermodel = require("../Schema/Resgister");
const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const router = require("./ContectRoute");

route.get("/", async (req, res) => {
  res.send("working");
});

route.post("/register", (req, res) => {
  // Typo fixed
  try {
    const { name, email, phone, password } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const userdata = await usermodel.create({
          name,
          email,
          phone,
          password: hash,
        });
        res.status(201).json({ msg: "Data saved to database", userdata });
        console.log(hash);
      });
      let token = jwt.sign({ email }, "shuuuuubham");
      res.cookie("token", token);

      console.log(salt);
    });
  } catch (error) {
    res.status(500).json({ msg: "Error saving data", error });
  }
});

route.post("/login", async (req, res) => {
  try {
    const email=req.body.email
    const userdata = await usermodel.findOne({ email });
    
    if (!userdata) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, userdata.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" }); 
    }
    
    
    let token = jwt.sign({ email }, "shuuuuubham");
    res.cookie("token", token);
    res.status(200).json({ msg: "Login successful", userdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

route.post("/logout",  (req, res) => {
  
  try {
    res.cookie("token", "");
    res.status(200).json({success:true,message:'Logout successfully done'})
    
  } catch (error) {
    res.status(500).json({success:false,message:"Internal server error"})
  }
  
});

route.get('/authuser',async(req,res)=>{

try {
  const token=req.cookies.token;
  if(!token){

    return res.status(403).json({success:false,message:'Unauthorized:Access Denied'})
  }
  
let original=jwt.verify(token,'shuuuuubham')
console.log(original);

let userdata=await usermodel.findOne({ email :original.email});
res.status(200).json({success:true,data:userdata})
} catch (error) {
  console.log(error)
  
}


})



module.exports = route;
