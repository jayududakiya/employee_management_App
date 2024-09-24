const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

const { upload } = require('./helpers/imageUpload')

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
      return res
        .status(200)
        .json({ userStatus: 'REGISTER_SUSSES_FULL', user:{...body , profilePicture : uploadedFilePath}});
    }
  } catch (error) {
    console.log("error", error);
  }
});

server.listen(8000, () => {
  console.log("server is running at http://localhost:8000");
});
