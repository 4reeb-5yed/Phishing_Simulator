// =============================================
// SEVERITY BADGE + SCORE COMPONENT
// =============================================
import { clsx } from 'clsx';

const SEVERITY_MAP = {
  low:      { label: 'Low',      cls: 'severity-low',      bar: 'bg-severity-low',      dot: 'bg-severity-low'      },
  medium:   { label: 'Medium',   cls: 'severity-medium',   bar: 'bg-severity-medium',   dot: 'bg-severity-medium'   },
  high:     { label: 'High',     cls: 'severity-high',     bar: 'bg-severity-high',     dot: 'bg-severity-high'     },
  critical: { label: 'Critical', cls: 'severity-critical', bar: 'bg-severity-critical', dot: 'bg-severity-critical' },
};

export function SeverityBadge({ severity, showDot = true, className = '' }) {
  const meta = SEVERITY_MAP[severity?.toLowerCase()] || SEVERITY_MAP.medium;
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide border',
      meta.cls,
      className
    )}>
      {showDot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full animate-pulse-slow', meta.dot)} />
      )}
      {meta.label.toUpperCase()}
    </span>
  );
}

export function SeverityScore({ score }) {
  const pct = Math.max(0, Math.min(10, score));
  const meta =
    pct >= 9 ? SEVERITY_MAP.critical :
    pct >= 7 ? SEVERITY_MAP.high :
    pct >= 4 ? SEVERITY_MAP.medium :
               SEVERITY_MAP.low;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-tx-muted font-medium">Threat Level</span>
        <span className={clsx('font-bold font-mono', `text-severity-${
          pct >= 9 ? 'critical' : pct >= 7 ? 'high' : pct >= 4 ? 'medium' : 'low'
        }`)}>
          {pct}/10
        </span>
      </div>
      <div className="h-2 rounded-full bg-surface-overlay overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-700', meta.bar)}
          style={{ width: `${pct * 10}%` }}
        />
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              'flex-1 h-1 rounded-sm transition-all',
              i < pct ? meta.bar : 'bg-surface-overlay'
            )}
          />
        ))}
      </div>
    </div>
  );
}