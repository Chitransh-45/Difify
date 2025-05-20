require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { compareText, compareImages, extractOCRText } = require('./utils/comparisonUtils');
const UserRouter = require('./routers/userRouter');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/user', UserRouter);

// File upload setup
const upload = multer({ dest: 'uploads/' });

// Routes

// Compare Rich Text
app.post('/compare/rich-text', (req, res) => {
    const { oldText, newText } = req.body;
    const differences = compareText(oldText, newText, { format: 'rich' });
    res.json({ differences });
});

// Compare Redline
app.post('/compare/redline', (req, res) => {
    const { oldText, newText } = req.body;
    const differences = compareText(oldText, newText, { format: 'redline' });
    res.json({ differences });
});

// Compare Plain Text
app.post('/compare/plain-text', (req, res) => {
    const { oldText, newText } = req.body;
    const differences = compareText(oldText, newText, { format: 'plain' });
    res.json({ differences });
});

// Compare Images
app.post('/compare/images', upload.array('images', 2), async (req, res) => {
    const [oldImage, newImage] = req.files;
    const differences = await compareImages(oldImage.path, newImage.path);
    res.json({ differences });
});

// OCR Text Comparison
app.post('/compare/ocr-text', upload.array('images', 2), async (req, res) => {
    const [oldImage, newImage] = req.files;
    const oldText = await extractOCRText(oldImage.path);
    const newText = await extractOCRText(newImage.path);
    const differences = compareText(oldText, newText, { format: 'plain' });
    res.json({ differences });
});

// Find Details
app.post('/compare/find-details', (req, res) => {
    const { oldFileDetails, newFileDetails } = req.body;
    res.json({ oldFileDetails, newFileDetails });
});

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Comparison API');
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});