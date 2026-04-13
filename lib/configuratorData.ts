import type { IndustryOption, BottleneckOption, ConfiguratorResult } from '@/types';

export const industries: IndustryOption[] = [
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'retail', label: 'Retail & MSME' },
  { id: 'professional', label: 'Professional Services' },
];

export const bottlenecks: BottleneckOption[] = [
  { id: 'mfg-maintenance', label: 'Predictive maintenance', industryId: 'manufacturing' },
  { id: 'mfg-reporting', label: 'Production reporting', industryId: 'manufacturing' },
  { id: 'mfg-quality', label: 'Quality tracking', industryId: 'manufacturing' },
  { id: 'mfg-supplier', label: 'Supplier reconciliation', industryId: 'manufacturing' },
  { id: 'hc-noshows', label: 'Appointment no-shows', industryId: 'healthcare' },
  { id: 'hc-billing', label: 'Billing reconciliation', industryId: 'healthcare' },
  { id: 'hc-followup', label: 'Patient follow-up', industryId: 'healthcare' },
  { id: 'hc-expiry', label: 'Inventory expiry', industryId: 'healthcare' },
  { id: 'log-route', label: 'Route efficiency', industryId: 'logistics' },
  { id: 'log-delivery', label: 'Delivery confirmation', industryId: 'logistics' },
  { id: 'log-idle', label: 'Vehicle idle time', industryId: 'logistics' },
  { id: 'log-vendor', label: 'Vendor reconciliation', industryId: 'logistics' },
  { id: 'ret-stockout', label: 'Stock-out prevention', industryId: 'retail' },
  { id: 'ret-demand', label: 'Demand forecasting', industryId: 'retail' },
  { id: 'ret-margin', label: 'Margin by SKU', industryId: 'retail' },
  { id: 'ret-reorder', label: 'Customer reorders', industryId: 'retail' },
  { id: 'pro-billing', label: 'Billing leakage', industryId: 'professional' },
  { id: 'pro-docs', label: 'Document turnaround', industryId: 'professional' },
  { id: 'pro-onboard', label: 'Client onboarding', industryId: 'professional' },
  { id: 'pro-util', label: 'Team utilisation', industryId: 'professional' },
];

export const results: Record<string, ConfiguratorResult> = {
  'mfg-maintenance': {
    systemName: 'Factory Floor Intelligence',
    monitors: ['Machine runtime vs idle time per shift', 'Vibration and temperature anomaly patterns', 'Maintenance cycle adherence per asset'],
    automates: ['Maintenance alerts 48 hours before predicted failure', 'Shift supervisor WhatsApp notifications', 'Monthly asset health report generation'],
    hoursSaved: 18,
    marketReference: 'Common in Ambattur and Guindy industrial estates',
  },
  'mfg-reporting': {
    systemName: 'Production Dashboard',
    monitors: ['Daily output vs target per line', 'Shift-wise efficiency ratios', 'Raw material consumption vs plan'],
    automates: ['Daily production summary at 6PM', 'Weekly trend report every Monday 8AM', 'Exception alerts when output drops below 85% of target'],
    hoursSaved: 14,
    marketReference: 'Deployed for auto component manufacturers in Chennai',
  },
  'mfg-quality': {
    systemName: 'Quality Control Tracker',
    monitors: ['Defect rates per batch and per operator', 'Rejection reasons by category', 'Rework costs vs production value'],
    automates: ['Batch rejection alerts to QC team', 'Supplier quality scorecard (weekly)', 'Monthly quality summary for management review'],
    hoursSaved: 10,
    marketReference: 'Used by export-focused garment units in Tirupur',
  },
  'mfg-supplier': {
    systemName: 'Supplier Reconciliation Engine',
    monitors: ['PO vs delivery quantity gaps', 'Payment terms vs actual settlement dates', 'Vendor reliability scores over rolling 90 days'],
    automates: ['Discrepancy alerts on delivery mismatch', 'Payment due reminders 5 days in advance', 'Quarterly vendor performance report'],
    hoursSaved: 12,
    marketReference: 'Common need across Coimbatore industrial clusters',
  },
  'hc-noshows': {
    systemName: 'Appointment Intelligence System',
    monitors: ['No-show rates per doctor and per time slot', 'Booking lead time vs attendance correlation', 'Cancellation patterns by patient segment'],
    automates: ['Reminder SMS/WhatsApp 24h and 2h before appointment', 'Waitlist auto-fill when cancellation detected', 'Weekly no-show summary to clinic manager'],
    hoursSaved: 8,
    marketReference: 'Deployed for multi-specialty clinics in T. Nagar and Velachery',
  },
  'hc-billing': {
    systemName: 'Billing Reconciliation Dashboard',
    monitors: ['Insurance claim status per patient', 'Outstanding amounts by payer type', 'Revenue leakage from unbilled procedures'],
    automates: ['Claim follow-up reminders after 15 days', 'Daily collections vs billing summary', 'End-of-month revenue reconciliation report'],
    hoursSaved: 16,
    marketReference: 'Used by diagnostic centres across Tamil Nadu',
  },
  'hc-followup': {
    systemName: 'Patient Follow-Up Automation',
    monitors: ['Post-visit follow-up compliance rates', 'Chronic patient visit frequency vs protocol', 'Medication refill timing patterns'],
    automates: ['Follow-up WhatsApp messages at day 3 and day 7', 'Chronic condition review reminders', 'Lapsed patient re-engagement sequences'],
    hoursSaved: 10,
    marketReference: 'Common in GP clinics and physiotherapy centres',
  },
  'hc-expiry': {
    systemName: 'Pharmacy Expiry Tracker',
    monitors: ['Expiry dates across all SKUs in real time', 'Slow-moving stock risk by category', 'Return window eligibility per batch'],
    automates: ['60-day expiry alert for high-value items', 'Return initiation triggers for near-expiry stock', 'Monthly wastage cost report'],
    hoursSaved: 6,
    marketReference: 'Deployed for hospital pharmacies in Chennai and Madurai',
  },
  'log-route': {
    systemName: 'Route Efficiency Analyser',
    monitors: ['Planned vs actual route deviation per vehicle', 'Fuel consumption vs distance benchmarks', 'Delivery time windows vs actual arrival'],
    automates: ['End-of-day route efficiency report per driver', 'Fuel anomaly alerts when variance exceeds 15%', 'Weekly performance summary to fleet manager'],
    hoursSaved: 14,
    marketReference: 'Used by last-mile delivery operators in Chennai and Coimbatore',
  },
  'log-delivery': {
    systemName: 'Delivery Confirmation System',
    monitors: ['POD status per shipment in real time', 'Unconfirmed deliveries by region and driver', 'Exception rate by delivery zone'],
    automates: ['WhatsApp POD request on delivery completion', 'Escalation alert for 4-hour unconfirmed deliveries', 'Daily confirmation rate dashboard'],
    hoursSaved: 10,
    marketReference: 'Common for distributors handling 50+ deliveries daily',
  },
  'log-idle': {
    systemName: 'Fleet Idle Time Monitor',
    monitors: ['Idle hours per vehicle per day', 'Idle cost in fuel equivalent (Rs/hr)', 'Idle hotspots by location and time of day'],
    automates: ['Driver idle alert after 30 minutes of engine-on idle', 'Daily idle cost summary to operations manager', 'Weekly fleet utilisation report'],
    hoursSaved: 8,
    marketReference: 'Reduces idle costs by 20–35% for Chennai logistics operators',
  },
  'log-vendor': {
    systemName: 'Vendor Payment Reconciliation',
    monitors: ['Transporter invoice vs load completion records', 'Advance payments vs actual trips completed', 'Outstanding balances by vendor age'],
    automates: ['Weekly vendor statement reconciliation', 'Payment due alerts 3 days before vendor terms', 'Monthly vendor performance scorecard'],
    hoursSaved: 12,
    marketReference: 'Used by 3PL operators managing 20+ transport vendors',
  },
  'ret-stockout': {
    systemName: 'Stock-Out Prevention System',
    monitors: ['Real-time stock levels vs reorder points per SKU', 'Sales velocity changes week-on-week', 'Supplier lead time vs current stock days'],
    automates: ['Reorder trigger when stock drops below safety level', 'WhatsApp alert to purchase team', 'Daily at-risk SKU summary'],
    hoursSaved: 10,
    marketReference: 'Deployed for FMCG distributors across Tamil Nadu',
  },
  'ret-demand': {
    systemName: 'Demand Forecasting Engine',
    monitors: ['Historical sales patterns by SKU and season', 'Promotional uplift effects on adjacent categories', 'Festival and event demand spikes'],
    automates: ['Monthly purchase recommendation report', 'Category-level forecast updated every Sunday', 'Overstock alerts when forecast diverges from orders'],
    hoursSaved: 16,
    marketReference: 'Common for retail chains with 500+ SKUs in South India',
  },
  'ret-margin': {
    systemName: 'Margin Intelligence Dashboard',
    monitors: ['Gross margin per SKU, per category, per supplier', 'Price change impact on margin in real time', 'High-volume low-margin SKU identification'],
    automates: ['Weekly margin report to owner/GM', 'Low-margin alert when SKU drops below threshold', 'Monthly top and bottom performers summary'],
    hoursSaved: 8,
    marketReference: 'Used by multi-outlet retailers managing complex supplier terms',
  },
  'ret-reorder': {
    systemName: 'Customer Reorder Automation',
    monitors: ['Reorder frequency per customer segment', 'Days since last purchase for high-value accounts', 'Seasonal reorder pattern deviations'],
    automates: ['WhatsApp reorder nudges at predicted purchase time', 'Lapsed customer alert after 2× average reorder gap', 'Monthly customer retention summary'],
    hoursSaved: 6,
    marketReference: 'Effective for wholesale distributors with recurring B2B buyers',
  },
  'pro-billing': {
    systemName: 'Billing Leakage Detector',
    monitors: ['Billable hours logged vs invoiced per client', 'Work completed without associated invoice', 'Invoice ageing by client and engagement type'],
    automates: ['Weekly unbilled work summary to principals', 'Invoice trigger when engagement milestone hit', 'Monthly revenue leakage report'],
    hoursSaved: 10,
    marketReference: 'Deployed for CA firms and law offices in Chennai',
  },
  'pro-docs': {
    systemName: 'Document Turnaround Tracker',
    monitors: ['Document request to delivery time per type', 'Bottleneck identification by team member or step', 'SLA compliance rate per client'],
    automates: ['Status update WhatsApp when document advances', 'Overdue escalation after SLA breach', 'Weekly turnaround summary to manager'],
    hoursSaved: 12,
    marketReference: 'Common for compliance-heavy professional firms',
  },
  'pro-onboard': {
    systemName: 'Client Onboarding System',
    monitors: ['Onboarding step completion per new client', 'Time stuck at each stage', 'Document collection rate and outstanding items'],
    automates: ['Onboarding checklist WhatsApp to new client', 'Reminder after 48-hour document delay', 'Onboarding completion trigger for billing start'],
    hoursSaved: 8,
    marketReference: 'Used by wealth management and accounting firms',
  },
  'pro-util': {
    systemName: 'Team Utilisation Dashboard',
    monitors: ['Billable vs non-billable hours per team member', 'Capacity headroom by role and department', 'Utilisation trends week-on-week'],
    automates: ['Weekly utilisation report to leadership', 'Under-utilisation alert when member drops below 60%', 'Monthly capacity planning summary'],
    hoursSaved: 6,
    marketReference: 'Common in consulting and managed services firms',
  },
};

export const getBottlenecksByIndustry = (industryId: string): BottleneckOption[] =>
  bottlenecks.filter((b) => b.industryId === industryId);

export const getResult = (bottleneckId: string): ConfiguratorResult | null =>
  results[bottleneckId] ?? null;
