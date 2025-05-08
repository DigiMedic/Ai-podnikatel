'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser, getUserWorkspaces } from '@/lib/appwrite/api';
import { Workspace } from '@/lib/appwrite/config';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  FolderKanban, 
  Share2, 
  LineChart, 
  Users, 
  UserCircle, 
  FileText, 
  BarChart, 
  Tag, 
  ShoppingCart, 
  Globe 
} from 'lucide-react';

const features = [
  {
    title: 'AI Chat',
    description: 'Komunikujte s AI asistentem v češtině',
    icon: <MessageSquare className="h-8 w-8" />,
    href: '/dashboard/chat',
  },
  {
    title: 'Workspace',
    description: 'Správa vašich pracovních prostorů',
    icon: <FolderKanban className="h-8 w-8" />,
    href: '/dashboard/workspace',
  },
  {
    title: 'Sociální sítě',
    description: 'Návrhy kampaní a příspěvků',
    icon: <Share2 className="h-8 w-8" />,
    href: '/dashboard/social',
  },
  {
    title: 'Analýza konkurence',
    description: 'Sledování a analýza konkurence',
    icon: <LineChart className="h-8 w-8" />,
    href: '/dashboard/competition',
  },
  {
    title: 'CRM',
    description: 'Správa kontaktů a klientů',
    icon: <Users className="h-8 w-8" />,
    href: '/dashboard/crm',
  },
  {
    title: 'Marketing persony',
    description: 'Vytváření cílových skupin',
    icon: <UserCircle className="h-8 w-8" />,
    href: '/dashboard/personas',
  },
  {
    title: 'Business plán',
    description: 'Tvorba a správa business plánu',
    icon: <FileText className="h-8 w-8" />,
    href: '/dashboard/business-plan',
  },
  {
    title: 'Ads kampaně',
    description: 'Analýza a návrh reklamních kampaní',
    icon: <BarChart className="h-8 w-8" />,
    href: '/dashboard/ads',
  },
  {
    title: 'Motta k produktům',
    description: 'Generování kreativních sloganů',
    icon: <Tag className="h-8 w-8" />,
    href: '/dashboard/slogans',
  },
  {
    title: 'Popisy produktů',
    description: 'Vytváření popisů produktů s SEO',
    icon: <ShoppingCart className="h-8 w-8" />,
    href: '/dashboard/products',
  },
  {
    title: 'Scraping URL',
    description: 'Získávání dat z webových stránek',
    icon: <Globe className="h-8 w-8" />,
    href: '/dashboard/scraping',
  },
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          const userWorkspaces = await getUserWorkspaces(currentUser.id);
          setWorkspaces(userWorkspaces);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Načítání...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Vítejte, {user?.name || 'uživateli'}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Vítejte v aplikaci AI-podnikatel, vašem inteligentním asistentovi pro podnikání
        </p>
      </div>

      {workspaces.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Vaše workspaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workspaces.map((workspace) => (
              <Card key={workspace.id}>
                <CardHeader>
                  <CardTitle>{workspace.name}</CardTitle>
                  <CardDescription>
                    {workspace.description || 'Bez popisu'}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/dashboard/workspace/${workspace.id}`}>
                      Otevřít workspace
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Zatím nemáte žádný workspace</CardTitle>
            <CardDescription>
              Vytvořte si svůj první workspace pro lepší organizaci vašeho podnikání
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href="/dashboard/workspace/create">
                Vytvořit workspace
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Funkce aplikace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={feature.href}>Otevřít</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}