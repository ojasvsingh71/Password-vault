'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Copy, RefreshCw } from 'lucide-react';
import { generatePassword, defaultPasswordOptions, PasswordOptions } from '@/lib/password-generator';
import { useToast } from '@/hooks/use-toast';

interface PasswordGeneratorProps {
  onUsePassword?: (password: string) => void;
}

export function PasswordGenerator({ onUsePassword }: PasswordGeneratorProps) {
  const { toast } = useToast();
  const [options, setOptions] = useState<PasswordOptions>(defaultPasswordOptions);
  const [password, setPassword] = useState(() => generatePassword(defaultPasswordOptions));

  const handleGenerate = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    toast({
      title: 'Copied to clipboard',
      description: 'Password copied successfully',
    });
  };

  const handleUsePassword = () => {
    if (onUsePassword) {
      onUsePassword(password);
      toast({
        title: 'Password applied',
        description: 'Password has been added to the form',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
        <CardDescription>Generate strong, secure passwords instantly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            value={password}
            readOnly
            className="font-mono text-lg"
          />
          <Button size="icon" variant="outline" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={handleGenerate}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {onUsePassword && (
          <Button onClick={handleUsePassword} className="w-full" variant="secondary">
            Use This Password
          </Button>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Length: {options.length}</Label>
            </div>
            <Slider
              value={[options.length]}
              onValueChange={([value]) => setOptions({ ...options, length: value })}
              min={8}
              max={32}
              step={1}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, uppercase: checked as boolean })
                }
              />
              <Label htmlFor="uppercase" className="cursor-pointer">
                Uppercase Letters (A-Z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={options.lowercase}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, lowercase: checked as boolean })
                }
              />
              <Label htmlFor="lowercase" className="cursor-pointer">
                Lowercase Letters (a-z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={options.numbers}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, numbers: checked as boolean })
                }
              />
              <Label htmlFor="numbers" className="cursor-pointer">
                Numbers (0-9)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={options.symbols}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, symbols: checked as boolean })
                }
              />
              <Label htmlFor="symbols" className="cursor-pointer">
                Symbols (!@#$%^&*)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="excludeLookalikes"
                checked={options.excludeLookalikes}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, excludeLookalikes: checked as boolean })
                }
              />
              <Label htmlFor="excludeLookalikes" className="cursor-pointer">
                Exclude Look-alike Characters (il1Lo0O)
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
