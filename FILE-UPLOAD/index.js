const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();

const PORT = 7000;

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

// Render homepage with no image initially
app.get("/", (req, res) => {
    res.render("homepage", { imageUrl: null });
});

// Handle file upload and render the homepage with image URL
app.post("/upload", upload.single('profileImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.render("homepage", { imageUrl });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
