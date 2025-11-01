const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

// Ensure storage directories exist
const DATA_DIR = path.join(__dirname);
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
const REPORTS_FILE = path.join(DATA_DIR, 'reports.json');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(REPORTS_FILE)) fs.writeFileSync(REPORTS_FILE, '[]', 'utf8');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOAD_DIR));

// MongoDB connection (use MONGODB_URI env var)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/safevoice';
let dbConnected = false;

mongoose.connect(MONGODB_URI, { dbName: 'safevoice' })
  .then(() => {
    console.log('Connected to MongoDB');
    dbConnected = true;
  })
  .catch((err) => {
    console.warn('MongoDB connect failed, falling back to file storage. Error:', err && err.message);
    dbConnected = false;
  });

// Define a simple Report model
const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: String,
  date: String,
  location: String,
  anonymous: { type: Boolean, default: true },
  attachments: [{ originalName: String, path: String, size: Number }],
  submittedAt: { type: Date, default: Date.now },
  ip: String,
}, { timestamps: true });

let ReportModel;
try {
  ReportModel = mongoose.model('Report', reportSchema);
} catch (err) {
  ReportModel = mongoose.models.Report || mongoose.model('Report', reportSchema);
}

// Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safe = file.originalname.replace(/[^a-z0-9_.-]/gi, '_');
    cb(null, `${unique}-${safe}`);
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit per file

// health
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// list reports (dev only) - prefer MongoDB when connected
app.get('/api/reports', async (req, res) => {
  if (dbConnected) {
    try {
      const docs = await ReportModel.find().sort({ createdAt: -1 }).limit(200).lean();
      return res.json({ ok: true, count: docs.length, reports: docs });
    } catch (err) {
      console.error('db read reports error', err);
      return res.status(500).json({ ok: false, error: 'failed to read reports from db' });
    }
  }

  // fallback to file
  try {
    const raw = fs.readFileSync(REPORTS_FILE, 'utf8');
    const data = JSON.parse(raw || '[]');
    res.json({ ok: true, count: data.length, reports: data });
  } catch (err) {
    console.error('read reports error', err);
    res.status(500).json({ ok: false, error: 'failed to read reports' });
  }
});

// Accept report: supports multipart/form-data (with files) or application/json
app.post('/api/reports', upload.array('attachments', 5), async (req, res) => {
  try {
    // payload may be in JSON body or in fields (multipart)
    const isMultipart = req.files && req.files.length > 0;

    let body = {};
    if (isMultipart) {
      // multer parsed files and fields
      body = { ...req.body };
      // parse booleans if needed
      if (typeof body.anonymous === 'string') {
        body.anonymous = body.anonymous === 'true' || body.anonymous === '1';
      }
    } else {
      body = req.body || {};
    }

    const description = (body.description || '').toString().trim();
    if (!description || description.length < 10) {
      return res.status(400).json({ ok: false, error: 'description must be at least 10 characters' });
    }

    const report = {
      id: Date.now() + '-' + Math.round(Math.random() * 1e9),
      description,
      category: body.category || null,
      date: body.date || null,
      location: body.location || null,
      anonymous: body.anonymous === undefined ? true : Boolean(body.anonymous),
      attachments: [],
      submittedAt: body.submittedAt || new Date().toISOString(),
      ip: req.ip,
    };

    if (isMultipart) {
      report.attachments = req.files.map((f) => ({ originalName: f.originalname, path: `/uploads/${path.basename(f.path)}`, size: f.size }));
    } else if (Array.isArray(body.attachments)) {
      report.attachments = body.attachments;
    }
    // store in MongoDB if available, otherwise append to file
    if (dbConnected) {
      try {
        const saved = await ReportModel.create({
          description: report.description,
          category: report.category,
          date: report.date,
          location: report.location,
          anonymous: report.anonymous,
          attachments: report.attachments,
          submittedAt: report.submittedAt,
          ip: report.ip,
        });
        return res.json({ ok: true, id: saved._id });
      } catch (err) {
        console.error('db save error', err);
        // fall through to file fallback
      }
    }

    // fallback: append to file
    const raw = fs.readFileSync(REPORTS_FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    arr.push(report);
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(arr, null, 2), 'utf8');

    res.json({ ok: true, id: report.id });
  } catch (err) {
    console.error('save report error', err);
    res.status(500).json({ ok: false, error: 'failed to save report' });
  }
});

app.listen(PORT, () => {
  console.log(`SafeVoice backend listening on http://localhost:${PORT}`);
});
