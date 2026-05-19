import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatsCard({ label, value, icon: Icon, trendValue, trend, color = 'brand' }) {
  // Refined Color Map: Ensures the glow and border match the specific category
  const colorMap = {
    brand: 'text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5 hover:border-blue-500/40',
    green: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5 hover:border-emerald-500/40',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20 shadow-amber-500/5 hover:border-amber-500/40',
    red: 'text-rose-500 bg-rose-500/10 border-rose-500/20 shadow-rose-500/5 hover:border-rose-500/40',
  };

  // Border hover colors to match the theme
  const borderHoverMap = {
    brand: 'group-hover:border-blue-500/30',
    green: 'group-hover:border-emerald-500/30',
    amber: 'group-hover:border-amber-500/30',
    red: 'group-hover:border-rose-500/30',
  };

  // Progress bar colors to match the theme
  const barColorMap = {
    brand: 'bg-blue-500/40',
    green: 'bg-emerald-500/40',
    amber: 'bg-amber-500/40',
    red: 'bg-rose-500/40',
  };

  const isPositive = trend === 'up';

  return (
    <div className={clsx(
      "group relative overflow-hidden rounded-2xl bg-[#0f172a]/40 border border-slate-800 p-6 transition-all duration-500 hover:bg-[#0f172a]/80 shadow-lg",
      borderHoverMap[color]
    )}>
      {/* Background Ambient Glow - Matches the card color */}
      <div className={clsx(
        "absolute -right-4 -top-4 h-24 w-24 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700",
        color === 'brand' && "bg-blue-500/10",
        color === 'green' && "bg-emerald-500/10",
        color === 'amber' && "bg-amber-500/10",
        color === 'red' && "bg-rose-500/10"
      )} />

      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            {label}
          </p>
          
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-extrabold tracking-tight text-white leading-none">
              {value ?? '—'}
            </h3>
            
            {trendValue && (
              <div className={clsx(
                "flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full border",
                isPositive ? "text-emerald-400 bg-emerald-400/5 border-emerald-400/20" : "text-rose-400 bg-rose-400/5 border-rose-400/20"
              )}>
                {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {trendValue}
              </div>
            )}
          </div>
        </div>

        {/* Icon Container */}
        <div className={clsx(
          'w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl',
          colorMap[color]
        )}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
      </div>

      {/* Satisfying Progress Interaction */}
      <div className="mt-6 h-[1.5px] w-full bg-slate-800/50 rounded-full overflow-hidden">
        <div className={clsx(
          "h-full w-1/4 group-hover:w-full transition-all duration-1000 ease-in-out",
          barColorMap[color]
        )} />
      </div>
    </div>
  );
}