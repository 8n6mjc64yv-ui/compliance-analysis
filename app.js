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
                        applicableIndustries: ['all'],
                        clauses: this.getGDPRClauses()
                    },
                    {
                        id: 'eda',
                        name: 'ePrivacy Directive',
                        abbr: 'ePrivacy',
                        regulator: 'National Telecom Regulators',
                        type: 'Primary Law',
                        keyPoints: 'Cookies tracking, electronic communications privacy, direct marketing rules',
                        applicableIndustries: ['telecommunications', 'technology', 'ecommerce'],
                        clauses: this.getEPrivacyClauses()
                    },
                    {
                        id: 'edpb-guidelines',
                        name: 'EDPB Guidelines',
                        abbr: 'EDPB Guidelines',
                        regulator: 'European Data Protection Board (EDPB)',
                        type: 'Official Guidance',
                        keyPoints: 'Interpretative guidelines on GDPR provisions, consent, transparency, data subject rights, etc.',
                        applicableIndustries: ['all'],
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'scc',
                        name: 'Standard Contractual Clauses (EU)',
                        abbr: 'SCCs',
                        regulator: 'European Commission',
                        type: 'Implementing Decision',
                        keyPoints: 'Pre-approved contractual clauses for cross-border data transfers outside EEA',
                        applicableIndustries: ['all'],
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'eu-us-dpf',
                        name: 'EU-US Data Privacy Framework',
                        abbr: 'EU-US DPF',
                        regulator: 'European Commission',
                        type: 'Adequacy Decision',
                        keyPoints: 'Adequacy decision for transfers to US companies participating in the Data Privacy Framework',
                        applicableIndustries: ['all'],
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
                        applicableIndustries: ['all'],
                        clauses: this.getCCPAClauses()
                    },
                    {
                        id: 'hipaa',
                        name: 'Health Insurance Portability and Accountability Act',
                        abbr: 'HIPAA',
                        regulator: 'HHS Office for Civil Rights',
                        type: 'Primary Law',
                        keyPoints: 'Protected health information, security rules, breach notification',
                        applicableIndustries: ['healthcare'],
                        clauses: this.getHIPAAClauses()
                    },
                    {
                        id: 'glba',
                        name: 'Gramm-Leach-Bliley Act',
                        abbr: 'GLBA',
                        regulator: 'FTC, Federal Banking Agencies',
                        type: 'Primary Law',
                        keyPoints: 'Financial privacy, safeguards rule, pretexting protection',
                        applicableIndustries: ['finance'],
                        clauses: this.getGLBAClauses()
                    },
                    {
                        id: 'ftc-safeguards',
                        name: 'FTC Safeguards Rule',
                        abbr: 'FTC Safeguards',
                        regulator: 'Federal Trade Commission',
                        type: 'Regulation',
                        keyPoints: 'Requires financial institutions to develop, implement, and maintain comprehensive information security programs',
                        applicableIndustries: ['finance'],
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'nist-csf',
                        name: 'NIST Cybersecurity Framework',
                        abbr: 'NIST CSF',
                        regulator: 'National Institute of Standards and Technology',
                        type: 'Guideline',
                        keyPoints: 'Voluntary framework for managing cybersecurity risk, consisting of standards, guidelines, and best practices',
                        applicableIndustries: ['all'],
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'pci-dss',
                        name: 'Payment Card Industry Data Security Standard',
                        abbr: 'PCI DSS',
                        regulator: 'PCI Security Standards Council',
                        type: 'Industry Standard',
                        keyPoints: 'Security standard for organizations handling credit card transactions, requiring security controls and monitoring',
                        applicableIndustries: ['finance', 'ecommerce', 'retail'],
                        clauses: this.getGenericClauses()
                    },
                    {
                        id: 'hipaa-privacy-rule',
                        name: 'HIPAA Privacy Rule',
                        abbr: 'HIPAA Privacy',
                        regulator: 'HHS Office for Civil Rights',
                        type: 'Regulation',
                        keyPoints: 'Standards for protection of individually identifiable health information, use and disclosure limitations',
                        applicableIndustries: ['healthcare'],
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

        // Knowledge Base Panel
        document.getElementById('toggle-kb').addEventListener('click', () => this.toggleKBPanel());
        document.getElementById('close-kb').addEventListener('click', () => this.closeKBPanel());

        // Initialize knowledge base
        this.initKnowledgeBase();

        document.getElementById('law-select').addEventListener('change', (e) => {
            document.getElementById('analyze-clauses').disabled = !e.target.value;
        });

        // Show/hide US state dropdown based on country selection
        document.getElementById('country').addEventListener('change', (e) => {
            const stateContainer = document.getElementById('us-state-container');
            const stateSelect = document.getElementById('us-state');
            if (e.target.value === 'US') {
                stateContainer.classList.remove('hidden');
            } else {
                stateContainer.classList.add('hidden');
                stateSelect.value = '';
            }
        });

        // Yes/No radio button toggle functionality
        document.querySelectorAll('.yesno-radio').forEach(radio => {
            radio.addEventListener('change', function() {
                const detailId = this.getAttribute('data-detail');
                const detailDiv = document.getElementById(detailId);
                const formGroup = this.closest('.yesno-group');
                let completionIndicator = formGroup.querySelector('.completion-indicator');

                // Create completion indicator if it doesn't exist
                if (!completionIndicator) {
                    completionIndicator = document.createElement('div');
                    completionIndicator.className = 'completion-indicator';
                    completionIndicator.innerHTML = '<span class="check-icon">&#10003;</span><span class="completion-text"></span>';
                    formGroup.appendChild(completionIndicator);
                }

                const completionText = completionIndicator.querySelector('.completion-text');

                if (detailDiv) {
                    if (this.value === 'yes' && this.checked) {
                        detailDiv.classList.remove('hidden');
                        // For "yes", check if textarea has content
                        const textarea = detailDiv.querySelector('textarea');
                        if (textarea && textarea.value.trim()) {
                            completionIndicator.classList.add('show');
                            completionIndicator.classList.remove('no-input-required');
                            completionText.textContent = 'Completed';
                        } else {
                            completionIndicator.classList.remove('show');
                        }
                    } else if (this.value === 'no' && this.checked) {
                        detailDiv.classList.add('hidden');
                        // Clear the textarea when No is selected
                        const textarea = detailDiv.querySelector('textarea');
                        if (textarea) textarea.value = '';
                        // Show completion indicator for "no" - no additional input required
                        completionIndicator.classList.add('show');
                        completionIndicator.classList.add('no-input-required');
                        completionText.textContent = 'Completed - No additional input required';
                    }
                } else {
                    // For questions without detail sections, show completed when either option is selected
                    if (this.checked) {
                        completionIndicator.classList.add('show');
                        if (this.value === 'no') {
                            completionIndicator.classList.add('no-input-required');
                            completionText.textContent = 'Completed - No additional input required';
                        } else {
                            completionIndicator.classList.remove('no-input-required');
                            completionText.textContent = 'Completed';
                        }
                    }
                }

                // Update analyze-gaps button state
                updateGapAnalysisButton();
            });
        });

        // List of all Yes/No question groups
        const yesNoGroups = [
            'org-structure', 'privacy-officer', 'privacy-certification', 'privacy-audit',
            'internal-standards', 'data-classification', 'third-party-check', 'emergency-plan',
            'disposal-records', 'periodic-pipia', 'rights-response-team', 'complaint-mechanism',
            'pi-inventory', 'internal-transmission', 'third-party-sharing', 'access-control',
            'display-obfuscation', 'deletion-mechanism', 'processing-logs', 'storage-location',
            'storage-method', 'platform-type', 'data-sync', 'security-mechanisms', 'backup-status',
            'collection-evaluation', 'processing-methods', 'privacy-policy', 'rights-response',
            'pipia-results', 'third-party-sharing-main', 'third-party-consent',
            'recipient-supervision', 'recipient-contracts', 'internal-sharing',
            'entrusted-pipia', 'entrusted-contracts', 'entrusted-supervision'
        ];

        const updateGapAnalysisButton = () => {
            const allAnswered = yesNoGroups.every(group => {
                const radios = document.querySelectorAll(`input[name="${group}"]`);
                const isChecked = Array.from(radios).some(r => r.checked);

                // If Yes is selected, check if detail textarea is filled
                const yesRadio = document.querySelector(`input[name="${group}"][value="yes"]`);
                if (yesRadio && yesRadio.checked) {
                    const detailId = yesRadio.getAttribute('data-detail');
                    const textarea = document.querySelector(`#${detailId} textarea`);
                    return textarea && textarea.value.trim();
                }

                return isChecked;
            });

            document.getElementById('analyze-gaps').disabled = !allAnswered;
        };

        // Add change listeners to all Yes/No radios
        yesNoGroups.forEach(group => {
            const radios = document.querySelectorAll(`input[name="${group}"]`);
            radios.forEach(radio => {
                radio.addEventListener('change', updateGapAnalysisButton);
            });

            // Add input listeners to detail textareas
            const yesRadio = document.querySelector(`input[name="${group}"][value="yes"]`);
            if (yesRadio) {
                const detailId = yesRadio.getAttribute('data-detail');
                const textarea = document.querySelector(`#${detailId} textarea`);
                if (textarea) {
                    textarea.addEventListener('input', function() {
                        const formGroup = yesRadio.closest('.yesno-group');
                        let completionIndicator = formGroup.querySelector('.completion-indicator');

                        // Create completion indicator if it doesn't exist
                        if (!completionIndicator) {
                            completionIndicator = document.createElement('div');
                            completionIndicator.className = 'completion-indicator';
                            completionIndicator.innerHTML = '<span class="check-icon">&#10003;</span><span class="completion-text"></span>';
                            formGroup.appendChild(completionIndicator);
                        }

                        const completionText = completionIndicator.querySelector('.completion-text');

                        // Show completion indicator if yes is selected and textarea has content
                        if (yesRadio.checked && this.value.trim()) {
                            completionIndicator.classList.add('show');
                            completionIndicator.classList.remove('no-input-required');
                            completionText.textContent = 'Completed';
                        } else if (yesRadio.checked && !this.value.trim()) {
                            completionIndicator.classList.remove('show');
                        }

                        updateGapAnalysisButton();
                    });
                }
            }
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

        // Get US state if selected
        let selectedState = null;
        if (country === 'US') {
            selectedState = document.getElementById('us-state').value;
        }
        this.analysisData.selectedState = selectedState;

        this.showLoading('law-retrieval agent analyzing applicable laws...');

        // Simulate agent processing
        await this.delay(1500);

        let countryData = this.lawsDatabase[country];

        // If US state is selected, filter to show relevant laws
        if (country === 'US' && selectedState) {
            const stateLaws = this.getUSStateLaws(selectedState);
            countryData = {
                name: `United States - ${this.getStateName(selectedState)}`,
                laws: stateLaws
            };
        }

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
            <p style="margin-bottom: 10px; color: #666;"><em>Laws highlighted in gray may not apply to the selected industry context.</em></p>
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
                        <th>Industry Applicability</th>
                    </tr>
                </thead>
                <tbody>
        `;

        const selectedIndustry = this.analysisData.industry;

        countryData.laws.forEach((law, index) => {
            const isApplicable = this.isLawApplicableToIndustry(law, selectedIndustry);
            const rowStyle = isApplicable ? '' : 'style="background-color: #f0f0f0; color: #888;"';
            const applicabilityText = isApplicable ? '✓ Applicable' : '✗ Not Applicable';
            const applicableIndustries = law.applicableIndustries ?
                (law.applicableIndustries.includes('all') ? 'All Industries' : law.applicableIndustries.join(', ')) :
                'All Industries';

            html += `
                <tr ${rowStyle}>
                    <td>${index + 1}</td>
                    <td>${countryData.name}</td>
                    <td>${law.name}</td>
                    <td>${law.abbr}</td>
                    <td>${law.regulator}</td>
                    <td>${law.type}</td>
                    <td>${law.keyPoints}</td>
                    <td><span class="applicability-badge ${isApplicable ? 'applicable' : 'not-applicable'}">${applicabilityText}</span><br><small style="color: #999;">${applicableIndustries}</small></td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
        container.classList.remove('hidden');

        // Trigger penalty case analysis
        this.analyzePenaltyCases();
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

    isLawApplicableToIndustry(law, industry) {
        // If no industry specified or law has no applicability data, assume applicable
        if (!industry || !law.applicableIndustries) {
            return true;
        }

        // If law applies to all industries
        if (law.applicableIndustries.includes('all')) {
            return true;
        }

        // Check if the selected industry is in the law's applicable industries
        return law.applicableIndustries.includes(industry);
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
                        <li><strong>US State Privacy:</strong> <a href="https://iapp.org/resources/article/us-state-privacy-legislation-tracker" target="_blank">IAPP US State Privacy Legislation Tracker</a>, <a href="https://privacy.utah.gov/new-national-law-tracker/" target="_blank">Utah National Law Tracker</a>, <a href="https://www.recordinglaw.com/us-laws/data-privacy-laws/us-state-privacy-laws-comparison/" target="_blank">RecordingLaw Comparison Chart</a></li>
                        <li><strong>US State Authorities:</strong> <a href="https://cppa.ca.gov" target="_blank">California CPPA</a>, <a href="https://privacy.ca.gov" target="_blank">California Privacy Agency</a>, <a href="https://www.oag.state.va.us/consumer-protection/" target="_blank">Virginia AG (VCDPA)</a>, <a href="https://coag.gov/office-sections/consumer-protection/" target="_blank">Colorado AG</a>, <a href="https://portal.ct.gov/ag" target="_blank">Connecticut AG</a>, <a href="https://privacy.utah.gov" target="_blank">Utah Privacy Office</a></li>
                        <li><strong>Legal Research Platforms:</strong> <a href="https://uk.practicallaw.thomsonreuters.com" target="_blank">Practical Law (Thomson Reuters)</a>, <a href="https://today.westlaw.com" target="_blank">Westlaw</a>, <a href="https://advance.lexis.com" target="_blank">Lexis Advance</a>, <a href="https://www.dataguidance.com" target="_blank">DataGuidance</a>, <a href="https://catalog.data.gov" target="_blank">Data.gov Catalog</a>, <a href="https://eresources.loc.gov" target="_blank">Library of Congress E-Resources</a></li>
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

        // Trigger penalty case analysis
        this.analyzePenaltyCases();
    }

    // Penalty Case Analysis Agent
    async analyzePenaltyCases() {
        const law = this.analysisData.selectedLaw;
        this.showLoading('penalty-case-analysis agent retrieving 2024 enforcement data...');
        await this.delay(1500);

        const penaltyCases = this.getPenaltyCases(law.id);

        this.renderPenaltyAnalysis(penaltyCases);
        this.hideLoading();
    }

    getPenaltyCases(lawId) {
        const cases = {
            'gdpr': [
                // 2025 Cases
                { authority: 'DPC (Ireland)', year: 2025, company: 'Meta', amount: '€251 million', clause: 'Art. 5(1)(a)', violation: 'Lawfulness of processing - unauthorized data use for AI training', frequency: 'High', impact: 'Cross-border' },
                { authority: 'CNIL (France)', year: 2025, company: 'Amazon France', amount: '€32 million', clause: 'Art. 6', violation: 'Cookie consent mechanism violations', frequency: 'High', impact: 'Cross-border' },
                { authority: 'ICO (UK)', year: 2025, company: 'TikTok', amount: '€12 million', clause: 'Art. 8', violation: 'Processing children\'s data without appropriate safeguards', frequency: 'High', impact: 'Cross-border' },
                { authority: 'AEPD (Spain)', year: 2025, company: 'Telefonica', amount: '€5.5 million', clause: 'Art. 17', violation: 'Failure to comply with data erasure requests', frequency: 'Medium', impact: 'National' },
                { authority: 'DPA (Netherlands)', year: 2025, company: 'Booking.com', amount: '€18 million', clause: 'Art. 33', violation: 'Delayed data breach notification to authorities', frequency: 'High', impact: 'Cross-border' },
                { authority: 'CNIL (France)', year: 2025, company: 'Credit Agricole', amount: '€3 million', clause: 'Art. 32', violation: 'Insufficient security measures for customer data', frequency: 'Medium', impact: 'National' },
                // 2024 Cases
                { authority: 'DPC (Ireland)', year: 2024, company: 'Meta/Instagram', amount: '€480 million', clause: 'Art. 5', violation: 'Children data processing without safeguards', frequency: 'High', impact: 'Cross-border' },
                { authority: 'CNIL (France)', year: 2024, company: 'Yahoo! EMEA', amount: '€10 million', clause: 'Art. 6', violation: 'Cookie consent violations', frequency: 'High', impact: 'Cross-border' },
                { authority: 'Garante (Italy)', year: 2024, company: 'Sogei S.p.A.', amount: '€25 million', clause: 'Art. 32', violation: 'Insufficient security measures', frequency: 'High', impact: 'National' },
                { authority: 'EDPB', year: 2024, company: 'TikTok', amount: '€345 million', clause: 'Art. 8', violation: 'Default settings exposing minors', frequency: 'High', impact: 'Cross-border' },
                { authority: 'DPC (Ireland)', year: 2024, company: 'LinkedIn', amount: '€310 million', clause: 'Art. 6', violation: 'Behavioral analysis without legal basis', frequency: 'High', impact: 'Cross-border' },
                { authority: 'CNIL (France)', year: 2024, company: 'Doctolib', amount: '€2.5 million', clause: 'Art. 28', violation: 'Inadequate processor agreements', frequency: 'Medium', impact: 'National' },
                { authority: 'CNIL (France)', year: 2024, company: 'FREE Mobile', amount: '€4.5 million', clause: 'Art. 33', violation: 'Delayed breach notification', frequency: 'High', impact: 'National' },
                { authority: 'ICO (UK)', year: 2024, company: 'Advanced CSG', amount: '€3.2 million', clause: 'Art. 32', violation: 'Ransomware due to poor security', frequency: 'High', impact: 'Cross-border' }
            ],
            'ccpa': [
                { authority: 'CA Attorney General', year: 2024, company: 'DoorDash', amount: '$375,000', clause: 'CCPA §1798.140', violation: 'Unauthorized data sharing with marketing', frequency: 'High', impact: 'State-level' },
                { authority: 'CA Privacy Agency', year: 2024, company: 'Sephora', amount: '$1.2 million', clause: 'CCPA §1798.120', violation: 'Selling data without opt-out', frequency: 'High', impact: 'State-level' }
            ],
            'pipl': [
                { authority: 'CAC (China)', year: 2024, company: 'Various', amount: '¥500 million', clause: 'PIPL Art. 13-15', violation: 'Illegal data collection practices', frequency: 'High', impact: 'National' }
            ],
            'pdpa': [
                { authority: 'PDPC (Singapore)', year: 2024, company: 'Various', amount: 'S$200,000', clause: 'PDPA s.24', violation: 'Data protection failures', frequency: 'Medium', impact: 'National' }
            ]
        };
        return cases[lawId] || [];
    }

    categorizeClausesByRisk(clauses, penaltyCases) {
        const result = { high: [], medium: [], low: [] };
        clauses.forEach(clause => {
            const score = this.calculateClauseRiskScore(clause, penaltyCases);
            if (score >= 7) result.high.push({ ...clause, riskScore: score });
            else if (score >= 4) result.medium.push({ ...clause, riskScore: score });
            else result.low.push({ ...clause, riskScore: score });
        });
        return result;
    }

    calculateClauseRiskScore(clause, penaltyCases) {
        let score = 0;
        const clauseNum = clause.clause.split(' ')[0];
        const related = penaltyCases.filter(c => c.clause.includes(clauseNum));

        score += related.filter(c => c.frequency === 'High').length * 3;
        score += related.filter(c => c.impact === 'Cross-border').length * 2;
        score += related.filter(c => c.amount.includes('billion') || parseFloat(c.amount.match(/[\d.]+/)[0]) > 100).length * 2;

        if (clause.mandatory === 'Yes') score += 1;
        return Math.min(10, score);
    }

    renderPenaltyAnalysis(penaltyCases) {
        const container = document.getElementById('clauses-result');

        // Group cases by legal provision/clause
        const casesByClause = this.groupCasesByClause(penaltyCases);

        let html = container.innerHTML;
        html += `
            <div class="penalty-analysis-section">
                <h3>🔍 Case Retrieval Agent - Penalty Cases by Legal Provision (2024-2025)</h3>
                <div class="research-info">
                    <div class="agent-task">
                        <strong>Agent Task:</strong> Retrieving publicly available penalty cases from the past two years (2024-2025), classified by violated legal provisions
                    </div>
                    <div class="authoritative-sources">
                        <strong>Data Sources:</strong>
                        <ul>
                            <li><strong>CNIL (France):</strong> <a href="https://www.cnil.fr/en/sanctions-issued-cnil" target="_blank">Sanctions Database</a></li>
                            <li><strong>DPC (Ireland):</strong> <a href="https://www.dataprotection.ie" target="_blank">Enforcement Actions</a></li>
                            <li><strong>ICO (UK):</strong> <a href="https://ico.org.uk/action-weve-taken/enforcement" target="_blank">Enforcement</a></li>
                            <li><strong>AEPD (Spain):</strong> <a href="https://www.aepd.es" target="_blank">Sanctions</a></li>
                            <li><strong>EDPB:</strong> <a href="https://www.edpb.europa.eu/our-work-tools/enforcement_en" target="_blank">Cross-border decisions</a></li>
                            <li><strong>Enforcement Tracker:</strong> <a href="https://www.enforcementtracker.com" target="_blank">Global Database</a></li>
                        </ul>
                    </div>
                </div>

                ${this.generateClauseGroupedTable(casesByClause)}
            </div>
        `;
        container.innerHTML = html;
    }

    groupCasesByClause(penaltyCases) {
        const grouped = {};
        penaltyCases.forEach(c => {
            const clause = c.clause;
            if (!grouped[clause]) {
                grouped[clause] = [];
            }
            grouped[clause].push(c);
        });
        // Sort by clause name
        return Object.keys(grouped).sort().reduce((obj, key) => {
            obj[key] = grouped[key];
            return obj;
        }, {});
    }

    generateClauseGroupedTable(casesByClause) {
        let html = '<div class="clause-grouped-table">';

        for (const [clause, cases] of Object.entries(casesByClause)) {
            const clauseTotal = cases.reduce((sum, c) => sum + this.extractPenaltyAmount(c.amount), 0);

            html += `
                <div class="clause-group">
                    <div class="clause-header">
                        <h4>${clause}</h4>
                        <span class="case-count">${cases.length} case${cases.length > 1 ? 's' : ''}</span>
                    </div>
                    <table class="result-table penalty-table">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Penalized Company</th>
                                <th>Penalizing Authority</th>
                                <th>Penalty Amount</th>
                                <th>Violation Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cases.map(c => `
                                <tr>
                                    <td>${c.year}</td>
                                    <td><strong>${c.company}</strong></td>
                                    <td>${c.authority}</td>
                                    <td class="penalty-amount">${c.amount}</td>
                                    <td>${c.violation}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" style="text-align: right;"><strong>Total for ${clause}:</strong></td>
                                <td class="penalty-amount" colspan="2"><strong>€${(clauseTotal/1000000).toFixed(1)}M</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            `;
        }

        html += '</div>';
        return html;
    }

    extractPenaltyAmount(amountStr) {
        const match = amountStr.match(/[\d.]+/);
        if (match) {
            let num = parseFloat(match[0]);
            if (amountStr.includes('billion')) num *= 1000000000;
            else if (amountStr.includes('million')) num *= 1000000;
            return num;
        }
        return 0;
    }

    generateRiskDistributionChart(riskCategories) {
        const total = riskCategories.high.length + riskCategories.medium.length + riskCategories.low.length;
        const h = riskCategories.high.length, m = riskCategories.medium.length, l = riskCategories.low.length;
        return `
            <h4>Risk Distribution</h4>
            <div class="risk-distribution">
                <div class="risk-row">
                    <span class="risk-label high">High Risk</span>
                    <div class="risk-bar-container">
                        <div class="risk-bar high" style="width:${(h/total*100)}%"></div>
                    </div>
                    <span class="risk-count">${h}</span>
                </div>
                <div class="risk-row">
                    <span class="risk-label medium">Medium Risk</span>
                    <div class="risk-bar-container">
                        <div class="risk-bar medium" style="width:${(m/total*100)}%"></div>
                    </div>
                    <span class="risk-count">${m}</span>
                </div>
                <div class="risk-row">
                    <span class="risk-label low">Low Risk</span>
                    <div class="risk-bar-container">
                        <div class="risk-bar low" style="width:${(l/total*100)}%"></div>
                    </div>
                    <span class="risk-count">${l}</span>
                </div>
            </div>
        `;
    }

    generateAuthorityChart(penaltyCases) {
        const authorityTotals = {};
        penaltyCases.forEach(c => {
            const amount = this.extractPenaltyAmount(c.amount);
            authorityTotals[c.authority] = (authorityTotals[c.authority] || 0) + amount;
        });
        const sorted = Object.entries(authorityTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const max = sorted[0][1];

        return `
            <h4>Penalties by Authority (2024)</h4>
            <div class="authority-chart">
                ${sorted.map(([auth, total]) => {
                    const pct = (total / max * 100).toFixed(0);
                    const formatted = total >= 1000000 ? `€${(total/1000000).toFixed(0)}M` : `€${(total/1000).toFixed(0)}K`;
                    return `
                        <div class="auth-row">
                            <span class="auth-name">${auth.split(' ')[0]}</span>
                            <div class="auth-bar-bg">
                                <div class="auth-bar" style="width:${pct}%"></div>
                            </div>
                            <span class="auth-value">${formatted}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    generateCasesTable(penaltyCases) {
        return `
            <h4>2024 Enforcement Case Details</h4>
            <table class="result-table penalty-table">
                <thead>
                    <tr>
                        <th>Authority</th>
                        <th>Company</th>
                        <th>Amount</th>
                        <th>Clause</th>
                        <th>Violation</th>
                        <th>Impact</th>
                    </tr>
                </thead>
                <tbody>
                    ${penaltyCases.map(c => `
                        <tr>
                            <td><strong>${c.authority}</strong></td>
                            <td>${c.company}</td>
                            <td class="penalty-amount">${c.amount}</td>
                            <td>${c.clause}</td>
                            <td>${c.violation}</td>
                            <td><span class="impact-badge ${c.impact.toLowerCase().replace('-', '')}">${c.impact}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
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
        // Helper function to collect Yes/No answers with details
        const collectYesNoAnswer = (groupName) => {
            const yesRadio = document.querySelector(`input[name="${groupName}"][value="yes"]:checked`);
            const noRadio = document.querySelector(`input[name="${groupName}"][value="no"]:checked`);

            if (yesRadio) {
                const detailId = yesRadio.getAttribute('data-detail');
                const textarea = document.querySelector(`#${detailId} textarea`);
                return {
                    answer: 'Yes',
                    details: textarea ? textarea.value.trim() : ''
                };
            } else if (noRadio) {
                return {
                    answer: 'No',
                    details: 'Not applicable'
                };
            }
            return { answer: '', details: '' };
        };

        // Collect all Yes/No fields with their details
        const businessInfo = {
            // Dimension 1: Organizational Compliance Design Status
            orgStructure: collectYesNoAnswer('org-structure'),
            privacyOfficer: collectYesNoAnswer('privacy-officer'),
            privacyCertification: collectYesNoAnswer('privacy-certification'),
            privacyAudit: collectYesNoAnswer('privacy-audit'),
            internalStandards: collectYesNoAnswer('internal-standards'),
            dataClassification: collectYesNoAnswer('data-classification'),
            thirdPartyCheck: collectYesNoAnswer('third-party-check'),
            emergencyPlan: collectYesNoAnswer('emergency-plan'),
            disposalRecords: collectYesNoAnswer('disposal-records'),
            periodicPipia: collectYesNoAnswer('periodic-pipia'),
            rightsResponseTeam: collectYesNoAnswer('rights-response-team'),
            complaintMechanism: collectYesNoAnswer('complaint-mechanism'),

            // Dimension 2: System-Level Data Security Measures
            piInventory: collectYesNoAnswer('pi-inventory'),
            internalTransmission: collectYesNoAnswer('internal-transmission'),
            thirdPartySharing: collectYesNoAnswer('third-party-sharing'),
            accessControl: collectYesNoAnswer('access-control'),
            displayObfuscation: collectYesNoAnswer('display-obfuscation'),
            deletionMechanism: collectYesNoAnswer('deletion-mechanism'),
            processingLogs: collectYesNoAnswer('processing-logs'),
            storageLocation: collectYesNoAnswer('storage-location'),
            storageMethod: collectYesNoAnswer('storage-method'),
            platformType: collectYesNoAnswer('platform-type'),
            dataSync: collectYesNoAnswer('data-sync'),
            securityMechanisms: collectYesNoAnswer('security-mechanisms'),
            backupStatus: collectYesNoAnswer('backup-status'),

            // Dimension 3: Business Process Design Status
            collectionEvaluation: collectYesNoAnswer('collection-evaluation'),
            processingMethods: collectYesNoAnswer('processing-methods'),
            privacyPolicy: collectYesNoAnswer('privacy-policy'),
            rightsResponse: collectYesNoAnswer('rights-response'),
            pipiaResults: collectYesNoAnswer('pipia-results'),
            thirdPartySharingMain: collectYesNoAnswer('third-party-sharing-main'),
            thirdPartyConsent: collectYesNoAnswer('third-party-consent'),
            recipientSupervision: collectYesNoAnswer('recipient-supervision'),
            recipientContracts: collectYesNoAnswer('recipient-contracts'),
            internalSharing: collectYesNoAnswer('internal-sharing'),
            entrustedPipia: collectYesNoAnswer('entrusted-pipia'),
            entrustedContracts: collectYesNoAnswer('entrusted-contracts'),
            entrustedSupervision: collectYesNoAnswer('entrusted-supervision')
        };

        // Check if all fields are answered
        const allFieldsAnswered = Object.values(businessInfo).every(value => value.answer !== '');
        if (!allFieldsAnswered) {
            alert('Please answer all questions.');
            return;
        }

        this.analysisData.businessInfo = businessInfo;

        this.showLoading('gap-analysis agent generating compliance gap report with knowledge base references...');

        // Simulate gap analysis
        await this.delay(2500);

        this.analysisData.gapReport = await this.generateGapReport();
        this.renderGapReport();
        this.hideLoading();

        // Show action buttons
        document.getElementById('actions-bar').classList.remove('hidden');
    }

    async generateGapReport() {
        const gaps = [];
        const controlMatrix = this.analysisData.controlMatrix;
        const businessInfo = this.analysisData.businessInfo;

        // Analyze each control requirement
        for (const control of controlMatrix) {
            const gap = await this.analyzeGap(control, businessInfo);
            gaps.push(gap);
        }

        return gaps;
    }

    async analyzeGap(control, businessInfo) {
        // Analyze gap based on text inputs using keyword matching
        const domain = control.domain.toLowerCase();
        const requirement = control.requirement.toLowerCase();

        // Define keyword categories for each dimension
        const orgKeywords = ['structure', 'team', 'officer', 'dpo', 'policy', 'documentation', 'training', 'audit'];
        const securityKeywords = ['security', 'encrypt', 'access', 'control', 'safeguard', 'protection', 'firewall', 'mask', 'obfusc', 'deletion', 'anonymiz', 'storage'];
        const processKeywords = ['consent', 'notice', 'privacy policy', 'right', 'access', 'deletion', 'portability', 'piria', 'dpia', 'assessment', 'collection', 'purpose'];

        // Helper to get text from Yes/No answer
        const getAnswerText = (item) => item ? `${item.answer} ${item.details || ''}` : '';

        // Convert all business info to lowercase for analysis
        const orgText = (getAnswerText(businessInfo.orgStructure) + ' ' + getAnswerText(businessInfo.privacyOfficer) + ' ' + getAnswerText(businessInfo.privacyCertification) + ' ' + getAnswerText(businessInfo.privacyAudit) + ' ' + getAnswerText(businessInfo.internalStandards) + ' ' + getAnswerText(businessInfo.dataClassification) + ' ' + getAnswerText(businessInfo.thirdPartyCheck) + ' ' + getAnswerText(businessInfo.emergencyPlan) + ' ' + getAnswerText(businessInfo.disposalRecords) + ' ' + getAnswerText(businessInfo.periodicPipia) + ' ' + getAnswerText(businessInfo.rightsResponseTeam) + ' ' + getAnswerText(businessInfo.complaintMechanism)).toLowerCase();
        const securityText = (getAnswerText(businessInfo.piInventory) + ' ' + getAnswerText(businessInfo.internalTransmission) + ' ' + getAnswerText(businessInfo.thirdPartySharing) + ' ' + getAnswerText(businessInfo.accessControl) + ' ' + getAnswerText(businessInfo.displayObfuscation) + ' ' + getAnswerText(businessInfo.deletionMechanism) + ' ' + getAnswerText(businessInfo.processingLogs) + ' ' + getAnswerText(businessInfo.storageLocation) + ' ' + getAnswerText(businessInfo.storageMethod) + ' ' + getAnswerText(businessInfo.platformType) + ' ' + getAnswerText(businessInfo.dataSync) + ' ' + getAnswerText(businessInfo.securityMechanisms) + ' ' + getAnswerText(businessInfo.backupStatus)).toLowerCase();
        const processText = (getAnswerText(businessInfo.collectionEvaluation) + ' ' + getAnswerText(businessInfo.processingMethods) + ' ' + getAnswerText(businessInfo.privacyPolicy) + ' ' + getAnswerText(businessInfo.rightsResponse) + ' ' + getAnswerText(businessInfo.pipiaResults) + ' ' + getAnswerText(businessInfo.thirdPartySharingMain) + ' ' + getAnswerText(businessInfo.thirdPartyConsent) + ' ' + getAnswerText(businessInfo.recipientSupervision) + ' ' + getAnswerText(businessInfo.recipientContracts) + ' ' + getAnswerText(businessInfo.internalSharing) + ' ' + getAnswerText(businessInfo.entrustedPipia) + ' ' + getAnswerText(businessInfo.entrustedContracts) + ' ' + getAnswerText(businessInfo.entrustedSupervision)).toLowerCase();

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

        // Search knowledge base for relevant references
        const kbReferences = await this.searchKnowledgeBaseForGap(control, hasGap);

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
            relevantScore: relevantScore,
            kbReferences: kbReferences
        };
    }

    async searchKnowledgeBaseForGap(control, hasGap) {
        if (!hasGap) return [];

        try {
            // Create search query based on control domain and requirement
            const searchTerms = [
                control.domain.toLowerCase(),
                control.requirement.toLowerCase().split(' ').slice(0, 3).join(' ') // First 3 words
            ];

            // Add specific risk-related terms based on control type
            if (control.domain.includes('security') || control.requirement.includes('breach')) {
                searchTerms.push('data breach', 'incident response');
            } else if (control.domain.includes('consent') || control.requirement.includes('consent')) {
                searchTerms.push('consent', 'user rights');
            } else if (control.domain.includes('rights') || control.requirement.includes('access')) {
                searchTerms.push('data subject rights', 'access request');
            } else if (control.domain.includes('transfer') || control.requirement.includes('transfer')) {
                searchTerms.push('international transfer', 'data transfer');
            }

            const query = searchTerms.join(' ');

            const response = await fetch(`/api/knowledge-base/search?query=${encodeURIComponent(query)}`);
            if (response.ok) {
                const results = await response.json();
                return results.slice(0, 3); // Return top 3 relevant documents
            }
        } catch (error) {
            console.error('Knowledge base search error:', error);
        }

        return [];
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
        // Enhanced Risk Assessment with Numerical Scoring (from legal-super-skill)
        // Severity: 1=Negligible, 2=Low, 3=Moderate, 4=High, 5=Critical
        // Likelihood: 1=Remote, 2=Unlikely, 3=Possible, 4=Likely, 5=Almost Certain
        const severityMap = { 'Negligible': 1, 'Low': 2, 'Moderate': 3, 'High': 4, 'Critical': 5, 'Severe': 5 };
        const likelihoodMap = { 'Very Low': 1, 'Low': 2, 'Medium': 3, 'High': 4, 'Very High': 5 };

        const s = severityMap[impact] || 3;
        const l = likelihoodMap[likelihood] || 3;
        const riskScore = s * l;

        // Legal-Super-Skill Risk Matrix
        if (riskScore >= 16) return 'Severe';      // RED - Immediate escalation
        if (riskScore >= 10) return 'High';        // ORANGE - Escalate to senior counsel
        if (riskScore >= 5) return 'Medium';       // YELLOW - Mitigate with owner
        return 'Low';                              // GREEN - Accept and monitor
    }

    // Legal-Super-Skill: GREEN/YELLOW/RED Classification for Compliance Gaps
    classifyComplianceGap(gap) {
        // GREEN: Within acceptable range, aligns with standard
        // YELLOW: Outside standard but negotiable/improvable
        // RED: Outside acceptable range, material risk

        if (!gap.hasGap) {
            return {
                classification: 'GREEN',
                action: 'Note for awareness. No immediate action required.',
                priority: 'Monitor'
            };
        }

        if (gap.riskLevel === 'Severe' || gap.riskLevel === 'High') {
            return {
                classification: 'RED',
                action: 'Explain specific risk. Provide market-standard alternative. Immediate escalation required.',
                priority: 'Tier 1 - Must-Have',
                escalation: true
            };
        }

        if (gap.riskLevel === 'Medium') {
            return {
                classification: 'YELLOW',
                action: 'Generate specific remediation plan. Provide fallback position.',
                priority: 'Tier 2 - Should-Have',
                escalation: false
            };
        }

        return {
            classification: 'GREEN',
            action: 'Note for awareness. Periodic monitoring.',
            priority: 'Tier 3 - Monitor',
            escalation: false
        };
    }

    // Legal-Super-Skill: Verification Checklist Framework
    getVerificationChecklist() {
        return {
            gapAnalysis: [
                'All material clauses analyzed against business information',
                'Classifications are consistent with evidence',
                'Risk levels include specific rationale',
                'Recommendations are actionable and prioritized',
                'Next steps have owners and deadlines',
                'Penalty references are accurate and current'
            ],
            complianceReview: [
                'Correct regulation identified for each clause',
                'Deadline calculated from documented dates',
                'Identity verification procedures confirmed',
                'All systems and processes searched',
                'Exemptions checked and documented',
                'Denial cites specific regulatory provision'
            ],
            riskAssessment: [
                'Severity and Likelihood rated independently',
                'Risk score calculated correctly (S × L)',
                'Risk level consistent with matrix',
                'Multiple mitigation options provided',
                'Residual risk stated explicitly',
                'Monitoring plan with clear triggers',
                'Next steps have owners and deadlines'
            ],
            redFlags: [
                'Avoid: "should", "probably", "seems to", "I believe"',
                'Verify: Never deliver without re-reading',
                'Confirm: Calculate deadlines from source dates',
                'Check: Cite provisions with current references',
                'Validate: All business info inputs confirmed'
            ]
        };
    }

    // Legal-Super-Skill: Data Subject Request Handling Workflow
    getDSRWorkflow() {
        return {
            step1: {
                name: 'Intake and Identification',
                actions: [
                    'Identify request type (access, deletion, correction, portability, restriction, objection)',
                    'Identify applicable regulation(s) (GDPR, CCPA/CPRA, LGPD, etc.)',
                    'Verify requester identity',
                    'Log immediately: Date received, Request type, Requester identity, Applicable regulation, Response deadline, Assigned handler'
                ]
            },
            step2: {
                name: 'Check Exemptions',
                conditions: [
                    'Active litigation hold',
                    'Regulatory retention requirements',
                    'Legal claims defense',
                    'Third-party rights',
                    'Archiving in public interest',
                    'Freedom of expression'
                ]
            },
            step3: {
                name: 'Timeline Reference',
                timelines: {
                    'GDPR': { acknowledgment: 'Best practice', response: '30 days', extension: '+60 days' },
                    'CCPA/CPRA': { acknowledgment: '10 business days', response: '45 calendar days', extension: '+45 days' },
                    'UK GDPR': { acknowledgment: 'Best practice', response: '30 days', extension: '+60 days' },
                    'LGPD': { acknowledgment: 'Best practice', response: '15 days', extension: 'Limited' }
                }
            }
        };
    }

    // Legal-Super-Skill: Contract Review Methodology for DPA/Processing Agreements
    getContractReviewMethodology() {
        return {
            limitationOfLiability: {
                checkboxes: [
                    'Cap amount defined',
                    'Mutual or asymmetric cap identified',
                    'Carveouts from the cap listed',
                    'Consequential damages exclusion noted',
                    'Exclusion is mutual',
                    'Carveouts from exclusion identified',
                    'Cap applies per-claim, per-year, or aggregate'
                ]
            },
            indemnification: {
                checkboxes: [
                    'Mutual or unilateral determined',
                    'Trigger scope defined',
                    'Capped or uncapped identified',
                    'Procedure documented',
                    'Indemnitee mitigation obligation noted',
                    'Relationship to limitation of liability assessed'
                ]
            },
            dataProtection: {
                checkboxes: [
                    'DPA required and present',
                    'Controller vs. processor classification',
                    'Sub-processor rights defined',
                    'Breach notification timeline (24-48 hours ideal)',
                    'Cross-border transfer mechanisms',
                    'Data deletion/return obligations',
                    'Security requirements and audit rights',
                    'Purpose limitation confirmed'
                ]
            },
            termination: {
                checkboxes: [
                    'Initial and renewal terms',
                    'Auto-renewal provisions',
                    'Termination for convenience',
                    'Termination for cause',
                    'Effects of termination',
                    'Wind-down period'
                ]
            }
        };
    }

    // Legal-Super-Skill: Outside Counsel Engagement Criteria
    getOutsideCounselCriteria() {
        return {
            mandatory: [
                'Active litigation or arbitration',
                'Government investigation or regulatory inquiry',
                'Criminal exposure or allegations',
                'Securities law issues',
                'Board-level matters or shareholder disputes'
            ],
            stronglyRecommended: [
                'Novel legal issues without precedent',
                'Jurisdictional complexity (multi-country)',
                'Material financial exposure (>5% of revenue)',
                'Specialized expertise required (patent, antitrust)',
                'M&A transactions or divestitures'
            ],
            consider: [
                'Complex contract disputes',
                'Employment claims from senior executives',
                'Data breach incidents',
                'IP infringement matters',
                'Insurance coverage disputes'
            ]
        };
    }

    // Render Privacy Skills Section for Gap Report
    renderPrivacySkillsSection() {
        const portability = this.getDataPortabilityWorkflow();
        const breach = this.getBreachNotificationWorkflow();
        const consent = this.getConsentWithdrawalMechanism();
        const dpia = this.getEnhancedDPIA();

        return `
            <h4>Privacy-Data-Protection-Skills Workflows</h4>
            <div class="privacy-skills-section">
                <div class="skill-tabs">
                    <button class="skill-tab active" onclick="this.showSkillTab('portability')">Data Portability</button>
                    <button class="skill-tab" onclick="this.showSkillTab('breach')">Breach Notification</button>
                    <button class="skill-tab" onclick="this.showSkillTab('consent')">Consent Withdrawal</button>
                    <button class="skill-tab" onclick="this.showSkillTab('dpia')">DPIA Methodology</button>
                </div>

                <div id="skill-portability" class="skill-content active">
                    <h5>${portability.legalFoundation.article} Workflow</h5>
                    <p><strong>Overview:</strong> ${portability.overview}</p>

                    <div class="skill-subsection">
                        <h6>Portable Data Scope</h6>
                        <div class="two-column">
                            <div class="include-list">
                                <strong class="text-success">Include:</strong>
                                <ul>${portability.portableData.include.map(i => `<li>${i}</li>`).join('')}</ul>
                            </div>
                            <div class="exclude-list">
                                <strong class="text-danger">Exclude:</strong>
                                <ul>${portability.portableData.exclude.map(i => `<li>${i}</li>`).join('')}</ul>
                            </div>
                        </div>
                    </div>

                    <div class="skill-subsection">
                        <h6>7-Step Workflow</h6>
                        <div class="workflow-steps">
                            ${portability.workflow.map(step => `
                                <div class="workflow-step">
                                    <div class="step-number">${step.step}</div>
                                    <div class="step-content">
                                        <strong>${step.phase}</strong>
                                        <ul>${step.actions ? step.actions.map(a => `<li>${a}</li>`).join('') : step.formats ? step.formats.map(f => `<li><strong>${f.format}:</strong> ${f.useCase}</li>`).join('') : step.methods ? step.methods.map(m => `<li>${m}</li>`).join('') : ''}</ul>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="skill-subsection">
                        <h6>Timeline</h6>
                        <p><strong>Standard:</strong> ${portability.timeline.standard}</p>
                        <p><strong>Extension:</strong> ${portability.timeline.extension}</p>
                        <p><strong>Fee:</strong> ${portability.timeline.fee}</p>
                    </div>
                </div>

                <div id="skill-breach" class="skill-content" style="display:none;">
                    <h5>GDPR Article 33 Breach Notification Workflow</h5>
                    <p><strong>Overview:</strong> ${breach.overview}</p>
                    <p><strong>Trigger:</strong> ${breach.trigger}</p>
                    <p><strong>Threshold:</strong> ${breach.notificationThreshold}</p>

                    <div class="skill-subsection">
                        <h6>Risk Scoring (6 Factors)</h6>
                        <table class="skill-table">
                            <thead><tr><th>Factor</th><th>Scale</th></tr></thead>
                            <tbody>${breach.riskScoring.factors.map(f => `<tr><td>${f.factor}</td><td>${f.scale}</td></tr>`).join('')}</tbody>
                        </table>
                        <p><strong>Score 7+:</strong> ${breach.riskScoring.scoring[0].action}</p>
                        <p><strong>Score 16+:</strong> ${breach.riskScoring.scoring[1].action}</p>
                    </div>

                    <div class="skill-subsection">
                        <h6>Required Content (Art. 33(3))</h6>
                        <ol>${breach.requiredContent.article33_3.map(item => `<li>${item}</li>`).join('')}</ol>
                    </div>

                    <div class="skill-subsection">
                        <h6>Timeline</h6>
                        <p><strong>Rule:</strong> ${breach.timeline.rule}</p>
                        <p><strong>Note:</strong> ${breach.timeline.note}</p>
                        <p><strong>Phased:</strong> ${breach.timeline.phased}</p>
                    </div>
                </div>

                <div id="skill-consent" class="skill-content" style="display:none;">
                    <h5>GDPR Article 7(3) Consent Withdrawal Mechanism</h5>
                    <p><strong>Legal Requirement:</strong> ${consent.legalRequirement}</p>

                    <div class="skill-subsection">
                        <h6>One-Click Withdrawal Methods</h6>
                        <table class="skill-table">
                            <thead><tr><th>Method</th><th>Clicks</th><th>Path</th></tr></thead>
                            <tbody>${consent.implementation.oneClickWithdrawal.map(m => `<tr><td>${m.method}</td><td>${m.clicks}</td><td>${m.path}</td></tr>`).join('')}</tbody>
                        </table>
                    </div>

                    <div class="skill-subsection">
                        <h6>Processing Pipeline</h6>
                        <p><strong>Initial Response:</strong> ${consent.implementation.processingPipeline.initialResponse}</p>
                        <p><strong>Cascading Effects:</strong> ${consent.implementation.processingPipeline.cascadingEffects}</p>
                        <ul>${consent.implementation.processingPipeline.actions.map(a => `<li>${a}</li>`).join('')}</ul>
                    </div>
                </div>

                <div id="skill-dpia" class="skill-content" style="display:none;">
                    <h5>GDPR Article 35 DPIA Methodology</h5>
                    <p><strong>Overview:</strong> ${dpia.overview}</p>

                    <div class="skill-subsection">
                        <h6>Mandatory Triggers (Art. 35(3))</h6>
                        <ul>${dpia.mandatoryTriggers.article35_3.map(t => `<li>${t}</li>`).join('')}</ul>
                    </div>

                    <div class="skill-subsection">
                        <h6>EDPB Nine Criteria</h6>
                        <p>${dpia.mandatoryTriggers.edpbNineCriteria.description}</p>
                        <ol>${dpia.mandatoryTriggers.edpbNineCriteria.criteria.map(c => `<li>${c}</li>`).join('')}</ol>
                    </div>

                    <div class="skill-subsection">
                        <h6>7-Step DPIA Process</h6>
                        <div class="workflow-steps">
                            ${dpia.sevenStepProcess.map(step => `
                                <div class="workflow-step">
                                    <div class="step-number">${step.step}</div>
                                    <div class="step-content">
                                        <strong>${step.phase}</strong>
                                        <p>Timeline: ${step.timeline}</p>
                                        <p>Output: ${step.output}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="skill-subsection">
                        <h6>Common Deficiencies</h6>
                        <ul>${dpia.commonDeficiencies.map(d => `<li>${d}</li>`).join('')}</ul>
                    </div>

                    <div class="skill-subsection">
                        <h6>Enforcement Examples</h6>
                        <table class="skill-table">
                            <thead><tr><th>Case</th><th>Fine</th><th>Violation</th></tr></thead>
                            <tbody>${dpia.enforcementExamples.map(e => `<tr><td>${e.case}</td><td>${e.fine}</td><td>${e.violation}</td></tr>`).join('')}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    showSkillTab(tabName) {
        // Hide all skill contents
        document.querySelectorAll('.skill-content').forEach(el => {
            el.style.display = 'none';
            el.classList.remove('active');
        });
        // Remove active class from all tabs
        document.querySelectorAll('.skill-tab').forEach(el => {
            el.classList.remove('active');
        });
        // Show selected tab content
        document.getElementById('skill-' + tabName).style.display = 'block';
        document.getElementById('skill-' + tabName).classList.add('active');
        // Add active class to clicked tab
        event.target.classList.add('active');
    }

    // ==========================================
    // Privacy-Data-Protection-Skills Integration
    // ==========================================

    // Skill: Data Portability (GDPR Article 20)
    getDataPortabilityWorkflow() {
        return {
            overview: 'Execute GDPR Article 20 data portability requests covering machine-readable format requirements and direct controller-to-controller transfers',
            legalFoundation: {
                article: 'GDPR Article 20',
                requirements: [
                    'Structured, commonly used, machine-readable format (JSON, CSV, XML)',
                    'Transmit to another controller without hindrance',
                    'Direct transfer where technically feasible (Art. 20(2))',
                    'Must not adversely affect rights of others (Art. 20(3))'
                ],
                applicableLegalBases: ['Art. 6(1)(a) - Consent', 'Art. 6(1)(b) - Contract', 'Art. 9(2)(a) - Explicit consent'],
                excludedLegalBases: ['Legal obligation', 'Vital interests', 'Public interest', 'Legitimate interests']
            },
            portableData: {
                include: [
                    'Data actively provided by data subject (account details, form submissions)',
                    'Observed data from activity (search history, location data, activity logs)',
                    'Raw sensor data from connected devices'
                ],
                exclude: [
                    'Inferred or derived data (credit scores, profiling segments)',
                    'Controller intellectual output from analysis',
                    'Third-party personal data (must redact)',
                    'Manual paper files'
                ]
            },
            workflow: [
                {
                    step: 1,
                    phase: 'Receive and Validate',
                    actions: [
                        'Log request with reference PORT-YYYY-NNNN',
                        'Verify requester identity (tiered verification)',
                        'Determine request type: (a) Self-export or (b) Direct transfer',
                        'If direct transfer, obtain receiving controller details'
                    ]
                },
                {
                    step: 2,
                    phase: 'Scope Assessment',
                    actions: [
                        'Identify all personal data subject provided or observed',
                        'Filter by legal basis - only consent or contract',
                        'Exclude inferred/derived data',
                        'Redact third-party data (Art. 20(3))',
                        'Confirm automated processing (exclude manual files)'
                    ]
                },
                {
                    step: 3,
                    phase: 'Data Extraction',
                    actions: [
                        'Query customer account database',
                        'Extract transaction/order history',
                        'Collect user-generated content',
                        'Gather service interaction logs',
                        'De-duplicate across systems',
                        'Validate data integrity (checksums)'
                    ]
                },
                {
                    step: 4,
                    phase: 'Format the Data',
                    formats: [
                        { format: 'JSON', mime: 'application/json', useCase: 'Default - structured, widely supported' },
                        { format: 'CSV', mime: 'text/csv', useCase: 'Tabular data, spreadsheet-compatible' },
                        { format: 'XML', mime: 'application/xml', useCase: 'Enterprise integration, legacy systems' }
                    ],
                    packaging: [
                        'Each category as separate file',
                        'Manifest file listing files, counts, date ranges, checksums',
                        'ZIP archive with AES-256 encryption'
                    ]
                },
                {
                    step: 5,
                    phase: 'Execute Direct Transfer (if applicable)',
                    methods: [
                        'API transfer via HTTPS with mutual TLS',
                        'SFTP with SSH key authentication',
                        'Secure file exchange portal with time-limited access'
                    ],
                    note: 'If not technically feasible, provide data directly to subject per Art. 20(2)'
                },
                {
                    step: 6,
                    phase: 'Deliver to Data Subject',
                    actions: [
                        'Upload encrypted archive to secure portal',
                        'Send notification with 72-hour expiry download link',
                        'Send decryption password via separate channel',
                        'Include manifest summary and instructions'
                    ]
                },
                {
                    step: 7,
                    phase: 'Close and Document',
                    actions: [
                        'Update portability request register',
                        'Record completion date, categories, format, transfer method',
                        'Retain processing record for 3 years',
                        'Note: Portability does NOT require deletion of original data'
                    ]
                }
            ],
            timeline: {
                standard: '30 calendar days from receipt',
                extension: 'Up to 60 additional days for complex requests (Art. 12(3))',
                fee: 'First copy free; additional copies may incur reasonable fee (Art. 12(5))'
            }
        };
    }

    // Skill: Breach 72h Notification (GDPR Article 33)
    getBreachNotificationWorkflow() {
        return {
            overview: 'Execute GDPR Article 33 breach notification to supervisory authority within 72 hours',
            trigger: 'Clock starts when controller has "reasonable degree of certainty" of compromise',
            notificationThreshold: 'Required unless breach "unlikely to result in risk to rights and freedoms"',
            riskScoring: {
                factors: [
                    { factor: 'Data sensitivity', scale: '1-4' },
                    { factor: 'Volume of data', scale: '1-4' },
                    { factor: 'Identifiability', scale: '1-4' },
                    { factor: 'Severity of consequences', scale: '1-4' },
                    { factor: 'Vulnerable subjects', scale: '1-4' },
                    { factor: 'Controller role', scale: '1-4' }
                ],
                scoring: [
                    { range: 'Score 7+', action: 'Requires notification to supervisory authority' },
                    { range: 'Score 16+', action: 'Also triggers data subject notification (Art. 34)' }
                ]
            },
            requiredContent: {
                article33_3: [
                    'Nature of personal data breach (categories, approximate numbers)',
                    'Categories and approximate number of data subjects concerned',
                    'Categories and approximate number of personal data records concerned',
                    'Name and contact details of DPO or contact point',
                    'Likely consequences of the personal data breach',
                    'Measures taken or proposed to address breach and mitigate risk'
                ]
            },
            timeline: {
                rule: '72 hours continuous including weekends/holidays',
                note: '"Where feasible" deadline; delays require justification',
                phased: 'Phased notification permitted when full details unavailable initially'
            },
            workflow: [
                {
                    phase: 'Hour 0-4: Immediate Response',
                    actions: [
                        'Confirm breach with "reasonable degree of certainty"',
                        'Activate incident response team',
                        'Begin containment measures',
                        'Open breach register entry'
                    ]
                },
                {
                    phase: 'Hour 4-24: Assessment',
                    actions: [
                        'Calculate risk score (6 factors)',
                        'Determine notification obligation',
                        'Gather Art. 33(3) required information',
                        'Draft initial notification if score 7+'
                    ]
                },
                {
                    phase: 'Hour 24-72: Notification',
                    actions: [
                        'Submit to supervisory authority via appropriate channel',
                        'Online portals: BfDI (DE), CNIL (FR), ICO (UK), DPC (IE), AEPD (ES), AP (NL)',
                        'PEC email: Garante (IT)',
                        'Obtain submission confirmation'
                    ]
                },
                {
                    phase: 'Post-72h: Documentation',
                    actions: [
                        'Maintain breach register (Art. 33(5))',
                        'Document justification for any delay',
                        'Prepare data subject notification if score 16+',
                        'Implement remediation measures'
                    ]
                }
            ]
        };
    }

    // Skill: Consent Withdrawal (GDPR Article 7(3))
    getConsentWithdrawalMechanism() {
        return {
            overview: 'Implement GDPR Article 7(3) consent withdrawal with "equal ease" requirement',
            legalRequirement: 'Withdrawing consent must be "as easy as to give it" - comparable effort in clicks, pages, fields, time, and cognitive load',
            implementation: {
                oneClickWithdrawal: [
                    { method: 'Preference center', clicks: 2, path: 'Settings > Privacy > Withdraw Consent' },
                    { method: 'Footer link "Privacy Choices"', clicks: 1, path: 'Direct to consent management' },
                    { method: 'Email unsubscribe', clicks: 1, path: 'RFC 8058 one-click unsubscribe' },
                    { method: 'Account dashboard', clicks: 2, path: 'Dashboard > Privacy widget' },
                    { method: 'API endpoint', clicks: 'Programmatic', path: 'POST /consent/withdraw' }
                ],
                processingPipeline: {
                    initialResponse: '100ms acknowledgment',
                    cascadingEffects: 'Asynchronous within 1 hour',
                    actions: [
                        'Stop analytics collection',
                        'Remove from marketing lists',
                        'Notify third parties (Datalytics Partners, etc.)',
                        'Update consent registry'
                    ]
                },
                thirdPartyNotification: {
                    format: 'Structured JSON payload',
                    requirements: [
                        'Acknowledgment required within 24 hours',
                        'DPA-enforced deadlines: 4h acknowledgment, 24h cessation',
                        'Escalation workflows for non-compliance'
                    ]
                }
            },
            reConsent: {
                permitted: true,
                requirements: [
                    'Clear audit trails',
                    'No dark patterns',
                    'Fresh consent must be freely given, specific, informed, unambiguous'
                ]
            }
        };
    }

    // Skill: Enhanced DPIA Methodology (GDPR Article 35)
    getEnhancedDPIA() {
        return {
            overview: 'Conduct GDPR Data Protection Impact Assessment under Article 35 with EDPB WP248rev.01 methodology',
            mandatoryTriggers: {
                article35_3: [
                    'Systematic profiling with significant effects',
                    'Large-scale special category data',
                    'Systematic large-scale public monitoring'
                ],
                edpbNineCriteria: {
                    description: 'If 2+ criteria apply, DPIA is presumptively required',
                    criteria: [
                        'Evaluation/scoring (including profiling)',
                        'Automated decision-making with legal/significant effect',
                        'Systematic monitoring',
                        'Sensitive data or data of a highly personal nature',
                        'Large-scale processing',
                        'Matching or combining datasets',
                        'Vulnerable subjects (children, employees, vulnerable groups)',
                        'Innovative use or application of new technology',
                        'Processing preventing exercise of rights'
                    ]
                }
            },
            contentRequirements: {
                article35_7: {
                    mandatoryElements: [
                        'Systematic description of processing (purposes, means)',
                        'Necessity and proportionality assessment',
                        'Risk assessment to rights and freedoms',
                        'Mitigation measures, safeguards, security measures'
                    ]
                }
            },
            riskMatrix: {
                likelihood: ['Remote', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'],
                severity: ['Negligible', 'Limited', 'Substantial', 'Severe', 'Very Severe'],
                levels: ['Low', 'Medium', 'High', 'Very High']
            },
            sevenStepProcess: [
                { step: 1, phase: 'Screening and Scoping', timeline: 'Week 1', output: 'DPIA initiation, criteria assessment' },
                { step: 2, phase: 'Systematic Description', timeline: 'Week 2', output: 'Processing flow, data mapping' },
                { step: 3, phase: 'Necessity and Proportionality Assessment', timeline: 'Week 3', output: 'Legal basis validation, necessity analysis' },
                { step: 4, phase: 'Risk Identification and Assessment', timeline: 'Weeks 3-4', output: 'Risk register, impact assessment' },
                { step: 5, phase: 'Mitigation Measures', timeline: 'Weeks 4-5', output: 'Technical/organizational measures, residual risk' },
                { step: 6, phase: 'DPO Advice and Sign-Off', timeline: 'Weeks 5-6', output: 'DPO consultation, management approval' },
                { step: 7, phase: 'Ongoing Review', timeline: 'Continuous', output: 'Periodic review, change-triggered updates' }
            ],
            keyCompliancePoints: [
                'Controller shall seek advice of DPO where designated (Art. 35(2))',
                'Controller shall seek views of data subjects where appropriate (Art. 35(9))',
                'Residual high risk requires prior consultation with supervisory authority (Art. 36)'
            ],
            commonDeficiencies: [
                'Generic risk descriptions',
                'Missing proportionality analysis',
                'No residual risk calculation',
                'Undocumented DPO advice',
                'Static DPIAs without review',
                'Missing Art. 35(9) justification'
            ],
            enforcementExamples: [
                { case: 'Karolinska Institute (2019)', fine: 'SEK 200,000', violation: 'Genetic data without DPIA' },
                { case: 'Clearview AI (CNIL 2022)', fine: 'EUR 20 million', violation: 'Biometric processing without DPIA' }
            ]
        };
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
            const classification = this.classifyComplianceGap(gap);

            html += `
                <div class="gap-card">
                    <div class="gap-card-header">
                        <div class="gap-card-title">
                            <strong>${gap.clause}</strong> - ${gap.domain}
                        </div>
                        <div class="gap-badges">
                            <span class="risk-badge ${statusClass}">${gap.hasGap ? gap.riskLevel : 'Compliant'}</span>
                            <span class="classification-badge classification-${classification.classification.toLowerCase()}">${classification.classification}</span>
                        </div>
                    </div>
                    <div class="gap-card-body">
                        <p><strong>Requirement:</strong> ${gap.requirement}</p>
                        <p><strong>Mandatory:</strong> ${gap.mandatory}</p>
                        <p><strong>Penalty:</strong> ${gap.penalty}</p>
                        ${gap.hasGap ? `
                            <p><strong>Likelihood:</strong> ${gap.likelihood}</p>
                            <p><strong>Impact:</strong> ${gap.impact}</p>
                            <div class="classification-box classification-${classification.classification.toLowerCase()}">
                                <p><strong>Classification:</strong> ${classification.classification}</p>
                                <p><strong>Priority:</strong> ${classification.priority}</p>
                                <p><strong>Recommended Action:</strong> ${classification.action}</p>
                            </div>
                            <p><strong>Recommendations:</strong></p>
                            <ul>
                                ${gap.recommendations.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                            ${gap.kbReferences && gap.kbReferences.length > 0 ? `
                                <p><strong>Knowledge Base References:</strong></p>
                                <div class="kb-references">
                                    ${gap.kbReferences.map(ref => `
                                        <div class="kb-ref-item">
                                            <strong>${ref.filename}</strong>
                                            <div class="kb-ref-meta">Tags: ${ref.tags.join(', ') || 'None'}</div>
                                            <div class="kb-ref-preview">${ref.content.substring(0, 200)}...</div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        ` : '<p style="color: var(--secondary-color)"><strong>Status:</strong> No gap identified based on provided information</p>'}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        container.classList.remove('hidden');

        // Trigger penalty case analysis
        this.analyzePenaltyCases();
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

**1) Does your organization have a data security and privacy compliance structure for parent and subsidiary companies?**
- **Answer:** ${this.analysisData.businessInfo.orgStructure.answer}
- **Details:** ${this.analysisData.businessInfo.orgStructure.details}

**2) Status of the privacy protection management:**

*Has a dedicated data security and privacy protection officer been appointed?*
- **Answer:** ${this.analysisData.businessInfo.privacyOfficer.answer}
- **Details:** ${this.analysisData.businessInfo.privacyOfficer.details}

*Has privacy protection or information security certification been obtained?*
- **Answer:** ${this.analysisData.businessInfo.privacyCertification.answer}
- **Details:** ${this.analysisData.businessInfo.privacyCertification.details}

*Have data processing activities been audited and summarized?*
- **Answer:** ${this.analysisData.businessInfo.privacyAudit.answer}
- **Details:** ${this.analysisData.businessInfo.privacyAudit.details}

**3) Related internal control management for data security and privacy protection:**

*Are there internal control management standards for privacy compliance?*
- **Answer:** ${this.analysisData.businessInfo.internalStandards.answer}
- **Details:** ${this.analysisData.businessInfo.internalStandards.details}

*Is data classified and graded for management?*
- **Answer:** ${this.analysisData.businessInfo.dataClassification.answer}
- **Details:** ${this.analysisData.businessInfo.dataClassification.details}

*Is an external third-party data security check conducted?*
- **Answer:** ${this.analysisData.businessInfo.thirdPartyCheck.answer}
- **Details:** ${this.analysisData.businessInfo.thirdPartyCheck.details}

*Has the company developed an emergency response plan?*
- **Answer:** ${this.analysisData.businessInfo.emergencyPlan.answer}
- **Details:** ${this.analysisData.businessInfo.emergencyPlan.details}

*Are records maintained for data disposal activities?*
- **Answer:** ${this.analysisData.businessInfo.disposalRecords.answer}
- **Details:** ${this.analysisData.businessInfo.disposalRecords.details}

*Is a privacy impact assessment conducted periodically?*
- **Answer:** ${this.analysisData.businessInfo.periodicPipia.answer}
- **Details:** ${this.analysisData.businessInfo.periodicPipia.details}

*Is there a response mechanism for personal information subject rights?*
- **Answer:** ${this.analysisData.businessInfo.rightsResponseTeam.answer}
- **Details:** ${this.analysisData.businessInfo.rightsResponseTeam.details}

*Is a complaint mechanism established?*
- **Answer:** ${this.analysisData.businessInfo.complaintMechanism.answer}
- **Details:** ${this.analysisData.businessInfo.complaintMechanism.details}

### Dimension 2: System-Level Data Security Measures

**1) Do you maintain an inventory of collected personal information fields and collection methods?**
- **Answer:** ${this.analysisData.businessInfo.piInventory.answer}
- **Details:** ${this.analysisData.businessInfo.piInventory.details}

**2) Is there a secure internal system transmission mechanism?**
- **Answer:** ${this.analysisData.businessInfo.internalTransmission.answer}
- **Details:** ${this.analysisData.businessInfo.internalTransmission.details}

**3) Is there external third-party sharing or commissioned processing?**
- **Answer:** ${this.analysisData.businessInfo.thirdPartySharing.answer}
- **Details:** ${this.analysisData.businessInfo.thirdPartySharing.details}

**4) Is access control implemented?**
- **Answer:** ${this.analysisData.businessInfo.accessControl.answer}
- **Details:** ${this.analysisData.businessInfo.accessControl.details}

**5) Is obfuscation/masking used in data display?**
- **Answer:** ${this.analysisData.businessInfo.displayObfuscation.answer}
- **Details:** ${this.analysisData.businessInfo.displayObfuscation.details}

**6) Are deletion/anonymization mechanisms in place?**
- **Answer:** ${this.analysisData.businessInfo.deletionMechanism.answer}
- **Details:** ${this.analysisData.businessInfo.deletionMechanism.details}

**7) Are personal information processing logs maintained?**
- **Answer:** ${this.analysisData.businessInfo.processingLogs.answer}
- **Details:** ${this.analysisData.businessInfo.processingLogs.details}

**8) Data Storage Location and Security Mechanisms:**

*Do you maintain a record of data storage location and data center location?*
- **Answer:** ${this.analysisData.businessInfo.storageLocation.answer}
- **Details:** ${this.analysisData.businessInfo.storageLocation.details}

*Is storage method documented (offline/cloud)?*
- **Answer:** ${this.analysisData.businessInfo.storageMethod.answer}
- **Details:** ${this.analysisData.businessInfo.storageMethod.details}

*Is platform type documented (self-built or third-party cloud)?*
- **Answer:** ${this.analysisData.businessInfo.platformType.answer}
- **Details:** ${this.analysisData.businessInfo.platformType.details}

*Is data center synchronization documented?*
- **Answer:** ${this.analysisData.businessInfo.dataSync.answer}
- **Details:** ${this.analysisData.businessInfo.dataSync.details}

*Are data security mechanisms documented?*
- **Answer:** ${this.analysisData.businessInfo.securityMechanisms.answer}
- **Details:** ${this.analysisData.businessInfo.securityMechanisms.details}

*Is data backup documented?*
- **Answer:** ${this.analysisData.businessInfo.backupStatus.answer}
- **Details:** ${this.analysisData.businessInfo.backupStatus.details}

### Dimension 3: Business Process Design Status

**1) Has an evaluation of collection purposes, legality, necessity, and minimal scope been conducted?**
- **Answer:** ${this.analysisData.businessInfo.collectionEvaluation.answer}
- **Details:** ${this.analysisData.businessInfo.collectionEvaluation.details}

**2) Are data processing methods documented?**
- **Answer:** ${this.analysisData.businessInfo.processingMethods.answer}
- **Details:** ${this.analysisData.businessInfo.processingMethods.details}

**3) Is privacy policy configuration complete?**
- **Answer:** ${this.analysisData.businessInfo.privacyPolicy.answer}
- **Details:** ${this.analysisData.businessInfo.privacyPolicy.details}

**4) Are user rights response methods established?**
- **Answer:** ${this.analysisData.businessInfo.rightsResponse.answer}
- **Details:** ${this.analysisData.businessInfo.rightsResponse.details}

**5) Have Personal Information Protection Impact Assessments (PIPIA) been conducted?**
- **Answer:** ${this.analysisData.businessInfo.pipiaResults.answer}
- **Details:** ${this.analysisData.businessInfo.pipiaResults.details}

**6) Do you share personal information to third parties?**
- **Answer:** ${this.analysisData.businessInfo.thirdPartySharingMain.answer}
- **Details:** ${this.analysisData.businessInfo.thirdPartySharingMain.details}

*Have you obtained consent for third-party sharing?*
- **Answer:** ${this.analysisData.businessInfo.thirdPartyConsent.answer}
- **Details:** ${this.analysisData.businessInfo.thirdPartyConsent.details}

**7) Do you supervise the data processing activities of data recipients?**
- **Answer:** ${this.analysisData.businessInfo.recipientSupervision.answer}
- **Details:** ${this.analysisData.businessInfo.recipientSupervision.details}

**8) Do you sign contracts with recipients stipulating purpose, duration, protective measures, and obligations?**
- **Answer:** ${this.analysisData.businessInfo.recipientContracts.answer}
- **Details:** ${this.analysisData.businessInfo.recipientContracts.details}

**9) Are there scenarios of internal sharing (subsidiaries, affiliated companies)?**
- **Answer:** ${this.analysisData.businessInfo.internalSharing.answer}
- **Details:** ${this.analysisData.businessInfo.internalSharing.details}

**10) Do you conduct PIPIA before entrusting others to process personal information?**
- **Answer:** ${this.analysisData.businessInfo.entrustedPipia.answer}
- **Details:** ${this.analysisData.businessInfo.entrustedPipia.details}

**11) Do you sign contracts with entrusted parties stipulating purpose, duration, protective measures, and obligations?**
- **Answer:** ${this.analysisData.businessInfo.entrustedContracts.answer}
- **Details:** ${this.analysisData.businessInfo.entrustedContracts.details}

**12) Do you supervise the personal information processing activities of entrusted parties?**
- **Answer:** ${this.analysisData.businessInfo.entrustedSupervision.answer}
- **Details:** ${this.analysisData.businessInfo.entrustedSupervision.details}

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

        // Reset all Yes/No radio buttons and detail textareas
        const yesNoGroups = [
            'org-structure', 'privacy-officer', 'privacy-certification', 'privacy-audit',
            'internal-standards', 'data-classification', 'third-party-check', 'emergency-plan',
            'disposal-records', 'periodic-pipia', 'rights-response-team', 'complaint-mechanism',
            'pi-inventory', 'internal-transmission', 'third-party-sharing', 'access-control',
            'display-obfuscation', 'deletion-mechanism', 'processing-logs', 'storage-location',
            'storage-method', 'platform-type', 'data-sync', 'security-mechanisms', 'backup-status',
            'collection-evaluation', 'processing-methods', 'privacy-policy', 'rights-response',
            'pipia-results', 'third-party-sharing-main', 'third-party-consent',
            'recipient-supervision', 'recipient-contracts', 'internal-sharing',
            'entrusted-pipia', 'entrusted-contracts', 'entrusted-supervision'
        ];

        yesNoGroups.forEach(group => {
            // Uncheck all radios in this group
            const radios = document.querySelectorAll(`input[name="${group}"]`);
            radios.forEach(radio => {
                radio.checked = false;
            });

            // Hide detail sections and clear textareas
            const yesRadio = document.querySelector(`input[name="${group}"][value="yes"]`);
            if (yesRadio) {
                const detailId = yesRadio.getAttribute('data-detail');
                const detailDiv = document.getElementById(detailId);
                if (detailDiv) {
                    detailDiv.classList.add('hidden');
                    const textarea = detailDiv.querySelector('textarea');
                    if (textarea) textarea.value = '';
                }
            }
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

        // Reset US state selection
        document.getElementById('us-state-container').classList.add('hidden');
        document.getElementById('us-state').value = '';
    }

    // US State Privacy Laws Helper Methods
    getStateName(stateCode) {
        const stateNames = {
            'CA': 'California',
            'VA': 'Virginia',
            'CO': 'Colorado',
            'CT': 'Connecticut',
            'UT': 'Utah',
            'IA': 'Iowa',
            'IN': 'Indiana',
            'TN': 'Tennessee',
            'TX': 'Texas',
            'FL': 'Florida',
            'OR': 'Oregon',
            'MT': 'Montana',
            'TX-MH': 'Texas (Health)',
            'WA': 'Washington',
            'NV': 'Nevada',
            'DE': 'Delaware',
            'NJ': 'New Jersey',
            'NH': 'New Hampshire',
            'NE': 'Nebraska',
            'MD': 'Maryland',
            'KY': 'Kentucky',
            'RI': 'Rhode Island'
        };
        return stateNames[stateCode] || stateCode;
    }

    getUSStateLaws(stateCode) {
        const stateLawDatabase = {
            'CA': [
                {
                    id: 'ccpa',
                    name: 'California Consumer Privacy Act',
                    abbr: 'CCPA/CPRA',
                    regulator: 'California Privacy Protection Agency',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, opt-out mechanisms, data sale restrictions, private right of action, sensitive data processing',
                    clauses: this.getCCPAClauses()
                }
            ],
            'VA': [
                {
                    id: 'vcdpa',
                    name: 'Virginia Consumer Data Protection Act',
                    abbr: 'VCDPA',
                    regulator: 'Virginia Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, controller/processor obligations, data protection assessments, targeted advertising opt-out',
                    clauses: this.getGenericClauses()
                }
            ],
            'CO': [
                {
                    id: 'cpa',
                    name: 'Colorado Privacy Act',
                    abbr: 'CPA',
                    regulator: 'Colorado Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, universal opt-out mechanism, sensitive data consent, profiling opt-out',
                    clauses: this.getGenericClauses()
                }
            ],
            'CT': [
                {
                    id: 'ctdpa',
                    name: 'Connecticut Data Privacy Act',
                    abbr: 'CTDPA',
                    regulator: 'Connecticut Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, controller/processor contracts, opt-out of targeted advertising, sensitive data processing',
                    clauses: this.getGenericClauses()
                }
            ],
            'UT': [
                {
                    id: 'ucpa',
                    name: 'Utah Consumer Privacy Act',
                    abbr: 'UCPA',
                    regulator: 'Utah Division of Consumer Protection',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, controller obligations, opt-out of targeted advertising and sales',
                    clauses: this.getGenericClauses()
                }
            ],
            'IA': [
                {
                    id: 'icdpa',
                    name: 'Iowa Consumer Data Protection Act',
                    abbr: 'ICDPA',
                    regulator: 'Iowa Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, controller/processor obligations, 90-day cure period',
                    clauses: this.getGenericClauses()
                }
            ],
            'IN': [
                {
                    id: 'incdpa',
                    name: 'Indiana Consumer Data Protection Act',
                    abbr: 'INCDPA',
                    regulator: 'Indiana Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, data protection assessments, 30-day cure period',
                    clauses: this.getGenericClauses()
                }
            ],
            'TN': [
                {
                    id: 'tipa',
                    name: 'Tennessee Information Protection Act',
                    abbr: 'TIPA',
                    regulator: 'Tennessee Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, NIST CSF alignment, 60-day cure period',
                    clauses: this.getGenericClauses()
                }
            ],
            'TX': [
                {
                    id: 'tdpsa',
                    name: 'Texas Data Privacy and Security Act',
                    abbr: 'TDPSA',
                    regulator: 'Texas Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, broad applicability, sensitive data consent, 30-day cure period',
                    clauses: this.getGenericClauses()
                }
            ],
            'FL': [
                {
                    id: 'fdbr',
                    name: 'Florida Digital Rights Act',
                    abbr: 'FDBR',
                    regulator: 'Florida Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, heightened protections for minors, strict applicability thresholds',
                    clauses: this.getGenericClauses()
                }
            ],
            'OR': [
                {
                    id: 'ocpa',
                    name: 'Oregon Consumer Privacy Act',
                    abbr: 'OCPA',
                    regulator: 'Oregon Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, sensitive data protections, biometric data requirements',
                    clauses: this.getGenericClauses()
                }
            ],
            'MT': [
                {
                    id: 'mtcdpa',
                    name: 'Montana Consumer Data Privacy Act',
                    abbr: 'MTCDPA',
                    regulator: 'Montana Department of Justice',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, opt-out rights, sensitive data consent',
                    clauses: this.getGenericClauses()
                }
            ],
            'TX-MH': [
                {
                    id: 'tx-mhmda',
                    name: 'Texas Medical Health Marketing Data Act',
                    abbr: 'TX MHMDA',
                    regulator: 'Texas Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Protected health information marketing restrictions, consent requirements',
                    clauses: this.getGenericClauses()
                }
            ],
            'WA': [
                {
                    id: 'mhmda',
                    name: 'Washington My Health My Data Act',
                    abbr: 'MHMDA',
                    regulator: 'Washington Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Health data privacy, consent requirements, geofencing restrictions, broad health data definition',
                    clauses: this.getGenericClauses()
                }
            ],
            'NV': [
                {
                    id: 'nrs603a',
                    name: 'Nevada Privacy Law (NRS 603A)',
                    abbr: 'NRS 603A',
                    regulator: 'Nevada Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Online privacy notice, opt-out of sale, data broker registration',
                    clauses: this.getGenericClauses()
                }
            ],
            'DE': [
                {
                    id: 'dpdpa',
                    name: 'Delaware Personal Data Privacy Act',
                    abbr: 'DPDPA',
                    regulator: 'Delaware Department of Justice',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, controller/processor obligations, opt-out rights',
                    clauses: this.getGenericClauses()
                }
            ],
            'NJ': [
                {
                    id: 'njdpa',
                    name: 'New Jersey Data Protection Act',
                    abbr: 'NJDPA',
                    regulator: 'New Jersey Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Comprehensive consumer rights, data protection assessments, sensitive data consent',
                    clauses: this.getGenericClauses()
                }
            ],
            'NH': [
                {
                    id: 'hbs255',
                    name: 'New Hampshire Data Privacy Act',
                    abbr: 'HBS 255',
                    regulator: 'New Hampshire Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, controller obligations, opt-out of targeted advertising',
                    clauses: this.getGenericClauses()
                }
            ],
            'NE': [
                {
                    id: 'ndpa',
                    name: 'Nebraska Data Privacy Act',
                    abbr: 'NDPA',
                    regulator: 'Nebraska Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, opt-out mechanisms, sensitive data protections',
                    clauses: this.getGenericClauses()
                }
            ],
            'MD': [
                {
                    id: 'modpa',
                    name: 'Maryland Online Data Privacy Act',
                    abbr: 'MODPA',
                    regulator: 'Maryland Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, data minimization, strict opt-in for sensitive data',
                    clauses: this.getGenericClauses()
                }
            ],
            'KY': [
                {
                    id: 'kcdpa',
                    name: 'Kentucky Consumer Data Protection Act',
                    abbr: 'KCDPA',
                    regulator: 'Kentucky Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, controller obligations, 30-day cure period',
                    clauses: this.getGenericClauses()
                }
            ],
            'RI': [
                {
                    id: 'ridtpa',
                    name: 'Rhode Island Data Transparency and Privacy Act',
                    abbr: 'RIDTPA',
                    regulator: 'Rhode Island Attorney General',
                    type: 'Primary Law',
                    keyPoints: 'Consumer rights, data protection assessments, opt-out of targeted advertising',
                    clauses: this.getGenericClauses()
                }
            ]
        };

        // Combine state-specific law with federal laws that apply to all states
        const federalLaws = [
            {
                id: 'hipaa',
                name: 'Health Insurance Portability and Accountability Act',
                abbr: 'HIPAA',
                regulator: 'HHS Office for Civil Rights',
                type: 'Federal Law',
                keyPoints: 'Protected health information, security rules, breach notification',
                clauses: this.getHIPAAClauses()
            },
            {
                id: 'glba',
                name: 'Gramm-Leach-Bliley Act',
                abbr: 'GLBA',
                regulator: 'FTC, Federal Banking Agencies',
                type: 'Federal Law',
                keyPoints: 'Financial privacy, safeguards rule, pretexting protection',
                clauses: this.getGLBAClauses()
            }
        ];

        const stateLaws = stateLawDatabase[stateCode] || [];
        return [...stateLaws, ...federalLaws];
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ==========================================
    // Claude API Integration
    // From: https://github.com/anthropics/skills/tree/main/skills/claude-api
    // ==========================================

    // Claude API Configuration
    getClaudeAPIConfig() {
        return {
            model: 'claude-opus-4-7',
            maxTokens: 16000,
            thinking: { type: 'adaptive' },
            outputConfig: { effort: 'xhigh' }
        };
    }

    // Document Processing with Files API Pattern
    getFilesAPIPatterns() {
        return {
            uploadPattern: `
// Upload document
const uploaded = await client.beta.files.upload(
    file: ("document.pdf", open("document.pdf", "rb"), "application/pdf")
);`,
            documentReferencePattern: `
// Reference uploaded document in message
{
    "type": "document",
    "source": {"type": "file", "file_id": uploaded.id},
    "title": "Compliance Document",
    "citations": {"enabled": true}
}`,
            betaHeader: 'files-api-2025-04-14',
            managementOperations: [
                'client.beta.files.list() — list all files',
                'client.beta.files.retrieve_metadata(file_id) — get metadata',
                'client.beta.files.delete(file_id) — remove file'
            ]
        };
    }

    // Personal Knowledge Base System
    getKnowledgeBaseSystem() {
        return {
            architecture: {
                description: 'Stateless API with full conversation history sent each time',
                cachingStrategy: 'Prefix-match caching with cache_control breakpoints',
                storage: 'Persistent storage for document metadata and embeddings'
            },
            cachingStrategy: {
                description: 'Keep stable content first, volatile content after last breakpoint',
                renderOrder: 'tools → system → messages',
                maxBreakpoints: 4,
                minTokens: 1024,
                verification: 'Check usage.cache_read_input_tokens — zero means silent invalidation',
                pattern: `
// Manual cache control
{
    "type": "text",
    "text": "Stable system prompt...",
    "cache_control": {"type": "ephemeral"}
}`
            },
            documentProcessing: {
                supportedFormats: [
                    { format: 'PDF', type: 'document', mediaType: 'application/pdf' },
                    { format: 'TXT', type: 'document', mediaType: 'text/plain' },
                    { format: 'MD', type: 'document', mediaType: 'text/markdown' },
                    { format: 'JSON', type: 'document', mediaType: 'application/json' },
                    { format: 'PNG', type: 'image', mediaType: 'image/png' },
                    { format: 'JPG', type: 'image', mediaType: 'image/jpeg' }
                ],
                base64Pattern: `
// Base64 document encoding
import base64
with open("document.pdf", "rb") as f:
    doc_data = base64.standard_b64encode(f.read()).decode("utf-8")

{
    "type": "document",
    "source": {
        "type": "base64",
        "media_type": "application/pdf",
        "data": doc_data
    }
}`
            },
            conversationManagement: {
                pattern: `
class KnowledgeBaseManager:
    def __init__(self, client, model, system=None):
        self.client = client
        self.model = model
        self.system = system
        self.messages = []
        self.documents = {}  # file_id -> metadata

    async def process_document(self, file_path, title):
        # Upload document
        uploaded = await self.client.beta.files.upload(
            file=(file_path, open(file_path, "rb"), "application/pdf")
        )

        # Store metadata
        self.documents[uploaded.id] = {
            "title": title,
            "file_id": uploaded.id,
            "uploaded_at": datetime.now()
        }

        return uploaded.id

    async def query(self, question, document_ids=None):
        content = [{"type": "text", "text": question}]

        # Add document references if specified
        if document_ids:
            for doc_id in document_ids:
                content.append({
                    "type": "document",
                    "source": {"type": "file", "file_id": doc_id},
                    "citations": {"enabled": True}
                })

        self.messages.append({"role": "user", "content": content})

        response = await self.client.messages.create(
            model=self.model,
            max_tokens=16000,
            system=self.system,
            messages=self.messages
        )

        assistant_msg = next(
            (b.text for b in response.content if b.type == "text"), ""
        )
        self.messages.append({"role": "assistant", "content": assistant_msg})

        return assistant_msg`
            }
        };
    }

    // Enhanced Risk Assessment with Claude API Analysis
    getEnhancedRiskAssessment() {
        return {
            description: 'Multi-dimensional risk assessment using Claude API for intelligent analysis',
            methodology: {
                tier1_singleCall: 'Classification, summarization, extraction, Q&A',
                tier2_workflow: 'Multi-step with code-controlled logic',
                tier3_agent: 'Model-driven exploration with tool use'
            },
            riskAnalysisPrompt: `
You are an expert compliance risk assessor. Analyze the following gap data and provide:

1. Risk Classification (GREEN/YELLOW/RED)
2. Specific risk scenarios that could occur
3. Likelihood assessment with justification
4. Impact severity assessment
5. Recommended mitigation strategies
6. Priority ranking

Gap Data:
- Clause: {{clause}}
- Domain: {{domain}}
- Requirement: {{requirement}}
- Current Status: {{status}}
- Business Context: {{context}}

Output in JSON format:
{
    "classification": "GREEN|YELLOW|RED",
    "risk_scenarios": ["scenario1", "scenario2"],
    "likelihood": "Low|Medium|High",
    "likelihood_rationale": "explanation",
    "impact": "Negligible|Limited|Substantial|Severe|Very Severe",
    "impact_rationale": "explanation",
    "mitigation_strategies": ["strategy1", "strategy2"],
    "priority": 1-10,
    "escalation_required": true|false,
    "recommended_timeline": "immediate|30_days|90_days"
}`,
            structuredOutput: {
                pattern: `
// Use output_config for structured responses
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=16000,
    output_config={
        "format": {
            "type": "json",
            "schema": {
                "type": "object",
                "properties": {
                    "risk_level": {"type": "string", "enum": ["Low", "Medium", "High"]},
                    "classification": {"type": "string", "enum": ["GREEN", "YELLOW", "RED"]},
                    "mitigation_strategies": {"type": "array", "items": {"type": "string"}},
                    "priority": {"type": "integer", "minimum": 1, "maximum": 10}
                },
                "required": ["risk_level", "classification", "mitigation_strategies", "priority"]
            }
        }
    },
    messages=[{"role": "user", "content": risk_analysis_prompt}]
)

// Or use parse() for automatic validation
result = client.messages.parse(
    model="claude-opus-4-7",
    max_tokens=16000,
    messages=[{"role": "user", "content": prompt}],
    response_format=RiskAssessmentSchema
)`
            },
            multiDocumentAnalysis: {
                description: 'Analyze multiple compliance documents simultaneously',
                pattern: `
// Upload multiple compliance documents
const documents = [
    await client.beta.files.upload(file=("policy1.pdf", ...)),
    await client.beta.files.upload(file=("policy2.pdf", ...)),
    await client.beta.files.upload(file=("audit_report.pdf", ...))
];

// Query across all documents
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=16000,
    betas=["files-api-2025-04-14"],
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Compare these compliance documents and identify gaps:"},
            ...documents.map(doc => ({
                "type": "document",
                "source": {"type": "file", "file_id": doc.id},
                "citations": {"enabled": True}
            }))
        ]
    }]
)`,
                useCases: [
                    'Cross-reference policies against regulations',
                    'Compare vendor DPAs with internal standards',
                    'Analyze audit reports against control matrices',
                    'Review incident reports for patterns'
                ]
            }
        };
    }

    // Tool Use Patterns for Compliance Analysis
    getComplianceTools() {
        return {
            description: 'Define tools for the Claude API to use in compliance analysis',
            tools: [
                {
                    name: 'search_regulation',
                    description: 'Search for specific regulation text or guidance',
                    input_schema: {
                        type: 'object',
                        properties: {
                            regulation: { type: 'string', description: 'e.g., GDPR, CCPA' },
                            article: { type: 'string', description: 'Article number or section' },
                            topic: { type: 'string', description: 'Specific topic to search' }
                        },
                        required: ['regulation', 'topic']
                    }
                },
                {
                    name: 'calculate_deadline',
                    description: 'Calculate regulatory response deadlines',
                    input_schema: {
                        type: 'object',
                        properties: {
                            start_date: { type: 'string', format: 'date' },
                            regulation: { type: 'string' },
                            request_type: { type: 'string', enum: ['dsar', 'breach_notification', 'portability'] }
                        },
                        required: ['start_date', 'regulation', 'request_type']
                    }
                },
                {
                    name: 'assess_risk',
                    description: 'Calculate risk score using severity × likelihood',
                    input_schema: {
                        type: 'object',
                        properties: {
                            severity: { type: 'integer', minimum: 1, maximum: 5 },
                            likelihood: { type: 'integer', minimum: 1, maximum: 5 },
                            factors: { type: 'array', items: { type: 'string' } }
                        },
                        required: ['severity', 'likelihood']
                    }
                },
                {
                    name: 'generate_remediation_plan',
                    description: 'Generate specific remediation steps',
                    input_schema: {
                        type: 'object',
                        properties: {
                            gap_type: { type: 'string' },
                            priority: { type: 'string', enum: ['high', 'medium', 'low'] },
                            resources: { type: 'array', items: { type: 'string' } }
                        },
                        required: ['gap_type', 'priority']
                    }
                }
            ],
            toolUsePattern: `
// Tool use for automated compliance analysis
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=16000,
    tools=compliance_tools,
    messages=[{
        "role": "user",
        "content": "Analyze this gap and use appropriate tools to generate recommendations"
    }]
)

// Check for tool calls
for block in response.content:
    if block.type == "tool_use":
        # Execute tool
        result = execute_tool(block.name, block.input)

        # Return result to continue conversation
        follow_up = client.messages.create(
            model="claude-opus-4-7",
            max_tokens=16000,
            tools=compliance_tools,
            messages=[
                {"role": "user", "content": "Analyze this gap..."},
                {"role": "assistant", "content": response.content},
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": json.dumps(result)
                        }
                    ]
                }
            ]
        )`
        };
    }

    // Streaming for Real-time Risk Assessment
    getStreamingPatterns() {
        return {
            description: 'Stream responses for real-time risk assessment UI updates',
            pattern: `
// Streaming for real-time analysis display
stream = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=64000,  # Requires streaming
    messages=[{"role": "user", "content": "Analyze these 50 compliance gaps..."}],
    stream=True
)

# Process stream events
for event in stream:
    if event.type == "content_block_delta":
        if event.delta.type == "text":
            # Update UI in real-time
            ui.append_text(event.delta.text)
        elif event.delta.type == "thinking":
            # Show thinking process (if enabled)
            ui.show_thinking(event.delta.thinking)
    elif event.type == "message_stop":
        # Final message received
        final_message = stream.get_final_message()
        ui.complete(final_message)

# Get final accumulated message
final = stream.final_message()`,
            useCases: [
                'Real-time gap analysis progress display',
                'Live document processing status',
                'Progressive risk assessment results',
                'Interactive compliance Q&A'
            ]
        };
    }

    // Error Handling and Resilience
    getErrorHandlingPatterns() {
        return {
            retryPattern: `
import time
import random

def call_with_retry(client, max_retries=5, base_delay=1.0, max_delay=60.0, **kwargs):
    for attempt in range(max_retries):
        try:
            return client.messages.create(**kwargs)
        except anthropic.RateLimitError as e:
            retry_after = int(e.response.headers.get("retry-after", "60"))
            delay = min(base_delay * (2 ** attempt) + random.uniform(0, 1), max_delay)
            print(f"Rate limited. Retrying in {delay:.1f}s...")
            time.sleep(delay)
        except anthropic.APIStatusError as e:
            if e.status_code >= 500:
                delay = min(base_delay * (2 ** attempt), max_delay)
                print(f"Server error ({e.status_code}). Retrying in {delay:.1f}s...")
                time.sleep(delay)
            else:
                raise
    raise Exception("Max retries exceeded")`,
            errorTypes: [
                { error: 'BadRequestError', cause: 'Invalid request parameters', action: 'Validate input' },
                { error: 'AuthenticationError', cause: 'Invalid API key', action: 'Check ANTHROPIC_API_KEY' },
                { error: 'RateLimitError', cause: 'Too many requests', action: 'Implement retry with backoff' },
                { error: 'APIStatusError (5xx)', cause: 'Server error', action: 'Retry with exponential backoff' }
            ]
        };
    }

    // Render Claude API Integration Section in Gap Report
    renderClaudeAPIIntegration() {
        const config = this.getClaudeAPIConfig();
        const kb = this.getKnowledgeBaseSystem();
        const risk = this.getEnhancedRiskAssessment();

        return `
            <h4>Claude API Integration</h4>
            <div class="claude-api-section">
                <div class="api-config">
                    <h5>Configuration</h5>
                    <p><strong>Model:</strong> ${config.model}</p>
                    <p><strong>Max Tokens:</strong> ${config.maxTokens.toLocaleString()}</p>
                    <p><strong>Thinking:</strong> ${config.thinking.type}</p>
                    <p><strong>Effort:</strong> ${config.outputConfig.effort}</p>
                </div>

                <div class="kb-features">
                    <h5>Knowledge Base Capabilities</h5>
                    <div class="feature-grid">
                        <div class="feature-card">
                            <h6>Document Processing</h6>
                            <ul>
                                ${kb.documentProcessing.supportedFormats.map(f => `<li>${f.format} (${f.mediaType})</li>`).join('')}
                            </ul>
                        </div>
                        <div class="feature-card">
                            <h6>Caching Strategy</h6>
                            <p>${kb.cachingStrategy.description}</p>
                            <p><strong>Max Breakpoints:</strong> ${kb.cachingStrategy.maxBreakpoints}</p>
                            <p><strong>Min Tokens:</strong> ${kb.cachingStrategy.minTokens}</p>
                        </div>
                        <div class="feature-card">
                            <h6>Multi-Document Analysis</h6>
                            <p>Cross-reference policies, audit reports, and vendor agreements simultaneously</p>
                        </div>
                    </div>
                </div>

                <div class="risk-enhancement">
                    <h5>Enhanced Risk Assessment</h5>
                    <p>${risk.description}</p>

                    <div class="methodology-tabs">
                        <div class="method-tab">
                            <h6>Tier 1: Single Call</h6>
                            <p>${risk.methodology.tier1_singleCall}</p>
                        </div>
                        <div class="method-tab">
                            <h6>Tier 2: Workflow</h6>
                            <p>${risk.methodology.tier2_workflow}</p>
                        </div>
                        <div class="method-tab">
                            <h6>Tier 3: Agent</h6>
                            <p>${risk.methodology.tier3_agent}</p>
                        </div>
                    </div>

                    <div class="analysis-tools">
                        <h6>Available Tools</h6>
                        <ul>
                            ${this.getComplianceTools().tools.map(t => `<li><strong>${t.name}:</strong> ${t.description}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="implementation-code">
                    <h5>Implementation Examples</h5>
                    <div class="code-tabs">
                        <pre class="code-block"><code>// Document Upload
${this.getFilesAPIPatterns().uploadPattern}</code></pre>

                        <pre class="code-block"><code>// Structured Risk Analysis
${risk.structuredOutput.pattern}</code></pre>

                        <pre class="code-block"><code>// Streaming Analysis
${this.getStreamingPatterns().pattern}</code></pre>
                    </div>
                </div>
            </div>
        `;
    }

    toggleKBPanel() {
        const panel = document.getElementById('kb-panel');
        panel.classList.toggle('hidden');
    }

    closeKBPanel() {
        const panel = document.getElementById('kb-panel');
        panel.classList.add('hidden');
    }

    initKnowledgeBase() {
        this.knowledgeBase = {
            documents: [],
            searchResults: []
        };

        // Initialize drag and drop
        this.initDragDrop();

        // Load existing documents
        this.loadKnowledgeBase();

        // Bind knowledge base events
        this.bindKnowledgeBaseEvents();
    }

    initDragDrop() {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('dragover');
            }, false);
        });

        uploadArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            this.handleFiles(files);
        });

        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleFiles(files) {
        const fileInput = document.getElementById('file-input');
        fileInput.files = files;
        document.getElementById('upload-docs').disabled = files.length === 0;
    }

    bindKnowledgeBaseEvents() {
        // Upload button
        const uploadBtn = document.getElementById('upload-docs');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                this.uploadDocuments();
            });
        }

        // Search button
        const searchBtn = document.getElementById('search-docs');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.searchDocuments();
            });
        }

        // Clear search button
        const clearBtn = document.getElementById('clear-search');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }

        // Risk assessment button (optional)
        const riskBtn = document.getElementById('find-risk-refs');
        if (riskBtn) {
            riskBtn.addEventListener('click', () => {
                this.findRiskReferences();
            });
        }

        // Enter key for search
        const searchInput = document.getElementById('search-query');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchDocuments();
                }
            });
        }
    }

    async uploadDocuments() {
        const fileInput = document.getElementById('file-input');
        const tagsInput = document.getElementById('doc-tags');
        const files = fileInput.files;

        if (files.length === 0) return;

        const tags = tagsInput.value.trim();

        for (let file of files) {
            const formData = new FormData();
            formData.append('document', file);
            if (tags) {
                formData.append('tags', tags);
            }

            try {
                const response = await fetch('/api/knowledge-base/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Upload failed: ${response.statusText}`);
                }

                const result = await response.json();
                this.knowledgeBase.documents.push(result.entry);
            } catch (error) {
                console.error('Upload error:', error);
                alert(`Failed to upload ${file.name}: ${error.message}`);
            }
        }

        // Clear inputs
        fileInput.value = '';
        tagsInput.value = '';
        document.getElementById('upload-docs').disabled = true;

        // Refresh display
        this.displayDocuments();
        alert('Documents uploaded successfully!');
    }

    async loadKnowledgeBase() {
        try {
            const response = await fetch('/api/knowledge-base');
            if (response.ok) {
                this.knowledgeBase.documents = await response.json();
                this.displayDocuments();
            }
        } catch (error) {
            console.error('Failed to load knowledge base:', error);
        }
    }

    displayDocuments(documents = null) {
        const container = document.getElementById('documents-list');
        const countElement = document.getElementById('doc-count');
        const docs = documents || this.knowledgeBase.documents;

        // Update document count
        countElement.textContent = `(${docs.length})`;

        if (docs.length === 0) {
            container.innerHTML = '<p class="empty-state">No documents uploaded yet. Upload some reference materials to get started.</p>';
            return;
        }

        container.innerHTML = docs.map(doc => `
            <div class="document-item">
                <div class="document-info">
                    <div class="document-title">${doc.filename}</div>
                    <div class="document-meta">
                        Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()} |
                        Size: ${(doc.size / 1024).toFixed(1)} KB
                    </div>
                    ${doc.tags.length > 0 ? `
                        <div class="document-tags">
                            ${doc.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="document-actions">
                    <button class="btn-outline btn-small" onclick="app.downloadDocument('${doc.id}')">
                        <span class="btn-icon">📥</span> Download
                    </button>
                    <button class="btn-outline btn-small" onclick="app.deleteDocument('${doc.id}')" style="color: var(--danger-color);">
                        <span class="btn-icon">🗑️</span> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    async downloadDocument(id) {
        try {
            const response = await fetch(`/api/knowledge-base/download/${id}`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = this.knowledgeBase.documents.find(d => d.id === id)?.filename || 'document';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download document');
        }
    }

    async deleteDocument(id) {
        if (!confirm('Are you sure you want to delete this document?')) return;

        try {
            const response = await fetch(`/api/knowledge-base/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.knowledgeBase.documents = this.knowledgeBase.documents.filter(d => d.id !== id);
                this.displayDocuments();
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete document');
        }
    }

    async searchDocuments() {
        const query = document.getElementById('search-query').value.trim();
        const tags = document.getElementById('search-tags').value.trim();

        if (!query && !tags) {
            this.displayDocuments();
            return;
        }

        try {
            const params = new URLSearchParams();
            if (query) params.append('query', query);
            if (tags) params.append('tags', tags);

            const response = await fetch(`/api/knowledge-base/search?${params}`);
            if (response.ok) {
                const results = await response.json();
                this.displayDocuments(results);
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('Search failed');
        }
    }

    clearSearch() {
        document.getElementById('search-query').value = '';
        document.getElementById('search-tags').value = '';
        this.displayDocuments();
    }

    async findRiskReferences() {
        const category = document.getElementById('risk-category').value;
        if (!category) {
            alert('Please select a risk category');
            return;
        }

        const riskQueries = {
            'data-breach': 'data breach incident response notification penalty',
            'consent': 'consent management user rights GDPR CCPA',
            'data-subject-rights': 'data subject rights access rectification erasure portability',
            'third-party': 'third party vendor processor DPA data processing agreement',
            'international-transfer': 'international data transfer adequacy SCC BCR',
            'privacy-impact': 'privacy impact assessment PIA DPIA high risk processing',
            'vendor-management': 'vendor management due diligence security assessment',
            'incident-response': 'incident response plan breach notification timeline'
        };

        const query = riskQueries[category];
        document.getElementById('search-query').value = query;
        await this.searchDocuments();

        // Show results in risk refs section
        const results = document.getElementById('documents-list').innerHTML;
        const riskResult = document.getElementById('risk-refs-result');
        riskResult.innerHTML = `
            <h4>Risk Assessment References for ${category.replace('-', ' ').toUpperCase()}</h4>
            <div class="documents-list">${results}</div>
        `;
        riskResult.classList.remove('hidden');
    }
}

// Sidebar Phase Navigation
function initSidebarNavigation() {
    const phaseNavItems = document.querySelectorAll('.phase-nav-item');
    const progressSteps = document.querySelectorAll('.progress-step');

    function switchToPhase(phase) {
        const phaseNum = parseInt(phase);

        // Close all dropdowns and reset indicators
        document.querySelectorAll('.ey-nav-dropdown').forEach(d => d.classList.remove('open'));
        document.querySelectorAll('.ey-nav-chevron').forEach(c => c.textContent = '▸');
        document.querySelectorAll('.phase-nav-item').forEach(n => n.classList.remove('active'));

        // Open the target phase dropdown and activate
        const navItem = document.querySelector('.phase-nav-item[data-phase="' + phase + '"]');
        const dropdown = document.querySelector('[data-phase-dropdown="' + phase + '"]');
        const chevron = navItem ? navItem.querySelector('.ey-nav-chevron') : null;

        if (dropdown) dropdown.classList.add('open');
        if (chevron) chevron.textContent = '▾';
        if (navItem) navItem.classList.add('active');

        // Switch phase section
        document.querySelectorAll('.phase-section').forEach(s => s.classList.remove('active'));
        const phaseSection = document.getElementById('phase' + phase);
        if (phaseSection) phaseSection.classList.add('active');

        // Update progress bar
        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < phaseNum) {
                step.classList.add('completed');
            } else if (index + 1 === phaseNum) {
                step.classList.add('active');
            }
        });
    }

    // Sidebar nav item clicks
    phaseNavItems.forEach(item => {
        item.addEventListener('click', () => {
            switchToPhase(item.getAttribute('data-phase'));
        });
    });

    // Progress bar clicks sync to sidebar
    progressSteps.forEach(step => {
        step.addEventListener('click', () => {
            switchToPhase(step.getAttribute('data-phase'));
        });
    });
}

// Initialize the system
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ComplianceAnalysisSystem();
    initSidebarNavigation();
});
