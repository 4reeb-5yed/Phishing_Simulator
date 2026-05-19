// =============================================
// EDUCATION HUB PAGE (ENTERPRISE THREAT INTEL)
// =============================================
import { useState } from 'react';
import toast from 'react-hot-toast';
import { GraduationCap, ChevronDown, ChevronUp, Loader, Search, ShieldAlert, Terminal, Eye, ShieldCheck } from 'lucide-react';
import { SectionHeader, Badge, Button } from '../components/ui/index.jsx';
import { PhishingService } from '../services/phishing.service.js';
import { PHISHING_CATEGORIES } from '../utils/constants.js';

const ATTACK_KNOWLEDGE = [
  {
    title: 'Credential Harvesting & Reverse Proxy Phishing',
    vector: 'T1566.002 (MITRE ATT&CK - Spearphishing Link)',
    summary: 'Deployment of adversarial infrastructure using advanced phishing toolkits (e.g., Evilginx) to intercept session cookies, bypass traditional Multi-Factor Authentication (MFA), and compromise identity providers.',
    psychology: 'System trust exploitation, forced urgency via simulated identity timeout signals.',
    indicators: [
      'Lookalike/Typosquatted domains utilizing internationalized domain name (IDN) homograph tactics.',
      'Reverse proxy multi-step routing patterns terminating at unauthorized foreign host names.',
      'Unsolicited state-token mismatches within security assertion markup language (SAML) assertions.'
    ],
    mitigation: 'Enforce FIDO2/WebAuthn hardware tokens (passkeys) to render session-hijacking tools ineffective through cryptographic origin binding.',
    risk: 'critical',
  },
  {
    title: 'Business Email Compromise (BEC) & Thread Hijacking',
    vector: 'T1566.001 (MITRE ATT&CK - Spearphishing Attachment/Link)',
    summary: 'Highly strategic impersonation of organizational leadership or third-party vendors. Attackers intercept ongoing email conversations via compromised corporate mailboxes to inject fraudulent transactional instructions.',
    psychology: 'Deference to authority, social compliance bias, and normalization of daily business processes.',
    indicators: [
      'Discrepancies between the display name and SMTP envelope sender address headers.',
      'Sudden modifications to banking coordinates or routing pathways embedded within standard invoices.',
      'Strategic routing manipulations, including out-of-band communication demands or execution ultimatums.'
    ],
    mitigation: 'Implement rigorous cryptographic email verification standards (SPF, DKIM, DMARC reject policies) and formal out-of-band verify channels for capital distribution.',
    risk: 'critical',
  },
  {
    title: 'Spear Phishing & Targeted Reconnaissance Exploits',
    vector: 'T1566 (MITRE ATT&CK - Spearphishing Framework)',
    summary: 'Bespoke tactical incursions targeting specific internal personas or administrative personnel, leveraging intelligence compiled via open-source investigation frameworks (OSINT) to slip past routine boundary firewalls.',
    psychology: 'Hyper-personalized context, familiar corporate dynamic assumptions, and perceived isolation.',
    indicators: [
      'Inclusion of specific internal enterprise details (project codenames, legacy platform configurations).',
      'Requests originating from known operational stakeholders utilizing unauthorized, personal communication vectors.',
      'Contextual call-to-actions aligned perfectly with active public corporate announcements or fiscal reporting windows.'
    ],
    mitigation: 'Conduct contextual defense drills, restrict peripheral public infrastructure schema mapping, and maintain endpoint monitoring anomalies for localized lateral shifts.',
    risk: 'high',
  },
  {
    title: 'Smishing & Mobile Out-of-Band Attack Vectors',
    vector: 'T1637 (MITRE ATT&CK - Mobile Layer Exploitation)',
    summary: 'Exploitation of external peripheral vectors using Short Message Service (SMS) channels. Attackers bypass desktop endpoint inspection engines to target corporate single-sign-on credentials or corporate endpoints.',
    psychology: 'Cognitive overload redirection, immediate personal notification reflex, and native mobile container trust.',
    indicators: [
      'Shorthand, obfuscated Uniform Resource Locators (URLs) redirecting traffic to unverified web assets.',
      'Masked short-code alpha-numeric originators claiming authority from trusted banking or logistical networks.',
      'Commands demanding immediate remediation of suspended authentication structures or fiscal access tokens.'
    ],
    mitigation: 'Enforce corporate Endpoint Detection and Response (EDR) profiling on mobile hardware, alongside universal non-SMS based application push authentication configurations.',
    risk: 'high',
  },
  {
    title: 'Inbound Clone Phishing & Asset Replication',
    vector: 'T1566.003 (MITRE ATT&CK - Modification of Existing Communication)',
    summary: 'The intercept and exact replication of prior legitimate communication streams. Adversaries swap benign hyperlink elements or static file attachments for tracking scripts or malicious execution payloads.',
    psychology: 'Historical continuity trust, routine document interaction patterns, and micro-interaction reliance.',
    indicators: [
      'Sudden resubmission of archival document strings under the guise of an updated revision or system error.',
      'Anomalous alterations within original macro parameters or asset distribution file extension tags.',
      'Slight geometric variations or mismatched font weights across replicated corporate formatting elements.'
    ],
    mitigation: 'Mandate centralized network sandboxing protocols for inbound documents and run automated continuous cryptographic validation loops on inbound attachments.',
    risk: 'medium',
  },
  {
    title: 'Whaling & High-Value Asset Corporate Exfiltration',
    vector: 'T1566.001/.002 (MITRE ATT&CK - Executive Domain Targeting)',
    summary: 'Highly isolated strategic operations directed exclusively at board members, executive suites, or key financial legal controllers to secure unauthorized cryptographic tokens or structural administrative credentials.',
    psychology: 'Legal duress, high-stakes regulatory panic, and structural classification pressures.',
    indicators: [
      'Simulated legal actions, subpoena drafts, or sovereign regulatory investigations requiring strict non-disclosure compliance.',
      'Mismatched domain authentication flags paired with aggressive requests for direct, manual identity clearance.',
      'Abnormal requests for sensitive, internal fiscal operational records or systemic network maps.'
    ],
    mitigation: 'Isolate executive communication workflows behind rigorous hardware validation boundaries and maintain distinct multi-signature approvals for administrative network changes.',
    risk: 'critical',
  },
];

function KnowledgeCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden transition-all duration-200 hover:border-surface-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-surface-overlay/30 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center shrink-0 mt-0.5">
          <Terminal className="w-5 h-5 text-brand" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-base text-tx-primary tracking-tight">{item.title}</span>
            <span className="text-[10px] font-mono font-medium text-brand bg-brand/5 border border-brand/10 px-2 py-0.5 rounded-md">
              {item.vector}
            </span>
          </div>
          <p className="text-xs text-tx-secondary mt-1.5 line-clamp-2 leading-relaxed">{item.summary}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-center">
          <Badge variant={item.risk} className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-md">
            {item.risk.toUpperCase()}
          </Badge>
          {open ? <ChevronUp className="w-4 h-4 text-tx-muted shrink-0" /> : <ChevronDown className="w-4 h-4 text-tx-muted shrink-0" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-surface-border px-5 pb-5 pt-4 animate-fade-in bg-surface-overlay/10 space-y-4">
          <div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-tx-primary uppercase tracking-wider mb-1.5">
              <Eye className="w-3.5 h-3.5 text-brand" /> Technical Methodology Overview
            </span>
            <p className="text-sm text-tx-secondary leading-relaxed font-normal">{item.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-3.5 rounded-lg bg-surface-raised border border-surface-border/60">
              <span className="text-xs font-bold text-tx-primary uppercase tracking-wider mb-1.5 block">
                Psychological Drivers
              </span>
              <p className="text-xs text-tx-secondary leading-relaxed">{item.psychology}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-raised border border-surface-border/60">
              <span className="text-xs font-bold text-tx-primary uppercase tracking-wider mb-1.5 block">
                Technical Countermeasures
              </span>
              <p className="text-xs text-tx-secondary leading-relaxed">{item.mitigation}</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-tx-primary uppercase tracking-wider mb-2 block">
              Adversarial Deployment Indicators
            </span>
            <ul className="space-y-2">
              {item.indicators.map((ind, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-tx-secondary leading-relaxed">
                  <span className="text-brand font-bold shrink-0 mt-0.5">›</span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function VariationsExplorer() {
  const [category, setCategory] = useState(PHISHING_CATEGORIES[0]);
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await PhishingService.getVariations(category, 4);
      setVariations(res.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to generate threat models.');
    } finally {
      setLoading(false);
    }
  };

  const diffColor = { easy: 'low', medium: 'medium', hard: 'high', expert: 'critical' };

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <ShieldAlert className="w-4 h-4 text-brand" />
        <h3 className="font-semibold text-tx-primary">Threat Vector Simulation Registry</h3>
      </div>
      <p className="text-xs text-tx-muted leading-relaxed">
        Query the abstraction layer to simulate dynamic multi-tiered variations mapped to corporate categories.
      </p>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select-field pr-8 w-full font-medium"
          >
            {PHISHING_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="w-4 h-4 text-tx-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <Button onClick={handleGenerate} loading={loading} disabled={loading} className="px-5 font-semibold">
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : 'Map Vectors'}
        </Button>
      </div>

      {variations.length > 0 && (
        <div className="space-y-3 animate-fade-in pt-1">
          {variations.map((v, i) => (
            <div key={i} className="p-4 rounded-xl bg-surface border border-surface-border shadow-sm space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-sm text-tx-primary tracking-tight">{v.title}</span>
                <Badge variant={diffColor[v.difficulty] || 'medium'} className="text-[9px] font-mono tracking-wider shrink-0 px-2">
                  {v.difficulty?.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-tx-secondary leading-relaxed">{v.description}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-tx-muted font-medium pt-1">
                <span className="flex items-center gap-1">🎭 Imputed Identity: {v.impersonation}</span>
                <span className="flex items-center gap-1">🎯 Target Persona: {v.targetAudience}</span>
              </div>
              {v.hook && (
                <div className="mt-2 px-3 py-2.5 rounded-lg bg-surface-overlay/40 border border-surface-border/60">
                  <span className="text-[10px] font-bold text-tx-muted uppercase tracking-wider block mb-0.5">Exploit Hook</span>
                  <span className="text-xs text-tx-secondary italic font-mono">"{v.hook}"</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Education() {
  return (
    <div className="animate-fade-in page-wrapper">
      <SectionHeader
        title="Threat Intel & Infrastructure Registry"
        subtitle="Deconstruct enterprise-level attack paths, adversarial psychological models, and localized defenses"
        action={
          <div className="flex items-center gap-1.5 text-xs font-semibold text-tx-secondary bg-surface-raised border border-surface-border px-3 py-1.5 rounded-full shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-brand" />
            Defensive Framework SecOps
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Knowledge base */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2 pb-1">
            <h2 className="font-display font-bold text-lg text-tx-primary tracking-tight">Systemic Adversarial Classifications</h2>
          </div>
          <div className="space-y-3">
            {ATTACK_KNOWLEDGE.map((item, i) => (
              <KnowledgeCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Right: Scenario explorer + tips */}
        <div className="lg:col-span-2 space-y-5">
          <VariationsExplorer />

          {/* Quick tips */}
          <div className="card p-5">
            <h3 className="font-bold text-sm text-tx-primary tracking-tight mb-3.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand" /> Global Boundary Enforcement Rules
            </h3>
            <ul className="space-y-3">
              {[
                'Enforce strict structural verification checks on protocol envelopes and source records before executing systemic actions.',
                'Isolate interactive uniform path routes inside sandboxed verification parameters to prevent baseline origin leakage.',
                'Prohibit authorization parameter submission pathways derived strictly from non-validated inbound text or content elements.',
                'Leverage secondary authenticated out-of-band communication arrays to validate atypical structural requests.',
                'Utilize systemic network ingestion alerts to process anomalous execution markers and forward configurations to SecOps.',
                'Maintain hardware-level cryptographic key token boundaries universally across administrative perimeter structures.'
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-tx-secondary leading-relaxed">
                  <span className="w-5 h-5 rounded bg-brand/5 border border-brand/10 font-bold font-mono text-[10px] text-brand flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}