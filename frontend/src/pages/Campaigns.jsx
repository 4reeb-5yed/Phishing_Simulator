// =============================================
// CAMPAIGNS PAGE
// =============================================
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Target, Plus, Loader } from 'lucide-react';
import CampaignCard from '../components/campaign/CampaignCard.jsx';
import { SectionHeader, EmptyState, Button } from '../components/ui/index.jsx';
import { CampaignService } from '../services/phishing.service.js';
import { ATTACK_VECTORS } from '../utils/constants.js';

const DEPARTMENTS = ['Engineering', 'Finance', 'HR', 'Marketing', 'Sales', 'IT', 'Executive', 'Operations'];

const defaultForm = {
  campaignName: '',
  targetDepartment: DEPARTMENTS[0],
  attackVector: ATTACK_VECTORS[0],
  scope: 50,
};

function CampaignForm({ onSubmit, loading }) {
  const [form, setForm] = useState(defaultForm);
  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
          <Target className="w-3.5 h-3.5 text-brand" />
        </div>
        <h2 className="font-semibold text-tx-primary">New Campaign</h2>
      </div>

      <div>
        <label className="label">Campaign Name</label>
        <input
          type="text"
          value={form.campaignName}
          onChange={update('campaignName')}
          placeholder="e.g. Q3 Finance Phishing Drill"
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Target Department</label>
          <div className="relative">
            <select value={form.targetDepartment} onChange={update('targetDepartment')} className="select-field pr-8">
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label className="label">Attack Vector</label>
          <div className="relative">
            <select value={form.attackVector} onChange={update('attackVector')} className="select-field pr-8">
              {ATTACK_VECTORS.map((v) => <option key={v}>{v}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="label">Scope: {form.scope} employees</label>
        <input
          type="range"
          min="10"
          max="500"
          step="10"
          value={form.scope}
          onChange={(e) => setForm((p) => ({ ...p, scope: parseInt(e.target.value) }))}
          className="w-full h-2 bg-surface-overlay rounded-full appearance-none cursor-pointer accent-brand"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>10</span>
          <span>250</span>
          <span>500</span>
        </div>
      </div>

      <Button
        onClick={() => {
          if (!form.campaignName.trim()) return toast.error('Campaign name is required');
          onSubmit(form);
        }}
        loading={loading}
        disabled={loading}
        className="w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        {loading ? 'Generating Campaign…' : 'Create Campaign'}
      </Button>
    </div>
  );
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    CampaignService.getAllCampaigns()
      .then((res) => setCampaigns(res.data || []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  const handleCreate = async (params) => {
    setLoading(true);
    try {
      const res = await CampaignService.createCampaign(params);
      setCampaigns((prev) => [res.data, ...prev]);
      toast.success('Campaign created successfully!');
    } catch (err) {
      toast.error(err.message || 'Campaign creation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await CampaignService.deleteCampaign(id);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      toast.success('Campaign deleted.');
    } catch (err) {
      toast.error('Could not delete campaign.');
    }
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader
        title="Phishing Campaigns"
        subtitle="Design and manage multi-phase phishing simulation campaigns"
      />

      <div className="grid grid-cols-5 gap-6">
        {/* Form */}
        <div className="col-span-2">
          <CampaignForm onSubmit={handleCreate} loading={loading} />
        </div>

        {/* Campaign list */}
        <div className="col-span-3">
          {fetching ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="w-6 h-6 text-brand animate-spin" />
            </div>
          ) : campaigns.length === 0 ? (
            <EmptyState
              icon={Target}
              title="No campaigns yet"
              description="Create your first phishing campaign simulation using the form."
            />
          ) : (
            <div className="space-y-4">
              {campaigns.map((c) => (
                <CampaignCard key={c.id} campaign={c} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}