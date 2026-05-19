// =============================================
// EMAIL GENERATOR PAGE
// =============================================
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BookOpen, Loader, Mail, History, Sliders, Trash2, ShieldAlert } from 'lucide-react';
import { PhishingForm } from '../components/phishing/PhishingForm.jsx';
import { EmailPreview } from '../components/phishing/EmailPreview.jsx';
import { SectionHeader, Button, EmptyState } from '../components/ui/index.jsx';
import { PhishingService } from '../services/phishing.service.js';

export default function Generator() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('preview'); 
  
  const [simulation, setSimulation] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [explainLoading, setExplainLoading] = useState(false);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [fetchingLogs, setFetchingLogs] = useState(false);
  const [clearingAll, setClearingAll] = useState(false);

  // Listen for router parameter tokens (?tab=history)
  useEffect(() => {
    const tabToken = searchParams.get('tab');
    if (tabToken === 'history') {
      setActiveTab('history');
    }
  }, [searchParams]);

  // Fetch simulation history logs
  const fetchLogs = async () => {
    setFetchingLogs(true);
    try {
      const res = await PhishingService.getHistory();
      setHistoryLogs(res.data || []);
    } catch (_) {
      toast.error('Failed to load historical simulation registries.');
    } finally {
      setFetchingLogs(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchLogs();
    }
  }, [activeTab]);

  const handleGenerate = async (params) => {
    setLoading(true);
    setSimulation(null);
    setExplanation(null);
    setActiveTab('preview'); 
    try {
      const res = await PhishingService.generateEmail(params);
      setSimulation(res.data);
      toast.success('Phishing simulation generated!');
    } catch (err) {
      toast.error(err.message || 'Generation failed. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleExplain = async () => {
    if (!simulation) return;
    setExplainLoading(true);
    try {
      const res = await PhishingService.generateExplanation({
        emailSubject: simulation.subject,
        category: simulation.params?.category,
        tactics: simulation.manipulationTechniques || [],
      });
      setExplanation(res.data);
      toast.success('Explanation generated!');
    } catch (err) {
      toast.error(err.message || 'Explanation failed.');
    } finally {
      setExplainLoading(false);
    }
  };

  // Selective Deletion Handler
  const handleDeleteLogItem = async (e, id) => {
    e.stopPropagation(); // Stop click propagating up to select the card row
    try {
      await PhishingService.deleteHistoryItem(id);
      setHistoryLogs((prev) => prev.filter((log) => log.id !== id));
      if (simulation?.id === id) {
        setSimulation(null);
        setExplanation(null);
      }
      toast.success('Vector signature purged from registry.');
    } catch (_) {
      toast.error('Purge transaction aborted.');
    }
  };

  // Global Purge Handler
  const handleClearAllLogs = async () => {
    if (!window.confirm('CRITICAL: Purge entire systemic intelligence history? This action cannot be undone.')) return;
    setClearingAll(true);
    try {
      await PhishingService.clearAllHistory();
      setHistoryLogs([]);
      setSimulation(null);
      setExplanation(null);
      toast.success('Systemic log intelligence database fully dropped.');
    } catch (_) {
      toast.error('Database dropped operation aborted.');
    } finally {
      setClearingAll(false);
    }
  };

  return (
    <div className="animate-fade-in page-wrapper">
      <SectionHeader
        title="AI Social Engineering Engine"
        subtitle="Generate and audit tailored contextual phishing simulations mapped to cognitive threat indicators"
      />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Left Control Plane */}
        <div className="xl:col-span-2">
          <PhishingForm onGenerate={handleGenerate} loading={loading} />
        </div>

        {/* Right Execution Plane */}
        <div className="xl:col-span-3 space-y-4">
          
          {/* Workspace Sub-tabs Selection Row */}
          <div className="flex items-center justify-between border-b border-surface-border pb-2 gap-4 flex-wrap">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveTab('preview');
                  setSearchParams({});
                }}
                className={`tab-btn flex items-center gap-2 ${activeTab === 'preview' ? 'active' : ''}`}
              >
                <Sliders className="w-3.5 h-3.5" /> Workspace Preview
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`tab-btn flex items-center gap-2 ${activeTab === 'history' ? 'active' : ''}`}
              >
                <History className="w-3.5 h-3.5" /> Simulation Logs Registry
              </button>
            </div>

            {/* Global flush control action button */}
            {activeTab === 'history' && historyLogs.length > 0 && (
              <button
                onClick={handleClearAllLogs}
                disabled={clearingAll}
                className="flex items-center gap-1.5 text-xs font-bold text-severity-critical hover:bg-severity-critical/[0.08] px-3 py-1.5 rounded-lg border border-severity-critical/20 transition-all active:scale-95 disabled:opacity-50"
              >
                <ShieldAlert className="w-3.5 h-3.5" /> 
                {clearingAll ? 'Dropping DB...' : 'Purge All Repositories'}
              </button>
            )}
          </div>

          {/* ACTIVE WORKSPACE PREVIEW VIEW ELEMENT */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              {loading && (
                <div className="card p-12 flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-brand/20 animate-ping absolute inset-0" />
                    <div className="w-12 h-12 rounded-full border-2 border-brand/40 flex items-center justify-center relative">
                      <Loader className="w-5 h-5 text-brand animate-spin" />
                    </div>
                  </div>
                  <div className="text-sm font-bold text-tx-primary">Compiling Vector Simulation Payload…</div>
                  <div className="text-xs text-tx-muted">Querying Gemini abstraction layer for language modeling</div>
                </div>
              )}

              {!loading && !simulation && (
                <EmptyState
                  icon={Mail}
                  title="Deployment Workspace Standby"
                  description="Adjust architectural parameters inside the control card configuration layout to project an automated awareness script."
                />
              )}

              {!loading && simulation && (
                <>
                  <EmailPreview simulation={simulation} />

                  <Button
                    onClick={handleExplain}
                    loading={explainLoading}
                    disabled={explainLoading}
                    variant="secondary"
                    className="w-full justify-center border border-surface-border hover:border-brand/20 shadow-sm py-3 font-semibold"
                  >
                    <BookOpen className="w-4 h-4 text-brand" />
                    {explainLoading ? 'Deconstructing Attack Pathways…' : 'Generate Technical Deep-Dive Explanation'}
                  </Button>

                  {explanation && (
                    <div className="card p-5 animate-slide-up space-y-4 bg-surface-overlay/10">
                      <h3 className="font-bold text-base text-tx-primary flex items-center gap-2 tracking-tight">
                        <BookOpen className="w-4 h-4 text-brand" />
                        Threat Vector Analysis & Framework Breakdown
                      </h3>
                      <p className="text-sm text-tx-secondary leading-relaxed">{explanation.overview}</p>

                      <div className="p-4 rounded-xl bg-surface border border-surface-border/80">
                        <div className="label">Adversarial Exploitation Vectors</div>
                        <p className="text-xs text-tx-secondary leading-relaxed">{explanation.whyItWorks}</p>
                      </div>

                      {explanation.protectionTips?.length > 0 && (
                        <div>
                          <div className="label">Boundary Defensive Measures</div>
                          <ul className="space-y-2">
                            {explanation.protectionTips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-tx-secondary leading-relaxed">
                                <span className="text-brand font-bold shrink-0 mt-0.5">{i + 1}.</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-surface-border/60">
                        <div>
                          <div className="label">Dynamic Detection Index</div>
                          <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded">
                            {explanation.difficultyToDetect}
                          </span>
                        </div>
                        <div>
                          <div className="label">Target Structural Topology</div>
                          <p className="text-xs text-tx-muted leading-relaxed">{explanation.industryContext}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* SIMULATION HISTORY LOGS REGISTRY VIEW WITH ACTIONS */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {fetchingLogs ? (
                <div className="flex items-center justify-center py-20">
                  <Loader className="w-6 h-6 text-brand animate-spin" />
                </div>
              ) : historyLogs.length === 0 ? (
                <EmptyState
                  icon={History}
                  title="Logs Database Vacant"
                  description="No historical entries located inside local running memory caches. Run simulation setups to fill active registries."
                />
              ) : (
                <div className="card divide-y divide-surface-border overflow-hidden">
                  {historyLogs.map((log) => (
                    <div 
                      key={log.id} 
                      onClick={() => {
                        setSimulation(log);
                        setExplanation(null);
                        setActiveTab('preview');
                      }}
                      className="p-4 hover:bg-surface-overlay/40 transition-colors cursor-pointer flex items-center justify-between gap-4 group"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-mono text-brand font-semibold block mb-0.5">
                          {log.params?.category || 'General Exploitation'}
                        </span>
                        <h4 className="font-bold text-sm text-tx-primary truncate group-hover:text-brand transition-colors">
                          {log.subject}
                        </h4>
                        <p className="text-[11px] text-tx-muted truncate mt-0.5">
                          Impersonating: <span className="text-tx-secondary font-medium">{log.sender?.name || 'Unknown Protocol'}</span> ({log.sender?.email})
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-[10px] font-mono text-tx-muted bg-surface border border-surface-border px-2.5 py-1 rounded-md shadow-sm hidden sm:block">
                          {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'Active Script'}
                        </span>
                        
                        {/* Surgical Selective Item Trash Trigger Action */}
                        <button
                          onClick={(e) => handleDeleteLogItem(e, log.id)}
                          className="p-2 text-tx-muted hover:text-severity-critical hover:bg-severity-critical/[0.08] border border-transparent hover:border-severity-critical/10 rounded-lg transition-all active:scale-90"
                          title="Purge signature record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}