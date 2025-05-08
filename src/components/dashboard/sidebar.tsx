import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
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

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'AI Chat',
    href: '/dashboard/chat',
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: 'Workspace',
    href: '/dashboard/workspace',
    icon: <FolderKanban className="h-5 w-5" />,
  },
  {
    title: 'Sociální sítě',
    href: '/dashboard/social-media',
    icon: <Share2 className="h-5 w-5" />,
  },
  {
    title: 'Analýza konkurence',
    href: '/dashboard/competition',
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: 'CRM',
    href: '/dashboard/crm',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Marketing persony',
    href: '/dashboard/personas',
    icon: <UserCircle className="h-5 w-5" />,
  },
  {
    title: 'Business plán',
    href: '/dashboard/business-plan',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: 'Reklamní kampaně',
    href: '/dashboard/ad-campaigns',
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: 'Motta k produktům',
    href: '/dashboard/taglines',
    icon: <Tag className="h-5 w-5" />,
  },
  {
    title: 'Popisy produktů',
    href: '/dashboard/product-descriptions',
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: 'Scraping URL',
    href: '/dashboard/scraping',
    icon: <Globe className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-800 w-64 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">AI-podnikatel</h1>
      </div>
      <nav className="space-y-1 flex-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}