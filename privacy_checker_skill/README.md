# CompliAI: AI-Powered Cyber-Law Compliance Assistant

## Overview
CompliAI is a deployable RegTech (Regulatory Technology) application that performs automated, first-pass compliance audits on Privacy Policy documents.

The system accepts Privacy Policies in PDF or TXT format, extracts and analyzes the content, and evaluates it against a transparent, rule-based compliance engine inspired by key GDPR privacy principles. It generates a compliance score, risk classification, and an audit-ready HTML report highlighting missing clauses, risky language, and legal red flags.

Unlike black-box legal AI tools, CompliAI focuses on explainable, deterministic, and auditable compliance checks, making it ideal for SMEs, student projects, internal audits, and preliminary legal reviews before consulting professionals.

## Features
- Upload Privacy Policy (PDF or TXT)
- Robust text extraction using pdfplumber
- Sentence-level text segmentation using NLP
- Rule-based compliance evaluation (transparent & explainable)
- Checks against core privacy principles:
      - Data collection disclosure
      - Purpose limitation
      - User rights
      - Data sharing
      - Data retention
      - Security measures
      - Contact information
      - And more
- Each rule classified as:
      - Compliant
      - Risky
      - Missing
- Weighted compliance scoring system
- Auto-generated HTML audit report
- Clear breakdown of:
      - Overall compliance score
      - Risk level
      - Failed rules
      - Actionable recommendations
- Clean web interface using Flask + HTML/CSS
- Docker-ready for easy deployment
- No API keys, no external LLM dependencies

## Tech Stack
- Python
- Flask (Web backend)
- pdfplumber (PDF text extraction)
- nltk (Sentence segmentation)
- HTML5, CSS3 (Frontend)
- Docker (Deployment)

## Project Structure

```text
COMPLIAI/
│
├── app/                           # Core backend application logic
│   ├── __init__.py                # Marks app as a Python package
│   ├── main.py                    # Application entry point (starts Flask server)
│   ├── routes.py                  # All Flask routes and request handling
│   ├── rule_engine.py             # Core compliance evaluation engine
│   ├── rules.py                   # Definitions of compliance rules and patterns
│   ├── scoring.py                 # Compliance scoring and weighting logic
│   ├── text_processor.py          # PDF/TXT extraction and sentence segmentation
│   └── report_generator.py        # HTML audit report generation logic
│
├── data/                          # Sample and test policy documents
│   ├── sample_policy.txt          # Minimal test policy for quick testing
│   ├── Privacy_Policy.txt         # Demo privacy policy (optional)
│   └── google_privacy_policy.pdf  # Real-world example policy (optional)
│
├── static/                        # Static frontend assets
│   └── styles.css                 # Application CSS styling
│
├── templates/                     # HTML templates for Flask
│   ├── index.html                 # Upload page UI
│   └── report.html                # Compliance report UI
│
├── LICENSE
├── Screenshots/                   # Screenshots
├── Dockerfile                     # Docker build configuration
├── requirements.txt               # Python dependencies
├── README.md                      # Project documentation
├── verify_app.py                  # Quick sanity-check script for core pipeline
└── .gitignore                     # Git ignore rules
```

## Screenshots

### Application Interface
![Application Interface](<screenshots/Screenshot 2026-01-15 103314.png>)

### File Upload
![File Upload](<screenshots/Screenshot 2026-01-15 103345.png>)

### Report Output
![Report Output](<screenshots/Screenshot 2026-01-15 103442.png>)


## How It Works
1. The user uploads a Privacy Policy document (PDF or TXT).
2. The system extracts raw text using format-specific parsers.
3. The text is segmented into meaningful sentences using NLP.
4. Each sentence is evaluated against a predefined rule engine.
5. Each compliance rule is marked as:
   - Compliant
   - Risky
   - Missing
6. A weighted scoring engine computes the overall compliance score.
7. The system generates:
   - Risk classification
   - Rule-by-rule analysis
   - Actionable recommendations
8. A complete HTML audit report is generated and displayed to the user.

## Installation & Setup
1. Open your IDE (VS Code is recommended).
2. Clone or download the project files to your local system.
3. Create a virtual environment to avoid dependency conflicts:
   ```bash
    python -m venv venv
    venv\Scripts\activate
4. Install the required dependencies:
    pip install -r requirements.txt
5. Run the application:
    python -m app.main
6. Open in browser:
    http://localhost:5000

## Usage
CompliAI is designed to provide a quick, first-pass compliance assessment of Privacy Policy documents. Users simply upload a policy file in PDF or TXT format through the web interface, and the system automatically extracts the text, analyzes it against a set of predefined compliance rules, and generates a detailed audit report. The report includes an overall compliance score, rule-by-rule risk classification, and actionable recommendations, enabling organizations, students, and auditors to quickly identify missing clauses, risky language, and high-risk areas before proceeding to a formal legal review.

## Why This Approach
- No external APIs → stable, private, and deployment-safe
- No black-box LLMs → fully explainable and auditable results
- Rule-based legal reasoning → predictable and transparent behavior
- Deterministic output → consistent across runs
- Mirrors how real-world compliance checklists and audit tools work in industry
- This design reflects how early-stage RegTech compliance automation systems are built in practice.

## Known Limitations
- Rule-based system → may miss nuanced legal interpretations
- Covers only core privacy principles, not full GDPR/CCPA text
- English language only
- Not a substitute for a professional legal audit

## Future Improvements
- Expand rule set to full GDPR article mapping
- Multi-language policy support
- Hybrid AI + LLM reasoning mode
- PDF export of audit reports
- Support for Terms & Conditions analysis
- Organization-level compliance dashboards
- Clause quality scoring (not just presence/absence)

## Learning Outcomes
- How to build a rule-based expert system for legal/compliance use cases
- Designing explainable AI instead of black-box systems
- Practical NLP pipeline for document analysis
- Building audit-style scoring systems
- Creating production-friendly Flask applications
- Understanding RegTech, compliance automation, and legal tech system design

This project significantly strengthened my understanding of RegTech systems, compliance automation, explainable AI, and document intelligence pipelines.

## ⚠️ Disclaimer
CompliAI provides an automated, AI-assisted compliance assessment and does not constitute legal advice.
This tool is intended for educational and preliminary audit purposes only. Always consult a qualified legal professional for official compliance certification.
