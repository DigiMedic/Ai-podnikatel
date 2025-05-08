import { Account, Client, Databases, Storage } from 'appwrite';

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID || '',
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || '',
  workspaceCollectionId: process.env.NEXT_PUBLIC_APPWRITE_WORKSPACE_COLLECTION_ID || '',
};

// Inicializace Appwrite klienta
export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

// Inicializace služeb
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Typy pro uživatele a workspace
export type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  companyName?: string;
  industry?: string;
  createdAt: string;
};

export type Workspace = {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};