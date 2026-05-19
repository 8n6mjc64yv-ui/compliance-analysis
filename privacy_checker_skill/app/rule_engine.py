
from app.rules import RULES

# Words that suggest ambiguity or non-committal language
VAGUE_TERMS = ["may", "might", "could", "possibly", "sometimes", "likely", "subject to"]

def assess_compliance(sentences, cleaned_text):
    """
    Evaluate the text against defined rules.
    Returns a list of result dictionaries.
    """
    results = []
    
    # Lowercase text for easier matching
    # sentences_lower = [s.lower() for s in sentences] # Don't lose original case for display
    
    for rule in RULES:
        rule_res = {
            "rule_id": rule["id"],
            "rule_name": rule["name"],
            "description": rule["description"],
            "recommendation": rule["recommendation"],
            "status": "Missing",
            "evidence": "N/A",
            "confidence": 0.0
        }
        
        best_sentence = None
        max_keywords = 0
        
        keywords = rule.get("keywords", [])
        
        for sentence in sentences:
            sentence_lower = sentence.lower()
            match_count = sum(1 for k in keywords if k in sentence_lower)
            
            if match_count > 0:
                # If we find a better match (more keywords), take it
                if match_count > max_keywords:
                    max_keywords = match_count
                    best_sentence = sentence
        
        if best_sentence:
            rule_res["evidence"] = best_sentence
            
            # Check for ambiguity
            is_vague = any(term in best_sentence.lower() for term in VAGUE_TERMS)
            
            if is_vague:
                rule_res["status"] = "Risky"
                rule_res["confidence"] = 0.5
                rule_res["recommendation"] += " (Evidence is ambiguous/vague)"
            else:
                rule_res["status"] = "Compliant"
                rule_res["confidence"] = 0.9
        
        results.append(rule_res)
        
    return results
