# Data Protection Compliance Analysis System

A multi-agent legal compliance workflow tool for analyzing data protection compliance across multiple jurisdictions, with integrated knowledge base and risk assessment capabilities.

## Features

- **Legal Identification** — Automatically identify applicable privacy laws by industry and jurisdiction with CourtListener case law integration
- **Regulation Research** — Deep-dive clause analysis with penalty case retrieval (2024–2025 enforcement data) and CourtListener supplementary references
- **Gap Analysis** — Comprehensive compliance gap assessment with DPIA 5×5 risk matrix and risk-level classification (Low / Medium / High / Severe)
- **Privacy Policy Review** — Automated privacy policy compliance auditing powered by CompliAI rule-based engine
- **Knowledge Base** — Document upload, tagging, search, and automatic integration into risk assessment workflows
- **Export Reports** — Generate detailed markdown compliance reports

## Supported Regulations

| Region | Regulation |
|--------|------------|
| European Union | GDPR |
| United Kingdom | UK GDPR |
| California (US) | CCPA / CPRA |
| Virginia (US) | VCDPA |
| China | PIPL |
| Brazil | LGPD |
| Singapore | PDPA |
| Japan | APPI |
| South Korea | PIPA |
| Australia | Privacy Act |
| India | DPDP Act |

## Quick Start

```bash
npm install
npm start
# Open http://localhost:3000
```

## Usage

1. **Phase 1 — Legal Identification**: Select industry and target country / region; the system identifies applicable privacy laws with CourtListener case law research
2. **Phase 2 — Regulation Research**: Review clause-level regulatory requirements and enforcement penalty cases with CourtListener supplementary references
3. **Phase 3 — Gap Analysis**: Complete the organizational compliance assessment to generate a prioritized gap report with DPIA risk classification
4. **Phase 4 — Privacy Policy Review**: Upload a privacy policy document for automated rule-based compliance auditing

## Knowledge Base

The knowledge base provides both a web interface and automatic background integration into compliance workflows.

### Web Interface

Click the **Knowledge Base** button in the header to open the document management panel:

- **Upload** — Drag & drop files or browse to select documents
- **Tag** — Add comma-separated tags for searchability
- **Search** — Find documents by keyword or tag filter
- **Manage** — Download or delete documents as needed

### Automatic Integration

Documents uploaded to the knowledge base are automatically referenced during gap analysis. Relevant materials appear in risk assessment reports without manual intervention.

### API Access

```bash
# Upload a document
curl -X POST http://localhost:3000/api/knowledge-base/upload \
  -F "document=@document.pdf" \
  -F "tags=GDPR,risk assessment"

# Search documents
curl "http://localhost:3000/api/knowledge-base/search?query=data%20breach"
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/knowledge-base` | List all documents |
| `POST` | `/api/knowledge-base/upload` | Upload a document |
| `DELETE` | `/api/knowledge-base/:id` | Delete a document |
| `GET` | `/api/knowledge-base/download/:id` | Download a document |
| `GET` | `/api/knowledge-base/search?query=...&tags=...` | Search documents |
| `POST` | `/api/privacy-review` | Upload privacy policy for audit |
| `GET` | `/api/courtlistener/research?lawName=...&lawAbbr=...&jurisdiction=...` | CourtListener case law research |
| `GET` | `/api/courtlistener/search?q=...` | CourtListener opinion search |

## Deploy

### GitHub Pages

1. Fork this repository
2. Go to **Settings → Pages**
3. Select **Deploy from a branch** → `main` branch
4. Site will be live at `https://yourusername.github.io/repository-name/`

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=)

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=)

## File Structure

```
├── index.html               # Main application HTML
├── app.js                   # Application logic (multi-agent workflow)
├── styles.css               # EY branding design system
├── server.js                # Local development server + API endpoints
├── penalty-methods.js       # Penalty case analysis engine
├── courtlistener_client.js  # CourtListener API v4 integration
├── privacy_checker.py       # CompliAI privacy policy checker wrapper
├── privacy_checker_skill/   # CompliAI analysis engine (Python)
├── package.json             # NPM configuration
├── knowledge-base/          # Document storage directory
├── privacy_uploads/         # Privacy policy uploads directory
└── DEPLOYMENT.md            # Detailed deployment guide
```

## License

MIT License
