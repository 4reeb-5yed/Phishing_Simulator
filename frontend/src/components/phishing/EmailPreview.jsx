// =============================================
// EMAIL PREVIEW — TABBED PROFESSIONAL OUTPUT
// =============================================
import { useState } from 'react';
import {
  Mail, Copy, Check, AlertCircle, Shield,
  Brain, ChevronDown, ChevronUp, ExternalLink,
  User, Clock, Tag,
} from 'lucide-react';
import { SeverityBadge, SeverityScore } from './SeverityBadge.jsx';
import { Badge, Tabs } from '../ui/index.jsx';
import { formatDate } from '../../utils/helpers.js';
import { clsx } from 'clsx';

/* ─── Email Body Tab ─────────────────────────────────── */
function EmailBodyTab({ simulation }) {
  const [copied, setCopied] = useState(false);
  const [bodyExpanded, setBodyExpanded] = useState(true);

  const copyEmail = () => {
    const text = [
      `From: ${simulation.sender?.name} <${simulation.sender?.email}>`,
      `Subject: ${simulation.subject}`,
      '',
      simulation.body?.replace(/<[^>]*>/g, '') || '',
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Email client mockup */}
      <div className="card overflow-hidden">
        {/* Email chrome */}
        <div className="bg-surface-overlay border-b border-surface-border px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-severity-critical/60" />
            <div className="w-3 h-3 rounded-full bg-severity-medium/60" />
            <div className="w-3 h-3 rounded-full bg-severity-low/60" />
          </div>
          <div className="flex-1 mx-3 bg-surface border border-surface-border rounded-md px-3 py-1 text-xs text-tx-muted font-mono truncate">
            {simulation.sender?.email || 'spoofed@example.com'}
          </div>
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-tx-secondary hover:text-tx-primary hover:bg-surface border border-surface-border transition-all shrink-0"
          >
            {copied
              ? <><Check className="w-3.5 h-3.5 text-severity-low" /><span>Copied!</span></>
              : <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>}
          </button>
        </div>

        {/* Headers section */}
        <div className="p-4 border-b border-surface-border space-y-3">
          {/* From */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-severity-critical/15 border border-severity-critical/25 flex items-center justify-center text-sm font-bold text-severity-critical shrink-0 mt-0.5">
              {simulation.sender?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-sm text-tx-primary">{simulation.sender?.name}</span>
                <Badge variant="critical" className="text-[9px]">⚠ SPOOFED SENDER</Badge>
              </div>
              <div className="text-xs text-tx-muted font-mono mt-0.5 truncate">
                &lt;{simulation.sender?.email}&gt;
              </div>
            </div>
            <div className="text-xs text-tx-muted shrink-0 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(simulation.createdAt)}
            </div>
          </div>

          {/* To / Subject */}
          <div className="space-y-1.5 text-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-tx-muted w-14 shrink-0 font-medium">To:</span>
              <span className="text-tx-secondary text-xs">target@yourcompany.com</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-tx-muted w-14 shrink-0 font-medium">Subject:</span>
              <span className="font-semibold text-tx-primary">{simulation.subject}</span>
            </div>
          </div>
        </div>

        {/* Body toggle */}
        <button
          onClick={() => setBodyExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-tx-muted hover:text-tx-primary hover:bg-surface-overlay transition-colors border-b border-surface-border"
        >
          <span className="font-medium">Message body</span>
          {bodyExpanded
            ? <ChevronUp className="w-3.5 h-3.5" />
            : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {bodyExpanded && (
          <div className="p-4 bg-surface">
            <div
              className="text-sm text-tx-secondary leading-relaxed font-mono bg-surface-raised border border-surface-border rounded-lg p-4 max-h-80 overflow-y-auto whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: (simulation.body || '')
                  .replace(
                    /\[(?:LINK|MALICIOUS_LINK)\]/g,
                    '<span style="color:#2563eb;text-decoration:underline;cursor:not-allowed;" title="Simulated malicious link">[MALICIOUS_LINK]</span>'
                  ),
              }}
            />
          </div>
        )}
      </div>

      {/* Severity Score */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-tx-muted uppercase tracking-wider">Threat Severity</p>
          <SeverityBadge severity={simulation.params?.severity} />
        </div>
        <SeverityScore score={simulation.severityScore || simulation.params?.urgency || 5} />
      </div>
    </div>
  );
}

/* ─── Red Flags Tab ──────────────────────────────────── */
function RedFlagsTab({ simulation }) {
  const flags = simulation.redFlags || [];
  return (
    <div className="space-y-3 animate-fade-in">
      {flags.length === 0 ? (
        <div className="card p-8 text-center">
          <Shield className="w-8 h-8 text-tx-muted mx-auto mb-2" />
          <p className="text-sm text-tx-muted">No red flags identified.</p>
        </div>
      ) : (
        <>
          <div className="card p-3 flex items-center gap-2 bg-severity-critical/4 border-severity-critical/15">
            <AlertCircle className="w-4 h-4 text-severity-critical shrink-0" />
            <p className="text-xs text-tx-secondary">
              <strong className="text-severity-critical">{flags.length} red flag{flags.length !== 1 ? 's' : ''}</strong> detected in this simulation. 
              Each is a real indicator users should be trained to recognize.
            </p>
          </div>
          <div className="space-y-2">
            {flags.map((flag, i) => (
              <div
                key={i}
                className="card p-3.5 flex items-start gap-3 hover:border-severity-critical/25 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-severity-critical/10 border border-severity-critical/20 flex items-center justify-center text-[10px] font-bold text-severity-critical shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-tx-secondary leading-relaxed">{flag}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Analysis Tab ───────────────────────────────────── */
function AnalysisTab({ simulation }) {
  const techniques = simulation.manipulationTechniques || [];
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Tactics overview */}
      {simulation.tacticsSummary && (
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-brand" />
            <p className="text-xs font-semibold text-tx-muted uppercase tracking-wider">Tactics Overview</p>
          </div>
          <p className="text-sm text-tx-secondary leading-relaxed">{simulation.tacticsSummary}</p>
        </div>
      )}

      {/* Techniques */}
      {techniques.length > 0 && (
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-brand" />
            <p className="text-xs font-semibold text-tx-muted uppercase tracking-wider">
              Social Engineering Techniques ({techniques.length})
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {techniques.map((tech, i) => (
              <Badge key={i} variant="brand">{tech}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Simulation config recap */}
      <div className="card p-4">
        <p className="text-xs font-semibold text-tx-muted uppercase tracking-wider mb-3">Simulation Parameters</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            ['Category',      simulation.params?.category],
            ['Target',        simulation.params?.target],
            ['Impersonation', simulation.params?.impersonation],
            ['Tone',          simulation.params?.tone],
            ['Urgency',       `${simulation.params?.urgency}/10`],
            ['Severity',      simulation.params?.severity],
          ].filter(([, v]) => v).map(([label, val]) => (
            <div key={label} className="p-2.5 rounded-lg bg-surface-overlay border border-surface-border">
              <div className="text-tx-muted text-[10px] font-semibold uppercase tracking-wide mb-0.5">{label}</div>
              <div className="text-tx-primary font-medium capitalize truncate">{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────── */
export function EmailPreview({ simulation }) {
  const [activeTab, setActiveTab] = useState('email');

  if (!simulation) return null;

  const tabs = [
    { id: 'email',    label: 'Email Preview', icon: Mail },
    { id: 'flags',    label: 'Red Flags',      icon: AlertCircle,  count: simulation.redFlags?.length || 0 },
    { id: 'analysis', label: 'Analysis',       icon: Brain },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'email'    && <EmailBodyTab    simulation={simulation} />}
      {activeTab === 'flags'    && <RedFlagsTab     simulation={simulation} />}
      {activeTab === 'analysis' && <AnalysisTab     simulation={simulation} />}
    </div>
  );
}