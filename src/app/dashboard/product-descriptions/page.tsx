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
import { Copy, Download, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  productName: z.string().min(2, { message: 'Název produktu musí mít alespoň 2 znaky.' }),
  productCategory: z.string().min(2, { message: 'Kategorie produktu musí mít alespoň 2 znaky.' }),
  keyFeatures: z.string().min(5, { message: 'Klíčové vlastnosti musí mít alespoň 5 znaků.' }),
  targetAudience: z.string().optional(),
  tone: z.string().default('professional'),
  length: z.string().default('medium'),
});

export default function ProductDescriptionsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productCategory: '',
      keyFeatures: '',
      targetAudience: '',
      tone: 'professional',
      length: 'medium',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setGeneratedDescription(null);

    try {
      // Simulace API volání pro generování popisu
      setTimeout(() => {
        const description = generateMockDescription(values);
        setGeneratedDescription(description);
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('Nepodařilo se vygenerovat popis produktu');
      setIsGenerating(false);
    }
  }

  const handleCopy = () => {
    if (generatedDescription) {
      navigator.clipboard.writeText(generatedDescription);
      setCopied(true);
      toast.success('Popis produktu byl zkopírován do schránky');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (generatedDescription) {
      const blob = new Blob([generatedDescription], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `popis-produktu-${form.getValues('productName').toLowerCase().replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Popis produktu byl stažen jako textový soubor');
    }
  };

  // Funkce pro simulaci generování popisu produktu
  const generateMockDescription = (values: z.infer<typeof formSchema>) => {
    const { productName, productCategory, keyFeatures, targetAudience, tone, length } = values;
    
    let description = '';
    
    // Úvod
    if (tone === 'professional') {
      description += `Představujeme ${productName} - špičkový produkt v kategorii ${productCategory}. `;
    } else if (tone === 'casual') {
      description += `Seznamte se s ${productName} - naším skvělým produktem z kategorie ${productCategory}! `;
    } else if (tone === 'enthusiastic') {
      description += `Objevte úžasný ${productName} - absolutní revoluci v kategorii ${productCategory}! `;
    }
    
    // Klíčové vlastnosti
    description += `\n\n${productName} nabízí řadu výjimečných vlastností: ${keyFeatures}. `;
    
    // Cílová skupina
    if (targetAudience) {
      description += `\n\nTento produkt je ideální pro ${targetAudience}. `;
    }
    
    // Výhody
    description += `\n\nS produktem ${productName} získáte:`;
    description += `\n- Vynikající kvalitu a spolehlivost`;
    description += `\n- Inovativní funkce, které zvýší vaši produktivitu`;
    description += `\n- Moderní design, který zaujme na první pohled`;
    description += `\n- Skvělý poměr ceny a výkonu`;
    
    // Závěr
    if (length === 'long') {
      description += `\n\nProč zvolit právě ${productName}? Protože si zasloužíte to nejlepší. Náš produkt byl navržen s ohledem na vaše potřeby a přání. Každý detail byl pečlivě promyšlen, aby vám poskytl maximální užitek a radost z používání. Neváhejte a vyzkoušejte ${productName} ještě dnes!`;
    } else if (length === 'medium') {
      description += `\n\nProč zvolit právě ${productName}? Protože si zasloužíte to nejlepší. Náš produkt byl navržen s ohledem na vaše potřeby. Neváhejte a vyzkoušejte ho ještě dnes!`;
    } else {
      description += `\n\nVyzkoušejte ${productName} ještě dnes a přesvědčte se o jeho kvalitách!`;
    }
    
    // SEO tagy
    description += `\n\n#${productCategory} #${productName.replace(/\s+/g, '')} #kvalita #inovace`;
    
    return description;
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Generátor popisů produktů</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informace o produktu</CardTitle>
            <CardDescription>
              Vyplňte detaily o vašem produktu pro vygenerování popisu
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
                  name="productCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategorie produktu</FormLabel>
                      <FormControl>
                        <Input placeholder="např. Chytrá domácnost" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keyFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Klíčové vlastnosti</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="např. dálkové ovládání, úspora energie, snadná instalace"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Oddělte jednotlivé vlastnosti čárkou
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cílová skupina (volitelné)</FormLabel>
                      <FormControl>
                        <Input placeholder="např. majitelé domů, technologičtí nadšenci" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Délka popisu</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="short">Krátký</option>
                            <option value="medium">Střední</option>
                            <option value="long">Dlouhý</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generuji...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Vygenerovat popis
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vygenerovaný popis</CardTitle>
            <CardDescription>
              Zde se zobrazí vygenerovaný popis vašeho produktu
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-500">Generuji popis produktu...</p>
              </div>
            ) : generatedDescription ? (
              <div className="space-y-4">
                <div className="whitespace-pre-line p-4 bg-gray-50 dark:bg-gray-900 rounded-md border text-sm">
                  {generatedDescription}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Zkopírováno
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Kopírovat
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Stáhnout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                <Sparkles className="h-12 w-12 mb-4 text-gray-300" />
                <p>Vyplňte informace o produktu a klikněte na tlačítko "Vygenerovat popis"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}