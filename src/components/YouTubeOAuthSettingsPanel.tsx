import React, { useState, useEffect, useCallback } from 'react';
import {
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Upload,
  Server
} from 'lucide-react';

interface YouTubeOAuthStatusResponse {
  configured: boolean;
  readyForConsentFlow: boolean;
  missingCredentials: string[];
  credentials: {
    YOUTUBE_CLIENT_ID: boolean;
    YOUTUBE_CLIENT_SECRET: boolean;
    YOUTUBE_REFRESH_TOKEN: boolean;
    YOUTUBE_REDIRECT_URI: boolean;
  };
  effectiveRedirectUri: string;
  uploadEndpoint: string;
  uploadProtocol: string;
  apiVersion: string;
  simulationFallbackAvailable: boolean;
}

interface TestUploadResult {
  httpStatus: number;
  body: Record<string, any>;
  testedAt: string;
}

export const YouTubeOAuthSettingsPanel: React.FC = () => {
  const [status, setStatus] = useState<YouTubeOAuthStatusResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [consentUrl, setConsentUrl] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [generatingUrl, setGeneratingUrl] = useState<boolean>(false);

  const [testingUpload, setTestingUpload] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestUploadResult | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setStatusError(null);
    try {
      const res = await fetch('/api/youtube/oauth/status');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setStatus(data);
    } catch (err: any) {
      setStatusError(err?.message || 'Unable to reach /api/youtube/oauth/status');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'YOUTUBE_OAUTH_COMPLETE') {
        fetchStatus();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [fetchStatus]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateConsentUrl = async () => {
    setGeneratingUrl(true);
    setConsentError(null);
    setConsentUrl(null);
    try {
      const res = await fetch('/api/youtube/oauth/url');
      const data = await res.json();
      if (!res.ok || !data.success) {
        setConsentError(data.error || 'Unable to generate OAuth authorization URL.');
      } else {
        setConsentUrl(data.url);
      }
    } catch (err: any) {
      setConsentError(err?.message || 'Network error requesting OAuth URL.');
    } finally {
      setGeneratingUrl(false);
    }
  };

  const handleTestUploadEndpoint = async () => {
    setTestingUpload(true);
    try {
      const res = await fetch('/api/youtube/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metadata: {
            id: 'preflight-oauth-check',
            title: 'OAuth Preflight Verification #shorts',
            description: 'Preflight check for YouTube Data API v3 resumable upload #shorts',
            tags: ['shorts', 'preflight'],
            privacyStatus: 'private',
            categoryId: '27',
            isMadeForKids: false,
            videoUrl: '/samples/sample_escapes.mp4'
          }
        })
      });
      const body = await res.json();
      setTestResult({
        httpStatus: res.status,
        body,
        testedAt: new Date().toLocaleTimeString()
      });
    } catch (err: any) {
      setTestResult({
        httpStatus: 0,
        body: { success: false, error: err?.message || 'Request failed' },
        testedAt: new Date().toLocaleTimeString()
      });
    } finally {
      setTestingUpload(false);
    }
  };

  const redirectUri =
    status?.effectiveRedirectUri ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}/api/youtube/oauth/callback`
      : '/api/youtube/oauth/callback');

  const envSnippet = `# YouTube Data API v3 OAuth Credentials (.env)
YOUTUBE_CLIENT_ID="your-google-oauth-client-id.apps.googleusercontent.com"
YOUTUBE_CLIENT_SECRET="your-google-oauth-client-secret"
YOUTUBE_REFRESH_TOKEN="your-offline-oauth-refresh-token"
YOUTUBE_REDIRECT_URI="${redirectUri}"`;

  const envRows = [
    {
      key: 'YOUTUBE_CLIENT_ID',
      required: true,
      configured: Boolean(status?.credentials.YOUTUBE_CLIENT_ID),
      purpose: 'OAuth 2.0 Web Client ID from Google Cloud Console'
    },
    {
      key: 'YOUTUBE_CLIENT_SECRET',
      required: true,
      configured: Boolean(status?.credentials.YOUTUBE_CLIENT_SECRET),
      purpose: 'OAuth 2.0 Web Client Secret (server-side only)'
    },
    {
      key: 'YOUTUBE_REFRESH_TOKEN',
      required: true,
      configured: Boolean(status?.credentials.YOUTUBE_REFRESH_TOKEN),
      purpose: 'Offline refresh token with youtube.upload scope'
    },
    {
      key: 'YOUTUBE_REDIRECT_URI',
      required: false,
      configured: Boolean(status?.credentials.YOUTUBE_REDIRECT_URI),
      purpose: 'Optional override; auto-resolves to current host callback'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Summary Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                YouTube Data API v3 OAuth Settings (.env)
              </h3>
            </div>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Credentials are read exclusively from server-side <code className="text-zinc-200 font-mono">.env</code> variables
              (or Vercel Environment Variables) and are never stored in browser code. When any required variable is missing,
              uploads fail cleanly with a structured error and fall back to the existing simulation flow.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border ${
                status?.configured
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}
            >
              {loading
                ? 'Checking .env...'
                : status?.configured
                  ? 'LIVE API READY'
                  : 'SIMULATION FALLBACK ACTIVE'}
            </span>
            <button
              type="button"
              onClick={fetchStatus}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
          </div>
        </div>

        {statusError && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{statusError}</span>
          </div>
        )}

        {/* Environment Variables Status Table */}
        <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-950">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-mono text-[11px]">
                <th className="py-2.5 px-4 font-semibold">Environment Variable</th>
                <th className="py-2.5 px-4 font-semibold">Requirement</th>
                <th className="py-2.5 px-4 font-semibold">Server .env Status</th>
                <th className="py-2.5 px-4 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {envRows.map((row) => (
                <tr key={row.key} className="hover:bg-zinc-900/50">
                  <td className="py-3 px-4 font-mono text-zinc-100 font-semibold">{row.key}</td>
                  <td className="py-3 px-4 text-zinc-400 font-mono">
                    {row.required ? 'Required' : 'Optional'}
                  </td>
                  <td className="py-3 px-4">
                    {row.configured ? (
                      <span className="inline-flex items-center gap-1.5 font-mono text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Set in .env
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 font-mono text-amber-400 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {row.required ? 'Missing' : 'Auto-resolved'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-zinc-400">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upload Gate & Endpoint Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <Server className="w-3.5 h-3.5 text-red-400" />
              <span>Upload Endpoint</span>
            </div>
            <p className="font-mono font-bold text-white">POST /api/youtube/upload</p>
            <p className="text-[11px] text-zinc-400">
              Resumable multipart upload via <code className="text-zinc-300">googleapis</code> v3.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mandatory Pre-Upload Gate</span>
            </div>
            <p className="font-mono font-bold text-white">verifyBeforeUpload()</p>
            <p className="text-[11px] text-zinc-400">
              Always executes before upload; BLOCKED verdicts cancel before network dispatch.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Fallback Behavior</span>
            </div>
            <p className="font-mono font-bold text-white">Clean Error + Simulation</p>
            <p className="text-[11px] text-zinc-400">
              Missing .env vars return HTTP 400 JSON and activate simulation fallback safely.
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step .env Setup + Redirect URI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">
              Configure Credentials in <code className="font-mono text-zinc-300">.env</code>
            </h4>
            <button
              type="button"
              onClick={() => handleCopy(envSnippet, 'env-snippet')}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'env-snippet' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy .env Template</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto leading-relaxed">
            {envSnippet}
          </pre>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300">
                Authorized Redirect URI (add in Google Cloud Console)
              </span>
              <button
                type="button"
                onClick={() => handleCopy(redirectUri, 'redirect-uri')}
                className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'redirect-uri' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy URI</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-200 break-all">
              {redirectUri}
            </div>
          </div>

          <ol className="text-xs text-zinc-400 space-y-1.5 list-decimal list-inside pt-1">
            <li>
              Enable <strong className="text-zinc-200">YouTube Data API v3</strong> in{' '}
              <a
                href="https://console.cloud.google.com/apis/library/youtube.googleapis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline"
              >
                Google Cloud Console
              </a>
              .
            </li>
            <li>
              Create an <strong className="text-zinc-200">OAuth 2.0 Web Client ID</strong>, add the Redirect URI above,
              and save <code className="text-zinc-200">YOUTUBE_CLIENT_ID</code> and{' '}
              <code className="text-zinc-200">YOUTUBE_CLIENT_SECRET</code> to <code className="text-zinc-200">.env</code>.
            </li>
            <li>
              Click <strong className="text-zinc-200">Generate OAuth Consent Link</strong> below to authorize{' '}
              <code className="text-zinc-200">youtube.upload</code> and copy the returned{' '}
              <code className="text-zinc-200">YOUTUBE_REFRESH_TOKEN</code> into <code className="text-zinc-200">.env</code>.
            </li>
          </ol>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleGenerateConsentUrl}
              disabled={generatingUrl}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{generatingUrl ? 'Generating...' : 'Generate OAuth Consent Link'}</span>
            </button>

            {consentUrl && (
              <a
                href={consentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <span>Open Google OAuth Consent</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {consentError && (
            <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/30 text-xs text-amber-200 font-mono">
              {consentError}
            </div>
          )}
        </div>

        {/* Right Column: Live Endpoint Verification */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <h4 className="text-sm font-bold text-white">Live Endpoint Diagnostics</h4>
            </div>
            <button
              type="button"
              onClick={handleTestUploadEndpoint}
              disabled={testingUpload}
              className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-100 cursor-pointer disabled:opacity-50"
            >
              {testingUpload ? 'Testing...' : 'Test POST /api/youtube/upload'}
            </button>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Sends a live request to <code className="text-zinc-200 font-mono">POST /api/youtube/upload</code> with sample{' '}
            <code className="text-zinc-200 font-mono">QueuedShort</code> metadata to confirm clean error handling when{' '}
            <code className="text-zinc-200 font-mono">.env</code> credentials are missing.
          </p>

          {testResult ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-400">Tested at {testResult.testedAt}</span>
                <span
                  className={`px-2 py-0.5 rounded border font-semibold ${
                    testResult.httpStatus >= 200 && testResult.httpStatus < 300
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}
                >
                  HTTP {testResult.httpStatus}
                </span>
              </div>
              <pre className="p-3.5 rounded-xl bg-black border border-zinc-800 text-[11px] font-mono text-zinc-200 overflow-x-auto max-h-72 overflow-y-auto leading-relaxed">
                {JSON.stringify(testResult.body, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-zinc-950 border border-dashed border-zinc-800 text-center text-xs text-zinc-500 font-mono">
              Click "Test POST /api/youtube/upload" to inspect live server response.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
