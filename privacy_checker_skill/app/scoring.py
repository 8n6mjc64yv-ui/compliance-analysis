
def calculate_score(results):
    """
    Calculate compliance score and risk level.
    
    Weights:
    - Compliant: 10 points
    - Risky: 5 points
    - Missing: 0 points
    
    Risk Levels:
    - 80-100: Low Risk
    - 50-79: Medium Risk
    - <50: High Risk
    """
    total_score = 0
    max_score = len(results) * 10
    
    if max_score == 0:
        return 0, "Unknown"

    for r in results:
        status = r.get('status')
        if status == 'Compliant':
            total_score += 10
        elif status == 'Risky':
            total_score += 5
        # Missing gets 0
        
    # Normalize to 100 if needed (but currently max_score is 100 with 10 rules)
    final_score = (total_score / max_score) * 100
    
    if final_score >= 80:
        risk_level = "Low Risk"
    elif final_score >= 50:
        risk_level = "Medium Risk"
    else:
        risk_level = "High Risk"
        
    return int(final_score), risk_level
