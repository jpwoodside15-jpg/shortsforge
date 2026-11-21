import React, { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react';
import { recordWaitlistSignupToLedger } from '../utils/revenueLedgerStore';

interface WaitlistResponse {
  success: boolean;
  alreadyRegistered?: boolean;
  message?: string;
  error?: string;
  signup?: {
    id: string;
    email: string;
    source: string;
    createdAt: string;
  };
  ledgerEntry?: {
    id: string;
    dateIso: string;
    title: string;
    niche: string;
    source: 'Waitlist Signup';
    syncedAt: string;
  } | null;
  totalWaitlistSignups?: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const WaitlistBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string>('');
  const [confirmedLedgerId, setConfirmedLedgerId] = useState<string>('');
  const [totalSignups, setTotalSignups] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();

    if (!trimmed) {
      setStatus('error');
      setFeedback('Enter your email address to join early access.');
      return;
    }

    if (!EMAIL_PATTERN.test(trimmed)) {
      setStatus('error');
      setFeedback('Enter a valid email address (for example, name@studio.com).');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          source: 'landing_waitlist_banner'
        })
      });

      const data = (await res.json()) as WaitlistResponse;

      if (!res.ok || !data.success) {
        setStatus('error');
        setFeedback(data.error || 'Could not save your signup. Please try again.');
        return;
      }

      if (data.signup) {
        recordWaitlistSignupToLedger({
          id: data.signup.id,
          email: data.signup.email,
          createdAt: data.signup.createdAt,
          ledgerEntry: data.ledgerEntry || undefined
        });
      }

      setStatus('success');
      setConfirmedLedgerId(data.ledgerEntry?.id || data.signup?.id || '');
      setTotalSignups(typeof data.totalWaitlistSignups === 'number' ? data.totalWaitlistSignups : null);
      setFeedback(
        data.alreadyRegistered
          ? `${trimmed} is already registered in the waitlist earnings ledger.`
          : `${trimmed} added to the waitlist and logged in the earnings ledger.`
      );
      setEmail('');
    } catch {
      setStatus('error');
      setFeedback('Network error while contacting the waitlist endpoint. Please try again.');
    }
  };

  return (
    <section
      aria-label="Early access waitlist"
      className="mb-6 rounded-xl border border-zinc-800/90 bg-zinc-900/70 p-5 sm:p-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0 max-w-2xl space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white [text-wrap:balance]">
              Ship verified YouTube Shorts on autopilot
            </h1>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss waitlist banner"
              className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Join early access for automated daily Shorts scheduling, pre-upload compliance checks, and unified AdSense and Awin revenue tracking.
          </p>
        </div>

        <div className="flex items-start gap-3 shrink-0 lg:items-center">
          {status === 'success' ? (
            <div
              role="status"
              className="flex items-center gap-3 rounded-lg border border-emerald-500/35 bg-emerald-950/35 px-4 py-2.5 text-sm text-emerald-100"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <div className="min-w-0 space-y-0.5">
                <p className="font-medium text-emerald-100 leading-snug">{feedback}</p>
                <p className="text-xs font-mono tabular-nums text-emerald-300/90">
                  {confirmedLedgerId ? `Ledger entry ${confirmedLedgerId}` : 'Saved to earnings ledger'}
                  {totalSignups !== null ? ` · ${totalSignups} total waitlist signup${totalSignups === 1 ? '' : 's'}` : ''}
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="w-full lg:w-auto space-y-2"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <label htmlFor="waitlist-email-input" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email-input"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') {
                      setStatus('idle');
                      setFeedback('');
                    }
                  }}
                  placeholder="you@channel.com"
                  disabled={status === 'submitting'}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'waitlist-email-error' : undefined}
                  className="h-10 w-full sm:w-64 rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 text-sm text-white placeholder:text-zinc-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70 focus-visible:border-red-500 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="h-10 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-semibold text-white inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Waitlist</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
              {status === 'error' && feedback && (
                <p
                  id="waitlist-email-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-rose-300"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" aria-hidden="true" />
                  <span>{feedback}</span>
                </p>
              )}
            </form>
          )}

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss waitlist banner"
            className="hidden lg:inline-flex items-center justify-center w-8 h-8 text-zinc-400 hover:text-white rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
