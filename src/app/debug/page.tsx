'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function DebugPage() {
  const [config, setConfig] = useState({
    supabaseConfigured: false,
    supabaseUrl: '',
    supabaseKeyPresent: false,
  });

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    setConfig({
      supabaseConfigured: isSupabaseConfigured(),
      supabaseUrl: supabaseUrl,
      supabaseKeyPresent: !!supabaseKey,
    });

    console.log('🔍 Configuration Check:');
    console.log('- Supabase Configured:', isSupabaseConfigured());
    console.log('- Supabase URL:', supabaseUrl || 'NOT SET');
    console.log('- Supabase Key Present:', !!supabaseKey);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>🔍 System Configuration Debug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-semibold">Supabase Status:</span>
            <Badge variant={config.supabaseConfigured ? "default" : "destructive"}>
              {config.supabaseConfigured ? '✅ Configured' : '❌ Not Configured'}
            </Badge>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-semibold">Supabase URL:</span>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
              {config.supabaseUrl || '❌ NOT SET'}
            </code>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-semibold">Supabase Anon Key:</span>
            <Badge variant={config.supabaseKeyPresent ? "default" : "destructive"}>
              {config.supabaseKeyPresent ? '✅ Present' : '❌ Not Set'}
            </Badge>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h3 className="font-bold text-lg mb-2">⚠️ Issue Detected</h3>
            {!config.supabaseConfigured && (
              <div className="space-y-2">
                <p className="text-sm">
                  Supabase is not configured. This means:
                </p>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  <li>✅ App works with fallback data (30 members)</li>
                  <li>❌ Checkbox changes won't persist on refresh</li>
                  <li>❌ No real database connection</li>
                </ul>
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="font-semibold mb-2">📝 To Fix (Option A - Use Database):</p>
                  <ol className="list-decimal ml-5 text-sm space-y-1">
                    <li>Create a file named <code className="bg-white px-1">.env.local</code> in your project root</li>
                    <li>Add these lines:
                      <pre className="bg-white p-2 mt-1 rounded text-xs">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`}
                      </pre>
                    </li>
                    <li>Set up Supabase database using the SQL from SETUP.md</li>
                    <li>Restart your development server (<code className="bg-white px-1">npm run dev</code>)</li>
                  </ol>
                </div>

                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded">
                  <p className="font-semibold mb-2">📝 Alternative (Option B - No Database):</p>
                  <p className="text-sm">If you don't need persistence, the app works fine as-is with fallback data.</p>
                </div>
              </div>
            )}

            {config.supabaseConfigured && (
              <p className="text-sm text-green-700">
                ✅ Supabase is configured correctly. If checkboxes aren't persisting, 
                check the browser console for database permission errors.
              </p>
            )}
          </div>

          <div className="mt-6 p-4 bg-gray-50 border rounded">
            <h3 className="font-bold mb-2">📋 Next Steps:</h3>
            <ol className="list-decimal ml-5 text-sm space-y-1">
              <li>Check the configuration status above</li>
              <li>If not configured, follow the fix instructions</li>
              <li>Open browser console (F12) and click a checkbox</li>
              <li>Look for blue 🔵 log messages showing the update flow</li>
              <li>Check for any red ❌ error messages</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

