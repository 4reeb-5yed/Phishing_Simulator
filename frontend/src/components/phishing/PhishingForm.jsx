// =============================================
// PHISHING GENERATOR FORM
// =============================================
import { useState } from 'react';
import { Zap } from 'lucide-react';
import { Button } from '../ui/index.jsx';
import {
  PHISHING_CATEGORIES,
  SEVERITY_LEVELS,
  TONE_OPTIONS,
  TARGET_SCENARIOS,
  IMPERSONATION_TYPES,
} from '../../utils/constants.js';

// Restored the default initialization state map
const defaultForm = {
  category: PHISHING_CATEGORIES[0],
  target: TARGET_SCENARIOS[0],
  severity: 'medium',
  impersonation: IMPERSONATION_TYPES[0],
  urgency: 7,
  tone: 'professional',
};

function SelectField({ label, value, onChange, options, className }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <div className="relative mt-0.5">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="select-field pl-3.5 pr-7 py-2.5 text-sm font-medium w-full"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-4 h-4 text-tx-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function PhishingForm({ onGenerate, loading }) {
  const [form, setForm] = useState(defaultForm);

  const update = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => onGenerate(form);

  return (
    <div className="card p-6 space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-brand" />
        </div>
        <h2 className="font-semibold text-tx-primary">Configure Simulation</h2>
      </div>

      <div className="space-y-4">
        <SelectField
          label="Phishing Category"
          value={form.category}
          onChange={update('category')}
          options={PHISHING_CATEGORIES}
          className="w-full"
        />
        
        <SelectField
          label="Target Scenario"
          value={form.target}
          onChange={update('target')}
          options={TARGET_SCENARIOS}
          className="w-full"
        />

        <SelectField
          label="Impersonation Type"
          value={form.impersonation}
          onChange={update('impersonation')}
          options={IMPERSONATION_TYPES}
          className="w-full"
        />

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Severity Level"
            value={form.severity}
            onChange={update('severity')}
            options={SEVERITY_LEVELS}
          />
          <SelectField
            label="Communication Tone"
            value={form.tone}
            onChange={update('tone')}
            options={TONE_OPTIONS}
          />
        </div>

        <div className="pt-1">
          <label className="label flex justify-between items-center">
            <span>Urgency Level</span>
            <span className="font-mono text-xs font-bold text-brand bg-brand/5 border border-brand/10 px-2 py-0.5 rounded">
              {form.urgency} / 10
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={form.urgency}
            onChange={(e) => update('urgency')(parseInt(e.target.value))}
            className="w-full h-1.5 bg-surface-overlay rounded-full appearance-none cursor-pointer accent-brand mt-3"
          />
          <div className="flex justify-between text-[10px] text-tx-muted mt-1.5 font-medium tracking-tight">
            <span>Mild</span>
            <span>Moderate</span>
            <span>Extreme</span>
          </div>
        </div>
      </div>

      <Button onClick={handleSubmit} loading={loading} disabled={loading} className="w-full justify-center py-3 font-semibold">
        <Zap className="w-4 h-4" />
        {loading ? 'Generating Simulation…' : 'Generate Phishing Simulation'}
      </Button>
    </div>
  );
}