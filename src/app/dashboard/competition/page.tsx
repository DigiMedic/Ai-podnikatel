'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LineChart, Plus, Search, Globe, ArrowUpRight, BarChart, TrendingUp, TrendingDown } from 'lucide-react';

// Simulovaná data konkurence
const mockCompetitors = [
  {
    id: '1',
    name: 'Konkurent A',
    website: 'https://www.konkurent-a.cz',
    strengths: ['Silný brand', 'Kvalitní produkty', 'Dobrý zákaznický servis'],
    weaknesses: ['Vysoké ceny', 'Omezená dostupnost'],
    lastAnalyzed: '2023-07-15',
    marketShare: 35,
    trend: 'up',
  },
  {
    id: '2',
    name: 'Konkurent B',
    website: 'https://www.konkurent-b.cz',
    strengths: ['Nízké ceny', 'Široká nabídka'],
    weaknesses: ['Horší kvalita', 'Slabý marketing'],
    lastAnalyzed: '2023-08-22',
    marketShare: 25,
    trend: 'down',
  },
  {
    id: '3',
    name: 'Konkurent C',
    website: 'https://www.konkurent-c.cz',
    strengths: ['Inovativní produkty', 'Silný online marketing'],
    weaknesses: ['Omezená distribuční síť', 'Vyšší ceny'],
    lastAnalyzed: '2023-09-05',
    marketShare: 20,
    trend: 'up',
  },
];

export default function CompetitionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [competitors, setCompetitors] = useState(mockCompetitors);

  const filteredCompetitors = competitors.filter((competitor) =>
    competitor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analýza konkurence</h1>
        <Button asChild>
          <Link href="/dashboard/competition/add">
            <Plus className="mr-2 h-4 w-4" />
            Přidat konkurenta
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Vyhledat konkurenty</CardTitle>
          <CardDescription>
            Vyhledávejte podle názvu konkurenční společnosti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Vyhledat konkurenta..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Tržní podíl konkurence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitors.map((competitor) => (
                <div key={competitor.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{competitor.name}</span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      {competitor.marketShare}%
                      {competitor.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${competitor.marketShare}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Přehled analýz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {competitors.map((competitor) => (
                <div
                  key={competitor.id}
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span>{competitor.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Poslední analýza: {new Date(competitor.lastAnalyzed).toLocaleDateString()}
                    </span>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/competition/${competitor.id}`}>
                        Detail
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCompetitors.length > 0 ? (
          filteredCompetitors.map((competitor) => (
            <Card key={competitor.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {competitor.name}
                      {competitor.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <Globe className="h-4 w-4" />
                      <a
                        href={competitor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {competitor.website}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Silné stránky</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                        {competitor.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Slabé stránky</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                        {competitor.weaknesses.map((weakness, index) => (
                          <li key={index}>{weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/competition/${competitor.id}`}>
                        Detail
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/competition/${competitor.id}/analyze`}>
                        Analyzovat
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Žádní konkurenti</CardTitle>
              <CardDescription>
                Nebyly nalezeni žádní konkurenti odpovídající vašemu vyhledávání
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/competition/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Přidat konkurenta
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}