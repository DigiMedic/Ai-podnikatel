'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserPlus, Upload, Download, Search, Mail, Phone, Tag } from 'lucide-react';

// Simulovaná data kontaktů
const mockContacts = [
  {
    id: '1',
    name: 'Jan Novák',
    email: 'jan.novak@example.com',
    phone: '+420 123 456 789',
    company: 'Novák s.r.o.',
    tags: ['Klient', 'VIP'],
  },
  {
    id: '2',
    name: 'Marie Svobodová',
    email: 'marie.svobodova@example.com',
    phone: '+420 987 654 321',
    company: 'Svoboda a syn',
    tags: ['Potenciální klient'],
  },
  {
    id: '3',
    name: 'Petr Černý',
    email: 'petr.cerny@example.com',
    phone: '+420 555 666 777',
    company: 'Černý design',
    tags: ['Partner'],
  },
];

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(mockContacts);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">CRM - Správa kontaktů</h1>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/crm/import">
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/crm/export">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/crm/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Přidat kontakt
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Vyhledat kontakty</CardTitle>
          <CardDescription>
            Vyhledávejte podle jména, e-mailu nebo společnosti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Vyhledat kontakt..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {contact.company}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {contact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        >
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/crm/${contact.id}`}>
                        Detail
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/crm/${contact.id}/edit`}>
                        Upravit
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
              <CardTitle>Žádné kontakty</CardTitle>
              <CardDescription>
                Nebyly nalezeny žádné kontakty odpovídající vašemu vyhledávání
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/crm/add">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Přidat kontakt
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}