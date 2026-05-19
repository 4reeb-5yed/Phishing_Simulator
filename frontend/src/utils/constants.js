// =============================================
// FRONTEND CONSTANTS
// =============================================

export const PHISHING_CATEGORIES = [
  'Credential Harvesting',
  'Fake Bank Alert',
  'HR / Recruitment',
  'IT Security Alert',
  'Invoice / Payment Scam',
  'Fake Delivery Notification',
  'Account Suspension Warning',
  'Microsoft / Google Impersonation',
  'CEO Fraud / BEC',
  'Fake Survey / Prize',
];

export const SEVERITY_LEVELS = ['low', 'medium', 'high', 'critical'];

export const TONE_OPTIONS = [
  'professional',
  'urgent',
  'friendly',
  'authoritative',
  'casual',
  'threatening',
];

export const ATTACK_VECTORS = [
  'Email Phishing',
  'Spear Phishing',
  'Whaling',
  'Smishing (SMS)',
  'Vishing (Voice)',
  'Clone Phishing',
];

export const TARGET_SCENARIOS = [
  'Corporate Employee',
  'Finance Department',
  'IT Administrator',
  'C-Suite Executive',
  'HR Personnel',
  'Remote Worker',
  'New Hire',
  'Customer / End User',
];

export const IMPERSONATION_TYPES = [
  'Microsoft',
  'Google',
  'Bank / Financial Institution',
  'Company CEO',
  'IT Support Team',
  'HR Department',
  'Courier / Delivery Service',
  'Government Agency',
  'Cloud Storage Provider',
];

export const SEVERITY_COLORS = {
  low: 'severity-low',
  medium: 'severity-medium',
  high: 'severity-high',
  critical: 'severity-critical',
};

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/generator', label: 'Email Generator', icon: 'Mail' },
  { path: '/campaigns', label: 'Campaigns', icon: 'Target' },
  { path: '/education', label: 'Education Hub', icon: 'GraduationCap' },
];
