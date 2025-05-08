'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, FileEdit, BarChart, Users, Target, DollarSign, Briefcase } from 'lucide-react';

// Simulovaná data business plánů
const mockBusinessPlans = [
  {
    id: '1',
    title: 'E-shop s oblečením',
    description: 'Business plán pro spuštění e-shopu s udržitelnou módou',
    sections: [
      { title: 'Exekutivní souhrn', completed: true },
      { title: 'Analýza trhu', completed: true },
      { title: 'Konkurenční analýza', completed: true },
      { title: 'Marketingová strategie', completed: false },
      { title: 'Finanční projekce', completed: false },
    ],
    createdAt: '2023-05-15',
  },
  {
    id: '2',
    title: 'Konzultační služby',
    description: 'Plán pro rozšíření konzultačních služeb v oblasti IT',
    sections: [
      { title: 'Exekutivní souhrn', completed: true },
      { title: 'Analýza trhu', completed: true },
      { title: 'Konkurenční analýza', completed: false },
      { title: 'Marketingová strategie', completed: false },
      { title: 'Finanční projekce', completed: false },
    ],
    createdAt: '2023-06-22',
  },
];

const businessPlanIcons = {
  'Exekutivní souhrn': <FileText className="h-4 w-4" />,
  'Analýza trhu': <BarChart className="h-4 w-4" />,
  'Konkurenční analýza': <Users className="h-4 w-4" />,
  'Marketingová strategie': <Target className="h-4 w-4" />,
  'Finanční projekce': <DollarSign className="h-4 w-4" />,
};

export default function BusinessPlanPage() {
  const [businessPlans, setBusinessPlans] = useState(mockBusinessPlans);

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Business plány</h1>
        <Button asChild>
          <Link href="/dashboard/business-plan/create">
            <Plus className="mr-2 h-4 w-4" />
            Vytvořit nový plán
          </Link>
        </Button>
      </div>

      {businessPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {businessPlans.map((plan) => {
            const completedSections = plan.sections.filter(
              (section) => section.completed
            ).length;
            const progress = Math.round(
              (completedSections / plan.sections.length) * 100
            );

            return (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        {plan.title}
                      </CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                    <Button asChild variant="outline" size="icon">
                      <Link href={`/dashboard/business-plan/${plan.id}/edit`}>
                        <FileEdit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Dokončeno</span>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {plan.sections.map((section) => (
                      <div
                        key={section.title}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {businessPlanIcons[section.title as keyof typeof businessPlanIcons]}
                          <span
                            className={`text-sm ${
                              section.completed
                                ? 'text-gray-500 line-through'
                                : ''
                            }`}
                          >
                            {section.title}
                          </span>
                        </div>
                        {section.completed ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Dokončeno
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            Rozpracováno
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    Vytvořeno: {new Date(plan.createdAt).toLocaleDateString()}
                  </div>
                  <Button asChild>
                    <Link href={`/dashboard/business-plan/${plan.id}`}>
                      Zobrazit plán
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Zatím nemáte žádný business plán</CardTitle>
            <CardDescription>
              Vytvořte svůj první business plán s pomocí našeho AI asistenta
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href="/dashboard/business-plan/create">
                <Plus className="mr-2 h-4 w-4" />
                Vytvořit nový plán
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}