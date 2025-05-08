'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Calendar, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube 
} from 'lucide-react';

// Simulovaná data reklamních kampaní
const mockCampaigns = [
  {
    id: '1',
    name: 'Letní výprodej',
    platform: 'facebook',
    budget: 5000,
    spent: 3200,
    startDate: '2023-06-01',
    endDate: '2023-06-30',
    status: 'active',
    performance: {
      impressions: 45000,
      clicks: 1200,
      conversions: 85,
      ctr: 2.67,
      cpc: 2.67,
      roi: 2.4,
      trend: 'up',
    },
  },
  {
    id: '2',
    name: 'Nový produkt - uvedení',
    platform: 'instagram',
    budget: 8000,
    spent: 4500,
    startDate: '2023-07-15',
    endDate: '2023-08-15',
    status: 'active',
    performance: {
      impressions: 62000,
      clicks: 3100,
      conversions: 120,
      ctr: 5.0,
      cpc: 1.45,
      roi: 3.2,
      trend: 'up',
    },
  },
  {
    id: '3',
    name: 'B2B kampaň',
    platform: 'linkedin',
    budget: 10000,
    spent: 10000,
    startDate: '2023-05-01',
    endDate: '2023-05-31',
    status: 'completed',
    performance: {
      impressions: 28000,
      clicks: 950,
      conversions: 45,
      ctr: 3.39,
      cpc: 10.53,
      roi: 1.8,
      trend: 'down',
    },
  },
  {
    id: '4',
    name: 'Video kampaň',
    platform: 'youtube',
    budget: 12000,
    spent: 6000,
    startDate: '2023-07-01',
    endDate: '2023-08-31',
    status: 'active',
    performance: {
      impressions: 85000,
      clicks: 4200,
      conversions: 150,
      ctr: 4.94,
      cpc: 1.43,
      roi: 2.8,
      trend: 'up',
    },
  },
];

const platformIcons = {
  facebook: <Facebook className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
};

const platformColors = {
  facebook: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  instagram: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  linkedin: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  youtube: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

export default function AdCampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [campaigns, setCampaigns] = useState(mockCampaigns);

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Výpočet celkových metrik
  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.performance.impressions, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.performance.clicks, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.performance.conversions, 0);
  const averageCTR = totalClicks / totalImpressions * 100;
  const averageCPC = totalSpent / totalClicks;
  const averageROI = campaigns.reduce((sum, campaign) => sum + campaign.performance.roi, 0) / campaigns.length;

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reklamní kampaně</h1>
        <Button asChild>
          <Link href="/dashboard/ad-campaigns/create">
            <Plus className="mr-2 h-4 w-4" />
            Vytvořit kampaň
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Celkový rozpočet</p>
                <p className="text-2xl font-bold">{totalBudget.toLocaleString()} Kč</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Celkové imprese</p>
                <p className="text-2xl font-bold">{totalImpressions.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
                <BarChart className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Celkové konverze</p>
                <p className="text-2xl font-bold">{totalConversions.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900">
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Průměrné ROI</p>
                <p className="text-2xl font-bold">{averageROI.toFixed(1)}x</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full dark:bg-yellow-900">
                <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Vyhledat kampaně</CardTitle>
          <CardDescription>
            Vyhledávejte podle názvu kampaně nebo platformy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Vyhledat kampaň..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {campaign.name}
                      {campaign.performance.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          platformColors[campaign.platform as keyof typeof platformColors]
                        }`}
                      >
                        {platformIcons[campaign.platform as keyof typeof platformIcons]}
                        <span className="ml-1 capitalize">{campaign.platform}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[campaign.status as keyof typeof statusColors]
                        }`}
                      >
                        {campaign.status === 'active' ? 'Aktivní' : campaign.status === 'paused' ? 'Pozastaveno' : 'Dokončeno'}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Rozpočet</p>
                    <p className="font-medium">{campaign.budget.toLocaleString()} Kč</p>
                    <p className="text-xs text-gray-500">
                      Utraceno: {campaign.spent.toLocaleString()} Kč ({Math.round(campaign.spent / campaign.budget * 100)}%)
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Imprese</p>
                    <p className="font-medium">{campaign.performance.impressions.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Kliky</p>
                    <p className="font-medium">{campaign.performance.clicks.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">CTR</p>
                    <p className="font-medium">{campaign.performance.ctr.toFixed(2)}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">CPC</p>
                    <p className="font-medium">{campaign.performance.cpc.toFixed(2)} Kč</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Konverze</p>
                    <p className="font-medium">{campaign.performance.conversions.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Konverzní poměr</p>
                    <p className="font-medium">
                      {(campaign.performance.conversions / campaign.performance.clicks * 100).toFixed(2)}%
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Cena za konverzi</p>
                    <p className="font-medium">
                      {(campaign.spent / campaign.performance.conversions).toFixed(2)} Kč
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">ROI</p>
                    <p className="font-medium">{campaign.performance.roi.toFixed(1)}x</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(campaign.spent / campaign.budget * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/dashboard/ad-campaigns/${campaign.id}/edit`}>
                    Upravit
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/dashboard/ad-campaigns/${campaign.id}`}>
                    Detail
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Žádné kampaně</CardTitle>
              <CardDescription>
                Nebyly nalezeny žádné reklamní kampaně odpovídající vašemu vyhledávání
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/ad-campaigns/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Vytvořit kampaň
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}