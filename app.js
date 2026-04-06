// Data Protection Compliance Analysis System
// Multi-Agent Legal Compliance Workflow

class ComplianceAnalysisSystem {
    constructor() {
        this.currentPhase = 1;
        this.analysisData = {
            industry: null,
            country: null,
            laws: [],
            selectedLaw: null,
            controlMatrix: [],
            businessInfo: null,
            gapReport: null
        };

        this.lawsDatabase = this.initLawsDatabase();
        this.initEventListeners();
    }

    initLawsDatabase() {
        return {
            EU: {
                name: 'European Union',
                laws: [
                    {
                        id: 'gdpr',
                        name: 'General Data Protection Regulation',
                        abbr: 'GDPR',
                        regulator: 'European Data Protection Board (EDPB)',
                        type: 'Primary Law',
                        keyPoints: 'Comprehensive data protection, consent requirements, data subject rights, cross-border transfer restrictions',
                        clauses: this.getGDPRClauses()
                    },
                    {
                        id: 'eda',
                        name: 'ePrivacy Directive',
                        abbr: 'ePrivacy',
                        regulator: 'National Telecom Regulators',
                        type: 'Primary Law',
                        keyPoints: 'Cookies tracking, electronic communications privacy, direct marketing rules',
                        clauses: this.getEPrivacyClauses()
                    },
                    {
                        id: 'edpb-guidelines',
                        name: 'EDPB Guidelines',
                        abbr: 'EDPB Guidelines',
                        regulator: 'European Data Protection Board (EDPB)',
                        type: 'Official Guidance',
                        keyPoints: 'Interpretative guidelines on GDPR provisions, consent, transparency, data subject rights, etc.',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'scc',
                        name: 'Standard Contractual Clauses (EU)',
                        abbr: 'SCCs',
                        regulator: 'European Commission',
                        type: 'Implementing Decision',
                        keyPoints: 'Pre-approved contractual clauses for cross-border data transfers outside EEA',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'eu-us-dpf',
                        name: 'EU-US Data Privacy Framework',
                        abbr: 'EU-US DPF',
                        regulator: 'European Commission',
                        type: 'Adequacy Decision',
                        keyPoints: 'Adequacy decision for transfers to US companies participating in the Data Privacy Framework',
                        clauses: this.getGenericClauses()
                    }
                ]
            },
            US: {
                name: 'United States',
                laws: [
                    {
                        id: 'ccpa',
                        name: 'California Consumer Privacy Act',
                        abbr: 'CCPA/CPRA',
                        regulator: 'California Privacy Protection Agency',
                        type: 'Primary Law',
                        keyPoints: 'Consumer rights, opt-out mechanisms, data sale restrictions, private right of action',
                        clauses: this.getCCPAClauses()
                    },
                    {
                        id: 'hipaa',
                        name: 'Health Insurance Portability and Accountability Act',
                        abbr: 'HIPAA',
                        regulator: 'HHS Office for Civil Rights',
                        type: 'Primary Law',
                        keyPoints: 'Protected health information, security rules, breach notification',
                        clauses: this.getHIPAAClauses()
                    },
                    {
                        id: 'glba',
                        name: 'Gramm-Leach-Bliley Act',
                        abbr: 'GLBA',
                        regulator: 'FTC, Federal Banking Agencies',
                        type: 'Primary Law',
                        keyPoints: 'Financial privacy, safeguards rule, pretexting protection',
                        clauses: this.getGLBAClauses()
                    },
                    {
                        id: 'ftc-safeguards',
                        name: 'FTC Safeguards Rule',
                        abbr: 'FTC Safeguards',
                        regulator: 'Federal Trade Commission',
                        type: 'Regulation',
                        keyPoints: 'Requires financial institutions to develop, implement, and maintain comprehensive information security programs',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'nist-csf',
                        name: 'NIST Cybersecurity Framework',
                        abbr: 'NIST CSF',
                        regulator: 'National Institute of Standards and Technology',
                        type: 'Guideline',
                        keyPoints: 'Voluntary framework for managing cybersecurity risk, consisting of standards, guidelines, and best practices',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'pci-dss',
                        name: 'Payment Card Industry Data Security Standard',
                        abbr: 'PCI DSS',
                        regulator: 'PCI Security Standards Council',
                        type: 'Industry Standard',
                        keyPoints: 'Security standard for organizations handling credit card transactions, requiring security controls and monitoring',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'hipaa-privacy-rule',
                        name: 'HIPAA Privacy Rule',
                        abbr: 'HIPAA Privacy',
                        regulator: 'HHS Office for Civil Rights',
                        type: 'Regulation',
                        keyPoints: 'Standards for protection of individually identifiable health information, use and disclosure limitations',
                        clauses: this.getGenericClauses()
                    }
                ]
            },
            CN: {
                name: 'China',
                laws: [
                    {
                        id: 'pipl',
                        name: 'Personal Information Protection Law',
                        abbr: 'PIPL',
                        regulator: 'Cyberspace Administration of China (CAC)',
                        type: 'Primary Law',
                        keyPoints: 'Consent requirements, cross-border transfer restrictions, data localization, sensitive personal information',
                        clauses: this.getPIPLClauses()
                    },
                    {
                        id: 'dsl',
                        name: 'Data Security Law',
                        abbr: 'DSL',
                        regulator: 'Cyberspace Administration of China',
                        type: 'Primary Law',
                        keyPoints: 'Data classification, security protection obligations, national security considerations',
                        clauses: this.getDSLClauses()
                    },
                    {
                        id: 'cybersecurity-law',
                        name: 'Cybersecurity Law',
                        abbr: 'CSL',
                        regulator: 'Cyberspace Administration of China',
                        type: 'Primary Law',
                        keyPoints: 'Network security obligations, critical information infrastructure, data localization',
                        clauses: this.getCSLClauses()
                    },
                    {
                        id: 'cross-border-assessment',
                        name: 'Measures for Security Assessment of Cross-border Data Transfer',
                        abbr: 'Cross-border Assessment',
                        regulator: 'Cyberspace Administration of China',
                        type: 'Departmental Regulation',
                        keyPoints: 'Security assessment requirements for cross-border data transfers, data localization obligations',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'personal-info-spec',
                        name: 'Personal Information Security Specification (GB/T 35273)',
                        abbr: 'GB/T 35273',
                        regulator: 'Standardization Administration of China',
                        type: 'National Standard',
                        keyPoints: 'Technical requirements for personal information security, including collection, storage, use, sharing, and deletion',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'cybersecurity-classified',
                        name: 'Guidelines for Cybersecurity Classified Protection',
                        abbr: 'MLPS 2.0',
                        regulator: 'Ministry of Industry and Information Technology',
                        type: 'Guideline',
                        keyPoints: 'Multi-Level Protection Scheme requirements for network operators, security classification, and compliance obligations',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'data-security-draft',
                        name: 'Draft Measures for Data Security Management',
                        abbr: 'Draft Data Security',
                        regulator: 'Cyberspace Administration of China',
                        type: 'Draft Opinion',
                        keyPoints: 'Proposed regulations for data security management, data classification, and protection requirements',
                        clauses: this.getGenericClauses()
                    }
                ]
            },
            UK: {
                name: 'United Kingdom',
                laws: [
                    {
                        id: 'uk-gdpr',
                        name: 'UK General Data Protection Regulation',
                        abbr: 'UK GDPR',
                        regulator: 'Information Commissioner\'s Office (ICO)',
                        type: 'Primary Law',
                        keyPoints: 'Post-Brexit adaptation of EU GDPR, enhanced DPA 2018 provisions',
                        clauses: this.getUKGDPRClauses()
                    },
                    {
                        id: 'dpa-2018',
                        name: 'Data Protection Act 2018',
                        abbr: 'DPA 2018',
                        regulator: 'Information Commissioner\'s Office',
                        type: 'Primary Law',
                        keyPoints: 'UK data protection legislation implementing GDPR, law enforcement data processing, intelligence services processing',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'ico-guidance',
                        name: 'ICO Guidance',
                        abbr: 'ICO Guidance',
                        regulator: 'Information Commissioner\'s Office',
                        type: 'Official Guidance',
                        keyPoints: 'Guidance on data protection compliance, rights, security, breach notification, and international transfers',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'uk-idta',
                        name: 'UK International Data Transfer Agreement',
                        abbr: 'UK IDTA',
                        regulator: 'Information Commissioner\'s Office',
                        type: 'Implementing Decision',
                        keyPoints: 'Standard contractual clauses for international data transfers from UK, replacing EU SCCs',
                        clauses: this.getGenericClauses()
                    }
                ]
            },
            JP: {
                name: 'Japan',
                laws: [
                    {
                        id: 'appi',
                        name: 'Act on Protection of Personal Information',
                        abbr: 'APPI',
                        regulator: 'Personal Information Protection Commission (PPC)',
                        type: 'Primary Law',
                        keyPoints: 'Consent requirements, cross-border transfer rules, pseudonymized information',
                        clauses: this.getAPPIClauses()
                    },
                    {
                        id: 'ppc-guidelines',
                        name: 'PPC Guidelines',
                        abbr: 'PPC Guidelines',
                        regulator: 'Personal Information Protection Commission',
                        type: 'Official Guidance',
                        keyPoints: 'Guidelines on APPI implementation, cross-border transfers, consent, and security measures',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'appi-amendment',
                        name: 'Act on the Protection of Personal Information (Amendment)',
                        abbr: 'APPI Amendment',
                        regulator: 'Personal Information Protection Commission',
                        type: 'Primary Law',
                        keyPoints: '2020 amendments to APPI introducing data breach notification, pseudonymized information, and enhanced penalties',
                        clauses: this.getGenericClauses()
                    }
                ]
            },
            SG: {
                name: 'Singapore',
                laws: [
                    {
                        id: 'pdpa',
                        name: 'Personal Data Protection Act',
                        abbr: 'PDPA',
                        regulator: 'Personal Data Protection Commission (PDPC)',
                        type: 'Primary Law',
                        keyPoints: 'Consent, purpose limitation, data protection policies, Do Not Call Registry',
                        clauses: this.getPDPAClauses()
                    },
                    {
                        id: 'pdpc-advisory',
                        name: 'PDPC Advisory Guidelines',
                        abbr: 'PDPC Guidelines',
                        regulator: 'Personal Data Protection Commission',
                        type: 'Official Guidance',
                        keyPoints: 'Guidance on PDPA implementation, consent exceptions, data breach notification, and compliance',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'data-protection-trustmark',
                        name: 'Data Protection Trustmark',
                        abbr: 'DPTM',
                        regulator: 'Personal Data Protection Commission',
                        type: 'Certification Scheme',
                        keyPoints: 'Voluntary certification scheme demonstrating compliance with PDPA and data protection best practices',
                        clauses: this.getGenericClauses()
                    }
                ]
            },
            BR: {
                name: 'Brazil',
                laws: [
                    {
                        id: 'lgpd',
                        name: 'Lei Geral de Proteção de Dados',
                        abbr: 'LGPD',
                        regulator: 'Autoridade Nacional de Proteção de Dados (ANPD)',
                        type: 'Primary Law',
                        keyPoints: 'Broad consent requirements, data subject rights, DPO appointment',
                        clauses: this.getLGPDClauses()
                    },
                    {
                        id: 'anpd-resolutions',
                        name: 'ANPD Resolutions',
                        abbr: 'ANPD Resolutions',
                        regulator: 'Autoridade Nacional de Proteção de Dados',
                        type: 'Regulation',
                        keyPoints: 'Resolutions detailing LGPD implementation, data subject rights procedures, and security requirements',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'lgpd-regulation',
                        name: 'LGPD Regulation',
                        abbr: 'LGPD Regulation',
                        regulator: 'Autoridade Nacional de Proteção de Dados',
                        type: 'Regulation',
                        keyPoints: 'Detailed regulatory provisions for LGPD compliance, including data processing records, impact assessments, and international transfers',
                        clauses: this.getGenericClauses()
                    }
                ]
            },
            KR: {
                name: 'South Korea',
                laws: [
                    {
                        id: 'pipa',
                        name: 'Personal Information Protection Act',
                        abbr: 'PIPA',
                        regulator: 'Personal Information Protection Commission',
                        type: 'Primary Law',
                        keyPoints: 'Strict consent requirements, data breach notification, cross-border transfer restrictions',
                        clauses: this.getPIPAClauses()
                    },
                    {
                        id: 'pipc-guidelines',
                        name: 'PIPC Guidelines',
                        abbr: 'PIPC Guidelines',
                        regulator: 'Personal Information Protection Commission',
                        type: 'Official Guidance',
                        keyPoints: 'Guidelines on PIPA implementation, consent requirements, data breach notification, and cross-border transfers',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'network-act',
                        name: 'Network Act',
                        abbr: 'Network Act',
                        regulator: 'Korea Communications Commission',
                        type: 'Primary Law',
                        keyPoints: 'Regulates network security, data protection, and telecommunications privacy in South Korea',
                        clauses: this.getGenericClauses()
                    }
                ]
            },
            AU: {
                name: 'Australia',
                laws: [
                    {
                        id: 'privacy-act',
                        name: 'Privacy Act 1988',
                        abbr: 'Privacy Act',
                        regulator: 'Office of the Australian Information Commissioner',
                        type: 'Primary Law',
                        keyPoints: 'Australian Privacy Principles, data breach notification, cross-border disclosure',
                        clauses: this.getPrivacyActClauses()
                    },
                    {
                        id: 'oaic-guidelines',
                        name: 'OAIC Guidelines',
                        abbr: 'OAIC Guidelines',
                        regulator: 'Office of the Australian Information Commissioner',
                        type: 'Official Guidance',
                        keyPoints: 'Guidance on Privacy Act compliance, Australian Privacy Principles, data breach response, and cross-border data flows',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'ndb-scheme',
                        name: 'Notifiable Data Breaches Scheme',
                        abbr: 'NDB Scheme',
                        regulator: 'Office of the Australian Information Commissioner',
                        type: 'Regulation',
                        keyPoints: 'Mandatory data breach notification scheme requiring organizations to notify individuals and OAIC of eligible data breaches',
                        clauses: this.getGenericClauses()
                    }
                ]
            },
            IN: {
                name: 'India',
                laws: [
                    {
                        id: 'dpdp',
                        name: 'Digital Personal Data Protection Act',
                        abbr: 'DPDPA',
                        regulator: 'Data Protection Board of India',
                        type: 'Primary Law',
                        keyPoints: 'Consent management, data fiduciary obligations, cross-border transfer',
                        clauses: this.getDPDPAClauses()
                    },
                    {
                        id: 'meity-rules',
                        name: 'MeitY Rules',
                        abbr: 'MeitY Rules',
                        regulator: 'Ministry of Electronics and Information Technology',
                        type: 'Regulation',
                        keyPoints: 'Detailed rules for DPDPA implementation, consent mechanisms, data fiduciary obligations, and cross-border transfers',
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'dpb-guidelines',
                        name: 'Data Protection Board Guidelines',
                        abbr: 'DPB Guidelines',
                        regulator: 'Data Protection Board of India',
                        type: 'Official Guidance',
                        keyPoints: 'Guidelines on DPDPA compliance, complaint handling, enforcement, and penalty determination',
                        clauses: this.getGenericClauses()
                    }
                ]
            }
        };
    }

    // Clause definitions for different laws
    getGDPRClauses() {
        return [
            // Article 5 - Data Processing Principles (broken down by sub-article)
            {
                clause: 'Art. 5(1)(a)',
                domain: 'Data Processing Principles',
                requirement: 'Process personal data lawfully, fairly and in a transparent manner',
                subject: 'All Controllers/Processors',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'EDPB Guidelines: Lawfulness requires a valid legal basis. Fairness means not processing in ways that are unduly detrimental or unexpected. Transparency requires clear communication about processing.'
            },
            {
                clause: 'Art. 5(1)(b)',
                domain: 'Data Processing Principles',
                requirement: 'Collect for specified, explicit and legitimate purposes (purpose limitation)',
                subject: 'All Controllers/Processors',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Purpose limitation: Data collected for one purpose cannot be used for incompatible purposes. Purpose specification must be documented.'
            },
            {
                clause: 'Art. 5(1)(c)',
                domain: 'Data Processing Principles',
                requirement: 'Adequate, relevant and limited to what is necessary (data minimization)',
                subject: 'All Controllers/Processors',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Data minimization: Collect only data necessary for specified purposes. Regular review of data collection practices required.'
            },
            {
                clause: 'Art. 5(1)(d)',
                domain: 'Data Processing Principles',
                requirement: 'Accurate and, where necessary, kept up to date',
                subject: 'All Controllers/Processors',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Accuracy: Take reasonable steps to ensure accuracy. Implement processes to update or rectify inaccurate data.'
            },
            {
                clause: 'Art. 5(1)(e)',
                domain: 'Data Processing Principles',
                requirement: 'Kept in a form which permits identification for no longer than necessary (storage limitation)',
                subject: 'All Controllers/Processors',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Storage limitation: Define retention periods based on purposes. Implement automatic deletion/anonymization processes.'
            },
            {
                clause: 'Art. 5(1)(f)',
                domain: 'Data Processing Principles',
                requirement: 'Processed in a manner ensuring appropriate security (integrity and confidentiality)',
                subject: 'All Controllers/Processors',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Security: Implement technical and organizational measures to protect against unauthorized processing, accidental loss, destruction or damage.'
            },
            {
                clause: 'Art. 5(2)',
                domain: 'Data Processing Principles',
                requirement: 'Controller responsible for and able to demonstrate compliance (accountability)',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Accountability: Maintain documentation, implement policies, conduct DPIAs, appoint DPO if required, implement security measures.'
            },

            // Article 6 - Lawful Basis (broken down by basis)
            {
                clause: 'Art. 6(1)(a)',
                domain: 'Lawful Basis',
                requirement: 'Data subject has given consent for specific purposes',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Consent must be: freely given, specific, informed, unambiguous, and withdrawable. Pre-ticked boxes invalid.'
            },
            {
                clause: 'Art. 6(1)(b)',
                domain: 'Lawful Basis',
                requirement: 'Processing necessary for performance of a contract',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Must be objectively necessary for contract performance. Cannot rely on this basis for additional, unrelated processing.'
            },
            {
                clause: 'Art. 6(1)(c)',
                domain: 'Lawful Basis',
                requirement: 'Processing necessary for compliance with legal obligation',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Legal obligation must be laid down by EU or Member State law. Document the specific legal obligation.'
            },
            {
                clause: 'Art. 6(1)(d)',
                domain: 'Lawful Basis',
                requirement: 'Processing necessary to protect vital interests',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Limited to life-or-death situations. Typically applies in medical emergencies.'
            },
            {
                clause: 'Art. 6(1)(e)',
                domain: 'Lawful Basis',
                requirement: 'Processing necessary for performance of a task in public interest or official authority',
                subject: 'Public Authorities/Entities',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Must be based on EU or Member State law. Applies to public authorities exercising official powers.'
            },
            {
                clause: 'Art. 6(1)(f)',
                domain: 'Lawful Basis',
                requirement: 'Processing necessary for legitimate interests pursued by controller or third party',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Requires Legitimate Interest Assessment (LIA) balancing controller vs. data subject interests. Not available to public authorities.'
            },

            // Article 7 - Consent Conditions
            {
                clause: 'Art. 7(1)',
                domain: 'Consent',
                requirement: 'Controller must be able to demonstrate data subject has consented',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Maintain records of consent: who, when, how, what was consented to. Consent must be verifiable.'
            },
            {
                clause: 'Art. 7(2)',
                domain: 'Consent',
                requirement: 'Consent must be distinguishable from other matters and in intelligible, easily accessible form',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Cannot bundle consent with terms and conditions. Must use clear and plain language.'
            },
            {
                clause: 'Art. 7(3)',
                domain: 'Consent',
                requirement: 'Data subject has right to withdraw consent at any time; withdrawal must be as easy as giving consent',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Provide easy-to-use withdrawal mechanisms. Process withdrawals promptly. Inform data subjects of withdrawal right before consent.'
            },
            {
                clause: 'Art. 7(4)',
                domain: 'Consent',
                requirement: 'Assessment of whether consent is freely given must consider if performance of contract conditional on consent',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Cannot make provision of services conditional on consent for unnecessary processing. Assess power imbalance.'
            },

            // Article 8 - Child\'s Consent
            {
                clause: 'Art. 8',
                domain: 'Child Consent',
                requirement: 'For information society services, processing child\'s personal data based on consent only lawful if child is at least 16 (Member States may lower to 13)',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Must make reasonable efforts to verify age and obtain parental/guardian consent for children below threshold. Age verification mechanisms required.'
            },

            // Article 9 - Special Categories of Data
            {
                clause: 'Art. 9(1)',
                domain: 'Special Category Data',
                requirement: 'Processing of special categories prohibited unless exceptions apply',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Special categories: racial/ethnic origin, political opinions, religious/philosophical beliefs, trade union membership, genetic data, biometric data, health data, sex life/orientation data.'
            },
            {
                clause: 'Art. 9(2)(a)',
                domain: 'Special Category Data',
                requirement: 'Explicit consent for specific purposes',
                subject: 'Data Controllers',
                mandatory: 'Conditional',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Explicit consent requires clear affirmative action. Higher standard than regular consent. Must specify special categories being processed.'
            },

            // Article 13 - Information when data collected from data subject
            {
                clause: 'Art. 13(1)',
                domain: 'Transparency',
                requirement: 'Provide identity and contact details of controller, DPO contact if applicable',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'Must provide at time of collection. Include: name, address, contact information. If representative appointed, include their details.'
            },
            {
                clause: 'Art. 13(2)',
                domain: 'Transparency',
                requirement: 'Provide purposes and legal basis for processing',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'Specify all purposes. Indicate specific legal basis (e.g., Art. 6(1)(a) consent). If legitimate interests, indicate the interests.'
            },
            {
                clause: 'Art. 13(3)',
                domain: 'Transparency',
                requirement: 'Inform about recipients or categories of recipients of personal data',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'Identify specific recipients or categories (e.g., "payment processors", "cloud providers"). Update if recipients change.'
            },

            // Article 14 - Information when data not obtained from data subject
            {
                clause: 'Art. 14(1)',
                domain: 'Transparency',
                requirement: 'Provide information to data subject within reasonable period after obtaining personal data',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'Within one month of obtaining data, or at first communication, or before disclosure to another recipient.'
            },

            // Article 15 - Right of access
            {
                clause: 'Art. 15(1)',
                domain: 'Data Subject Rights',
                requirement: 'Data subject has right to obtain confirmation of processing and access to personal data',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Must provide: purposes, categories, recipients, retention period, rights, source of data, automated decision-making information.'
            },

            // Article 16 - Right to rectification
            {
                clause: 'Art. 16',
                domain: 'Data Subject Rights',
                requirement: 'Data subject has right to obtain rectification of inaccurate personal data',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Rectify without undue delay. Take reasonable steps to notify recipients of rectification if possible.'
            },

            // Article 17 - Right to erasure
            {
                clause: 'Art. 17(1)',
                domain: 'Data Subject Rights',
                requirement: 'Right to erasure when: data no longer necessary, consent withdrawn, objection to processing, unlawful processing, legal obligation',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Exceptions: freedom of expression, legal claims, public health, archiving in public interest, legal obligations.'
            },

            // Article 18 - Right to restriction of processing
            {
                clause: 'Art. 18(1)',
                domain: 'Data Subject Rights',
                requirement: 'Right to restriction when: accuracy contested, unlawful processing, no longer needed but required for legal claims',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'May store data but not process except with consent, legal claims, protection of rights, or important public interest.'
            },

            // Article 20 - Right to data portability
            {
                clause: 'Art. 20(1)',
                domain: 'Data Subject Rights',
                requirement: 'Right to receive personal data in structured, commonly used, machine-readable format',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Applies to data provided by data subject and processed by automated means based on consent or contract.'
            },

            // Article 21 - Right to object
            {
                clause: 'Art. 21(1)',
                domain: 'Data Subject Rights',
                requirement: 'Right to object to processing based on legitimate interests or public task',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Must demonstrate compelling legitimate grounds overriding interests, rights and freedoms, or establishment/exercise/defence of legal claims.'
            },

            // Article 22 - Automated decision-making
            {
                clause: 'Art. 22(1)',
                domain: 'Data Subject Rights',
                requirement: 'Right not to be subject to automated decision-making producing legal effects or similarly significant effects',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Exceptions: necessary for contract, authorized by law, based on explicit consent. Safeguards include right to human intervention.'
            },

            // Article 25 - Data protection by design and by default
            {
                clause: 'Art. 25(1)',
                domain: 'Privacy by Design',
                requirement: 'Implement appropriate technical and organizational measures to implement data protection principles',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'Measures include: pseudonymization, data minimization, enabling exercise of rights, security. Consider state of art, costs, nature/scope/purposes.'
            },

            // Article 28 - Processor
            {
                clause: 'Art. 28(1)',
                domain: 'Processor Relationships',
                requirement: 'Use only processors providing sufficient guarantees to implement appropriate measures',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'Ensure processors meet GDPR requirements. Processor must not engage another processor without authorization.'
            },

            // Article 30 - Records of processing activities
            {
                clause: 'Art. 30(1)',
                domain: 'Documentation',
                requirement: 'Maintain records of processing activities under controller\'s responsibility',
                subject: 'Data Controllers',
                mandatory: 'Conditional',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'Required for organizations with 250+ employees, or processing likely to result in risk, not occasional, or includes special categories/criminal data.'
            },

            // Article 32 - Security of processing
            {
                clause: 'Art. 32(1)',
                domain: 'Security',
                requirement: 'Implement appropriate technical and organizational measures to ensure security',
                subject: 'Controllers/Processors',
                mandatory: 'Yes',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'Measures include: pseudonymization, encryption, confidentiality, availability, resilience, restoration, regular testing.'
            },

            // Article 33 - Notification of personal data breach to supervisory authority
            {
                clause: 'Art. 33(1)',
                domain: 'Breach Notification',
                requirement: 'Notify supervisory authority within 72 hours of becoming aware of breach',
                subject: 'Data Controllers',
                mandatory: 'Yes',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: '72 hours starts when controller becomes aware. If delay beyond 72 hours, provide reasons. Document all breaches.'
            },

            // Article 34 - Communication of personal data breach to data subject
            {
                clause: 'Art. 34(1)',
                domain: 'Breach Notification',
                requirement: 'Notify data subjects without undue delay if high risk to rights and freedoms',
                subject: 'Data Controllers',
                mandatory: 'Conditional',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'High risk assessment considers: nature, sensitivity, volume, likelihood of harm, special characteristics of data subjects.'
            },

            // Article 35 - Data protection impact assessment
            {
                clause: 'Art. 35(1)',
                domain: 'DPIA',
                requirement: 'Conduct DPIA where processing likely to result in high risk',
                subject: 'Data Controllers',
                mandatory: 'Conditional',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'High-risk processing: systematic evaluation/scoring, large-scale special categories, monitoring publicly accessible areas.'
            },

            // Article 37 - Designation of data protection officer
            {
                clause: 'Art. 37(1)',
                domain: 'DPO',
                requirement: 'Appoint DPO if: public authority, core activities require regular monitoring on large scale, core activities involve large-scale special categories/criminal data',
                subject: 'Data Controllers',
                mandatory: 'Conditional',
                penalty: 'Up to €10M or 2% global turnover',
                guidelines: 'DPO must have expert knowledge, report to highest management, be independent, not receive instructions.'
            },

            // Article 44 - General principle for transfers
            {
                clause: 'Art. 44',
                domain: 'Cross-border Transfer',
                requirement: 'Any transfer subject to other GDPR provisions and conditions in Chapter V',
                subject: 'Controllers/Processors',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% global turnover',
                guidelines: 'Transfer includes onward transfer. All conditions must be cumulatively met.'
            },

            // Excluded clauses documentation
            {
                clause: 'Art. 85-91',
                domain: 'Administrative Provisions',
                requirement: 'Various administrative provisions including exemptions for journalistic, academic, artistic, literary expression',
                subject: 'Specific Entities',
                mandatory: 'Conditional',
                penalty: 'Varies',
                guidelines: 'These articles provide specific exemptions and procedures for particular sectors and situations.',
                excluded: true,
                exclusionReason: 'Sector-specific exemptions not applicable to general compliance requirements for most organizations.'
            }
        ];
    }

    getEPrivacyClauses() {
        return [
            {
                clause: 'Art. 5',
                domain: 'Confidentiality',
                requirement: 'Ensure confidentiality of communications; prohibit interception without consent',
                subject: 'Service Providers',
                mandatory: 'Yes',
                penalty: 'Member state penalties',
                guidelines: 'EDPB Guidelines 05/2021 on the interplay between ePrivacy Directive and GDPR: Confidentiality obligations apply to all electronic communications, including metadata. Service providers must secure networks against interception. Member states may provide specific implementation rules.'
            },
            {
                clause: 'Art. 5(3)',
                domain: 'Cookies',
                requirement: 'Obtain consent for storing/accessing information on terminal equipment; provide clear information',
                subject: 'Website Operators',
                mandatory: 'Yes',
                penalty: 'Up to €20M or 4% turnover',
                guidelines: 'EDPB Guidelines 05/2020 on consent under ePrivacy Directive: Cookie consent requires active opt-in. Pre-checked boxes are invalid. Cookies strictly necessary for service provision are exempt. Cookie banners must: provide clear information, allow granular choices, make rejection as easy as acceptance. Transparency requirements include cookie duration and purposes.'
            }
        ];
    }

    getCCPAClauses() {
        return [
            {
                clause: '§1798.100',
                domain: 'Right to Know',
                requirement: 'Provide notice at collection; disclose categories and specific pieces of personal information upon request',
                subject: 'Businesses',
                mandatory: 'Yes',
                penalty: '$7,500 per intentional violation',
                guidelines: 'California Attorney General CCPA Regulations (Title 11, Cal. Code of Regulations): Notice at collection must include: categories of personal information collected, purposes for use, whether information is sold/shared, retention period. Privacy policy must be accessible. Response to access requests must be provided within 45 days (extendable to 90 days).'
            },
            {
                clause: '§1798.105',
                domain: 'Right to Delete',
                requirement: 'Delete personal information upon verified request; notify service providers',
                subject: 'Businesses',
                mandatory: 'Yes',
                penalty: '$7,500 per intentional violation',
                guidelines: 'CA AG Regulations §999.1090: Verify requestor identity before deletion. Exceptions include: complete transactions, detect security incidents, debug/repair, exercise free speech, comply with legal obligations, enable internal uses reasonably aligned with consumer expectations. Must notify all service providers within 90 days.'
            },
            {
                clause: '§1798.110',
                domain: 'Disclosure Obligations',
                requirement: 'Provide privacy policy with required disclosures; respond to access requests within 45 days',
                subject: 'Businesses',
                mandatory: 'Yes',
                penalty: '$2,500 per violation',
                guidelines: 'CA AG Regulations §999.306-999.314: Privacy policy must include: description of rights, categories of personal information collected/sold, purposes, retention periods, how to exercise rights. "Do Not Sell" link required on homepage. Must disclose specific pieces of information upon verified request.'
            },
            {
                clause: '§1798.120',
                domain: 'Right to Opt-Out',
                requirement: 'Provide clear opt-out mechanism for sale/sharing of personal information; honor Global Privacy Control signals',
                subject: 'Businesses',
                mandatory: 'Yes',
                penalty: '$7,500 per intentional violation',
                guidelines: 'CA AG Regulations §999.315: "Do Not Sell or Share My Personal Information" link required. Must honor Global Privacy Control (GPC) signals as valid opt-out requests. Opt-out must be easy to find and use. Must wait 12 months before asking consumer to opt-in again. CPRA amendments require treating sharing as sale.'
            },
            {
                clause: '§1798.125',
                domain: 'Non-Discrimination',
                requirement: 'Do not discriminate against consumers exercising CCPA rights; may offer financial incentives',
                subject: 'Businesses',
                mandatory: 'Yes',
                penalty: '$7,500 per intentional violation',
                guidelines: 'CA AG Regulations §999.330-999.332: Cannot deny goods/services, charge different prices, or provide different quality of service based on consumer exercising CCPA rights. Financial incentives for data collection permitted if: not discriminatory, voluntary, terms clearly described, consumer can withdraw. Loyalty programs are allowed if participation is not conditioned on data sale.'
            },
            {
                clause: '§1798.140',
                domain: 'Service Provider Requirements',
                requirement: 'Contract with service providers limiting use of personal information; ensure no sale/sharing',
                subject: 'Businesses',
                mandatory: 'Yes',
                penalty: '$7,500 per intentional violation',
                guidelines: 'CA AG Regulations §999.324: Contracts with service providers must: prohibit selling/sharing personal information, prohibit retaining/using/disclosing for other purposes, prohibit combining with other data except for fraud prevention. Contracts with contractors have similar requirements. Service providers must notify businesses of unauthorized use.'
            }
        ];
    }

    getHIPAAClauses() {
        return [
            {
                clause: '§164.502',
                domain: 'Uses and Disclosures',
                requirement: 'Limit uses/disclosures of PHI to permitted purposes; obtain authorization for other uses',
                subject: 'Covered Entities',
                mandatory: 'Yes',
                penalty: 'Up to $1.5M per violation category/year',
                guidelines: 'HHS OCR HIPAA Privacy Rule Guidance: Permitted uses include: treatment, payment, healthcare operations, public health activities, health oversight, research with IRB approval. Minimum necessary standard applies to most disclosures. Authorization required for: marketing, sale of PHI, psychotherapy notes. Business Associate Agreements required for all vendors handling PHI.'
            },
            {
                clause: '§164.524',
                domain: 'Access Rights',
                requirement: 'Provide individuals access to their PHI within 30 days; provide copy in requested format',
                subject: 'Covered Entities',
                mandatory: 'Yes',
                penalty: 'Up to $1.5M per violation category/year',
                guidelines: 'HHS OCR Right of Access Guidance (2020): Must respond within 30 days (extendable by 30 days with notice). Cannot charge more than reasonable cost-based fee. Must provide in format requested if readily producible. Cannot require individuals to come in person or use portal. Cannot deny access for non-payment. Must provide electronic copies when requested.'
            },
            {
                clause: '§164.530',
                domain: 'Administrative Requirements',
                requirement: 'Designate privacy officer; train workforce; implement safeguards; maintain policies',
                subject: 'Covered Entities',
                mandatory: 'Yes',
                penalty: 'Up to $1.5M per violation category/year',
                guidelines: 'HHS OCR Administrative Safeguards Guidance: Privacy Officer must be designated with clear responsibilities. Workforce training must occur: upon hiring, when functions change, when policies change. Sanctions for violations must be applied consistently. Policies must be retained for 6 years from creation or last effective date.'
            },
            {
                clause: '§164.404',
                domain: 'Breach Notification',
                requirement: 'Notify affected individuals within 60 days; notify HHS and media for large breaches',
                subject: 'Covered Entities',
                mandatory: 'Yes',
                penalty: 'Up to $1.5M per violation category/year',
                guidelines: 'HHS OCR Breach Notification Guidance: Breach is unauthorized acquisition, access, use, or disclosure of unsecured PHI. Risk assessment considers: nature and extent of PHI involved, unauthorized person who used/received, whether actually viewed, extent of risk mitigation. Notification must include: description, types of information, steps to protect, contact information.'
            },
            {
                clause: '§164.312',
                domain: 'Technical Safeguards',
                requirement: 'Implement access controls, audit controls, integrity controls, transmission security',
                subject: 'Covered Entities',
                mandatory: 'Yes',
                penalty: 'Up to $1.5M per violation category/year',
                guidelines: 'HHS OCR Technical Safeguards Guidance: Access controls: unique user identification, emergency access procedure, automatic logoff, encryption/decryption. Audit controls: hardware, software, and procedural mechanisms to record and examine system activity. Integrity controls: mechanisms to authenticate electronic PHI. Transmission security: integrity controls and encryption (addressable).'
            }
        ];
    }

    getGLBAClauses() {
        return [
            {
                clause: '§6801',
                domain: 'Privacy Notice',
                requirement: 'Provide clear privacy notice explaining information sharing practices',
                subject: 'Financial Institutions',
                mandatory: 'Yes',
                penalty: 'Up to $100,000 per violation',
                guidelines: 'FTC Financial Privacy Rule (Regulation S-P): Initial privacy notice must be provided when customer relationship is established. Annual notice required for continuing customers. Notice must include: categories of information collected, categories of information disclosed, categories of affiliates/non-affiliates, opt-out rights. Model privacy notice forms provided by FTC.'
            },
            {
                clause: '§6802',
                domain: 'Opt-Out Rights',
                requirement: 'Provide opt-out mechanism for sharing nonpublic personal information with non-affiliates',
                subject: 'Financial Institutions',
                mandatory: 'Yes',
                penalty: 'Up to $100,000 per violation',
                guidelines: 'FTC Regulation S-P §313.7: Must provide reasonable opt-out method (toll-free number, reply form, electronic mechanism). 30-day opt-out period before sharing. Exceptions: processing/underwriting, joint marketing with affiliates (with agreement), disclosures to service providers (with contract limiting use), legally required disclosures.'
            },
            {
                clause: '§6801(b)',
                domain: 'Safeguards Rule',
                requirement: 'Implement comprehensive information security program',
                subject: 'Financial Institutions',
                mandatory: 'Yes',
                penalty: 'Up to $100,000 per violation',
                guidelines: 'FTC Safeguards Rule (16 CFR Part 314, amended 2021): Must designate qualified Chief Information Security Officer. Risk assessment required. Information security program must include: access controls, data inventory and classification, encryption of customer information, secure development practices, multi-factor authentication, secure disposal, change management. Annual reporting to board of directors required. Effective date: June 2023.'
            }
        ];
    }

    getPIPLClauses() {
        return [
            {
                clause: 'Art. 5',
                domain: 'Processing Principles',
                requirement: 'Process based on principles: lawful, proper, necessary, good faith; minimize data collection',
                subject: 'Personal Information Handlers',
                mandatory: 'Yes',
                penalty: 'Up to 5% annual revenue or suspension',
                guidelines: 'CAC Personal Information Protection Law Implementation Guidelines (个人信息保护法实施指南): Principle of necessity requires collecting only minimum information necessary for stated purposes. Purpose limitation: cannot use personal information for purposes not disclosed at collection. Consent must be obtained for each specific purpose. Data minimization requires regular review and deletion of unnecessary data.'
            },
            {
                clause: 'Art. 13-15',
                domain: 'Consent Requirements',
                requirement: 'Obtain informed, voluntary consent; provide full disclosure; allow easy withdrawal',
                subject: 'Personal Information Handlers',
                mandatory: 'Yes',
                penalty: 'Up to 5% annual revenue',
                guidelines: 'CAC Rules on Scope and Security Assessment of Cross-border Data Transfer (数据出境安全评估办法): Consent must be: fully informed, freely given, specific, clear. Handlers must disclose: handler identity, contact information, purposes, methods, types, retention period, rights and how to exercise. Withdrawal must be as convenient as providing consent. Special consent required for sensitive personal information.'
            },
            {
                clause: 'Art. 21-23',
                domain: 'Cross-border Transfer',
                requirement: 'Conduct security assessment for cross-border transfers; obtain certification or standard contract',
                subject: 'Personal Information Handlers',
                mandatory: 'Yes',
                penalty: 'Up to 5% annual revenue',
                guidelines: 'CAC Measures for Security Assessment of Cross-border Data Transfer (数据出境安全评估办法, 2022): Security assessment required for: CIIOs, handlers processing >1M individuals\' data, cross-border transfers of >100K individuals\' PI or >10K sensitive PI. Standard Contract issued by CAC (June 2023) available for smaller transfers. Certification by CAC-designated institutions. Transfer impact assessment required.'
            },
            {
                clause: 'Art. 24',
                domain: 'Security Obligations',
                requirement: 'Implement security measures; conduct regular compliance audits; appoint DPO if required',
                subject: 'Personal Information Handlers',
                mandatory: 'Yes',
                penalty: 'Up to 5% annual revenue',
                guidelines: 'CAC Personal Information Security Specification (GB/T 35273-2020): Security measures include: encryption, access control, audit logging, security incident response. DPO required for: CIIOs, handlers processing large-scale PI, sensitive PI processors. Regular security assessments must be conducted. Personal information protection impact assessment required for high-risk processing.'
            },
            {
                clause: 'Art. 28',
                domain: 'Sensitive Personal Information',
                requirement: 'Obtain separate consent for sensitive personal information; provide specific purpose necessity explanation',
                subject: 'Personal Information Handlers',
                mandatory: 'Yes',
                penalty: 'Up to 5% annual revenue',
                guidelines: 'CAC Personal Information Security Specification (GB/T 35273-2020): Sensitive PI includes: biometric, religious belief, health, financial account, location tracking, minors under 14. Processing requires: specific purpose necessity explanation, strict protection measures. For minors under 14: parental/guardian consent required, specific protection measures, dedicated privacy policy.'
            },
            {
                clause: 'Art. 51-57',
                domain: 'Data Localization',
                requirement: 'Store within China personal information collected in China; critical information infrastructure operators subject to stricter rules',
                subject: 'CIIO/Handlers',
                mandatory: 'Conditional',
                penalty: 'Up to 5% annual revenue',
                guidelines: 'CAC Cybersecurity Law and Data Security Law Provisions: CIIOs must store personal information and important data within China. For non-CIIO handlers: storage within China required unless security assessment passed for cross-border transfer. Data export security assessment valid for 2 years. Important data catalog to be published by each industry regulator.'
            }
        ];
    }

    getDSLClauses() {
        return [
            {
                clause: 'Art. 21',
                domain: 'Data Classification',
                requirement: 'Classify data into common, important, and core data; implement graded protection measures',
                subject: 'All Data Processors',
                mandatory: 'Yes',
                penalty: 'Up to 10M RMB or criminal liability',
                guidelines: 'CAC Data Security Law Implementation Guidelines (数据安全法实施指南): Classification levels: (1) Common data - general protection; (2) Important data - enhanced protection, cross-border restrictions; (3) Core data - strictest protection, national security implications. Each industry regulator publishes important data catalog. Classification must be documented and regularly reviewed.'
            },
            {
                clause: 'Art. 27',
                domain: 'Security Protection',
                requirement: 'Implement security measures proportionate to data classification level',
                subject: 'All Data Processors',
                mandatory: 'Yes',
                penalty: 'Up to 10M RMB',
                guidelines: 'CAC Data Security Management Measures (数据安全管理办法): Must establish: data security management system, data classification catalog, risk assessment procedures. Security measures proportionate to classification: encryption for important/core data, access controls, audit logging, security training. Regular security assessments: annually for important data handlers, upon significant changes.'
            },
            {
                clause: 'Art. 31',
                domain: 'Cross-border Transfer',
                requirement: 'Conduct security assessment for important data exports',
                subject: 'CIIO/Handlers',
                mandatory: 'Conditional',
                penalty: 'Up to 10M RMB',
                guidelines: 'CAC Measures for Security Assessment of Cross-border Data Transfer: Export of important data requires security assessment. Assessment considers: necessity of export, impact on national security, data receiver\'s protection capability, legal environment in destination country. Security assessment required before transfer. Report to authorities if changes affect assessment.'
            }
        ];
    }

    getCSLClauses() {
        return [
            {
                clause: 'Art. 21',
                domain: 'Network Security',
                requirement: 'Implement network security systems; adopt technical measures to prevent data breach',
                subject: 'Network Operators',
                mandatory: 'Yes',
                penalty: 'Up to 1M RMB',
                guidelines: 'MIIT Cybersecurity Law Implementation Guidelines (网络安全法实施指南): Network operators must: implement multi-level protection scheme (MLPS), deploy firewall and intrusion detection, conduct regular security testing, establish incident response plans, preserve network logs for at least 6 months. MLPS level 2+ requires third-party assessment. Critical infrastructure operators must undergo annual security review.'
            },
            {
                clause: 'Art. 37',
                domain: 'Data Localization',
                requirement: 'Store personal information and important data within China for CIIOs',
                subject: 'CIIO',
                mandatory: 'Conditional',
                penalty: 'Up to 500K RMB',
                guidelines: 'CAC Measures for Security Assessment of Cross-border Data Transfer: CIIO identification criteria: telecommunications, energy, transport, water, finance, e-government, defense. Must store PI and important data within China. Cross-border transfer requires security assessment by CAC. Must conduct annual security assessment and report to regulator. Data export log must be maintained.'
            },
            {
                clause: 'Art. 42',
                domain: 'Breach Notification',
                requirement: 'Report security incidents to authorities; notify affected users',
                subject: 'Network Operators',
                mandatory: 'Yes',
                penalty: 'Up to 100K RMB',
                guidelines: 'CAC Cybersecurity Incident Response Guidelines: Report to local cybersecurity department within 1 hour of discovering major incident. Notify affected users promptly. Major incidents: large-scale data breach, system failure affecting public services, cyber attack. Must preserve evidence for at least 6 months. Must maintain incident log and report annually.'
            }
        ];
    }

    getUKGDPRClauses() {
        const clauses = this.getGDPRClauses();
        // Add UK-specific guidelines
        clauses.forEach(c => {
            c.guidelines = c.guidelines.replace(/EDPB/g, 'ICO').replace(/supervisory authority/g, 'ICO');
            if (c.clause === 'Art. 44-49') {
                c.guidelines = 'ICO International Transfers Guidance (2022): UK adequacy decisions apply to EEA and certain other jurisdictions. International Data Transfer Agreement (IDTA) replaces EU SCCs for UK transfers. Transfer Risk Assessment required. ICO model clauses available. UK Extension to EU SCCs permitted with modifications.';
            }
        });
        return clauses;
    }

    getAPPIClauses() {
        return [
            {
                clause: 'Art. 15-18',
                domain: 'Processing Principles',
                requirement: 'Process based on proper basis; notify purpose; ensure accuracy; maintain security',
                subject: 'Business Operators',
                mandatory: 'Yes',
                penalty: 'Up to 100M JPY',
                guidelines: 'PPC Enforcement Rules and Guidelines: Purpose must be notified at or before collection. Purpose change requires individual consent. Must take reasonable steps to ensure accuracy. Security measures: encryption, access control, employee training. Must establish internal rules for handling personal information. Pseudonymized information has separate requirements (Art. 2-2).'
            },
            {
                clause: 'Art. 20',
                domain: 'Consent',
                requirement: 'Obtain prior consent for sensitive personal information',
                subject: 'Business Operators',
                mandatory: 'Yes',
                penalty: 'Up to 100M JPY',
                guidelines: 'PPC Guidelines on Sensitive Personal Information: Sensitive PI includes: race, creed, social status, medical history, criminal records, victim of crime. Consent must be obtained in writing or electronic form. Exceptions: law enforcement, public health, employee management. Must implement stricter security measures for sensitive PI.'
            },
            {
                clause: 'Art. 28',
                domain: 'Cross-border Transfer',
                requirement: 'Provide equivalent protection for international transfers; notify PPC',
                subject: 'Business Operators',
                mandatory: 'Yes',
                penalty: 'Up to 100M JPY',
                guidelines: 'PPC Enforcement Rules Art. 16: Must provide equivalent protection in destination country. Options: (1) destination has equivalent protection standards, (2) data recipient has adequate protection system, (3) alternative measures with PPC approval. Must notify PPC before international transfer. List of countries with equivalent protection published by PPC. Contract provisions required for non-equivalent countries.'
            }
        ];
    }

    getPDPAClauses() {
        return [
            {
                clause: 'PDPA s.18',
                domain: 'Consent',
                requirement: 'Obtain consent before collecting, using, or disclosing personal data',
                subject: 'Organizations',
                mandatory: 'Yes',
                penalty: 'Up to SGD 1M',
                guidelines: 'PDPC Advisory Guidelines on Key Concepts (2021): Consent must be: knowing, voluntary, not obtained by false/misleading conduct. Deemed consent applies when notice given and no opt-out. Legitimate interests exception requires balancing test. Notification must include: purposes, consequences of not providing consent. Consent withdrawal must be processed within 10 business days.'
            },
            {
                clause: 'PDPA s.24',
                domain: 'Data Protection Policies',
                requirement: 'Develop and implement data protection policies and practices',
                subject: 'Organizations',
                mandatory: 'Yes',
                penalty: 'Up to SGD 1M',
                guidelines: 'PDPC Guide to Data Protection Practices: Must appoint DPO and publish contact. Policies must address: data retention, access control, incident response. Must implement: reasonable security arrangements, data breach response procedures. Regular training and awareness programs required. Data protection trustmark certification encouraged.'
            },
            {
                clause: 'PDPA s.26',
                domain: 'Breach Notification',
                requirement: 'Notify PDPC of notifiable data breaches within 3 days',
                subject: 'Organizations',
                mandatory: 'Yes',
                penalty: 'Up to SGD 1M',
                guidelines: 'PDPC Advisory Guidelines on Data Breach Notification (2021): Notifiable breach: significant harm likely, affects 500+ individuals, significant harm to affected individuals. Must notify PDPC within 3 days of assessment. Notify affected individuals as soon as practicable. Notification content: circumstances of breach, types of data, measures to address, contact information.'
            }
        ];
    }

    getLGPDClauses() {
        return [
            {
                clause: 'Art. 7',
                domain: 'Legal Basis',
                requirement: 'Process based on one of 10 legal bases including consent, contract, legal obligation',
                subject: 'Controllers',
                mandatory: 'Yes',
                penalty: 'Up to 2% revenue, max 50M BRL',
                guidelines: 'ANPD LGPD Guidance (Orientações da ANPD): Legal bases: (1) consent, (2) legal/regulatory compliance, (3) public administration, (4) research, (5) contract performance, (6) exercise of rights, (7) life protection, (8) health protection, (9) legitimate interest, (10) credit protection. Legitimate interest requires balancing test. Consent must be: free, informed, unambiguous, for specific purposes.'
            },
            {
                clause: 'Art. 17-22',
                domain: 'Data Subject Rights',
                requirement: 'Enable rights: access, correction, deletion, portability, information about sharing',
                subject: 'Controllers',
                mandatory: 'Yes',
                penalty: 'Up to 2% revenue, max 50M BRL',
                guidelines: 'ANPD Resolution on Data Subject Rights: Must respond to requests within 15 days (simplified) or within reasonable timeframe. Rights include: confirmation of processing, access to data, correction, anonymization/blocking/deletion, portability, information about sharing, withdrawal of consent. No fee for most requests. Must verify identity. May refuse if clearly unfounded or excessive.'
            },
            {
                clause: 'Art. 41',
                domain: 'DPO',
                requirement: 'Appoint Data Protection Officer',
                subject: 'Controllers',
                mandatory: 'Yes',
                penalty: 'Up to 2% revenue, max 50M BRL',
                guidelines: 'ANPD Resolution CD/ANPD No. 4/2021 on DPO: DPO must be: person with technical knowledge, Brazilian or foreign company with representation in Brazil. Must publish DPO contact details. DPO responsibilities: receive complaints, guide employees, issue reports, monitor compliance. Small processing agents may be exempt. Public bodies must appoint DPO.'
            },
            {
                clause: 'Art. 48',
                domain: 'Breach Notification',
                requirement: 'Notify ANPD and data subjects of security incidents within reasonable time',
                subject: 'Controllers',
                mandatory: 'Yes',
                penalty: 'Up to 2% revenue, max 50M BRL',
                guidelines: 'ANPD Resolution on Security Incident Notification: Notify ANPD within 3 working days of becoming aware of incident with risk to data subjects. Notify affected individuals if risk of damage. Notification content: nature of data, affected subjects, security measures, risk analysis, mitigation measures. Maintain incident register. Documentation required for 5 years.'
            }
        ];
    }

    getPIPAClauses() {
        return [
            {
                clause: 'Art. 15',
                domain: 'Consent',
                requirement: 'Obtain clear and specific consent before processing personal information',
                subject: 'Personal Information Controllers',
                mandatory: 'Yes',
                penalty: 'Up to 4% revenue',
                guidelines: 'PIPC Personal Information Protection Guidelines (개인정보 보호 가이드라인): Consent must be: clear, specific, in writing. Must disclose: purpose, items collected, retention period, right to refuse and consequences. Consent for sensitive information requires separate consent. Must maintain consent records. Consent withdrawal must be as easy as giving consent. Exceptions: law, contract, public interest.'
            },
            {
                clause: 'Art. 28',
                domain: 'Security Measures',
                requirement: 'Implement technical and administrative safeguards',
                subject: 'Personal Information Controllers',
                mandatory: 'Yes',
                penalty: 'Up to 3% revenue',
                guidelines: 'PIPC Standard Security Measures Guidelines: Technical measures: encryption, access control, firewall, intrusion detection, security logging. Administrative measures: internal policies, access management, training, incident response. Physical measures: access control to facilities. Annual security audits required. Must designate Chief Privacy Officer. Security measures proportionate to sensitivity and volume.'
            },
            {
                clause: 'Art. 34',
                domain: 'Breach Notification',
                requirement: 'Notify affected individuals and PIPC of data breaches',
                subject: 'Personal Information Controllers',
                mandatory: 'Yes',
                penalty: 'Up to 3% revenue',
                guidelines: 'PIPC Data Breach Notification Guidelines: Notify within 72 hours of discovery. Notify PIPC and affected individuals. Notification content: type of breach, affected data items, measures taken, contact for assistance. Must display notice on website for 30 days. Must maintain breach log. Report to PIPC required for: leakage of personal information to external parties, hacking incidents.'
            },
            {
                clause: 'Art. 33',
                domain: 'Cross-border Transfer',
                requirement: 'Ensure adequate protection for international transfers',
                subject: 'Personal Information Controllers',
                mandatory: 'Yes',
                penalty: 'Up to 3% revenue',
                guidelines: 'PIPC Cross-border Transfer Guidelines: Transfer permitted if: (1) consent obtained, (2) equivalent protection in destination country, (3) contract with adequate protection, (4) PIPC approval. Must notify PIPC of cross-border transfer. Adequacy decisions by PIPC for specific countries. Standard contractual clauses available. Transfer impact assessment recommended.'
            }
        ];
    }

    getPrivacyActClauses() {
        return [
            {
                clause: 'APP 1',
                domain: 'Open and Transparent Management',
                requirement: 'Manage personal information openly and transparently; have privacy policy',
                subject: 'APP Entities',
                mandatory: 'Yes',
                penalty: 'Up to AUD 50M',
                guidelines: 'OAIC Australian Privacy Principles Guidelines (2022): Privacy policy must include: kinds of personal information collected, how collected, purposes of collection, how information held, how to access and correct, complaint process. Must be publicly available, easily understood, up-to-date. Must provide on request. Privacy policy must be reviewed regularly.'
            },
            {
                clause: 'APP 3',
                domain: 'Collection',
                requirement: 'Collect only necessary information; collect directly from individual when reasonable',
                subject: 'APP Entities',
                mandatory: 'Yes',
                penalty: 'Up to AUD 50M',
                guidelines: 'OAIC APP 3 Guidelines: Must collect only what is reasonably necessary for functions/activities. Must collect directly from individual unless: impracticable, unreasonable, individual consents to indirect collection. Must notify individual at or before collection: identity, how to contact, purpose, consequences of not providing. Sensitive information requires consent.'
            },
            {
                clause: 'APP 6',
                domain: 'Use and Disclosure',
                requirement: 'Use/disclose personal information only for primary purpose or permitted secondary purposes',
                subject: 'APP Entities',
                mandatory: 'Yes',
                penalty: 'Up to AUD 50M',
                guidelines: 'OAIC APP 6 Guidelines: Secondary use permitted for: related purposes individual would reasonably expect, unrelated purposes with consent, required/authorized by law, health/safety, enforcement activities. Must document use/disclosure. For overseas disclosure, must ensure recipient complies with APPs or use approved binding scheme.'
            },
            {
                clause: 'APP 11',
                domain: 'Security',
                requirement: 'Take reasonable steps to protect personal information; destroy/deidentify when no longer needed',
                subject: 'APP Entities',
                mandatory: 'Yes',
                penalty: 'Up to AUD 50M',
                guidelines: 'OAIC APP 11 Guidelines: Security measures: encryption, access controls, security audits, staff training, incident response plans. Reasonable steps determined by: sensitivity of information, harm from breach, size of entity, data volume. Must destroy/deidentify when no longer needed for any permitted purpose. Retention limits required. Notifiable data breaches must be assessed within 30 days.'
            },
            {
                clause: 'NDB s.26WH',
                domain: 'Breach Notification',
                requirement: 'Notify OAIC and affected individuals of eligible data breaches',
                subject: 'APP Entities',
                mandatory: 'Yes',
                penalty: 'Up to AUD 50M',
                guidelines: 'OAIC Notifiable Data Breaches Guide: Eligible data breach: unauthorized access/disclosure, loss of device, data made public, likely to result in serious harm. Assessment within 30 days of becoming aware. Notify OAIC and individuals if eligible breach. Notification content: identity, description, kinds of information, recommendations. Statement to OAIC required. Must maintain breach register.'
            }
        ];
    }

    getDPDPAClauses() {
        return [
            {
                clause: 'Sec. 4-6',
                domain: 'Processing Grounds',
                requirement: 'Process only for lawful purpose with valid consent or other specified grounds',
                subject: 'Data Fiduciaries',
                mandatory: 'Yes',
                penalty: 'Up to 250 crore INR',
                guidelines: 'MeitY DPDPA Implementation Guidelines: Consent must be: free, specific, informed, unambiguous, clear, unconditional. Notice must include: purposes, manner of processing, right to withdraw consent, grievance officer contact. Other grounds: employment, medical emergency, disaster relief, employment benefits. Children\'s data requires verifiable parental consent. Significant Data Fiduciaries subject to additional obligations.'
            },
            {
                clause: 'Sec. 8',
                domain: 'Obligations',
                requirement: 'Implement security safeguards; delete data when purpose fulfilled; handle complaints',
                subject: 'Data Fiduciaries',
                mandatory: 'Yes',
                penalty: 'Up to 250 crore INR',
                guidelines: 'MeitY DPDPA Obligations Guidelines: Must implement: reasonable security safeguards proportionate to data volume and sensitivity, data retention limits, erasure when purpose fulfilled, grievance redressal mechanism (respond within 48 hours). Significant Data Fiduciaries: appoint DPO, conduct DPIA, audit, impact assessment. Must maintain processing records.'
            },
            {
                clause: 'Sec. 16-17',
                domain: 'Cross-border Transfer',
                requirement: 'Transfer only to countries not prohibited by government',
                subject: 'Data Fiduciaries',
                mandatory: 'Yes',
                penalty: 'Up to 250 crore INR',
                guidelines: 'MeitY Cross-border Transfer Rules: Central Government will notify: blacklist of prohibited countries, conditions for transfer. Default position: transfer permitted unless prohibited. Must ensure adequate level of protection. Standard contractual clauses may be prescribed. Data Fiduciary must verify recipient\'s compliance. Notification of restricted countries will be published by MeitY.'
            }
        ];
    }

    getGenericClauses() {
        return [
            {
                clause: 'General',
                domain: 'Supplementary Norm',
                requirement: 'Refer to official documentation for detailed requirements',
                subject: 'All applicable entities',
                mandatory: 'Varies',
                penalty: 'Varies',
                guidelines: 'This entry represents supplementary legal norms such as departmental regulations, industry-specific requirements, draft opinions, or official guidelines. Consult the relevant regulatory authority for specific compliance obligations.'
            }
        ];
    }

    initEventListeners() {
        document.getElementById('analyze-laws').addEventListener('click', () => this.phaseOne());
        document.getElementById('analyze-clauses').addEventListener('click', () => this.phaseTwo());
        document.getElementById('analyze-gaps').addEventListener('click', () => this.phaseThree());
        document.getElementById('export-report').addEventListener('click', () => this.exportReport());
        document.getElementById('reset-all').addEventListener('click', () => this.resetAll());

        document.getElementById('law-select').addEventListener('change', (e) => {
            document.getElementById('analyze-clauses').disabled = !e.target.value;
        });

        const gapInputs = [
            'org-structure', 'privacy-officer', 'privacy-certification', 'privacy-audit',
            'internal-standards', 'data-classification', 'third-party-check', 'emergency-plan', 'disposal-records', 'periodic-pipia', 'rights-response-team', 'complaint-mechanism',
            'pi-inventory', 'internal-transmission', 'third-party-sharing', 'access-control', 'display-obfuscation', 'deletion-mechanism',
            'processing-logs', 'storage-location', 'storage-method', 'platform-type', 'data-sync', 'security-mechanisms', 'backup-status',
            'collection-evaluation', 'processing-methods', 'privacy-policy', 'rights-response', 'pipia-results',
            'third-party-sharing-circumstances', 'third-party-sharing-consent', 'recipient-supervision', 'recipient-contracts', 'internal-sharing-scenarios',
            'entrusted-pipia', 'entrusted-contracts', 'entrusted-supervision'
        ];
        gapInputs.forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                const allFilled = gapInputs.every(inputId => document.getElementById(inputId).value.trim());
                document.getElementById('analyze-gaps').disabled = !allFilled;
            });
        });
    }

    showLoading(text) {
        document.getElementById('loading-text').textContent = text;
        document.getElementById('loading-overlay').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loading-overlay').classList.add('hidden');
    }

    updateProgress(phase) {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < phase) {
                step.classList.add('completed');
            } else if (index + 1 === phase) {
                step.classList.add('active');
            }
        });
    }

    // Phase 1: Legal Identification
    async phaseOne() {
        const industry = document.getElementById('industry').value;
        const country = document.getElementById('country').value;

        if (!industry || !country) {
            alert('Please select both industry and target country.');
            return;
        }

        this.analysisData.industry = industry;
        this.analysisData.country = country;

        this.showLoading('law-retrieval agent analyzing applicable laws...');

        // Simulate agent processing
        await this.delay(1500);

        const countryData = this.lawsDatabase[country];
        this.analysisData.laws = countryData.laws;

        this.renderLawsTable(countryData);
        this.hideLoading();

        // Populate law selector for phase 2
        this.populateLawSelect();

        // Activate phase 2
        document.getElementById('phase2').classList.add('active');
        this.updateProgress(2);
    }

    renderLawsTable(countryData) {
        const container = document.getElementById('laws-result');

        let html = `
            <h3>Legal Research Authoritative Sources</h3>

            <h4>International Privacy Professional Resources</h4>
            <table class="result-table">
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Website</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>IAPP</strong><br><em>International Association of Privacy Professionals</em></td>
                        <td><a href="https://privacyassociation.org/" target="_blank">privacyassociation.org</a></td>
                        <td>Core global industry organization in the field of privacy, providing privacy law database, regulator directory, professional certification, and in-depth research reports</td>
                    </tr>
                    <tr>
                        <td><strong>WorldLII</strong><br><em>World Legal Information Institute</em></td>
                        <td><a href="https://www.worldlii.org/" target="_blank">worldlii.org</a></td>
                        <td>Non-profit global legal database, freely collecting legislation, case law, and privacy protection literature from 123 jurisdictions</td>
                    </tr>
                </tbody>
            </table>

            <h4>Law Firms and Consulting Agencies</h4>
            <table class="result-table">
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Website</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Eversheds Sutherland Updata Report</strong></td>
                        <td><a href="https://www.eversheds-sutherland.com/hu/united-states/insights/updata-edition-25" target="_blank">eversheds-sutherland.com</a></td>
                        <td>Quarterly global compilation of data privacy and cybersecurity regulatory developments, covering EU, US, Asia-Pacific, etc.</td>
                    </tr>
                    <tr>
                        <td><strong>DLA Piper Global Data Protection Guide</strong></td>
                        <td><a href="https://www.dlapiper.com/" target="_blank">dlapiper.com</a></td>
                        <td>Global data protection impact assessment tool and comparative analysis of national laws</td>
                    </tr>
                    <tr>
                        <td><strong>Baker McKenzie Global Privacy Guide</strong></td>
                        <td><a href="https://www.bakermckenzie.com/" target="_blank">bakermckenzie.com</a></td>
                        <td>Practical guide to national data privacy laws</td>
                    </tr>
                </tbody>
            </table>

            <h4>Official Regulatory Agencies</h4>
            <table class="result-table">
                <thead>
                    <tr>
                        <th>Region</th>
                        <th>Agency</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>European Union</td>
                        <td>EDPB</td>
                        <td><a href="https://edpb.europa.eu/" target="_blank">edpb.europa.eu</a></td>
                    </tr>
                    <tr>
                        <td>European Union</td>
                        <td>EUR-Lex</td>
                        <td><a href="https://eur-lex.europa.eu/" target="_blank">eur-lex.europa.eu</a></td>
                    </tr>
                    <tr>
                        <td>United Kingdom</td>
                        <td>ICO</td>
                        <td><a href="https://ico.org.uk/" target="_blank">ico.org.uk</a></td>
                    </tr>
                    <tr>
                        <td>United States - California</td>
                        <td>California Department of Justice</td>
                        <td><a href="https://oag.ca.gov/privacy/privacy-laws" target="_blank">oag.ca.gov</a></td>
                    </tr>
                    <tr>
                        <td>China</td>
                        <td>Cyberspace Administration of China</td>
                        <td><a href="https://www.cac.gov.cn/" target="_blank">cac.gov.cn</a></td>
                    </tr>
                    <tr>
                        <td>Singapore</td>
                        <td>PDPC</td>
                        <td><a href="https://www.pdpc.gov.sg/" target="_blank">pdpc.gov.sg</a></td>
                    </tr>
                    <tr>
                        <td>Japan</td>
                        <td>PPC</td>
                        <td><a href="https://www.ppc.go.jp/" target="_blank">ppc.go.jp</a></td>
                    </tr>
                    <tr>
                        <td>South Korea</td>
                        <td>PIPC</td>
                        <td><a href="https://www.pipc.go.kr/" target="_blank">pipc.go.kr</a></td>
                    </tr>
                    <tr>
                        <td>India</td>
                        <td>Data Protection Board</td>
                        <td><a href="https://www.meity.gov.in/" target="_blank">meity.gov.in</a></td>
                    </tr>
                    <tr>
                        <td>Brazil</td>
                        <td>ANPD</td>
                        <td><a href="https://www.gov.br/anpd/" target="_blank">gov.br/anpd</a></td>
                    </tr>
                </tbody>
            </table>

            <h3>Applicable Law List</h3>
            <table class="result-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Region/Country</th>
                        <th>Law Name</th>
                        <th>English Abbreviation</th>
                        <th>Regulatory Authority</th>
                        <th>Type</th>
                        <th>Key Points</th>
                    </tr>
                </thead>
                <tbody>
        `;

        countryData.laws.forEach((law, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${countryData.name}</td>
                    <td>${law.name}</td>
                    <td>${law.abbr}</td>
                    <td>${law.regulator}</td>
                    <td>${law.type}</td>
                    <td>${law.keyPoints}</td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
        container.classList.remove('hidden');
    }

    populateLawSelect() {
        const select = document.getElementById('law-select');
        select.innerHTML = '<option value="">Select a Law</option>';

        this.analysisData.laws.forEach(law => {
            const option = document.createElement('option');
            option.value = law.id;
            option.textContent = `${law.abbr} - ${law.name}`;
            select.appendChild(option);
        });
    }

    // Phase 2: Clause Analysis
    async phaseTwo() {
        const selectedLawId = document.getElementById('law-select').value;

        if (!selectedLawId) {
            alert('Please select a law to analyze.');
            return;
        }

        this.analysisData.selectedLaw = this.analysisData.laws.find(l => l.id === selectedLawId);

        this.showLoading(`clause-analysis agent crawling ${this.analysisData.selectedLaw.abbr} clauses...`);

        // Simulate crawling and analysis
        await this.delay(2000);

        // Filter out excluded clauses from gap analysis
        this.analysisData.controlMatrix = this.analysisData.selectedLaw.clauses.filter(c => !c.excluded);

        this.renderControlMatrix();
        this.hideLoading();

        // Activate phase 3
        document.getElementById('phase3').classList.add('active');
        this.updateProgress(3);
    }

    renderControlMatrix() {
        const container = document.getElementById('clauses-result');
        const law = this.analysisData.selectedLaw;

        // Separate applicable and excluded clauses
        const applicableClauses = this.analysisData.controlMatrix.filter(c => !c.excluded);
        const excludedClauses = this.analysisData.controlMatrix.filter(c => c.excluded);

        let html = `
            <h3>Regulation Research</h3>
            <div class="research-info">
                <div class="agent-task">
                    <strong>Agent Task:</strong> Fetch clauses related to <em>${law.name}</em> and decompose them into a compliance control requirements matrix
                </div>
                <div class="authoritative-sources">
                    <strong>Authoritative Sources:</strong>
                    <ul>
                        <li><strong>Official:</strong> ${this.getOfficialSource(law.id)}</li>
                        <li><strong>Chinese:</strong> Weike Xianxing (law.wkinfo.com.cn), Peking University Law (pkulaw.com), China Laws and Regulations Database (flk.npc.gov.cn)</li>
                        <li><strong>International:</strong> IAPP (privacyassociation.org), WorldLII (worldlii.org), Eversheds Sutherland Updata, DLA Piper Global Data Protection Guide</li>
                    </ul>
                </div>
            </div>

            <h3>${law.abbr} Compliance Control Matrix</h3>
            <p><strong>Total Clauses Analyzed:</strong> ${this.analysisData.controlMatrix.length} |
               <strong>Applicable:</strong> ${applicableClauses.length} |
               <strong>Excluded:</strong> ${excludedClauses.length}</p>
            <table class="result-table">
                <thead>
                    <tr>
                        <th>Clause Number</th>
                        <th>Control Domain</th>
                        <th>Control Requirement Description</th>
                        <th>Regulatory Guidelines & Official Explanations</th>
                        <th>Applicable Subject</th>
                        <th>Mandatory Requirement</th>
                        <th>Penalty Reference</th>
                    </tr>
                </thead>
                <tbody>
        `;

        applicableClauses.forEach(clause => {
            html += `
                <tr>
                    <td>${clause.clause}</td>
                    <td>${clause.domain}</td>
                    <td>${clause.requirement}</td>
                    <td class="guidelines-cell">${clause.guidelines || 'N/A'}</td>
                    <td>${clause.subject}</td>
                    <td>${clause.mandatory}</td>
                    <td>${clause.penalty}</td>
                </tr>
            `;
        });

        html += '</tbody></table>';

        // Add excluded clauses section if any
        if (excludedClauses.length > 0) {
            html += `
                <h4>Excluded Clauses (Not Applicable)</h4>
                <p>The following clauses have been explicitly identified as not applicable to general compliance requirements:</p>
                <table class="result-table">
                    <thead>
                        <tr>
                            <th>Clause Number</th>
                            <th>Domain</th>
                            <th>Requirement</th>
                            <th>Exclusion Reason</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            excludedClauses.forEach(clause => {
                html += `
                    <tr style="background-color: #f8f9fa; color: #6c757d;">
                        <td>${clause.clause}</td>
                        <td>${clause.domain}</td>
                        <td>${clause.requirement}</td>
                        <td>${clause.exclusionReason || 'Not applicable to general compliance'}</td>
                    </tr>
                `;
            });

            html += '</tbody></table>';
        }

        container.innerHTML = html;
        container.classList.remove('hidden');
    }

    getOfficialSource(lawId) {
        const sources = {
            'gdpr': 'EUR-Lex (eur-lex.europa.eu), EDPB (edpb.europa.eu), ICO (ico.org.uk)',
            'eda': 'EUR-Lex (eur-lex.europa.eu), National Telecom Regulators',
            'ccpa': 'California Attorney General (oag.ca.gov), California Privacy Protection Agency',
            'hipaa': 'HHS Office for Civil Rights (hhs.gov/hipaa)',
            'glba': 'FTC (ftc.gov), Federal Banking Agencies',
            'pipl': 'CAC (cac.gov.cn), NPC Standing Committee (npc.gov.cn)',
            'dsl': 'CAC (cac.gov.cn), State Council (gov.cn)',
            'cybersecurity-law': 'CAC (cac.gov.cn), MIIT (miit.gov.cn)',
            'uk-gdpr': 'ICO (ico.org.uk), UK Legislation (legislation.gov.uk)',
            'appi': 'PPC (ppc.go.jp)',
            'pdpa': 'PDPC (pdpc.gov.sg)',
            'lgpd': 'ANPD (gov.br/anpd)',
            'pipa': 'PIPC (pipc.go.kr)',
            'privacy-act': 'OAIC (oaic.gov.au)',
            'dpdp': 'MeitY (meity.gov.in), Data Protection Board of India'
        };
        return sources[lawId] || 'Official regulatory website';
    }

    // Phase 3: Gap Analysis
    async phaseThree() {
        // Collect all 14 fill-in-the-blank fields
        const businessInfo = {
            // Dimension 1: Organizational Compliance Design Status
            orgStructure: document.getElementById('org-structure').value.trim(),
            privacyOfficer: document.getElementById('privacy-officer').value.trim(),
            privacyCertification: document.getElementById('privacy-certification').value.trim(),
            privacyAudit: document.getElementById('privacy-audit').value.trim(),
            internalStandards: document.getElementById('internal-standards').value.trim(),
            dataClassification: document.getElementById('data-classification').value.trim(),
            thirdPartyCheck: document.getElementById('third-party-check').value.trim(),
            emergencyPlan: document.getElementById('emergency-plan').value.trim(),
            disposalRecords: document.getElementById('disposal-records').value.trim(),
            periodicPipia: document.getElementById('periodic-pipia').value.trim(),
            rightsResponseTeam: document.getElementById('rights-response-team').value.trim(),
            complaintMechanism: document.getElementById('complaint-mechanism').value.trim(),

            // Dimension 2: System-Level Data Security Measures
            piInventory: document.getElementById('pi-inventory').value.trim(),
            internalTransmission: document.getElementById('internal-transmission').value.trim(),
            thirdPartySharing: document.getElementById('third-party-sharing').value.trim(),
            accessControl: document.getElementById('access-control').value.trim(),
            displayObfuscation: document.getElementById('display-obfuscation').value.trim(),
            deletionMechanism: document.getElementById('deletion-mechanism').value.trim(),
            processingLogs: document.getElementById('processing-logs').value.trim(),
            storageLocation: document.getElementById('storage-location').value.trim(),
            storageMethod: document.getElementById('storage-method').value.trim(),
            platformType: document.getElementById('platform-type').value.trim(),
            dataSync: document.getElementById('data-sync').value.trim(),
            securityMechanisms: document.getElementById('security-mechanisms').value.trim(),
            backupStatus: document.getElementById('backup-status').value.trim(),

            // Dimension 3: Business Process Design Status
            collectionEvaluation: document.getElementById('collection-evaluation').value.trim(),
            processingMethods: document.getElementById('processing-methods').value.trim(),
            privacyPolicy: document.getElementById('privacy-policy').value.trim(),
            rightsResponse: document.getElementById('rights-response').value.trim(),
            pipiaResults: document.getElementById('pipia-results').value.trim(),
            thirdPartySharingCircumstances: document.getElementById('third-party-sharing-circumstances').value.trim(),
            thirdPartySharingConsent: document.getElementById('third-party-sharing-consent').value.trim(),
            recipientSupervision: document.getElementById('recipient-supervision').value.trim(),
            recipientContracts: document.getElementById('recipient-contracts').value.trim(),
            internalSharingScenarios: document.getElementById('internal-sharing-scenarios').value.trim(),
            entrustedPipia: document.getElementById('entrusted-pipia').value.trim(),
            entrustedContracts: document.getElementById('entrusted-contracts').value.trim(),
            entrustedSupervision: document.getElementById('entrusted-supervision').value.trim()
        };

        // Check if all fields are filled
        const allFieldsFilled = Object.values(businessInfo).every(value => value.length > 0);
        if (!allFieldsFilled) {
            alert('Please fill in all company information fields.');
            return;
        }

        this.analysisData.businessInfo = businessInfo;

        this.showLoading('gap-analysis agent generating compliance gap report...');

        // Simulate gap analysis
        await this.delay(2500);

        this.analysisData.gapReport = this.generateGapReport();
        this.renderGapReport();
        this.hideLoading();

        // Show action buttons
        document.getElementById('actions-bar').classList.remove('hidden');
    }

    generateGapReport() {
        const gaps = [];
        const controlMatrix = this.analysisData.controlMatrix;
        const businessInfo = this.analysisData.businessInfo;

        // Analyze each control requirement
        controlMatrix.forEach(control => {
            const gap = this.analyzeGap(control, businessInfo);
            gaps.push(gap);
        });

        return gaps;
    }

    analyzeGap(control, businessInfo) {
        // Analyze gap based on text inputs using keyword matching
        const domain = control.domain.toLowerCase();
        const requirement = control.requirement.toLowerCase();

        // Define keyword categories for each dimension
        const orgKeywords = ['structure', 'team', 'officer', 'dpo', 'policy', 'documentation', 'training', 'audit'];
        const securityKeywords = ['security', 'encrypt', 'access', 'control', 'safeguard', 'protection', 'firewall', 'mask', 'obfusc', 'deletion', 'anonymiz', 'storage'];
        const processKeywords = ['consent', 'notice', 'privacy policy', 'right', 'access', 'deletion', 'portability', 'piria', 'dpia', 'assessment', 'collection', 'purpose'];

        // Convert all business info to lowercase for analysis
        const orgText = (businessInfo.orgStructure + ' ' + businessInfo.privacyOfficer + ' ' + businessInfo.privacyCertification + ' ' + businessInfo.privacyAudit + ' ' + businessInfo.internalStandards + ' ' + businessInfo.dataClassification + ' ' + businessInfo.thirdPartyCheck + ' ' + businessInfo.emergencyPlan + ' ' + businessInfo.disposalRecords + ' ' + businessInfo.periodicPipia + ' ' + businessInfo.rightsResponseTeam + ' ' + businessInfo.complaintMechanism).toLowerCase();
        const securityText = (businessInfo.piInventory + ' ' + businessInfo.internalTransmission + ' ' + businessInfo.thirdPartySharing + ' ' + businessInfo.accessControl + ' ' + businessInfo.displayObfuscation + ' ' + businessInfo.deletionMechanism + ' ' + businessInfo.processingLogs + ' ' + businessInfo.storageLocation + ' ' + businessInfo.storageMethod + ' ' + businessInfo.platformType + ' ' + businessInfo.dataSync + ' ' + businessInfo.securityMechanisms + ' ' + businessInfo.backupStatus).toLowerCase();
        const processText = (businessInfo.collectionEvaluation + ' ' + businessInfo.processingMethods + ' ' + businessInfo.privacyPolicy + ' ' + businessInfo.rightsResponse + ' ' + businessInfo.pipiaResults + ' ' + businessInfo.thirdPartySharingCircumstances + ' ' + businessInfo.thirdPartySharingConsent + ' ' + businessInfo.recipientSupervision + ' ' + businessInfo.recipientContracts + ' ' + businessInfo.internalSharingScenarios + ' ' + businessInfo.entrustedPipia + ' ' + businessInfo.entrustedContracts + ' ' + businessInfo.entrustedSupervision).toLowerCase();

        // Calculate relevance scores based on keyword matching
        let orgScore = orgKeywords.filter(kw => orgText.includes(kw)).length;
        let securityScore = securityKeywords.filter(kw => securityText.includes(kw)).length;
        let processScore = processKeywords.filter(kw => processText.includes(kw)).length;

        // Normalize scores (0-3 scale)
        const normalizeScore = (score, max) => Math.min(3, Math.round((score / max) * 3));
        orgScore = normalizeScore(orgScore, 4);
        securityScore = normalizeScore(securityScore, 6);
        processScore = normalizeScore(processScore, 5);

        // Determine which dimension is most relevant to this control
        let relevantScore = 0;
        if (domain.includes('security') || domain.includes('safeguard') || domain.includes('technical') ||
            requirement.includes('encrypt') || requirement.includes('access') || requirement.includes('protect')) {
            relevantScore = securityScore;
        } else if (domain.includes('dpo') || domain.includes('administrative') || domain.includes('organization') ||
                   requirement.includes('officer') || requirement.includes('audit')) {
            relevantScore = orgScore;
        } else if (domain.includes('process') || domain.includes('transparency') || domain.includes('consent') ||
                   domain.includes('rights') || domain.includes('breach') || domain.includes('policy') ||
                   requirement.includes('consent') || requirement.includes('notice') || requirement.includes('right')) {
            relevantScore = processScore;
        } else {
            // For other domains, use average
            relevantScore = Math.round((orgScore + securityScore + processScore) / 3);
        }

        // Determine gap status
        let likelihood = 'Medium';
        let impact = 'Medium';
        let hasGap = true;
        let recommendations = [];

        if (relevantScore >= 3) {
            hasGap = false;
            likelihood = 'Low';
        } else if (relevantScore === 2) {
            hasGap = control.mandatory === 'Yes' && this.hasSpecificGap(control, orgText, securityText, processText);
            likelihood = hasGap ? 'Medium' : 'Low';
        } else if (relevantScore === 1) {
            hasGap = true;
            likelihood = control.mandatory === 'Yes' ? 'High' : 'Medium';
        } else {
            hasGap = true;
            likelihood = 'High';
        }

        // Calculate impact based on penalty severity
        if (control.mandatory === 'Yes') {
            impact = control.penalty.includes('4%') || control.penalty.includes('5%') ||
                     control.penalty.includes('Severe') || control.penalty.includes('crore') ?
                     'Severe' : 'High';
        } else {
            impact = relevantScore >= 2 ? 'Medium' : 'High';
        }

        if (hasGap) {
            recommendations = this.generateRecommendations(control);
        }

        return {
            clause: control.clause,
            domain: control.domain,
            requirement: control.requirement,
            mandatory: control.mandatory,
            hasGap: hasGap,
            likelihood: likelihood,
            impact: impact,
            riskLevel: this.calculateRiskLevel(likelihood, impact),
            recommendations: recommendations,
            penalty: control.penalty,
            relevantScore: relevantScore
        };
    }

    hasSpecificGap(control, orgText, securityText, processText) {
        // Additional check to determine if there's a specific gap despite general maturity
        const domain = control.domain.toLowerCase();
        const requirement = control.requirement.toLowerCase();

        // Check for specific gaps based on control type
        if (domain.includes('security') || requirement.includes('encrypt')) {
            return !securityText.includes('encrypt') && !securityText.includes('tls') && !securityText.includes('ssl');
        }
        if (domain.includes('access') || requirement.includes('access')) {
            return !securityText.includes('access') && !securityText.includes('rbac') && !securityText.includes('control');
        }
        if (domain.includes('dpo') || requirement.includes('officer')) {
            return !orgText.includes('dpo') && !orgText.includes('officer') && !orgText.includes('protection');
        }
        if (domain.includes('consent') || requirement.includes('consent')) {
            return !processText.includes('consent') && !processText.includes('agree');
        }
        if (domain.includes('breach') || requirement.includes('breach') || requirement.includes('incident')) {
            return !processText.includes('breach') && !processText.includes('incident') && !processText.includes('response');
        }
        if (domain.includes('rights') || requirement.includes('access') || requirement.includes('deletion')) {
            return !processText.includes('right') && !processText.includes('access') && !processText.includes('deletion');
        }

        return true; // Default to gap if specific check is inconclusive
    }

    generateRecommendations(control) {
        const recs = {
            'Data Processing Principles': [
                'Implement a data inventory and mapping exercise',
                'Document lawful basis for each processing activity',
                'Review and minimize data collection practices'
            ],
            'Lawful Basis': [
                'Review all processing activities for lawful basis',
                'Document legitimate interest assessments',
                'Update consent mechanisms where required'
            ],
            'Consent': [
                'Implement granular consent management system',
                'Ensure consent is freely given, specific, and informed',
                'Provide easy withdrawal mechanism'
            ],
            'Transparency': [
                'Review and update privacy notices',
                'Ensure layered privacy notices are provided',
                'Include all required information disclosures'
            ],
            'Data Subject Rights': [
                'Implement DSAR response workflow',
                'Create templates for rights responses',
                'Train staff on handling rights requests'
            ],
            'Security': [
                'Conduct security assessment',
                'Implement encryption for data at rest and in transit',
                'Establish access control policies'
            ],
            'Breach Notification': [
                'Develop incident response plan',
                'Establish breach notification procedures',
                'Train staff on breach identification and reporting'
            ],
            'DPIA': [
                'Identify high-risk processing activities',
                'Conduct DPIA for new processing activities',
                'Document DPIA findings and mitigation measures'
            ],
            'DPO': [
                'Assess DPO appointment requirement',
                'Designate and register DPO if required',
                'Ensure DPO independence and resources'
            ],
            'Cross-border Transfer': [
                'Map international data flows',
                'Implement appropriate transfer mechanisms (SCCs, BCRs)',
                'Conduct transfer impact assessments'
            ]
        };

        return recs[control.domain] || [
            'Review this requirement against current practices',
            'Document compliance measures',
            'Monitor regulatory guidance for updates'
        ];
    }

    calculateRiskLevel(likelihood, impact) {
        const matrix = {
            'Very Low': { 'Low': 'Low', 'Medium': 'Low', 'High': 'Medium', 'Severe': 'Medium' },
            'Low': { 'Low': 'Low', 'Medium': 'Medium', 'High': 'Medium', 'Severe': 'High' },
            'Medium': { 'Low': 'Medium', 'Medium': 'Medium', 'High': 'High', 'Severe': 'High' },
            'High': { 'Low': 'Medium', 'Medium': 'High', 'High': 'High', 'Severe': 'Severe' }
        };

        return matrix[likelihood]?.[impact] || 'Medium';
    }

    renderGapReport() {
        const container = document.getElementById('gaps-result');
        const law = this.analysisData.selectedLaw;
        const gaps = this.analysisData.gapReport;

        // Calculate statistics
        const stats = {
            total: gaps.length,
            compliant: gaps.filter(g => !g.hasGap).length,
            gaps: gaps.filter(g => g.hasGap).length,
            severe: gaps.filter(g => g.riskLevel === 'Severe').length,
            high: gaps.filter(g => g.riskLevel === 'High').length,
            medium: gaps.filter(g => g.riskLevel === 'Medium').length,
            low: gaps.filter(g => g.riskLevel === 'Low').length
        };

        let html = `
            <h3>Gap Analysis Report - ${law.name}</h3>

            <div class="summary-stats">
                <div class="stat-card">
                    <div class="stat-value">${stats.total}</div>
                    <div class="stat-label">Total Controls</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: var(--secondary-color)">${stats.compliant}</div>
                    <div class="stat-label">Compliant</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: var(--danger-color)">${stats.gaps}</div>
                    <div class="stat-label">Gaps Identified</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: var(--danger-color)">${stats.severe}</div>
                    <div class="stat-label">Severe Risk</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: var(--warning-color)">${stats.high}</div>
                    <div class="stat-label">High Risk</div>
                </div>
            </div>

            <h4>DPIA Risk Assessment Framework</h4>
            <div class="risk-matrix">
                <div class="risk-matrix-cell header">Likelihood ↓ / Impact →</div>
                <div class="risk-matrix-cell header">Low</div>
                <div class="risk-matrix-cell header">Medium</div>
                <div class="risk-matrix-cell header">High</div>
                <div class="risk-matrix-cell header">Severe</div>

                <div class="risk-matrix-cell header">High</div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-medium">Medium</span></div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-high">High</span></div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-high">High</span></div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-severe">Severe</span></div>

                <div class="risk-matrix-cell header">Medium</div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-medium">Medium</span></div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-medium">Medium</span></div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-high">High</span></div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-high">High</span></div>

                <div class="risk-matrix-cell header">Low</div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-low">Low</span></div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-medium">Medium</span></div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-medium">Medium</span></div>
                <div class="risk-matrix-cell"><span class="risk-badge risk-high">High</span></div>
            </div>

            <h4>Detailed Gap Findings</h4>
        `;

        // Sort gaps by risk level
        const sortedGaps = [...gaps].sort((a, b) => {
            const order = { 'Severe': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
            return order[a.riskLevel] - order[b.riskLevel];
        });

        sortedGaps.forEach(gap => {
            const statusClass = gap.hasGap ? 'risk-' + gap.riskLevel.toLowerCase() : '';
            html += `
                <div class="gap-card">
                    <div class="gap-card-header">
                        <div class="gap-card-title">
                            <strong>${gap.clause}</strong> - ${gap.domain}
                        </div>
                        <span class="risk-badge ${statusClass}">${gap.hasGap ? gap.riskLevel : 'Compliant'}</span>
                    </div>
                    <div class="gap-card-body">
                        <p><strong>Requirement:</strong> ${gap.requirement}</p>
                        <p><strong>Mandatory:</strong> ${gap.mandatory}</p>
                        <p><strong>Penalty:</strong> ${gap.penalty}</p>
                        ${gap.hasGap ? `
                            <p><strong>Likelihood:</strong> ${gap.likelihood}</p>
                            <p><strong>Impact:</strong> ${gap.impact}</p>
                            <p><strong>Recommendations:</strong></p>
                            <ul>
                                ${gap.recommendations.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        ` : '<p style="color: var(--secondary-color)"><strong>Status:</strong> No gap identified based on provided information</p>'}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        container.classList.remove('hidden');
    }

    exportReport() {
        const report = this.generateExportReport();
        const blob = new Blob([report], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compliance-gap-analysis-${new Date().toISOString().split('T')[0]}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }

    generateExportReport() {
        const law = this.analysisData.selectedLaw;
        const gaps = this.analysisData.gapReport;

        let md = `# Data Protection Compliance Gap Analysis Report

## Executive Summary

**Analysis Date:** ${new Date().toLocaleDateString()}
**Target Jurisdiction:** ${this.lawsDatabase[this.analysisData.country].name}
**Regulation Analyzed:** ${law.name} (${law.abbr})
**Regulatory Body:** ${law.regulator}

## Phase One: Applicable Laws

| No. | Region/Country | Law Name | Abbreviation | Regulatory Body | Type |
|-----|----------------|----------|--------------|-----------------|------|
${this.analysisData.laws.map((l, i) => `| ${i + 1} | ${this.lawsDatabase[this.analysisData.country].name} | ${l.name} | ${l.abbr} | ${l.regulator} | ${l.type} |`).join('\n')}

## Phase Two: Compliance Control Matrix

### ${law.name}

| Clause | Domain | Requirement | Regulatory Guidelines | Subject | Mandatory | Penalty |
|--------|--------|-------------|----------------------|---------|-----------|---------|
${this.analysisData.controlMatrix.map(c => `| ${c.clause} | ${c.domain} | ${c.requirement} | ${(c.guidelines || 'N/A').replace(/\|/g, '\\|').replace(/\n/g, ' ')} | ${c.subject} | ${c.mandatory} | ${c.penalty} |`).join('\n')}

## Company Information Summary

### Dimension 1: Organizational Compliance Design Status

**1) Current organizational structure and management methods for data security and privacy compliance in the parent and subsidiary companies:**
${this.analysisData.businessInfo.orgStructure}

**2) Status of the privacy protection management:**

*Whether a dedicated data security and privacy protection officer has been appointed:*
${this.analysisData.businessInfo.privacyOfficer}

*Whether privacy protection qualification certification or information security-related certification has been obtained:*
${this.analysisData.businessInfo.privacyCertification}

*Whether data processing activities have been audited and summarized:*
${this.analysisData.businessInfo.privacyAudit}

**3) Related internal control management for data security and privacy protection:**

*What are the relevant internal control management standards for privacy compliance (including data collection, data processing, data storage, data sharing, privacy disposal, and data transfer)?*
${this.analysisData.businessInfo.internalStandards}

*Is data classified and graded for management according to the relevant systems, including management policies, classification methods, security levels, and access permissions for each type and grade of data?*
${this.analysisData.businessInfo.dataClassification}

*In scenarios of data sharing/transfer/entrusted processing, is an external third-party data security and privacy protection check conducted?*
${this.analysisData.businessInfo.thirdPartyCheck}

*Has the company developed an emergency response plan for personal information security incidents?*
${this.analysisData.businessInfo.emergencyPlan}

*Are records maintained when performing data disposal activities?*
${this.analysisData.businessInfo.disposalRecords}

*Is a privacy impact assessment conducted periodically and are assessment reports generated (including frequency and scope), and are the assessment records and handling records retained?*
${this.analysisData.businessInfo.periodicPipia}

*Is there a response mechanism and corresponding team for personal information subject rights?*
${this.analysisData.businessInfo.rightsResponseTeam}

*Is a mechanism established to protect the exercise of personal information rights and a complaint mechanism?*
${this.analysisData.businessInfo.complaintMechanism}

### Dimension 2: System-Level Data Security Measures

**1) Collected Personal Information Fields, Quantity, and Collection Methods:**
${this.analysisData.businessInfo.piInventory}

**2) Internal System Transmission Status:**
${this.analysisData.businessInfo.internalTransmission}

**3) External Third-Party Sharing/Commissioned Processing:**
${this.analysisData.businessInfo.thirdPartySharing}

**4) Access Control Status:**
${this.analysisData.businessInfo.accessControl}

**5) Obfuscation in Display:**
${this.analysisData.businessInfo.displayObfuscation}

**6) Deletion/Anonymization Mechanisms:**
${this.analysisData.businessInfo.deletionMechanism}

**7) Methods and Retention Period for Personal Information Processing Logs:**
${this.analysisData.businessInfo.processingLogs}

**8) Data Storage Location and Security Mechanisms:**

*Data storage location and location of the data center:*
${this.analysisData.businessInfo.storageLocation}

*Storage method (offline storage/cloud server storage):*
${this.analysisData.businessInfo.storageMethod}

*Whether the platform is self-built or uses third-party cloud services:*
${this.analysisData.businessInfo.platformType}

*Whether synchronization with other data centers is involved:*
${this.analysisData.businessInfo.dataSync}

*Data security mechanisms (encryption measures, isolated storage, etc.):*
${this.analysisData.businessInfo.securityMechanisms}

*Whether data is backed up, and backup storage location:*
${this.analysisData.businessInfo.backupStatus}

### Dimension 3: Business Process Design Status

**1) Evaluation of Collection Purposes, Legality, Necessity, and Minimal Scope:**
${this.analysisData.businessInfo.collectionEvaluation}

**2) Data Processing Methods:**
${this.analysisData.businessInfo.processingMethods}

**3) Privacy Policy Configuration:**
${this.analysisData.businessInfo.privacyPolicy}

**4) User Rights Response Methods:**
${this.analysisData.businessInfo.rightsResponse}

**5) Personal Information Protection Impact Assessment (PIPIA) Results:**
${this.analysisData.businessInfo.pipiaResults}

**6) Do you share, provide, sell, authorize the use of, or publicly disclose personal information to third parties?**

*If yes, please describe the specific circumstances (e.g., marketing and promotion), including the types and purposes of the data being shared, provided, or disclosed:*
${this.analysisData.businessInfo.thirdPartySharingCircumstances}

*Have you obtained consent from the individual whose personal information is involved or from the data provider?*
${this.analysisData.businessInfo.thirdPartySharingConsent}

**7) Please clarify whether you supervise the data processing activities of the data recipients.**

${this.analysisData.businessInfo.recipientSupervision}

**8) Do you sign contracts with the recipients to stipulate the purpose, duration, method of processing shared data, types of personal information, protective measures, and the rights and obligations of both parties?**

${this.analysisData.businessInfo.recipientContracts}

**9) Please clarify scenarios of internal sharing (e.g., subsidiaries, affiliated companies, etc.).**

*If any, explain the business purpose of the transfer, whether the data transfer is complete or partial, and the systems involved:*
${this.analysisData.businessInfo.internalSharingScenarios}

**10) Before entrusting others to process personal information, do you conduct a personal information protection impact assessment?**

${this.analysisData.businessInfo.entrustedPipia}

**11) Do you sign contracts with the entrusted parties to stipulate the purpose, duration, method of processing, types of personal information, protective measures, and the rights and obligations of both parties?**

${this.analysisData.businessInfo.entrustedContracts}

**12) Do you supervise the personal information processing activities of the entrusted parties?**

${this.analysisData.businessInfo.entrustedSupervision}

## Phase Three: Gap Analysis Report

### Summary Statistics

- **Total Controls:** ${gaps.length}
- **Compliant:** ${gaps.filter(g => !g.hasGap).length}
- **Gaps Identified:** ${gaps.filter(g => g.hasGap).length}
- **Severe Risk:** ${gaps.filter(g => g.riskLevel === 'Severe').length}
- **High Risk:** ${gaps.filter(g => g.riskLevel === 'High').length}
- **Medium Risk:** ${gaps.filter(g => g.riskLevel === 'Medium').length}
- **Low Risk:** ${gaps.filter(g => g.riskLevel === 'Low').length}

### Detailed Findings

${gaps.filter(g => g.hasGap).sort((a, b) => {
    const order = { 'Severe': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
    return order[a.riskLevel] - order[b.riskLevel];
}).map(g => `#### ${g.clause} - ${g.domain}

- **Risk Level:** ${g.riskLevel}
- **Likelihood:** ${g.likelihood}
- **Impact:** ${g.impact}
- **Requirement:** ${g.requirement}
- **Penalty:** ${g.penalty}

**Recommendations:**
${g.recommendations.map(r => `- ${r}`).join('\n')}
`).join('\n')}

---

*Generated by Data Protection Compliance Analysis System*
`;

        return md;
    }

    resetAll() {
        this.currentPhase = 1;
        this.analysisData = {
            industry: null,
            country: null,
            laws: [],
            selectedLaw: null,
            controlMatrix: [],
            businessInfo: null,
            gapReport: null
        };

        // Reset form elements
        document.getElementById('industry').value = '';
        document.getElementById('country').value = '';
        document.getElementById('law-select').innerHTML = '<option value="">Select a Law</option>';

        // Reset all gap analysis fields
        const gapFields = [
            'org-structure', 'privacy-officer', 'privacy-certification', 'privacy-audit',
            'internal-standards', 'data-classification', 'third-party-check', 'emergency-plan', 'disposal-records', 'periodic-pipia', 'rights-response-team', 'complaint-mechanism',
            'pi-inventory', 'internal-transmission', 'third-party-sharing', 'access-control', 'display-obfuscation', 'deletion-mechanism',
            'processing-logs', 'storage-location', 'storage-method', 'platform-type', 'data-sync', 'security-mechanisms', 'backup-status',
            'collection-evaluation', 'processing-methods', 'privacy-policy', 'rights-response', 'pipia-results',
            'third-party-sharing-circumstances', 'third-party-sharing-consent', 'recipient-supervision', 'recipient-contracts', 'internal-sharing-scenarios',
            'entrusted-pipia', 'entrusted-contracts', 'entrusted-supervision'
        ];
        gapFields.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

        // Reset results
        document.getElementById('laws-result').classList.add('hidden');
        document.getElementById('clauses-result').classList.add('hidden');
        document.getElementById('gaps-result').classList.add('hidden');

        // Reset phases
        document.getElementById('phase2').classList.remove('active');
        document.getElementById('phase3').classList.remove('active');
        document.getElementById('analyze-clauses').disabled = true;
        document.getElementById('analyze-gaps').disabled = true;

        // Hide actions bar
        document.getElementById('actions-bar').classList.add('hidden');

        // Reset progress
        this.updateProgress(1);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the system
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ComplianceAnalysisSystem();
});
