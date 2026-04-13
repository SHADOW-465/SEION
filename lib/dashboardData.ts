import type { SectorData } from '@/types';

export const dashboardData: SectorData[] = [
  {
    id: 'auto',
    label: 'Auto Components',
    stats: [
      { label: 'Revenue', value: '₹24.8L', delta: '↑18.4%', deltaType: 'positive' },
      { label: 'Pending', value: '₹3.2L', deltaType: 'neutral' },
      { label: 'Stock Alerts', value: '2', deltaType: 'negative' },
      { label: 'Cash Buffer', value: '23 days', deltaType: 'positive' },
    ],
    chartData: [
      { month: 'Oct', value: 58 },
      { month: 'Nov', value: 65 },
      { month: 'Dec', value: 54 },
      { month: 'Jan', value: 72 },
      { month: 'Feb', value: 68 },
      { month: 'Mar', value: 88 },
    ],
    insights: [
      'Revenue up 18.4% vs last quarter — driven by Category A fasteners',
      'Stock alert: Category B components below reorder threshold — 2 SKUs',
      'Cash buffer at 23-day positive surplus — strongest in 6 months',
    ],
  },
  {
    id: 'pharma',
    label: 'Pharma Distributor',
    stats: [
      { label: 'Revenue', value: '₹31.2L', delta: '↑11.2%', deltaType: 'positive' },
      { label: 'Expiry Risk', value: '₹1.8L', deltaType: 'negative' },
      { label: 'Orders Due', value: '7', deltaType: 'neutral' },
      { label: 'Collections', value: '94%', deltaType: 'positive' },
    ],
    chartData: [
      { month: 'Oct', value: 62 },
      { month: 'Nov', value: 70 },
      { month: 'Dec', value: 67 },
      { month: 'Jan', value: 75 },
      { month: 'Feb', value: 80 },
      { month: 'Mar', value: 92 },
    ],
    insights: [
      'Collection rate at 94% — highest since Q2 FY24',
      'Expiry risk: ₹1.8L of near-expiry stock needs prioritised dispatch',
      '7 purchase orders due this week — 3 require approval',
    ],
  },
  {
    id: 'textile',
    label: 'Textile Trader',
    stats: [
      { label: 'Revenue', value: '₹18.6L', delta: '↑8.7%', deltaType: 'positive' },
      { label: 'Pending Bills', value: '₹4.1L', deltaType: 'neutral' },
      { label: 'Loom Idle', value: '3', deltaType: 'negative' },
      { label: 'Dispatch', value: '98%', deltaType: 'positive' },
    ],
    chartData: [
      { month: 'Oct', value: 50 },
      { month: 'Nov', value: 58 },
      { month: 'Dec', value: 45 },
      { month: 'Jan', value: 63 },
      { month: 'Feb', value: 71 },
      { month: 'Mar', value: 80 },
    ],
    insights: [
      'Dispatch rate at 98% — zero delayed orders this week',
      '3 looms idle for 48+ hours — maintenance flag raised',
      'Pending bills ₹4.1L — 2 accounts overdue by 30+ days',
    ],
  },
];

export const getSectorById = (id: SectorData['id']): SectorData => {
  return dashboardData.find((s) => s.id === id) ?? dashboardData[0];
};
