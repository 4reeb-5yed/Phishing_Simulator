// =============================================
// REUSABLE UI COMPONENTS
// =============================================
import { clsx } from 'clsx';

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default:  'bg-surface-overlay text-tx-secondary border border-surface-border',
    low:      'severity-low border text-severity-low',
    medium:   'severity-medium border text-severity-medium',
    high:     'severity-high border text-severity-high',
    critical: 'severity-critical border text-severity-critical',
    brand:    'bg-brand/10 text-brand border border-brand/20',
    ghost:    'bg-transparent text-tx-muted border border-surface-border',
  };
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide',
      variants[variant] || variants.default,
      className
    )}>
      {children}
    </span>
  );
}

export function Button({
  children, onClick, disabled = false, loading = false,
  variant = 'primary', className = '', type = 'button',
}) {
  const variants = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    ghost:     'btn-ghost',
    danger:    'btn-danger',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(variants[variant] || variants.primary, className)}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}

export function Spinner({ size = 'md' }) {
  const sizes = { sm: 'w-3.5 h-3.5', md: 'w-5 h-5', lg: 'w-7 h-7' };
  return (
    <svg className={clsx('animate-spin', sizes[size])} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function Card({ children, className = '', hover = false }) {
  return (
    <div className={clsx(hover ? 'card-interactive' : 'card', 'p-5', className)}>
      {children}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-surface-overlay border border-surface-border flex items-center justify-center mb-4 shadow-card">
        <Icon className="w-6 h-6 text-tx-muted" />
      </div>
      <h3 className="font-semibold text-tx-primary mb-1.5">{title}</h3>
      <p className="text-tx-secondary text-sm max-w-xs leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="section-title">{title}</h1>
        {subtitle && <p className="text-tx-secondary text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 p-1 bg-surface-overlay rounded-xl border border-surface-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            'tab-btn flex items-center gap-1.5 flex-1 justify-center',
            active === tab.id && 'active'
          )}
        >
          {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
          {tab.label}
          {tab.count != null && (
            <span className={clsx(
              'ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold',
              active === tab.id ? 'bg-brand/20 text-brand' : 'bg-surface-border text-tx-muted'
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
      <span className="text-xs text-tx-muted font-medium">{label}</span>
      <span className="text-xs font-semibold text-tx-primary">{value}</span>
    </div>
  );
}

export function SelectWrapper({ children }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg className="w-4 h-4 text-tx-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}