// =============================================
// PROMPT MANAGER - CENTRALIZED PROMPT TEMPLATES
// =============================================

const SYSTEM_CONTEXT = `You are an elite enterprise SecOps Red Team Automation Engine and cybersecurity educator.
You create highly detailed, technically accurate, but FICTIONAL cybersecurity threat models and multi-phase simulation plans for authorized organizational security awareness exercises.
All content is strictly for architectural evaluation and EDUCATIONAL defense purposes only. 
Never include genuine malicious resources or actual attack domains. Use clean technical abstractions and placeholder tracking tokens.`;

const PromptManager = {
  /**
   * Build prompt for phishing email generation
   */
  buildPhishingEmailPrompt: ({ category, target, severity, impersonation, urgency, tone }) => {
    return `${SYSTEM_CONTEXT}

Generate a realistic phishing email simulation for cybersecurity awareness training.

PARAMETERS:
- Category: ${category}
- Target Scenario: ${target}
- Severity Level: ${severity} (low/medium/high/critical)
- Impersonation Type: ${impersonation}
- Urgency Level: ${urgency}/10
- Communication Tone: ${tone}

Generate a JSON object with this EXACT structure:
{
  "subject": "Email subject line",
  "sender": {
    "name": "Display name of the fake sender",
    "email": "fake.sender@spoofed-domain.com"
  },
  "body": "Complete HTML-formatted email body with realistic phishing content. Use [LINK] as placeholder for malicious URLs. Make it realistic but clearly a simulation.",
  "redFlags": ["Red flag 1", "Red flag 2", "Red flag 3", "Red flag 4"],
  "tacticsSummary": "2-3 sentence description of the social engineering tactics used",
  "severityScore": ${urgency},
  "manipulationTechniques": ["Technique 1", "Technique 2", "Technique 3"]
}`;
  },

  /**
   * Build prompt for phishing explanation/education
   */
  buildExplanationPrompt: ({ emailSubject, category, tactics }) => {
    return `${SYSTEM_CONTEXT}

Analyze the following phishing simulation email and provide a comprehensive educational breakdown.

Email Subject: "${emailSubject}"
Category: ${category}
Tactics Used: ${tactics.join(', ')}

Generate a JSON object with this EXACT structure:
{
  "overview": "2-3 sentence overview of this phishing attack style",
  "whyItWorks": "Psychological explanation of why victims fall for this",
  "realWorldExamples": ["Example 1 of similar attack", "Example 2", "Example 3"],
  "protectionTips": ["Tip 1 to protect yourself", "Tip 2", "Tip 3", "Tip 4", "Tip 5"],
  "industryContext": "Brief context about how common this attack type is",
  "difficultyToDetect": "easy|medium|hard|expert",
  "affectedSectors": ["Sector 1", "Sector 2", "Sector 3"]
}`;
  },

  /**
   * Build prompt for campaign scenario generation
   */
  buildCampaignPrompt: ({ campaignName, targetDepartment, attackVector, scope }) => {
    return `${SYSTEM_CONTEXT}

Design a highly detailed, professional phishing campaign simulation blueprint for an enterprise cybersecurity maturity exercise. 

CRITICAL INSTRUCTION: Avoid all vague, conversational, or generic placeholders (e.g., do not say 'train employees', 'send emails', or 'review data'). Every output field must contain realistic corporate system interactions, infrastructure mechanics, and advanced SecOps definitions.

CAMPAIGN ARCHITECTURE PARAMETERS:
- Operational Identifier / Name: ${campaignName}
- Target Department / Control Group: ${targetDepartment}
- Delivery Attack Vector Channel: ${attackVector}
- Boundary Scope Size: ${scope} Active Employee Endpoints

Generate a JSON object with this EXACT structure and keys. Do not deviate from this pattern:
{
  "campaignOverview": "A highly strategic 3-4 sentence operational threat profile. It must detail the specific technical exploit avenue, the targeted software/tool wrapper context, and why the ${targetDepartment} department's baseline configuration layout makes it vulnerable to this delivery channel.",
  "objectives": [
    "Technical objective 1 (e.g., Evaluate gateway ingress parsing layers against domain spoofing variations.)",
    "Technical objective 2 (e.g., Measure organization telemetry tracking latency from proxy delivery timestamp to first SecOps triage log submission.)",
    "Technical objective 3 (e.g., Quantify browser-layer session tracking profile leaks when users execute single sign-on page simulations.)"
  ],
  "phases": [
    {
      "phase": 1,
      "name": "Infrastructure Provisioning & Cryptographic DNS Binding",
      "description": "Register and provision lookalike typosquatted domain assets. Establish structural routing records, inject custom SPF validation strings, configure remote MX records, and bind DKIM public keys to clear gateway parameter inspection walls.",
      "duration": "2 Days",
      "actions": ["Verify proxy listener endpoint health configurations.", "Deploy SSL certificates across tactical reverse-proxy infrastructure nodes."]
    },
    {
      "phase": 2,
      "name": "Target Footprinting & Automated Vector Dispersion",
      "description": "Compile active directory organizational metadata strings for the targeted department profiles. Orchestrate multi-tier message queuing maps utilizing automated header offsets to stagger inbound traffic across message perimeter boundaries.",
      "duration": "2 Days",
      "actions": ["Map target employee tracking identifiers to session lookup indexes.", "Execute initial delivery routines through isolated outbound relay arrays."]
    },
    {
      "phase": 3,
      "name": "Telemetry Ingestion & Perimeter Access Auditing",
      "description": "Log runtime user interaction data via unique tracking webhooks. Intercept client-agent signature modifications, record time-to-click metrics, and categorize automated browser credential autofill responses vs manual key entries.",
      "duration": "3 Days",
      "actions": ["Monitor reverse-proxy validation logs for intercepted testing tokens.", "Cross-reference target submission timestamps against active internal security logs."]
    },
    {
      "phase": 4,
      "name": "SecOps Countermeasure Injection & Tactical Remediation",
      "description": "Inject an immediate, contextual landing container providing instant behavioral training indicators to interacting nodes. Compile metrics into an automated report format and update network filtering systems with active simulation indicators of compromise (IOCs).",
      "duration": "1 Day",
      "actions": ["Push updated boundary filtering rules to corporate security configurations.", "Distribute secure department training metrics summarizing detection indicators."]
    }
  ],
  "emailTemplates": [
    {
      "name": "Bespoke context-driven string (e.g., Legacy System Access Migration Notice or Vendor Invoicing Update Ledger)",
      "category": "${attackVector}",
      "difficulty": "medium"
    }
  ],
  "successMetrics": [
    "Key performance indicator 1 (e.g., Capture ratio of reporting metrics submitted via the internal alert button relative to overall click actions.)",
    "Key performance indicator 2 (e.g., Average response timeline tracking latency before system engineering receives notice of anomalous traffic.)",
    "Key performance indicator 3 (e.g., Mitigation baseline failure thresholds for browser single-sign-on profile cache caching.)"
  ],
  "riskLevel": "medium",
  "estimatedClickRate": "15-25%"
}

CRITICAL: The values for 'riskLevel' and 'estimatedClickRate' should be dynamically estimated by you based on the mathematical risk profile of a target group like '${targetDepartment}' encountering an exploit style like '${attackVector}'. Keep all text fields sophisticated, clinical, and professional.`;
  },

  /**
   * Build prompt for scenario variations
   */
  buildVariationsPrompt: ({ baseCategory, count }) => {
    return `${SYSTEM_CONTEXT}

Generate ${count} distinct phishing scenario variations for the category: "${baseCategory}".

Generate a JSON array with exactly ${count} items, each with this structure:
{
  "title": "Scenario title",
  "description": "Brief description",
  "impersonation": "Who is being impersonated",
  "hook": "The main hook/lure used",
  "difficulty": "easy|medium|hard|expert",
  "targetAudience": "Who this typically targets"
}`;
  },
};

export { PromptManager };