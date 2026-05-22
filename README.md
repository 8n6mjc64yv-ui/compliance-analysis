# Data Protection Compliance Analysis System

A multi-agent legal compliance workflow tool for analyzing data protection compliance across multiple jurisdictions, with integrated knowledge base and risk assessment capabilities.

## Features

| Phase | Feature | Description |
|-------|---------|-------------|
| 1 | **Legal Identification** | Automatically identify applicable privacy laws by industry and jurisdiction with CourtListener case law research |
| 2 | **Regulation Research** | Deep-dive clause analysis with penalty case retrieval (2024–2025 enforcement data) and CourtListener supplementary references |
| 3 | **Gap Analysis** | Comprehensive compliance gap assessment with DPIA 5×5 risk framework, three-dimension risk reference tables, and risk-level classification (Low / Medium / High / Severe) |
| 4 | **Privacy Policy Review** | Automated privacy policy compliance auditing powered by CompliAI rule-based engine against core GDPR principles |
| — | **Knowledge Base** | Document upload, tagging, search, and automatic integration into risk assessment workflows |
| — | **Export Reports** | Generate and download detailed markdown compliance reports |

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

## Workflow

### Phase 1 — Legal Identification
Select industry and target jurisdiction. The system identifies applicable privacy laws and integrates CourtListener case law research for relevant privacy decisions.

### Phase 2 — Regulation Research
Review clause-level regulatory requirements organized into a compliance control matrix. Enforcement penalty cases (2024–2025) are retrieved and classified by legal provision.

### Phase 3 — Gap Analysis
Complete the three-dimension organizational compliance assessment:
- **Organizational Compliance Design Status** — governance, roles, policies, audits
- **System-Level Data Security Measures** — encryption, access control, logging, storage
- **Business Process Design Status** — consent, rights response, third-party management

Generates a prioritized gap report with DPIA 5×5 risk classification, actionable recommendations with regulatory citations, and a three-dimension risk assessment reference modal.

### Phase 4 — Privacy Policy Review
Upload a privacy policy document (PDF/TXT) for automated, rule-based compliance auditing against 10 GDPR privacy principles. Generates a compliance score, risk classification, and detailed findings table with evidence and recommendations.

## Knowledge Base

The knowledge base provides both a web interface and automatic background integration into compliance workflows.

### Web Interface

Click the **Knowledge Base** button in the header to open the document management panel:

- **Upload** — drag & drop files or browse to select documents
- **Tag** — add comma-separated tags for searchability
- **Search** — find documents by keyword or tag filter
- **Manage** — download or delete documents as needed

### Automatic Integration

Documents uploaded to the knowledge base are automatically referenced during gap analysis. Relevant materials appear in risk assessment reports without manual intervention.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/knowledge-base` | List all documents |
| `POST` | `/api/knowledge-base/upload` | Upload a document |
| `DELETE` | `/api/knowledge-base/:id` | Delete a document |
| `GET` | `/api/knowledge-base/download/:id` | Download a document |
| `GET` | `/api/knowledge-base/search?query=&tags=` | Search documents |
| `POST` | `/api/privacy-review` | Upload privacy policy for CompliAI audit |
| `POST` | `/api/courtlistener-research` | CourtListener privacy case law research |

### Knowledge Base API Examples

```bash
# Upload a document
curl -X POST http://localhost:3000/api/knowledge-base/upload \
  -F "document=@policy.pdf" \
  -F "tags=GDPR,risk assessment"

# Search documents
curl "http://localhost:3000/api/knowledge-base/search?query=data%20breach"
```

## File Structure

```
├── index.html                  # Main application HTML
├── app.js                      # Application logic (multi-agent workflow)
├── styles.css                  # EY branding design system
├── server.js                   # Express dev server + API endpoints
├── penalty-methods.js          # Penalty case analysis engine
├── courtlistener-client.js     # CourtListener API v4 integration
├── privacy_checker.py          # CompliAI privacy policy checker wrapper
├── privacy_checker_skill/      # CompliAI rule-based analysis engine (Python)
├── courtlistener-mcp/          # CourtListener MCP server (reference)
├── knowledge-base/             # Document storage directory
├── package.json                # NPM configuration
├── netlify.toml                # Netlify deployment config
├── vercel.json                 # Vercel deployment config
└── DEPLOYMENT.md               # Detailed deployment guide
```

## Deploy

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=)

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=)

### GitHub Pages

1. Fork this repository
2. Go to **Settings → Pages**
3. Select **Deploy from a branch** → `main` branch

## License

MIT License
