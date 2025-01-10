const image = require("../Schema/Image");
const path = require("path");
const multer = require("multer");
const fs = require("fs");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + '_' + file.originalname); 
    },
  });


  const upload = multer({ storage: storage });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });




  app.post('/create', upload.single('uploaded_file'), (req, res) => {
    console.log(req.file, req.body);
    console.log("Uploads directory:", path.join(__dirname, 'uploads'));
  
    fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
      if (err) {
        console.error("Error reading uploads directory:", err);
      } else {
        console.log("Files in uploads directory:", files);
      }
    });
  
    if (req.file) {
        res.json({ message: 'File uploaded successfully', path: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ message: 'File upload failed' });
    }
  });



  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
