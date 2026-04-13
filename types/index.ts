// types/index.ts

export interface StatCard {
  label: string;
  value: string;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
}

export interface MonthBar {
  month: string;
  value: number; // 0–100, relative height
}

export interface SectorData {
  id: 'auto' | 'pharma' | 'textile';
  label: string;
  stats: StatCard[];      // exactly 4
  chartData: MonthBar[];  // exactly 6
  insights: string[];     // exactly 3
}

export interface IndustryOption {
  id: string;
  label: string;
}

export interface BottleneckOption {
  id: string;
  label: string;
  industryId: string;
}

export interface ConfiguratorResult {
  systemName: string;
  monitors: string[];     // 3 items
  automates: string[];    // 3 items
  hoursSaved: number;
  marketReference: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  problem: string;
}
