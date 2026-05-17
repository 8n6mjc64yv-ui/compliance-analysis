const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Ensure knowledge base directory exists
const KB_DIR = path.join(__dirname, 'knowledge-base');
fs.ensureDirSync(KB_DIR);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, KB_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'application/msword'
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, DOCX, and TXT files are allowed.'));
        }
    }
});

// Knowledge base data storage
let knowledgeBase = [];

// Load existing knowledge base
const KB_DATA_FILE = path.join(KB_DIR, 'kb-data.json');
if (fs.existsSync(KB_DATA_FILE)) {
    try {
        knowledgeBase = JSON.parse(fs.readFileSync(KB_DATA_FILE, 'utf8'));
    } catch (error) {
        console.error('Error loading knowledge base data:', error);
    }
}

// Extract text from uploaded files
async function extractText(filePath, mimetype) {
    try {
        if (mimetype === 'application/pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdfParse(dataBuffer);
            return data.text;
        } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.extractRawText({ path: filePath });
            return result.value;
        } else if (mimetype === 'text/plain' || mimetype === 'application/msword') {
            return fs.readFileSync(filePath, 'utf8');
        }
    } catch (error) {
        console.error('Error extracting text:', error);
        return '';
    }
    return '';
}

// Routes
app.get('/api/knowledge-base', (req, res) => {
    res.json(knowledgeBase);
});

app.post('/api/knowledge-base/upload', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { originalname, filename, mimetype, size } = req.file;
        const filePath = path.join(KB_DIR, filename);

        // Extract text content
        const content = await extractText(filePath, mimetype);

        // Create knowledge base entry
        const entry = {
            id: Date.now().toString(),
            filename: originalname,
            storedName: filename,
            mimetype,
            size,
            uploadDate: new Date().toISOString(),
            content: content.substring(0, 10000), // Store first 10k chars for search
            tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
        };

        knowledgeBase.push(entry);

        // Save to file
        fs.writeFileSync(KB_DATA_FILE, JSON.stringify(knowledgeBase, null, 2));

        res.json({ success: true, entry });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to process upload' });
    }
});

app.delete('/api/knowledge-base/:id', (req, res) => {
    const { id } = req.params;
    const index = knowledgeBase.findIndex(entry => entry.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Document not found' });
    }

    const entry = knowledgeBase[index];

    // Delete file
    try {
        fs.unlinkSync(path.join(KB_DIR, entry.storedName));
    } catch (error) {
        console.error('Error deleting file:', error);
    }

    // Remove from knowledge base
    knowledgeBase.splice(index, 1);
    fs.writeFileSync(KB_DATA_FILE, JSON.stringify(knowledgeBase, null, 2));

    res.json({ success: true });
});

app.get('/api/knowledge-base/search', (req, res) => {
    const { query, tags } = req.query;

    let results = knowledgeBase;

    if (query) {
        const searchTerm = query.toLowerCase();
        results = results.filter(entry =>
            entry.content.toLowerCase().includes(searchTerm) ||
            entry.filename.toLowerCase().includes(searchTerm)
        );
    }

    if (tags) {
        const tagList = tags.split(',').map(tag => tag.trim().toLowerCase());
        results = results.filter(entry =>
            entry.tags.some(tag => tagList.includes(tag.toLowerCase()))
        );
    }

    res.json(results);
});

app.get('/api/knowledge-base/download/:id', (req, res) => {
    const { id } = req.params;
    const entry = knowledgeBase.find(e => e.id === id);

    if (!entry) {
        return res.status(404).json({ error: 'Document not found' });
    }

    const filePath = path.join(KB_DIR, entry.storedName);
    res.download(filePath, entry.filename);
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║       Compliance Analysis Server Running!                  ║
╠════════════════════════════════════════════════════════════╣
║  Local:    http://localhost:${PORT}                         ║
║  Knowledge Base API: http://localhost:${PORT}/api/knowledge-base ║
╚════════════════════════════════════════════════════════════╝

Press Ctrl+C to stop the server.
`);
});
