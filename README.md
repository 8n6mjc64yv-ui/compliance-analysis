# Data Protection Compliance Analysis System

A comprehensive web-based tool for analyzing data protection compliance across multiple jurisdictions.

## Features

- **Legal Identification**: Automatically identify applicable privacy laws based on industry and country
- **Clause Analysis**: Detailed breakdown of regulatory requirements
- **Gap Analysis**: Comprehensive assessment of organizational compliance status
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

## Quick Start

### Local Development

```bash
# Install dependencies (none required - pure HTML/JS/CSS)

# Start local server
npm start
# or
node server.js

# Open in browser
open http://localhost:3000
```

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
