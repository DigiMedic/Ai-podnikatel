import { ID, Query } from 'appwrite';
import { account, appwriteConfig, databases, storage, User, Workspace } from './config';

// Autentizace
export async function createUserAccount(user: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const newUser = await saveUserToDB({
      id: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: '',
      createdAt: new Date().toISOString(),
    });

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveUserToDB(user: Partial<User>) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('id', currentAccount.$id)]
    );

    if (!currentUser.documents.length) throw Error;

    return currentUser.documents[0] as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Workspace
export async function createWorkspace(workspace: Partial<Workspace>) {
  try {
    const newWorkspace = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceCollectionId,
      ID.unique(),
      {
        ...workspace,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );

    return newWorkspace;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserWorkspaces(userId: string) {
  try {
    const workspaces = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceCollectionId,
      [Query.equal('ownerId', userId)]
    );

    return workspaces.documents as Workspace[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Nahrávání souborů
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000
    );

    return fileUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
}