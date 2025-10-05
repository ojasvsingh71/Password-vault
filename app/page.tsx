'use client';

import { useState } from 'react';
import { PasswordGenerator } from '@/components/password-generator';
import { VaultEntryForm } from '@/components/vault-entry-form';
import { VaultList } from '@/components/vault-list';
import { Toaster } from '@/components/ui/toaster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createVaultEntry } from '@/lib/vault-storage';
import { VaultEntryData } from '@/lib/crypto';
import { Shield, Key, Lock } from 'lucide-react';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateEntry = async (data: VaultEntryData) => {
    await createVaultEntry(data);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-slate-700 dark:text-slate-300" />
            <h1 className="text-4xl font-bold tracking-tight">SecureVault</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate strong passwords and store them securely with client-side encryption
          </p>
        </div>

        <Tabs defaultValue="vault" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="vault" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Vault
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Generator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vault" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Vault</h2>
              <VaultEntryForm onSubmit={handleCreateEntry} />
            </div>
            <VaultList key={refreshKey} onUpdate={() => setRefreshKey(prev => prev + 1)} />
          </TabsContent>

          <TabsContent value="generator">
            <div className="max-w-2xl mx-auto">
              <PasswordGenerator />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Client-Side Encryption
              </h3>
              <p>
                All sensitive data is encrypted in your browser using AES-256-GCM before storage. Your
                master key never leaves your device.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Key className="h-4 w-4" />
                Strong Password Generation
              </h3>
              <p>
                Generate cryptographically secure passwords with customizable length and character sets
                using Web Crypto API.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Privacy First
              </h3>
              <p>
                Your passwords are stored locally with automatic clipboard clearing after 15 seconds for
                enhanced security.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
