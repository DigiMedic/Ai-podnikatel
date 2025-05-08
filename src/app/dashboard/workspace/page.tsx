'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser, getUserWorkspaces } from '@/lib/appwrite/api';
import { Workspace } from '@/lib/appwrite/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderPlus, Pencil, Trash2 } from 'lucide-react';

export default function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const userWorkspaces = await getUserWorkspaces(currentUser.id);
          setWorkspaces(userWorkspaces);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkspaces();
  }, []);

  if (loading) {
    return <div>Načítání...</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vaše workspaces</h1>
        <Button asChild>
          <Link href="/dashboard/workspace/create">
            <FolderPlus className="mr-2 h-4 w-4" />
            Vytvořit workspace
          </Link>
        </Button>
      </div>

      {workspaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <Card key={workspace.id}>
              <CardHeader>
                <CardTitle>{workspace.name}</CardTitle>
                <CardDescription>
                  {workspace.description || 'Bez popisu'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Vytvořeno: {new Date(workspace.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/dashboard/workspace/${workspace.id}`}>
                    Otevřít
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/dashboard/workspace/${workspace.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
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
                <FolderPlus className="mr-2 h-4 w-4" />
                Vytvořit workspace
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}