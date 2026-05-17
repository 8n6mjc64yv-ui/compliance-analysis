# Data Protection Compliance Analysis System

A comprehensive web-based tool for analyzing data protection compliance across multiple jurisdictions with integrated knowledge base for risk assessment.

## Features

- **Legal Identification**: Automatically identify applicable privacy laws based on industry and country
- **Clause Analysis**: Detailed breakdown of regulatory requirements
- **Gap Analysis**: Comprehensive assessment of organizational compliance status with automatic knowledge base integration
- **Knowledge Base**: Background document processing for enhanced risk assessment (no UI - agent-only)
- **Export Reports**: Generate detailed markdown reports

## Supported Regulations

- GDPR (EU)
- UK GDPR
- CCPA (California)
- PIPL (China)
- LGPD (Brazil)
- PDPA (Singapore)
- APPI (Japan)
- And more...

## Knowledge Base Feature

The knowledge base provides both automatic background processing and a user interface for document management:

### **Web Interface (Recommended)**
1. **Access**: Click the "Knowledge Base" button in the top-right corner of the main page
2. **Upload**: Drag & drop files or click "Browse Files" to select documents
3. **Tag**: Add relevant tags (comma-separated) for better searchability
4. **Search**: Use the search box to find specific documents
5. **Manage**: Download or delete documents as needed

### **Automatic Integration**
- Documents are automatically referenced during gap analysis
- Relevant documents appear in risk assessment reports
- No manual intervention required for compliance workflows

### **API Access (Advanced)**
For programmatic access or integration with other tools:

```bash
# Upload via API
curl -X POST http://localhost:3000/api/knowledge-base/upload \
  -F "document=@document.pdf" \
  -F "tags=GDPR,risk assessment"
```

```bash
# Install dependencies
npm install

# Start local server
npm start
# or
node server.js

# Open in browser
open http://localhost:3000
```

### Using the Knowledge Base (API)

```bash
# Upload a document
curl -X POST http://localhost:3000/api/knowledge-base/upload \
  -F "document=@your-document.pdf" \
  -F "tags=GDPR,risk assessment"

# Search documents
curl "http://localhost:3000/api/knowledge-base/search?query=data%20breach"
```

### Using the Knowledge Base

1. Complete the gap analysis (Phases 1-3)
2. Navigate to Phase 4: Knowledge Base & Risk Assessment
3. Upload reference documents with relevant tags
4. Use search or risk category filters to find relevant materials
5. Access documents during risk assessment workflows

## API Endpoints

- `GET /api/knowledge-base` - List all documents
- `POST /api/knowledge-base/upload` - Upload a document
- `DELETE /api/knowledge-base/:id` - Delete a document
- `GET /api/knowledge-base/download/:id` - Download a document
- `GET /api/knowledge-base/search?query=...&tags=...` - Search documents

## Deploy Your Own

### Option 1: One-Click Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=)

### Option 2: Deploy to GitHub Pages

1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → `main` branch
4. Your site will be live at `https://yourusername.github.io/repository-name/`

### Option 3: Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=)

## Usage

1. **Phase 1 - Legal Identification**: Select your industry and target country
2. **Phase 2 - Clause Analysis**: Review applicable legal requirements
3. **Phase 3 - Gap Analysis**: Fill in organizational details and generate compliance report

## File Structure

```
├── index.html          # Main HTML file
├── app.js              # Application logic
├── styles.css          # Styling
├── server.js           # Local development server
├── package.json        # NPM configuration
└── DEPLOYMENT.md       # Detailed deployment guide
```

## Contributing

Feel free to submit issues and enhancement requests.

## License

MIT License
