'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, Users, Target, Heart, Zap, Briefcase } from 'lucide-react';

// Simulovaná data marketingových person
const mockPersonas = [
  {
    id: '1',
    name: 'Petr Novák',
    age: 35,
    gender: 'Muž',
    occupation: 'Manažer středně velké firmy',
    interests: ['Technologie', 'Inovace', 'Efektivita procesů'],
    painPoints: ['Nedostatek času', 'Složité rozhodování', 'Stres'],
    goals: ['Zvýšit efektivitu firmy', 'Zlepšit work-life balance'],
    description: 'Petr je ambiciózní manažer, který hledá způsoby, jak zefektivnit procesy ve své firmě. Je technologicky zdatný a otevřený novým řešením.',
    createdAt: '2023-06-15',
  },
  {
    id: '2',
    name: 'Jana Svobodová',
    age: 28,
    gender: 'Žena',
    occupation: 'Freelance grafická designérka',
    interests: ['Design', 'Umění', 'Cestování', 'Sociální sítě'],
    painPoints: ['Nestabilní příjem', 'Hledání nových klientů', 'Time management'],
    goals: ['Získat více dlouhodobých klientů', 'Vybudovat silnou značku'],
    description: 'Jana je kreativní duše, která se snaží prorazit jako nezávislá designérka. Je aktivní na sociálních sítích a hledá způsoby, jak oslovit nové klienty.',
    createdAt: '2023-07-22',
  },
];

export default function PersonasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [personas, setPersonas] = useState(mockPersonas);

  const filteredPersonas = personas.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.occupation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Marketingové persony</h1>
        <Button asChild>
          <Link href="/dashboard/personas/create">
            <UserPlus className="mr-2 h-4 w-4" />
            Vytvořit personu
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Vyhledat persony</CardTitle>
          <CardDescription>
            Vyhledávejte podle jména nebo povolání
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Vyhledat personu..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPersonas.length > 0 ? (
          filteredPersonas.map((persona) => (
            <Card key={persona.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {persona.name}
                </CardTitle>
                <CardDescription>
                  {persona.age} let, {persona.gender} | {persona.occupation}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      Zájmy
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {persona.interests.map((interest) => (
                        <span
                          key={interest}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      Bolestivé body
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                      {persona.painPoints.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-green-500" />
                      Cíle
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                      {persona.goals.map((goal) => (
                        <li key={goal}>{goal}</li>
                      ))}
                    </ul>
                  </div>

                  {persona.description && (
                    <div>
                      <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Briefcase className="h-4 w-4 text-purple-500" />
                        Popis
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {persona.description}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Vytvořeno: {new Date(persona.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/personas/${persona.id}/edit`}>
                      Upravit
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={`/dashboard/personas/${persona.id}`}>
                      Detail
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Žádné persony</CardTitle>
              <CardDescription>
                Nebyly nalezeny žádné marketingové persony odpovídající vašemu vyhledávání
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/personas/create">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Vytvořit personu
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}