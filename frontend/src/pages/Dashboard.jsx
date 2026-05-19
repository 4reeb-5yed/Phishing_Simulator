// =============================================
// DASHBOARD PAGE - EXECUTIVE REFACTOR
// =============================================
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Target, Shield, Zap, Clock, Activity, BarChart3, ChevronRight, ShieldCheck } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard.jsx';
import { SeverityBadge } from '../components/phishing/SeverityBadge.jsx';
import { EmptyState } from '../components/ui/index.jsx';
import { PhishingService, CampaignService } from '../services/phishing.service.js';
import { formatDate } from '../utils/helpers.js';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, historyRes, campaignsRes] = await Promise.all([
          PhishingService.getStats(),
          PhishingService.getHistory(),
          CampaignService.getAllCampaigns(),
        ]);
        setStats(statsRes.data);
        setHistory(historyRes.data?.slice(0, 5) || []);
        setCampaigns(campaignsRes.data?.slice(0, 3) || []);
      } catch (_) {
        // Graceful degradation
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1. Hero / Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-tx-primary tracking-tighter sm:text-4xl">
            Command Center
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-tx-muted font-medium text-sm tracking-tight">AI Simulation Engine Active</p>
          </div>
        </div>
        <Link 
          to="/generator" 
          className="h-12 px-8 bg-brand hover:bg-brand-dim text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-brand/20 flex items-center gap-2 active:scale-95"
        >
          <Zap size={16} fill="currentColor" />
          Launch Simulation
        </Link>
      </div>

      {/* 2. Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Generated" 
          value={stats?.totalGenerated ?? 0} 
          icon={Mail} 
          color="brand" 
          trendValue="+12%" 
          trend="up" 
        />
        <StatsCard 
          label="Active Campaigns" 
          value={campaigns.length} 
          icon={Target} 
          color="green" 
        />
        <StatsCard 
          label="Critical Threats" 
          value={stats?.severityCounts?.critical ?? 0} 
          icon={Shield} 
          color="red" 
        />
        <StatsCard 
          label="Unique Vectors" 
          value={Object.keys(stats?.categoryCounts || {}).length} 
          icon={BarChart3} 
          color="amber" 
        />
      </div>

      {/* 3. Intelligence & Actions Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* RECENT ACTIVITY SECTION */}
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-tx-muted flex items-center gap-2">
              <Activity size={14} className="text-brand" /> Recent Intelligence
            </h3>
            {/* LINK FIXED: Points to generator with a tab parameter query */}
            <Link to="/generator?tab=history" className="text-[10px] font-bold text-brand hover:text-brand-dim tracking-widest flex items-center gap-1 transition-colors">
              VIEW HISTORY <ChevronRight size={12} />
            </Link>
          </div>

          <div className="card overflow-hidden shadow-card">
            {history.length === 0 ? (
              <EmptyState icon={Mail} title="No Active History" description="Generate your first AI simulation to populate intelligence data." />
            ) : (
              <div className="divide-y divide-surface-border/60">
                {history.map((sim) => (
                  <div key={sim.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-surface-overlay/30 transition-all duration-300">
                    <div className="flex items-center gap-5 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-surface-overlay border border-surface-border flex items-center justify-center shrink-0 group-hover:border-brand/50 transition-colors shadow-inner">
                        <Mail className="w-5 h-5 text-tx-muted group-hover:text-brand transition-colors" />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-bold text-tx-primary truncate transition-colors">{sim.subject}</p>
                        <p className="text-[11px] text-tx-muted mt-1 font-medium">{sim.params?.category} <span className="text-surface-border mx-1">•</span> {sim.sender?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-8 mt-4 sm:mt-0 border-t sm:border-none pt-4 sm:pt-0 border-surface-border/40">
                      <div className="flex items-center gap-2 text-[10px] text-tx-muted font-mono font-bold">
                        <Clock size={12} /> {formatDate(sim.createdAt)}
                      </div>
                      <SeverityBadge severity={sim.params?.severity} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR: SHORTCUTS & METRICS */}
        <div className="xl:col-span-4 space-y-10">
          
          {/* Executive Shortcuts */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-tx-muted px-1">Tactical Shortcuts</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { to: '/generator', icon: Mail, label: 'Generator', sub: 'AI Simulation Engine' },
                { to: '/campaigns', icon: Target, label: 'Campaigns', sub: 'Strategic Multi-Phase' },
                { to: '/education', icon: Shield, label: 'Education', sub: 'Threat Intelligence' },
              ].map((item) => (
                <Link 
                  key={item.to} 
                  to={item.to} 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-surface-raised border border-surface-border hover:border-brand/40 hover:bg-brand/5 transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-overlay border border-surface-border flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <item.icon className="w-5 h-5 text-tx-muted group-hover:text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-tx-primary group-hover:text-brand">{item.label}</p>
                    <p className="text-[10px] text-tx-muted uppercase font-bold tracking-tighter">{item.sub}</p>
                  </div>
                  <ChevronRight className="ml-auto w-4 h-4 text-tx-muted group-hover:text-brand group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Vector Metrics */}
          {stats?.categoryCounts && (
            <div className="card p-6 shadow-card">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-tx-muted mb-6">Top Threat Vectors</h3>
              <div className="space-y-5">
                {Object.entries(stats.categoryCounts)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 4)
                  .map(([cat, count]) => (
                    <div key={cat} className="group space-y-2">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-tx-muted uppercase tracking-tight group-hover:text-tx-secondary transition-colors">{cat}</span>
                        <span className="text-brand font-mono">{count}</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-overlay rounded-full overflow-hidden border border-surface-border/50">
                        <div 
                          className="h-full bg-brand rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.2)]"
                          style={{ width: `${(count / stats.totalGenerated) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Compliance Banner */}
      <div className="bg-brand/5 border border-brand/10 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
          <ShieldCheck size={28} />
        </div>
        <div className="space-y-1 text-center md:text-left">
          <p className="text-xs font-bold text-brand uppercase tracking-widest">Policy & Compliance</p>
          <p className="text-[11px] text-tx-secondary leading-relaxed font-medium">
            This platform is strictly for <strong className="text-tx-primary">Authorized Cybersecurity Awareness Training</strong>. 
            The PhishSim simulation engine leverages Generative AI to model fictional social engineering tactics for educational defense. 
            Unauthorized offensive utilization is strictly prohibited and violates platform policy.
          </p>
        </div>
      </div>
    </div>
  );
}