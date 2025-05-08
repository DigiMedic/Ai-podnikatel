import { supabase, Contact, MarketingPersona, BusinessPlan, AdCampaign } from './config';

// Kontakty (CRM)
export async function createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert({
        ...contact,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data as Contact;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getContacts(workspaceId: string) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Contact[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function importContactsFromCSV(workspaceId: string, csvData: any[]) {
  try {
    const contacts = csvData.map(row => ({
      name: row.name || row.Name || '',
      email: row.email || row.Email || '',
      phone: row.phone || row.Phone || '',
      company: row.company || row.Company || '',
      notes: row.notes || row.Notes || '',
      tags: row.tags || row.Tags || [],
      workspace_id: workspaceId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from('contacts')
      .insert(contacts)
      .select();

    if (error) throw error;
    return data as Contact[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Marketing Persony
export async function createMarketingPersona(persona: Omit<MarketingPersona, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const { data, error } = await supabase
      .from('marketing_personas')
      .insert({
        ...persona,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data as MarketingPersona;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMarketingPersonas(workspaceId: string) {
  try {
    const { data, error } = await supabase
      .from('marketing_personas')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as MarketingPersona[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Business Plán
export async function createBusinessPlan(plan: Omit<BusinessPlan, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const { data, error } = await supabase
      .from('business_plans')
      .insert({
        ...plan,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data as BusinessPlan;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getBusinessPlans(workspaceId: string) {
  try {
    const { data, error } = await supabase
      .from('business_plans')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as BusinessPlan[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Reklamní kampaně
export async function createAdCampaign(campaign: Omit<AdCampaign, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const { data, error } = await supabase
      .from('ad_campaigns')
      .insert({
        ...campaign,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data as AdCampaign;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAdCampaigns(workspaceId: string) {
  try {
    const { data, error } = await supabase
      .from('ad_campaigns')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as AdCampaign[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}