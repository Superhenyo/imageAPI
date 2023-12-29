const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'images'));
    },
    filename: (req, file, cb) => {
        const fileId = req.body.id || 'default';
        console.log(fileId)
        cb(null, `${fileId}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'images')));

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `/images/${req.file.filename}`;
    res.json({ imageUrl });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
