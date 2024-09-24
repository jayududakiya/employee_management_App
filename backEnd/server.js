const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
require('dotenv').config();
const mongoose = require("mongoose");

const { upload } = require('./helpers/imageUpload');

const User = require('./model/user.model');

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));

server.use(
  cors({
    origin: "http://localhost:5173", // allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"] // allowed headers
  })
);

server.get("/", (req, res) => {
  res.send("welcome TO Express js");
});

server.post("/api/user",upload.single('profilePicture') ,async (req, res) => {
  try {
    const body = req.body;
    const uploadedFile = req.file;
    let uploadedFilePath = ''
    console.log('uploadedFile', uploadedFile);
    if(uploadedFile !== undefined){
      uploadedFilePath = req.file.path.replace(/\\/g, "/");
    }
    if (body) {
      const user = await User.create({...body , profilePicture : uploadedFilePath});
      if(!user) return res.status(400).json({message : 'REGISTER_POROSE_FAIL'})
      return res
        .status(200)
        .json({ userStatus: 'REGISTER_SUSSES_FULL', user});
    }
  } catch (error) {
    console.log("error", error);
  }
});

const port = process.env.PORT || 8080

server.listen(port , async () => {
  console.log(`server is running at http://localhost:${port}`);
  mongoose.connect(process.env.BASE_LOCAL_API_URL).then(()=>{
    console.log('mongoDB data base is Connect...');
  }).catch((error)=>{
    console.log('Error',error);
  })
});
