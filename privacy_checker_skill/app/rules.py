
"""
Compliance Rules Definition.
Each rule contains keywords and patterns to detect compliance.
"""

RULES = [
    {
        "id": "R01",
        "name": "Consent Collection",
        "description": "The policy must explicitly state that user consent is obtained for data collection.",
        "keywords": ["consent", "agree", "permission", "authorization", "opt-in", "by using"],
        "recommendation": "Clearly state how you obtain user consent (e.g., 'By using our services, you agree...')."
    },
    {
        "id": "R02",
        "name": "Purpose Limitation",
        "description": "Data must only be collected for specified, explicit, and legitimate purposes.",
        "keywords": ["purpose", "usage", "used for", "collect", "order to", "reason"],
        "recommendation": "Specify exactly why data is being collected (e.g., 'to improve services', 'marketing')."
    },
    {
        "id": "R03",
        "name": "Data Retention Policy",
        "description": "The policy must specify how long data is retained.",
        "keywords": ["retention", "retain", "store", "keep", "delete after", "period", "duration"],
        "recommendation": "Define a specific retention period or criteria for deletion (e.g., 'We permit data retention for 5 years')."
    },
    {
        "id": "R04",
        "name": "Right to Deletion (Erasure)",
        "description": "Users must have the right to request deletion of their data.",
        "keywords": ["delete", "remove", "erasure", "erase", "forget", "withdraw"],
        "recommendation": "Explicitly mention the user's right to request data deletion (Right to be Forgotten)."
    },
    {
        "id": "R05",
        "name": "Third-Party Sharing",
        "description": "Disclosure of data sharing with third parties.",
        "keywords": ["share", "third-party", "third party", "partner", "vendor", "disclosure", "transfer"],
        "recommendation": "Clearly list if and with whom data is shared (e.g., 'We do not share data with third parties' or 'We share with...')."
    },
    {
        "id": "R06",
        "name": "Data Security",
        "description": "Measures taken to ensure data security.",
        "keywords": ["security", "protect", "encrypt", "ssl", "safe", "measure", "secure"],
        "recommendation": "Describe technical measures used to protect data (e.g., encryption, access controls)."
    },
    {
        "id": "R07",
        "name": "User Rights (Access & Control)",
        "description": "Users must have rights to access and control their data.",
        "keywords": ["access", "right", "control", "update", "correct", "rectify", "view"],
        "recommendation": "List user rights such as access, correction, and portability of their data."
    },
    {
        "id": "R08",
        "name": "Breach Notification",
        "description": "Procedures in case of a data breach.",
        "keywords": ["breach", "notify", "alert", "incident", "compromise", "leak"],
        "recommendation": "State that users will be notified in the event of a data breach."
    },
    {
        "id": "R09",
        "name": "Contact / Data Protection Contact",
        "description": "Contact information for data privacy concerns.",
        "keywords": ["contact", "email", "phone", "dpo", "officer", "support", "address"],
        "recommendation": "Provide clear contact details for privacy inquiries (e.g., specific email or DPO contact)."
    },
    {
        "id": "R10",
        "name": "Cookies & Tracking",
        "description": "Disclosure of cookies and tracking technologies usage.",
        "keywords": ["cookie", "track", "beacon", "analytics", "pixel", "log"],
        "recommendation": "Explain the use of cookies and how users can manage them."
    }
]
