import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white dark:bg-gray-950 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">AI-podnikatel</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/sign-in">
            <Button variant="outline">Přihlásit se</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Registrovat se</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="py-20 px-4 text-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Inteligentní asistent pro české podnikatele
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              AI-podnikatel je lokalizovaná AI aplikace, která pomáhá českým podnikatelům optimalizovat jejich marketingové aktivity a efektivně řídit jejich podnikání.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up">
                <Button size="lg" className="px-8">Začít zdarma</Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="px-8">Zjistit více</Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Hlavní funkce</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Personalizovaný AI Chat</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Komunikujte s AI asistentem v češtině a získejte personalizovaná doporučení pro vaše podnikání.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Analýza konkurence</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sledujte a analyzujte konkurenci pomocí pokročilých nástrojů pro scraping a analýzu dat.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Marketingové kampaně</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vytvářejte efektivní marketingové kampaně a příspěvky na sociální sítě s pomocí AI.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">CRM systém</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Spravujte své kontakty a klienty pomocí integrovaného CRM systému s možností importu CSV souborů.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Business plán</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vytvářejte a spravujte svůj business plán s pomocí interaktivních nástrojů a finančních projekcí.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Popisy produktů</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Generujte SEO optimalizované popisy produktů a kreativní slogany pro vaše produkty.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Připraveni začít?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Zaregistrujte se ještě dnes a objevte, jak vám AI-podnikatel může pomoci růst.
            </p>
            <Link href="/auth/sign-up">
              <Button size="lg" className="px-8">Vytvořit účet zdarma</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-950 border-t py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold">AI-podnikatel</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Inteligentní asistent pro české podnikatele
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/auth/sign-in" className="text-sm hover:underline">
                Přihlásit se
              </Link>
              <Link href="/auth/sign-up" className="text-sm hover:underline">
                Registrovat se
              </Link>
              <Link href="#features" className="text-sm hover:underline">
                Funkce
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} AI-podnikatel. Všechna práva vyhrazena.
          </div>
        </div>
      </footer>
    </div>
  );
}
