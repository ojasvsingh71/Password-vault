export interface VaultEntryData {
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
}

export interface EncryptedData {
  encryptedData: string;
  iv: string;
}

const ENCRYPTION_KEY_NAME = 'vault_encryption_key';

async function getOrCreateEncryptionKey(): Promise<CryptoKey> {
  const storedKey = localStorage.getItem(ENCRYPTION_KEY_NAME);

  if (storedKey) {
    const keyData = JSON.parse(storedKey);
    return await crypto.subtle.importKey(
      'jwk',
      keyData,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }

  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const exportedKey = await crypto.subtle.exportKey('jwk', key);
  localStorage.setItem(ENCRYPTION_KEY_NAME, JSON.stringify(exportedKey));

  return key;
}

export async function encryptData(data: VaultEntryData): Promise<EncryptedData> {
  const key = await getOrCreateEncryptionKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encodedData
  );

  const encryptedArray = new Uint8Array(encryptedBuffer);
  const encryptedString = Array.from(encryptedArray).map(b => String.fromCharCode(b)).join('');
  const ivString = Array.from(iv).map(b => String.fromCharCode(b)).join('');

  return {
    encryptedData: btoa(encryptedString),
    iv: btoa(ivString)
  };
}

export async function decryptData(encryptedData: string, iv: string): Promise<VaultEntryData> {
  const key = await getOrCreateEncryptionKey();

  const encryptedBuffer = new Uint8Array(
    atob(encryptedData).split('').map(c => c.charCodeAt(0))
  );

  const ivBuffer = new Uint8Array(
    atob(iv).split('').map(c => c.charCodeAt(0))
  );

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBuffer },
    key,
    encryptedBuffer
  );

  const decoder = new TextDecoder();
  const decryptedText = decoder.decode(decryptedBuffer);

  return JSON.parse(decryptedText);
}
