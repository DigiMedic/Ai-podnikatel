import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Typy pro data v Supabase
export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  tags?: string[];
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
};

export type MarketingPersona = {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  occupation?: string;
  interests?: string[];
  painPoints?: string[];
  goals?: string[];
  description?: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
};

export type BusinessPlan = {
  id: string;
  title: string;
  description?: string;
  executiveSummary?: string;
  marketAnalysis?: string;
  competitiveAnalysis?: string;
  marketingStrategy?: string;
  financialProjections?: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
};

export type AdCampaign = {
  id: string;
  name: string;
  platform: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
  targetAudience?: string;
  goals?: string;
  creatives?: string[];
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
};