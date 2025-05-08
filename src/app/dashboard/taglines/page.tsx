'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Sparkles, Loader2, ThumbsUp, ThumbsDown, Copy, Star, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  productName: z.string().min(2, { message: 'Název produktu musí mít alespoň 2 znaky.' }),
  productDescription: z.string().min(10, { message: 'Popis produktu musí mít alespoň 10 znaků.' }),
  targetAudience: z.string().optional(),
  industry: z.string().optional(),
  tone: z.string().default('professional'),
});

export default function TaglinesPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTaglines, setGeneratedTaglines] = useState<string[]>([]);
  const [savedTaglines, setSavedTaglines] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productDescription: '',
      targetAudience: '',
      industry: '',
      tone: 'professional',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setGeneratedTaglines([]);

    try {
      // Simulace API volání pro generování taglines
      setTimeout(() => {
        const taglines = generateMockTaglines(values);
        setGeneratedTaglines(taglines);
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('Nepodařilo se vygenerovat motta k produktu');
      setIsGenerating(false);
    }
  }

  const handleSaveTagline = (tagline: string) => {
    if (!savedTaglines.includes(tagline)) {
      setSavedTaglines([...savedTaglines, tagline]);
      toast.success('Motto bylo uloženo');
    }
  };

  const handleCopyTagline = (tagline: string) => {
    navigator.clipboard.writeText(tagline);
    toast.success('Motto bylo zkopírováno do schránky');
  };

  const handleRegenerateTaglines = () => {
    const values = form.getValues();
    setIsGenerating(true);
    
    // Simulace API volání pro generování nových taglines
    setTimeout(() => {
      const taglines = generateMockTaglines(values);
      setGeneratedTaglines(taglines);
      setIsGenerating(false);
    }, 1500);
  };

  // Funkce pro simulaci generování taglines
  const generateMockTaglines = (values: z.infer<typeof formSchema>) => {
    const { productName, tone } = values;
    
    const professionalTaglines = [
      `${productName} - Kvalita, které můžete důvěřovat.`,
      `${productName} - Profesionální řešení pro náročné uživatele.`,
      `${productName} - Inovace, která mění pravidla hry.`,
      `${productName} - Efektivita na prvním místě.`,
      `${productName} - Spolehlivost, na kterou se můžete spolehnout.`,
    ];
    
    const casualTaglines = [
      `${productName} - Prostě to funguje!`,
      `${productName} - Pro život, jaký chcete žít.`,
      `${productName} - Udělejte si radost.`,
      `${productName} - Jednoduše skvělé.`,
      `${productName} - Váš každodenní společník.`,
    ];
    
    const enthusiasticTaglines = [
      `${productName} - Objevte novou dimenzi možností!`,
      `${productName} - Neuvěřitelný zážitek čeká!`,
      `${productName} - Revoluce začíná právě teď!`,
      `${productName} - Překonáváme hranice možného!`,
      `${productName} - Wow efekt zaručen!`,
    ];
    
    let taglines: string[] = [];
    
    if (tone === 'professional') {
      taglines = professionalTaglines;
    } else if (tone === 'casual') {
      taglines = casualTaglines;
    } else if (tone === 'enthusiastic') {
      taglines = enthusiasticTaglines;
    }
    
    // Náhodně zamíchat taglines
    return taglines.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Generátor mott k produktům</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informace o produktu</CardTitle>
          <CardDescription>
            Vyplňte detaily o vašem produktu pro vygenerování mott (taglines)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Název produktu</FormLabel>
                    <FormControl>
                      <Input placeholder="např. Chytrý termostat XYZ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Popis produktu</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Stručně popište váš produkt, jeho hlavní funkce a výhody..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cílová skupina (volitelné)</FormLabel>
                      <FormControl>
                        <Input placeholder="např. mladí profesionálové, rodiny s dětmi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Odvětví (volitelné)</FormLabel>
                      <FormControl>
                        <Input placeholder="např. technologie, zdraví, vzdělávání" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tón komunikace</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="professional">Profesionální</option>
                        <option value="casual">Neformální</option>
                        <option value="enthusiastic">Nadšený</option>
                      </select>
                    </FormControl>
                    <FormDescription>
                      Zvolte tón, který nejlépe odpovídá vaší značce
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generuji...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Vygenerovat motta
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isGenerating ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-500">Generuji kreativní motta pro váš produkt...</p>
            </div>
          </CardContent>
        </Card>
      ) : generatedTaglines.length > 0 ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Vygenerovaná motta</CardTitle>
              <Button variant="outline" size="sm" onClick={handleRegenerateTaglines}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Vygenerovat znovu
              </Button>
            </div>
            <CardDescription>
              Vyberte si z následujících návrhů mott pro váš produkt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedTaglines.map((tagline, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md border flex justify-between items-center"
                >
                  <p className="font-medium">{tagline}</p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleCopyTagline(tagline)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleSaveTagline(tagline)}>
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {savedTaglines.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Uložená motta</CardTitle>
            <CardDescription>
              Vaše oblíbená motta, která jste si uložili
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {savedTaglines.map((tagline, index) => (
                <div
                  key={index}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800 flex justify-between items-center"
                >
                  <p>{tagline}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopyTagline(tagline)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}