// =============================================
// UTILITY HELPERS
// =============================================

export const getSeverityClass = (severity) => {
  const map = {
    low: 'severity-low',
    medium: 'severity-medium',
    high: 'severity-high',
    critical: 'severity-critical',
  };
  return map[severity?.toLowerCase()] || 'severity-medium';
};

export const getSeverityDotColor = (severity) => {
  const map = {
    low: 'bg-severity-low',
    medium: 'bg-severity-medium',
    high: 'bg-severity-high',
    critical: 'bg-severity-critical',
  };
  return map[severity?.toLowerCase()] || 'bg-severity-medium';
};

export const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const truncate = (str, max = 80) => {
  if (!str) return '';
  return str.length > max ? str.slice(0, max) + '…' : str;
};

export const getRiskColor = (riskLevel) => {
  const map = {
    low: 'text-severity-low',
    medium: 'text-severity-medium',
    high: 'text-severity-high',
    critical: 'text-severity-critical',
  };
  return map[riskLevel?.toLowerCase()] || 'text-severity-medium';
};
