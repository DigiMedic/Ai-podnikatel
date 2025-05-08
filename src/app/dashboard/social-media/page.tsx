'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Calendar, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Copy, 
  ThumbsUp, 
  MessageSquare, 
  Share2 
} from 'lucide-react';
import { toast } from 'sonner';

// Simulovaná data příspěvků na sociální sítě
const mockPosts = [
  {
    id: '1',
    title: 'Představení nového produktu',
    content: 'Jsme nadšeni, že vám můžeme představit náš nejnovější produkt! Po měsících vývoje a testování je konečně tady. Podívejte se na naše webové stránky pro více informací. #NovýProdukt #Inovace',
    platform: 'facebook',
    scheduledDate: '2023-08-15',
    status: 'published',
    engagement: {
      likes: 45,
      comments: 12,
      shares: 8,
    },
  },
  {
    id: '2',
    title: 'Tipy pro produktivitu',
    content: '5 tipů pro zvýšení produktivity:\n1. Plánujte den předem\n2. Používejte techniku Pomodoro\n3. Eliminujte rušivé elementy\n4. Dělejte si pravidelné přestávky\n5. Stanovte si priority\n\nJaké jsou vaše tipy? #Produktivita #PracovníTipy',
    platform: 'linkedin',
    scheduledDate: '2023-08-22',
    status: 'scheduled',
    engagement: null,
  },
  {
    id: '3',
    title: 'Za kulisami',
    content: 'Nahlédněte za kulisy naší společnosti! Takhle to vypadá, když náš tým pracuje na nových projektech. #ZaKulisami #NášTým',
    platform: 'instagram',
    scheduledDate: '2023-08-10',
    status: 'published',
    engagement: {
      likes: 78,
      comments: 5,
      shares: 2,
    },
  },
];

const platformIcons = {
  facebook: <Facebook className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
};

const platformColors = {
  facebook: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  instagram: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  linkedin: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  twitter: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300',
};

export default function SocialMediaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(mockPosts);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Obsah byl zkopírován do schránky');
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sociální sítě</h1>
        <Button asChild>
          <Link href="/dashboard/social-media/create">
            <Plus className="mr-2 h-4 w-4" />
            Vytvořit příspěvek
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Vyhledat příspěvky</CardTitle>
          <CardDescription>
            Vyhledávejte podle názvu nebo obsahu příspěvku
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Vyhledat příspěvek..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          platformColors[post.platform as keyof typeof platformColors]
                        }`}
                      >
                        {platformIcons[post.platform as keyof typeof platformIcons]}
                        <span className="ml-1 capitalize">{post.platform}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.scheduledDate).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}
                      >
                        {post.status === 'published' ? 'Publikováno' : 'Naplánováno'}
                      </span>
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyContent(post.content)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {post.content}
                </div>

                {post.engagement && (
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="h-4 w-4" />
                      <span>{post.engagement.shares}</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/dashboard/social-media/${post.id}/edit`}>
                    Upravit
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/dashboard/social-media/${post.id}`}>
                    Detail
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Žádné příspěvky</CardTitle>
              <CardDescription>
                Nebyly nalezeny žádné příspěvky odpovídající vašemu vyhledávání
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/social-media/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Vytvořit příspěvek
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}