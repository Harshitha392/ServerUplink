// const express = require('express');
// const multer = require('multer');

// const app = express();
// const port = 30000;
// const cors = require("cors");

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage, limits: { fileSize: 40 * 1024 * 1024 } });

// app.use(cors());
// app.use(express.json());

// app.post('/upload', upload.single('test.txt'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   console.log('File uploaded:', req.file.originalname);
//   res.status(200).send('File uploaded successfully.');
// });

// // app.post('/upload', upload.single('file'), (req, res) => {
// //     if (!req.file) {
// //       return res.status(400).send('No file uploaded.');
// //     }
  
// //     console.log('File uploaded:', req.file.originalname);
// //     res.status(200).send('File uploaded successfully.');
// //   });

// // app.get("/messages", (req, res) => {
// //   const { body } = req;
// //   console.log("Received message:", body);
// //   res.status(200).send("Message received successfully!");
// // });

// app.get('/',(req,res)=>{
//     res.send("home page")
// })

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 30000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 40 * 1024 * 1024 } });

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('File uploaded:', req.file.originalname);

  // Calculate time taken for upload
  const endTime = Date.now();
  const startTime = parseInt(req.body.startTime);
  const timeTaken = endTime - startTime; // Time in milliseconds

  // Calculate uplink speed
  const fileSizeBytes = req.file.size;
  const uplinkSpeedMbps = (fileSizeBytes / timeTaken) * 8 / 1000000; // Convert bytes to Mbps

  // Respond with uplink speed
  res.status(200).json({ uplinkSpeedMbps });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
