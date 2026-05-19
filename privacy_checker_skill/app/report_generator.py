
from flask import render_template
import datetime

def generate_report(results, score, risk_level, filename):
    """
    Render the HTML report using the Jinja2 template.
    Returns the rendered HTML string.
    """
    
    # Calculate summary stats
    compliant_count = sum(1 for r in results if r['status'] == 'Compliant')
    risky_count = sum(1 for r in results if r['status'] == 'Risky')
    missing_count = sum(1 for r in results if r['status'] == 'Missing')
    
    # Identify key issues for summary
    issues = [r['rule_name'] for r in results if r['status'] != 'Compliant']
    
    context = {
        "filename": filename,
        "generated_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "results": results,
        "score": score,
        "risk_level": risk_level,
        "compliant_count": compliant_count,
        "risky_count": risky_count,
        "missing_count": missing_count,
        "total_rules": len(results),
        "issues": issues
    }
    
    return render_template("report.html", **context)
