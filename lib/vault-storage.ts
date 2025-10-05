import { encryptData, decryptData, VaultEntryData, EncryptedData } from './crypto';

export interface VaultEntry {
  id: string;
  encryptedData: string;
  iv: string;
  titlePlaintext: string;
  createdAt: string;
  updatedAt: string;
}

const VAULT_STORAGE_KEY = 'vault_entries';

function getVaultEntries(): VaultEntry[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(VAULT_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveVaultEntries(entries: VaultEntry[]): void {
  localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(entries));
}

export async function createVaultEntry(data: VaultEntryData): Promise<VaultEntry> {
  const encrypted = await encryptData(data);
  const entry: VaultEntry = {
    id: crypto.randomUUID(),
    encryptedData: encrypted.encryptedData,
    iv: encrypted.iv,
    titlePlaintext: data.title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const entries = getVaultEntries();
  entries.push(entry);
  saveVaultEntries(entries);

  return entry;
}

export async function getVaultEntry(id: string): Promise<VaultEntryData | null> {
  const entries = getVaultEntries();
  const entry = entries.find(e => e.id === id);

  if (!entry) return null;

  return await decryptData(entry.encryptedData, entry.iv);
}

export async function getAllVaultEntries(): Promise<Array<VaultEntry & { decryptedData: VaultEntryData }>> {
  const entries = getVaultEntries();
  const decrypted = await Promise.all(
    entries.map(async entry => ({
      ...entry,
      decryptedData: await decryptData(entry.encryptedData, entry.iv)
    }))
  );

  return decrypted;
}

export async function updateVaultEntry(id: string, data: VaultEntryData): Promise<VaultEntry | null> {
  const entries = getVaultEntries();
  const index = entries.findIndex(e => e.id === id);

  if (index === -1) return null;

  const encrypted = await encryptData(data);
  entries[index] = {
    ...entries[index],
    encryptedData: encrypted.encryptedData,
    iv: encrypted.iv,
    titlePlaintext: data.title,
    updatedAt: new Date().toISOString(),
  };

  saveVaultEntries(entries);
  return entries[index];
}

export function deleteVaultEntry(id: string): boolean {
  const entries = getVaultEntries();
  const filtered = entries.filter(e => e.id !== id);

  if (filtered.length === entries.length) return false;

  saveVaultEntries(filtered);
  return true;
}

export async function searchVaultEntries(query: string): Promise<Array<VaultEntry & { decryptedData: VaultEntryData }>> {
  const allEntries = await getAllVaultEntries();
  const lowerQuery = query.toLowerCase();

  return allEntries.filter(entry =>
    entry.decryptedData.title.toLowerCase().includes(lowerQuery) ||
    entry.decryptedData.username.toLowerCase().includes(lowerQuery) ||
    entry.decryptedData.url.toLowerCase().includes(lowerQuery)
  );
}
