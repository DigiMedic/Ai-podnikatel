# AI-podnikatel

AI-podnikatel je lokalizovaná AI aplikace, která pomáhá českým podnikatelům optimalizovat jejich marketingové aktivity a efektivně řídit jejich podnikání.

## Technologie

Projekt je vytvořen pomocí následujících technologií:

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Typový systém pro JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Komponenty pro UI
- [Appwrite](https://appwrite.io/) - Backend as a Service pro autentizaci a úložiště
- [Supabase](https://supabase.com/) - Databáze a backend služby
- [React Hook Form](https://react-hook-form.com/) - Správa formulářů
- [Zod](https://zod.dev/) - Validace schémat
- [Lucide React](https://lucide.dev/) - Ikony

## Funkce

Aplikace nabízí následující funkce:

1. **Personalizovaný AI Chat** - Komunikace s AI asistentem v češtině
2. **Workspace** - Správa pracovních prostorů pro organizaci projektů
3. **Sociální sítě** - Návrhy kampaní a příspěvků na sociální sítě
   - Plánování příspěvků pro různé platformy
   - Analýza engagementu
   - Generování obsahu pomocí AI
4. **Analýza konkurence** - Sledování a analýza konkurenčních firem
   - Porovnání klíčových metrik
   - Sledování online aktivit konkurence
5. **CRM** - Správa kontaktů a klientů s možností importu CSV
   - Import kontaktů z CSV souborů
   - Segmentace kontaktů podle vlastností
   - Správa komunikace
6. **Marketing persony** - Vytváření a správa marketingových person
   - Definice demografických a psychografických údajů
   - Analýza potřeb a bolestivých bodů
   - Přizpůsobení marketingových strategií
7. **Business plán** - Tvorba a správa business plánu
   - Průvodce tvorbou plánu krok za krokem
   - Finanční projekce a analýzy
8. **Reklamní kampaně** - Analýza a návrh reklamních kampaní
   - Sledování výkonu kampaní
   - Analýza ROI a dalších metrik
   - Optimalizace rozpočtu
9. **Motta k produktům (Taglines)** - Generování kreativních sloganů
   - Vytváření variant podle tónu komunikace
   - Testování efektivity
10. **Popisy produktů** - Vytváření popisů produktů s SEO
    - Generování popisů podle zadaných parametrů
    - Optimalizace pro vyhledávače
    - Přizpůsobení pro různé platformy
11. **Scraping URL** - Získávání dat z webových stránek
    - Automatizovaný sběr informací
    - Analýza získaných dat

## Instalace a spuštění

1. Naklonujte repozitář:
   ```bash
   git clone https://github.com/DigiMedic/Ai-podnikatel.git
   cd Ai-podnikatel
   ```

2. Nainstalujte závislosti:
   ```bash
   npm install
   ```

3. Vytvořte soubor `.env.local` a nastavte proměnné prostředí:
   ```
   # Appwrite
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
   NEXT_PUBLIC_APPWRITE_STORAGE_ID=your-storage-id
   NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=your-user-collection-id
   NEXT_PUBLIC_APPWRITE_WORKSPACE_COLLECTION_ID=your-workspace-collection-id

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

   # OpenAI (pro AI chat)
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Spusťte vývojový server:
   ```bash
   npm run dev
   ```

5. Otevřete [http://localhost:3000](http://localhost:3000) ve vašem prohlížeči.

## Struktura projektu

```
src/
├── app/                    # Next.js app router
│   ├── auth/               # Autentizační stránky
│   ├── dashboard/          # Dashboard a funkce aplikace
│   └── api/                # API endpointy
├── components/             # React komponenty
│   ├── auth/               # Komponenty pro autentizaci
│   ├── dashboard/          # Komponenty pro dashboard
│   ├── ui/                 # UI komponenty (Shadcn)
│   └── ...                 # Další komponenty pro funkce
├── lib/                    # Knihovny a utility
│   ├── appwrite/           # Appwrite konfigurace a API
│   ├── supabase/           # Supabase konfigurace a API
│   └── utils.ts            # Pomocné funkce
└── ...
```

## Vývojový tým

- [DigiMedic](https://github.com/DigiMedic) - Hlavní vývojář

## Licence

Tento projekt je licencován pod [MIT licencí](LICENSE).
