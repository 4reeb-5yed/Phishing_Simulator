// =============================================
// CAMPAIGN CARD COMPONENT
// =============================================
import { Target, Trash2, ChevronDown, ChevronUp, Calendar, Users, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Badge, Button } from '../ui/index.jsx';
import { SeverityBadge } from '../phishing/SeverityBadge.jsx';
import { formatDate, getRiskColor } from '../../utils/helpers.js';
import { clsx } from 'clsx';

export function CampaignCard({ campaign, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-brand" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h3 className="font-bold text-tx-primary">{campaign.name}</h3>
              <SeverityBadge severity={campaign.riskLevel || 'medium'} />
            </div>
            <div className="flex flex-wrap gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-xs text-tx-muted">
                <Users className="w-3 h-3" />{campaign.scope} employees
              </span>
              <span className="flex items-center gap-1 text-xs text-tx-muted">
                <Calendar className="w-3 h-3" />{formatDate(campaign.createdAt)}
              </span>
              <Badge variant="brand">{campaign.attackVector}</Badge>
            </div>
          </div>
        </div>
        <p className="text-sm text-tx-secondary leading-relaxed mt-3">{campaign.campaignOverview}</p>
        {campaign.estimatedClickRate && (
          <div className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-surface-overlay border border-surface-border">
            <TrendingUp className="w-4 h-4 text-tx-muted" />
            <span className="text-xs text-tx-muted">Estimated click rate:</span>
            <span className={clsx('text-sm font-bold font-mono', getRiskColor(campaign.riskLevel))}>
              {campaign.estimatedClickRate}
            </span>
          </div>
        )}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-surface-border p-5 space-y-5 animate-fade-in bg-surface">
          {campaign.objectives?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-tx-muted uppercase tracking-wider mb-2">Objectives</p>
              <ul className="space-y-1.5">
                {campaign.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-tx-secondary">
                    <span className="text-brand font-bold mt-0.5 shrink-0">›</span>{obj}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {campaign.phases?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-tx-muted uppercase tracking-wider mb-2">Campaign Phases</p>
              <div className="space-y-2">
                {campaign.phases.map((phase, i) => (
                  <div key={i} className="card p-3.5">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {phase.phase}
                      </span>
                      <span className="font-semibold text-sm text-tx-primary">{phase.name}</span>
                      <span className="text-[10px] text-tx-muted ml-auto font-mono bg-surface-overlay px-2 py-0.5 rounded-full border border-surface-border">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-xs text-tx-secondary pl-7">{phase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {campaign.emailTemplates?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-tx-muted uppercase tracking-wider mb-2">Email Templates</p>
              <div className="flex flex-wrap gap-2">
                {campaign.emailTemplates.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-surface-border bg-surface-raised text-xs">
                    <span className="text-tx-primary font-medium">{t.name}</span>
                    <SeverityBadge severity={t.difficulty} showDot={false} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {campaign.successMetrics?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-tx-muted uppercase tracking-wider mb-2">Success Metrics</p>
              <div className="flex flex-wrap gap-2">
                {campaign.successMetrics.map((m, i) => (
                  <Badge key={i} variant="ghost">{m}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-surface-border px-5 py-3 flex items-center justify-between bg-surface-overlay/30">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-medium text-tx-secondary hover:text-brand transition-colors"
        >
          {expanded
            ? <><ChevronUp className="w-3.5 h-3.5" />Collapse</>
            : <><ChevronDown className="w-3.5 h-3.5" />View Details</>}
        </button>
        <Button variant="danger" onClick={() => onDelete(campaign.id)}>
          <Trash2 className="w-3.5 h-3.5" />Delete
        </Button>
      </div>
    </div>
  );
}

// Added export default link step to eliminate browser compilation syntax error
export default CampaignCard;