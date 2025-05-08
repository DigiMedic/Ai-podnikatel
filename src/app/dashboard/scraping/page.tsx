'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Globe, Search, Download, Copy, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ScrapingPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedContent, setScrapedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleScrape = async () => {
    if (!url) return;

    setIsLoading(true);
    setError(null);
    setScrapedContent(null);

    try {
      // Simulace scrapingu (v reálné aplikaci by zde byl API call)
      setTimeout(() => {
        if (url.includes('example.com')) {
          setScrapedContent(
            'Toto je simulovaný obsah získaný z webu example.com. V reálné aplikaci by zde byl skutečný obsah získaný pomocí web scrapingu.\n\nNadpis stránky: Example Domain\n\nObsah stránky:\nTato doména je určena k použití pro ilustrativní příklady v dokumentech. Můžete tuto doménu použít v příkladech bez předchozího souhlasu.\n\nKlíčová slova: example, domain, website, web page, illustration'
          );
        } else {
          setError(
            'Nepodařilo se získat obsah z této URL. Ujistěte se, že URL je správná a web je veřejně přístupný.'
          );
        }
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('Došlo k chybě při scrapování obsahu.');
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (scrapedContent) {
      navigator.clipboard.writeText(scrapedContent);
      setCopied(true);
      toast.success('Obsah byl zkopírován do schránky');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (scrapedContent) {
      const blob = new Blob([scrapedContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'scraped-content.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Obsah byl stažen jako textový soubor');
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Scraping URL</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Získat obsah z webové stránky
          </CardTitle>
          <CardDescription>
            Zadejte URL adresu webové stránky, ze které chcete získat obsah
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="https://www.example.com"
                className="pl-8"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleScrape();
                  }
                }}
              />
            </div>
            <Button onClick={handleScrape} disabled={!url || isLoading}>
              {isLoading ? 'Načítání...' : 'Získat obsah'}
              {!isLoading && <Search className="ml-2 h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Tip: Pro testování můžete použít URL "https://www.example.com"
          </p>
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-500">Získávání obsahu z URL...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Chyba při získávání obsahu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setError(null)}>
              Zkusit znovu
            </Button>
          </CardFooter>
        </Card>
      )}

      {scrapedContent && (
        <Card className="border-green-200 dark:border-green-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Obsah byl úspěšně získán
            </CardTitle>
            <CardDescription>
              Níže je obsah získaný z URL: {url}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={scrapedContent}
              readOnly
              className="min-h-[200px] font-mono text-sm"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-gray-500">
              Získáno: {new Date().toLocaleString()}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopy}>
                {copied ? 'Zkopírováno!' : 'Kopírovat'}
                <Copy className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                Stáhnout
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}