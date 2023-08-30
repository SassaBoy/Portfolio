// Import required modules
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const multer = require('multer'); // Import multer

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-blog-6ec0b-default-rtdb.firebaseio.com",
});

  

// Create Express app
const app = express();

// Set the views directory and the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
app.get('/', (req, res) => {
    // Create a reference to the Firebase Realtime Database
    const dbRef = admin.database().ref('projects');
  
    // Listen for changes in the database
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const projects = Object.values(data); // Convert object to an array
  
      res.render('index', { projects: projects });
    });
  });
  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Generate a unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const filename = file.fieldname + '-' + uniqueSuffix + ext;
      cb(null, filename);
    }
  });
  

const upload = multer({ storage: storage });

// Get a reference to the Firebase Realtime Database
const database = admin.database();

app.post('/upload', upload.single('projectImage'), (req, res) => {
    // Access form data using req.body
    const projectName = req.body.projectName;
    const projectUrl = req.body.projectUrl;
    const projectImage = req.file ? req.file.filename : req.body.projectImage;

  
    // Save the project data to the Realtime Database
    const projectData = {
      projectName: projectName || "",
      projectUrl: projectUrl,
      projectImage: projectImage
    };
  
    // Generate a new key for the project
    const newProjectKey = database.ref().child("projects").push().key;
  
    // Write the project data to the Realtime Database
    const updates = {};
    updates["/projects/" + newProjectKey] = projectData;
  
    database.ref().update(updates)
      .then(function () {
        console.log("Project data saved successfully.");
        res.redirect('/');
      })
      .catch(function (error) {
        console.error("Error saving project data: ", error);
        res.redirect('/');
      });
  });
  
  
  

app.get('/admin', (req, res) => {
  res.render('admin');
});

// Start the server
const port = 3000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
