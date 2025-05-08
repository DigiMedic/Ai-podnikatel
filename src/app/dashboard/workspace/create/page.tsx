'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createWorkspace, getCurrentUser } from '@/lib/appwrite/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Název musí mít alespoň 2 znaky.' }),
  description: z.string().optional(),
});

export default function CreateWorkspacePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new Error('Uživatel není přihlášen');
      }

      const newWorkspace = await createWorkspace({
        name: values.name,
        description: values.description,
        ownerId: currentUser.id,
      });

      if (newWorkspace) {
        toast.success('Workspace byl úspěšně vytvořen');
        router.push('/dashboard/workspace');
      }
    } catch (error) {
      console.log(error);
      toast.error('Vytvoření workspace se nezdařilo');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Vytvořit nový workspace</h1>
      <Card>
        <CardHeader>
          <CardTitle>Nový workspace</CardTitle>
          <CardDescription>
            Vytvořte si nový pracovní prostor pro vaše projekty
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Název workspace</FormLabel>
                    <FormControl>
                      <Input placeholder="Můj workspace" {...field} />
                    </FormControl>
                    <FormDescription>
                      Název by měl být výstižný a snadno zapamatovatelný
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Popis (volitelné)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Stručný popis workspace..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Popište účel tohoto workspace
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Zrušit
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Vytváření...' : 'Vytvořit workspace'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}