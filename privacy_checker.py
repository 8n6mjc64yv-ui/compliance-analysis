#!/usr/bin/env python3
"""Wrapper for CompliAI Privacy Compliance Checker — outputs JSON to stdout.

Called by the Node.js server to analyze privacy policy documents.
Repository: https://github.com/Lohith0204/compliai-privacy-compliance-checker.git
"""

import sys
import json
import os

SKILL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'privacy_checker_skill')
sys.path.insert(0, os.path.join(SKILL_DIR, 'app') if os.path.isdir(os.path.join(SKILL_DIR, 'app')) else SKILL_DIR)

# Try to import from the skill directory
_skill_app = os.path.join(SKILL_DIR, 'app')
if os.path.isdir(_skill_app):
    sys.path.insert(0, _skill_app)

try:
    from text_processor import process_file
    from rule_engine import assess_compliance
    from scoring import calculate_score
except ImportError:
    # Fallback: try importing from the full path
    sys.path.insert(0, SKILL_DIR)
    from app.text_processor import process_file
    from app.rule_engine import assess_compliance
    from app.scoring import calculate_score


def analyze_file(filepath):
    """Run the full compliance analysis pipeline and return structured results."""
    sentences, cleaned_text = process_file(filepath)
    results = assess_compliance(sentences, cleaned_text)
    score, risk_level = calculate_score(results)

    compliant_count = sum(1 for r in results if r['status'] == 'Compliant')
    risky_count = sum(1 for r in results if r['status'] == 'Risky')
    missing_count = sum(1 for r in results if r['status'] == 'Missing')

    # Map risk level to our EY-aligned color scheme
    risk_color_map = {
        'Low Risk': 'green',
        'Medium Risk': 'yellow',
        'High Risk': 'red'
    }

    return {
        'success': True,
        'filename': os.path.basename(filepath),
        'score': score,
        'riskLevel': risk_level,
        'riskColor': risk_color_map.get(risk_level, 'red'),
        'summary': {
            'compliant': compliant_count,
            'risky': risky_count,
            'missing': missing_count,
            'total': len(results)
        },
        'results': results
    }


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'success': False, 'error': 'No file path provided'}))
        sys.exit(1)

    filepath = sys.argv[1]
    if not os.path.exists(filepath):
        print(json.dumps({'success': False, 'error': f'File not found: {filepath}'}))
        sys.exit(1)

    try:
        output = analyze_file(filepath)
        print(json.dumps(output, ensure_ascii=False))
    except Exception as e:
        print(json.dumps({'success': False, 'error': str(e)}, ensure_ascii=False))
        sys.exit(1)
