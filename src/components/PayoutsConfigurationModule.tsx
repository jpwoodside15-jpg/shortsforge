import React, { useState, useEffect } from 'react';
import { 
  DollarSign, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, 
  ExternalLink, Copy, Check, Sparkles, Building, Globe, Zap, 
  Layers, Lock, HelpCircle, TrendingUp, Calendar, RefreshCw, 
  ChevronRight, ArrowDownRight, CreditCard, Send, Sliders,
  Languages, FileText, CheckCheck, Info, Play, MessageSquare
} from 'lucide-react';
import { 
  WiseOAuthAccount, YouTubeEarningsTracker, PayoutDisbursementTransaction, 
  AutoDisbursementRule, MultilingualTranslationPackage, MultilingualAiResponse 
} from '../types';
import { playSoundEffect } from '../utils/soundEffects';

interface PayoutsConfigurationModuleProps {
  onSendToUploader?: (data: any) => void;
  onSendToPipeline?: (data: any) => void;
}

type UiLanguage = 'en' | 'es' | 'ja' | 'de' | 'fr' | 'pt';

interface LocalizationStrings {
  title: string;
  subtitle: string;
  oauthTitle: string;
  connectedBadge: string;
  disconnectedBadge: string;
  connectWiseBtn: string;
  simulateBtn: string;
  disconnectBtn: string;
  balancesTitle: string;
  earningsTitle: string;
  eligibleToDisburse: string;
  disburseNowBtn: string;
  autoRulesTitle: string;
  multilingualAiTitle: string;
  multilingualAiSubtitle: string;
  translateBtn: string;
  recentDisbursements: string;
}

const UI_TRANSLATIONS: Record<UiLanguage, LocalizationStrings> = {
  en: {
    title: 'Payouts Configuration & Wise OAuth',
    subtitle: 'Secure OAuth 2.0 integration for automated YouTube AdSense tracking, multi-currency revenue vaults, and direct disbursement with 0% FX markup.',
    oauthTitle: 'Wise OAuth 2.0 Account Link',
    connectedBadge: 'Active & Verified (OAuth PKCE)',
    disconnectedBadge: 'Awaiting Authorization',
    connectWiseBtn: 'Connect Wise Account (OAuth Popup)',
    simulateBtn: '1-Click Sandbox Test Connect',
    disconnectBtn: 'Disconnect & Revoke Token',
    balancesTitle: 'Multi-Currency Revenue Balances',
    earningsTitle: 'Live YouTube Earnings Tracker',
    eligibleToDisburse: 'Clear for Immediate Disbursement',
    disburseNowBtn: 'Disburse YouTube Earnings Now',
    autoRulesTitle: 'Automated Payout Rules & Thresholds',
    multilingualAiTitle: 'Multi-Lingual AI Revenue Multiplier',
    multilingualAiSubtitle: 'Translate, localize and culturally adapt YouTube Shorts into Tier-1 global languages to multiply earnings up to 3.8x.',
    translateBtn: 'Generate Multi-Lingual AI Package',
    recentDisbursements: 'Verified Disbursement Ledger',
  },
  es: {
    title: 'Configuración de Pagos y Wise OAuth',
    subtitle: 'Integración OAuth 2.0 segura para el seguimiento automatizado de ingresos de YouTube AdSense y desembolsos directos sin comisiones ocultas.',
    oauthTitle: 'Enlace de Cuenta Wise OAuth 2.0',
    connectedBadge: 'Activo y Verificado (OAuth PKCE)',
    disconnectedBadge: 'Esperando Autorización',
    connectWiseBtn: 'Conectar Cuenta Wise (Ventana OAuth)',
    simulateBtn: 'Prueba Rápida Sandbox en 1-Clic',
    disconnectBtn: 'Desconectar y Revocar Token',
    balancesTitle: 'Saldos Multidivisa de Ingresos',
    earningsTitle: 'Rastreador de Ingresos de YouTube en Vivo',
    eligibleToDisburse: 'Listo para Desembolso Inmediato',
    disburseNowBtn: 'Desembolsar Ingresos de YouTube Ahora',
    autoRulesTitle: 'Reglas Automatizadas de Desembolso',
    multilingualAiTitle: 'Multiplicador de Ingresos con IA Multilingüe',
    multilingualAiSubtitle: 'Traduce, localiza y adapta Shorts a idiomas globales de alto CPM para multiplicar ingresos hasta 3.8x.',
    translateBtn: 'Generar Paquete de IA Multilingüe',
    recentDisbursements: 'Registro de Desembolsos Verificados',
  },
  ja: {
    title: '支払い設定とWise OAuth連携',
    subtitle: 'YouTube AdSense収益の自動追跡、多通貨保管、為替手数料ゼロの自動送金を実現する安全なOAuth 2.0統合モジュール。',
    oauthTitle: 'Wise OAuth 2.0 アカウント連携',
    connectedBadge: '接続完了・認証済 (OAuth PKCE)',
    disconnectedBadge: '認証待ち',
    connectWiseBtn: 'Wiseアカウントを接続 (OAuthポップアップ)',
    simulateBtn: '1クリック即時テスト接続 (Sandbox)',
    disconnectBtn: '連携解除・トークン破棄',
    balancesTitle: '多通貨収益残高',
    earningsTitle: 'リアルタイムYouTube収益トラッカー',
    eligibleToDisburse: '即時送金可能な確定収益',
    disburseNowBtn: 'YouTube収益をWise口座へ即時送金',
    autoRulesTitle: '自動送金ルールと基準額設定',
    multilingualAiTitle: '多言語AI収益マルチプライヤー',
    multilingualAiSubtitle: 'YouTubeショートを世界の高CPM言語にローカライズし、グローバル収益を最大3.8倍に拡大。',
    translateBtn: '多言語AIパッケージを一括生成',
    recentDisbursements: '出金トランザクション履歴',
  },
  de: {
    title: 'Auszahlungskonfiguration & Wise OAuth',
    subtitle: 'Sichere OAuth 2.0-Integration für automatisches YouTube AdSense-Tracking und Direktauszahlungen ohne versteckte Bankgebühren.',
    oauthTitle: 'Wise OAuth 2.0 Kontoverbindung',
    connectedBadge: 'Aktiv & Verifiziert (OAuth PKCE)',
    disconnectedBadge: 'Wartet auf Autorisierung',
    connectWiseBtn: 'Wise-Konto verbinden (OAuth Popup)',
    simulateBtn: '1-Klick Sandbox-Test verbinden',
    disconnectBtn: 'Trennen & Token widerrufen',
    balancesTitle: 'Multi-Währungs-Guthaben',
    earningsTitle: 'Live YouTube Einnahmen-Tracker',
    eligibleToDisburse: 'Bereit zur sofortigen Auszahlung',
    disburseNowBtn: 'YouTube-Einnahmen jetzt auszahlen',
    autoRulesTitle: 'Automatische Auszahlungsregeln',
    multilingualAiTitle: 'Mehrsprachiger KI-Umsatz-Multiplikator',
    multilingualAiSubtitle: 'Shorts in globale Tier-1-Sprachen lokalisieren und Werbeeinnahmen um bis zu 3,8x steigern.',
    translateBtn: 'Mehrsprachiges KI-Paket generieren',
    recentDisbursements: 'Verifizierte Auszahlungshistorie',
  },
  fr: {
    title: 'Configuration des Paiements & Wise OAuth',
    subtitle: 'Intégration OAuth 2.0 sécurisée pour le suivi automatique des revenus YouTube AdSense et les virements directs sans marge de change.',
    oauthTitle: 'Liaison de Compte Wise OAuth 2.0',
    connectedBadge: 'Actif & Vérifié (OAuth PKCE)',
    disconnectedBadge: 'En attente d\'autorisation',
    connectWiseBtn: 'Connecter le compte Wise (Popup OAuth)',
    simulateBtn: 'Connexion test Sandbox en 1 clic',
    disconnectBtn: 'Déconnecter et révoquer le token',
    balancesTitle: 'Soldes Multidevises de Revenus',
    earningsTitle: 'Suivi des Revenus YouTube en Direct',
    eligibleToDisburse: 'Prêt pour le virement immédiat',
    disburseNowBtn: 'Transférer les revenus YouTube vers Wise',
    autoRulesTitle: 'Règles de Virement Automatique',
    multilingualAiTitle: 'Multiplicateur de Revenus IA Multilingue',
    multilingualAiSubtitle: 'Traduisez et adaptez vos Shorts dans les langues Tier-1 pour multiplier vos revenus jusqu\'à 3.8x.',
    translateBtn: 'Générer le pack IA Multilingue',
    recentDisbursements: 'Historique des virements vérifiés',
  },
  pt: {
    title: 'Configuração de Pagamentos e Wise OAuth',
    subtitle: 'Integração segura OAuth 2.0 para rastreamento automático do YouTube AdSense e transferências diretas sem taxas bancárias ocultas.',
    oauthTitle: 'Conexão de Conta Wise OAuth 2.0',
    connectedBadge: 'Ativo e Verificado (OAuth PKCE)',
    disconnectedBadge: 'Aguardando Autorização',
    connectWiseBtn: 'Conectar Conta Wise (Popup OAuth)',
    simulateBtn: 'Conectar Teste Sandbox em 1 Clique',
    disconnectBtn: 'Desconectar e Revogar Token',
    balancesTitle: 'Saldos Multimoedas de Receita',
    earningsTitle: 'Rastreador de Ganhos do YouTube em Tempo Real',
    eligibleToDisburse: 'Liberado para Transferência Imediata',
    disburseNowBtn: 'Transferir Ganhos do YouTube para a Wise',
    autoRulesTitle: 'Regras de Pagamento Automático',
    multilingualAiTitle: 'Multiplicador de Receita com IA Multilíngue',
    multilingualAiSubtitle: 'Localize Shorts para idiomas globais de alto CPM e multiplique ganhos em até 3.8x.',
    translateBtn: 'Gerar Pacote de IA Multilíngue',
    recentDisbursements: 'Histórico de Transferências Verificadas',
  }
};

export const PayoutsConfigurationModule: React.FC<PayoutsConfigurationModuleProps> = ({
  onSendToUploader,
  onSendToPipeline,
}) => {
  const [uiLang, setUiLang] = useState<UiLanguage>('en');
  const t = UI_TRANSLATIONS[uiLang];

  // Active section tab
  const [activeSection, setActiveSection] = useState<'oauth_tracking' | 'multilingual_ai' | 'disbursement_rules'>('oauth_tracking');

  // Wise OAuth state
  const [account, setAccount] = useState<WiseOAuthAccount | null>(null);
  const [autoRules, setAutoRules] = useState<AutoDisbursementRule>({
    enabled: true,
    minThreshold: 500,
    frequency: 'monthly_21st',
    targetCurrency: 'USD',
    targetDestination: 'wise_balance',
    taxReservePercent: 25,
    notifyEmail: true,
  });
  const [youtubeEarnings, setYoutubeEarnings] = useState<YouTubeEarningsTracker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Callback URLs for OAuth provider setup
  const [devCallbackUrl, setDevCallbackUrl] = useState('https://ais-dev-a5wb25n34swpfam4gmrf5d-104466792707.europe-west2.run.app/auth/callback');
  const [sharedCallbackUrl, setSharedCallbackUrl] = useState('https://ais-pre-a5wb25n34swpfam4gmrf5d-104466792707.europe-west2.run.app/auth/callback');

  // Disbursement modal state
  const [showDisburseModal, setShowDisburseModal] = useState(false);
  const [disburseAmount, setDisburseAmount] = useState<number>(1000);
  const [disburseDestination, setDisburseDestination] = useState<string>('Wise Multi-Currency USD Balance');
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [disbursementSuccess, setDisbursementSuccess] = useState<PayoutDisbursementTransaction | null>(null);

  // Multi-lingual AI state
  const [mlTitle, setMlTitle] = useState('How Top 1% Secretly Save $10,000 in Taxes (Legal Loophole)');
  const [mlDescription, setMlDescription] = useState('Stop overpaying taxes. In this 60s breakdown, learn the top legal deductions used by millionaires. Pinned link for the free worksheet.');
  const [mlScript, setMlScript] = useState('Did you know the average American overpays 30% on taxes? Here are 3 legal loopholes the top 1% use that your accountant never told you. Number one: The Augusta Rule...');
  const [mlNiche, setMlNiche] = useState('Finance & Wealth');
  const [selectedTargetLangs, setSelectedTargetLangs] = useState<string[]>(['es', 'ja', 'de', 'pt', 'fr']);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<MultilingualAiResponse | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<string>('es');

  // Multi-lingual AI Advisor chat state
  const [advisorQuery, setAdvisorQuery] = useState('How do I set up W-8BEN with Wise to avoid 30% US tax withholding?');
  const [advisorResponse, setAdvisorResponse] = useState<{ answer: string; keyTakeaways: string[]; language?: string } | null>(null);
  const [isAdvisorLoading, setIsAdvisorLoading] = useState(false);

  // Fetch initial account status & youtube earnings
  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const [accRes, ytRes] = await Promise.all([
        fetch('/api/wise/account/status'),
        fetch('/api/wise/youtube-earnings'),
      ]);
      const accData = await accRes.json();
      const ytData = await ytRes.json();

      if (accData.account) setAccount(accData.account);
      if (accData.autoRules) setAutoRules(accData.autoRules);
      if (accData.devCallbackUrl) setDevCallbackUrl(accData.devCallbackUrl);
      if (accData.sharedCallbackUrl) setSharedCallbackUrl(accData.sharedCallbackUrl);
      if (ytData) {
        setYoutubeEarnings(ytData);
        if (ytData.currentCycle?.eligibleForDisbursement) {
          setDisburseAmount(ytData.currentCycle.eligibleForDisbursement);
        }
      }
    } catch (err) {
      console.error('Error fetching Wise status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    // Skill requirement: listen for cross-origin postMessage from OAuth popup
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        playSoundEffect('chime', 0.5);
        fetchStatus();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    playSoundEffect('pulse', 0.3);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Connect via Popup OAuth following oauth-integration skill
  const handleConnectOAuth = async () => {
    playSoundEffect('pulse', 0.4);
    try {
      const res = await fetch('/api/wise/auth/url');
      const data = await res.json();
      if (!data.url) throw new Error('No OAuth URL returned');

      // Open OAuth provider URL directly in popup
      const authWindow = window.open(
        data.url,
        'wise_oauth_popup',
        'width=600,height=720,status=no,resizable=yes'
      );

      if (!authWindow) {
        alert('Please allow popups to connect your Wise account securely.');
      }
    } catch (err) {
      console.error('OAuth initiation failed:', err);
    }
  };

  // Instant sandbox connect for frictionless testing
  const handleSimulateConnect = async () => {
    playSoundEffect('whoosh', 0.4);
    try {
      const res = await fetch('/api/wise/simulate-connect', { method: 'POST' });
      const data = await res.json();
      if (data.account) {
        setAccount(data.account);
        playSoundEffect('chime', 0.5);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisconnect = async () => {
    playSoundEffect('pulse', 0.3);
    try {
      await fetch('/api/wise/disconnect', { method: 'POST' });
      if (account) setAccount({ ...account, connected: false });
    } catch (err) {
      console.error(err);
    }
  };

  // Save auto-disbursement rules
  const handleSaveAutoRules = async (updated: Partial<AutoDisbursementRule>) => {
    const next = { ...autoRules, ...updated };
    setAutoRules(next);
    playSoundEffect('pulse', 0.3);
    try {
      await fetch('/api/wise/auto-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Execute manual payout disbursement directly from YouTube earnings
  const handleExecuteDisbursement = async () => {
    setIsDisbursing(true);
    playSoundEffect('whoosh', 0.4);
    try {
      const res = await fetch('/api/wise/disburse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: disburseAmount,
          destination: disburseDestination,
        }),
      });
      const data = await res.json();
      if (data.success) {
        playSoundEffect('chime', 0.6);
        setDisbursementSuccess(data.disbursement);
        if (data.updatedEarnings) setYoutubeEarnings(data.updatedEarnings);
        if (data.updatedBalances && account) {
          setAccount({ ...account, balances: data.updatedBalances });
        }
      }
    } catch (err) {
      console.error('Disbursement error:', err);
    } finally {
      setIsDisbursing(false);
    }
  };

  // Run Multi-Lingual AI Engine
  const handleRunMultilingualAi = async () => {
    setIsTranslating(true);
    playSoundEffect('pulse', 0.4);
    try {
      const res = await fetch('/api/multilingual-ai/translate-and-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceTitle: mlTitle,
          sourceDescription: mlDescription,
          sourceScript: mlScript,
          niche: mlNiche,
          targetLanguages: selectedTargetLangs,
        }),
      });
      const data = await res.json();
      setTranslationResult(data);
      if (data.recommendedLanguages && data.recommendedLanguages.length > 0) {
        setActiveLangTab(data.recommendedLanguages[0].languageCode);
      }
      playSoundEffect('chime', 0.5);
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  // Multi-Lingual AI Advisor Query
  const handleAskAdvisor = async (qText?: string) => {
    const question = qText || advisorQuery;
    setIsAdvisorLoading(true);
    playSoundEffect('pulse', 0.3);
    try {
      const res = await fetch('/api/multilingual-ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, language: uiLang }),
      });
      const data = await res.json();
      setAdvisorResponse(data);
      playSoundEffect('chime', 0.4);
    } catch (err) {
      console.error('Advisor error:', err);
    } finally {
      setIsAdvisorLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Multi-Lingual UI Language Switcher */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-emerald-950/30 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                {t.title}
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Wise OAuth 2.0 PKCE
                </span>
              </h1>
            </div>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* UI Language Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-zinc-950/80 border border-zinc-800 rounded-2xl">
            <Languages className="w-4 h-4 text-emerald-400 ml-2" />
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-1">Language:</span>
            {(['en', 'es', 'ja', 'de', 'fr', 'pt'] as UiLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setUiLang(lang);
                  playSoundEffect('pulse', 0.2);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  uiLang === lang
                    ? 'bg-emerald-500 text-zinc-950 font-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-zinc-800/80">
          <button
            onClick={() => { setActiveSection('oauth_tracking'); playSoundEffect('pulse', 0.2); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSection === 'oauth_tracking'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'bg-zinc-800/60 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Wise OAuth &amp; Revenue Tracking</span>
            {account?.connected && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => { setActiveSection('disbursement_rules'); playSoundEffect('pulse', 0.2); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSection === 'disbursement_rules'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'bg-zinc-800/60 text-zinc-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4 text-emerald-300" />
            <span>{t.autoRulesTitle}</span>
          </button>

          <button
            onClick={() => { setActiveSection('multilingual_ai'); playSoundEffect('pulse', 0.2); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSection === 'multilingual_ai'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-zinc-800/60 text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>{t.multilingualAiTitle}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              3.8x Multiplier
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: WISE OAUTH & YOUTUBE REVENUE TRACKING */}
      {/* ========================================================================= */}
      {activeSection === 'oauth_tracking' && (
        <div className="space-y-6">
          {/* Top Grid: OAuth Connection Status & YouTube Live Revenue Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col (5 cols): Wise Account OAuth Linking */}
            <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-black text-sm">
                      W
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{t.oauthTitle}</h3>
                      <p className="text-xs text-zinc-400">Wise Multi-Currency Digital Bank</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    account?.connected 
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${account?.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    {account?.connected ? t.connectedBadge : t.disconnectedBadge}
                  </span>
                </div>

                {account?.connected ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-400">Account Holder</span>
                        <span className="text-xs font-mono font-bold text-white">{account.accountHolderName}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-400">Wise Profile Tag</span>
                        <span className="text-xs font-mono text-emerald-400">{account.wiseTag}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-400">Entity Type</span>
                        <span className="text-xs font-bold text-zinc-300">{account.businessType}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-400">Security Encryption</span>
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> OAuth 2.0 PKCE Handshake
                        </span>
                      </div>
                    </div>

                    {/* UK Faster Payments Details - Sort Code 60-84-64 & Account 88425941 */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-teal-950/20 to-zinc-950 border border-emerald-500/40 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-emerald-400" /> Wise UK Bank Account (GBP Primary)
                        </span>
                        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                          ✓ Linked &amp; Verified
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-400">UK Sort Code:</span>
                          <span className="font-mono font-black text-emerald-300 text-sm flex items-center gap-1.5">
                            60-84-64
                            <button
                              onClick={() => handleCopy('60-84-64', 'sort_code')}
                              className="text-zinc-400 hover:text-emerald-400 cursor-pointer"
                              title="Copy Sort Code"
                            >
                              {copiedKey === 'sort_code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-400">Account Number:</span>
                          <span className="font-mono font-black text-white text-sm flex items-center gap-1.5">
                            88425941
                            <button
                              onClick={() => handleCopy('88425941', 'uk_acc')}
                              className="text-zinc-400 hover:text-emerald-400 cursor-pointer"
                              title="Copy Account Number"
                            >
                              {copiedKey === 'uk_acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-400">Bank Partner:</span>
                          <span className="font-medium text-zinc-300">Wise Payments Ltd (London, UK)</span>
                        </div>
                      </div>
                    </div>

                    {/* US ACH / EFT Details for Direct YouTube AdSense ACH deposit */}
                    <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-zinc-400" /> US AdSense ACH Receiver (USD)
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded">
                          0% Fee ACH
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-500">ACH Routing (ABA):</span>
                          <span className="font-mono font-bold text-zinc-300">026073150</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-500">Account:</span>
                          <span className="font-mono font-bold text-zinc-300">88425941</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Link your Wise account to receive Google AdSense direct ACH deposits into a local USD routing number with zero international wire charges.
                    </p>
                    <div className="flex flex-col gap-2.5">
                      <button
                        onClick={handleConnectOAuth}
                        className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{t.connectWiseBtn}</span>
                      </button>
                      <button
                        onClick={handleSimulateConnect}
                        className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition flex items-center justify-center gap-2 cursor-pointer border border-zinc-700"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t.simulateBtn}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom OAuth Provider Info per skill guidelines */}
              <div className="mt-4 pt-4 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2">
                  <span>Authorized Callback URL</span>
                  <button
                    onClick={() => handleCopy(devCallbackUrl, 'cb_url')}
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'cb_url' ? 'Copied!' : 'Copy Callback URL'}
                  </button>
                </div>
                <div className="p-2 rounded-lg bg-zinc-950 text-[10px] font-mono text-zinc-400 break-all select-all border border-zinc-900">
                  {devCallbackUrl}
                </div>

                {account?.connected && (
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={handleConnectOAuth}
                      className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Re-authenticate OAuth
                    </button>
                    <button
                      onClick={handleDisconnect}
                      className="text-[11px] text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      {t.disconnectBtn}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col (7 cols): Live YouTube Revenue Sync & Direct Disbursement Action */}
            <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-sm">
                      YT
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{t.earningsTitle}</h3>
                      <p className="text-xs text-zinc-400">{youtubeEarnings?.channelName || 'YouTube Shorts Creator Hub'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-md">
                      Sync: {new Date().toLocaleTimeString()}
                    </span>
                    <button
                      onClick={fetchStatus}
                      className="p-1 rounded-md text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
                      title="Refresh YouTube Earnings"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Earnings Highlight Banner */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-950 to-emerald-950/40 border border-emerald-500/30 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                        {t.eligibleToDisburse}
                      </div>
                      <div className="text-3xl font-black text-white font-mono flex items-baseline gap-2">
                        ${youtubeEarnings?.currentCycle.eligibleForDisbursement.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        <span className="text-xs font-normal text-zinc-400">USD</span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        Next YouTube Clearance: <span className="text-zinc-200 font-bold">{youtubeEarnings?.currentCycle.nextScheduledPayDate}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowDisburseModal(true);
                        playSoundEffect('whoosh', 0.4);
                      }}
                      className="px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer font-black"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.disburseNowBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Revenue Source Breakdown Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <span className="text-[11px] text-zinc-400 block mb-1">Shorts Ad Pool</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      ${youtubeEarnings?.currentCycle.shortsFeedAdRevenue.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">
                      {((youtubeEarnings?.currentCycle.shortsViewsCount || 0) / 1000000).toFixed(1)}M Views @ ${youtubeEarnings?.currentCycle.shortsRpm} RPM
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <span className="text-[11px] text-zinc-400 block mb-1">Pinned Affiliate / Tools</span>
                    <span className="text-sm font-bold font-mono text-cyan-400">
                      ${youtubeEarnings?.currentCycle.longFormAndAffiliateRevenue.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">High-ticket SaaS/Fintech</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 col-span-2 sm:col-span-1">
                    <span className="text-[11px] text-zinc-400 block mb-1">Lifetime Disbursed</span>
                    <span className="text-sm font-bold font-mono text-white">
                      ${youtubeEarnings?.metrics.totalHistoricalDisbursed.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> 100% Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Zero Markup Comparison Pill */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-teal-400" />
                  Wise ACH vs Traditional Bank Wire:
                </span>
                <span className="text-emerald-300 font-bold font-mono">
                  Save $44.58 fee per payout (0% FX markup)
                </span>
              </div>
            </div>
          </div>

          {/* Middle Row: Multi-Currency Balances in Connected Wise Account */}
          {account?.connected && (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">{t.balancesTitle}</h3>
                </div>
                <span className="text-xs text-zinc-400">Mid-market live exchange rate holding jars</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {account.balances.map((b) => (
                  <div
                    key={b.currency}
                    className={`p-4 rounded-2xl border transition-all ${
                      b.isPrimaryReceiver
                        ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                        : 'bg-zinc-950/60 border-zinc-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-zinc-400">{b.currency}</span>
                      {b.isPrimaryReceiver && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-black text-white font-mono">
                      {b.symbol}{b.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1 block">
                      {b.currency === 'USD' ? 'AdSense Direct ACH Receiver' : 'Available for zero-fee transfer'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Table: Verified Disbursement Ledger */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-base">{t.recentDisbursements}</h3>
              </div>
              <span className="text-xs text-zinc-400">Direct from YouTube AdSense to Wise</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-semibold">Ref ID</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Source</th>
                    <th className="pb-3 font-semibold">Destination</th>
                    <th className="pb-3 font-semibold text-right">Amount</th>
                    <th className="pb-3 font-semibold text-right">Wise Fee</th>
                    <th className="pb-3 font-semibold text-right">Bank Fee Saved</th>
                    <th className="pb-3 font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono">
                  {youtubeEarnings?.recentDisbursements.map((tx) => (
                    <tr key={tx.id} className="hover:bg-zinc-800/30 transition">
                      <td className="py-3 text-emerald-400 font-bold">{tx.transactionRef}</td>
                      <td className="py-3 text-zinc-400">{tx.date}</td>
                      <td className="py-3 text-zinc-300 font-sans">{tx.source}</td>
                      <td className="py-3 text-zinc-300 font-sans">{tx.destination}</td>
                      <td className="py-3 text-right font-black text-white">${tx.amount.toFixed(2)}</td>
                      <td className="py-3 text-right text-zinc-400">${tx.feeAmount.toFixed(2)}</td>
                      <td className="py-3 text-right text-emerald-400 font-bold">+${tx.savings.toFixed(2)}</td>
                      <td className="py-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: AUTOMATED DISBURSEMENT RULES & THRESHOLDS */}
      {/* ========================================================================= */}
      {activeSection === 'disbursement_rules' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{t.autoRulesTitle}</h3>
                  <p className="text-xs text-zinc-400">Configure hands-free automatic disbursement from YouTube AdSense directly into your Wise multi-currency account.</p>
                </div>
              </div>

              {/* Master Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <span className="text-xs font-bold text-zinc-300">
                  {autoRules.enabled ? 'Auto-Disbursement Active' : 'Auto-Disbursement Paused'}
                </span>
                <input
                  type="checkbox"
                  checked={autoRules.enabled}
                  onChange={(e) => handleSaveAutoRules({ enabled: e.target.checked })}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-colors relative ${autoRules.enabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${autoRules.enabled ? 'left-6.5' : 'left-0.5'}`} />
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rule 1: Minimum Threshold */}
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white">Disbursement Threshold Trigger</label>
                  <span className="text-xs font-mono font-bold text-emerald-400">${autoRules.minThreshold} USD</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Automatically trigger transfer whenever accumulated YouTube revenue reaches or exceeds this balance.
                </p>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={autoRules.minThreshold}
                  onChange={(e) => handleSaveAutoRules({ minThreshold: Number(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>$100 (AdSense Minimum)</span>
                  <span>$1,000</span>
                  <span>$5,000</span>
                </div>
              </div>

              {/* Rule 2: Schedule & Frequency */}
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                <label className="text-xs font-bold text-white block">Execution Frequency</label>
                <p className="text-[11px] text-zinc-400">
                  Choose between matching Google AdSense clearance cycles or instant automated disbursement.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'monthly_21st', label: 'Monthly 21st (AdSense)' },
                    { id: 'realtime_clearance', label: 'Instant on Clearance' },
                    { id: 'biweekly', label: 'Bi-Weekly Schedule' },
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => handleSaveAutoRules({ frequency: freq.id as any })}
                      className={`p-2.5 rounded-xl text-[11px] font-bold transition border cursor-pointer ${
                        autoRules.frequency === freq.id
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rule 3: Target Destination Currency */}
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                <label className="text-xs font-bold text-white block">Target Holding Currency</label>
                <p className="text-[11px] text-zinc-400">
                  Wise converts at the real-time mid-market rate with zero exchange markup.
                </p>
                <div className="flex items-center gap-2">
                  {(['USD', 'EUR', 'GBP', 'AUD', 'CAD'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => handleSaveAutoRules({ targetCurrency: curr })}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition border cursor-pointer ${
                        autoRules.targetCurrency === curr
                          ? 'bg-emerald-500 text-zinc-950 border-emerald-400'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rule 4: Automated Tax Reserve Allocation */}
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white">Auto Tax Jar Allocation</label>
                  <span className="text-xs font-mono font-bold text-cyan-400">{autoRules.taxReservePercent}% Withheld</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Automatically allocate a percentage into a dedicated Wise Tax Jar to prevent end-of-year tax liabilities.
                </p>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="5"
                  value={autoRules.taxReservePercent}
                  onChange={(e) => handleSaveAutoRules({ taxReservePercent: Number(e.target.value) })}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>0% (No Withholding)</span>
                  <span>25% (Standard LLC)</span>
                  <span>40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: MULTI-LINGUAL AI REVENUE MULTIPLIER & ADVISOR */}
      {/* ========================================================================= */}
      {activeSection === 'multilingual_ai' && (
        <div className="space-y-6">
          {/* Multi-Lingual AI Generator Input Form */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{t.multilingualAiTitle}</h3>
                  <p className="text-xs text-zinc-400">{t.multilingualAiSubtitle}</p>
                </div>
              </div>

              <button
                onClick={handleRunMultilingualAi}
                disabled={isTranslating}
                className="px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
                <span>{isTranslating ? 'Localizing with Gemini 3.8...' : t.translateBtn}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">Original YouTube Title</label>
                <input
                  type="text"
                  value={mlTitle}
                  onChange={(e) => setMlTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  placeholder="Enter your top-performing English title..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">Niche Category</label>
                <select
                  value={mlNiche}
                  onChange={(e) => setMlNiche(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Finance & Wealth">Finance &amp; Wealth ($14 - $28 CPM)</option>
                  <option value="Kids Animations & Bedtime Fables">Kids 3D Animations &amp; Fables ($5.50 - $8.20 RPM)</option>
                  <option value="Films & Cinema Recaps">Films &amp; Cinema Recaps ($7.50 - $11.00 RPM)</option>
                  <option value="Viral Clipper & Podcast Highlights">Viral Clipper &amp; Podcasts ($6.00 - $9.50 RPM)</option>
                  <option value="SaaS & AI Productivity">SaaS &amp; AI Productivity ($12.00 - $18.50 RPM)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">Description &amp; Pinned Link</label>
                <textarea
                  rows={2}
                  value={mlDescription}
                  onChange={(e) => setMlDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">Voiceover Script (60s Short)</label>
                <textarea
                  rows={2}
                  value={mlScript}
                  onChange={(e) => setMlScript(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Target Languages Checkboxes */}
            <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-zinc-400">Target Languages:</span>
              {[
                { code: 'es', label: 'Spanish (🇪🇸)', tier: 'Tier 2 High Volume' },
                { code: 'ja', label: 'Japanese (🇯🇵)', tier: 'Tier 1 High CPM' },
                { code: 'de', label: 'German (🇩🇪)', tier: 'Tier 1 High CPM' },
                { code: 'pt', label: 'Portuguese (🇧🇷)', tier: 'Tier 2 Virality' },
                { code: 'fr', label: 'French (🇫🇷)', tier: 'Tier 1 High CPM' },
              ].map((lang) => {
                const active = selectedTargetLangs.includes(lang.code);
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      if (active) {
                        setSelectedTargetLangs(selectedTargetLangs.filter((l) => l !== lang.code));
                      } else {
                        setSelectedTargetLangs([...selectedTargetLangs, lang.code]);
                      }
                      playSoundEffect('pulse', 0.2);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border flex items-center gap-1.5 cursor-pointer ${
                      active
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                        : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300'
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span className="text-[10px] opacity-70">({lang.tier})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Translation Result View */}
          {translationResult && (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm">
                    AI
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Multi-Lingual Localization Packages</h4>
                    <p className="text-xs text-zinc-400">Estimated Global Growth: <span className="text-emerald-400 font-bold">{translationResult.globalEarningsMultiplier}</span></p>
                  </div>
                </div>

                {/* Language Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
                  {translationResult.recommendedLanguages.map((pkg) => (
                    <button
                      key={pkg.languageCode}
                      onClick={() => {
                        setActiveLangTab(pkg.languageCode);
                        playSoundEffect('pulse', 0.2);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                        activeLangTab === pkg.languageCode
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span>{pkg.flag}</span>
                      <span>{pkg.languageCode.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Language Detailed Card */}
              {(() => {
                const pkg = translationResult.recommendedLanguages.find((l) => l.languageCode === activeLangTab) || translationResult.recommendedLanguages[0];
                if (!pkg) return null;

                return (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{pkg.flag}</span>
                        <div>
                          <span className="font-bold text-white text-sm block">{pkg.languageName}</span>
                          <span className="text-xs text-zinc-400">{pkg.cpmTier}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          {pkg.cpmBenchmark}
                        </span>
                        <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                          {pkg.estimatedAudienceMultiplier}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Localized Title & Hook */}
                      <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-purple-300">Culturally Adapted Title</span>
                          <button
                            onClick={() => handleCopy(pkg.localizedTitle, `title_${pkg.languageCode}`)}
                            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedKey === `title_${pkg.languageCode}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <p className="text-sm font-bold text-white bg-zinc-900/90 p-3 rounded-xl border border-zinc-800">
                          {pkg.localizedTitle}
                        </p>

                        <span className="text-xs font-bold text-zinc-400 block">Localized 3-Second Hook</span>
                        <p className="text-xs text-zinc-300 bg-zinc-900/60 p-2.5 rounded-xl">
                          "{pkg.localizedHook}"
                        </p>
                      </div>

                      {/* Cultural Nuance Tip */}
                      <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Cultural Localization Strategy
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-xl">
                          {pkg.culturalNuanceTip}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {pkg.localizedTags.map((tag, idx) => (
                            <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Full Localized Voiceover Script */}
                    <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-300">Localized Voiceover Script (CapCut / ElevenLabs Ready)</span>
                        <button
                          onClick={() => handleCopy(pkg.localizedVoiceoverScript, `script_${pkg.languageCode}`)}
                          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                        >
                          {copiedKey === `script_${pkg.languageCode}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                        {pkg.localizedVoiceoverScript}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => {
                          if (onSendToUploader) {
                            onSendToUploader({
                              title: pkg.localizedTitle,
                              description: pkg.localizedDescription,
                              tags: pkg.localizedTags,
                            });
                          }
                          playSoundEffect('chime', 0.5);
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Localized Metadata to YouTube Uploader</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Multi-Lingual AI Revenue Advisor Chat */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Multi-Lingual AI Revenue Advisor</h4>
                <p className="text-xs text-zinc-400">Instant intelligence on W-8BEN international tax treaties, Wise routing, and multi-currency payout efficiency.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                'How do I set up W-8BEN with Wise to avoid 30% US tax withholding?',
                'Which language has the highest Shorts RPM after English?',
                'How to automate daily localized kids animations in Spanish and German?',
                'What are the exact Wise ACH numbers needed in Google AdSense?',
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAdvisorQuery(q);
                    handleAskAdvisor(q);
                  }}
                  className="px-3 py-1.5 rounded-xl text-[11px] font-medium bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={advisorQuery}
                onChange={(e) => setAdvisorQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAdvisor()}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                placeholder="Ask any international monetization or Wise payout question in your preferred language..."
              />
              <button
                onClick={() => handleAskAdvisor()}
                disabled={isAdvisorLoading}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isAdvisorLoading ? 'animate-spin' : ''}`} />
                <span>Ask AI</span>
              </button>
            </div>

            {advisorResponse && (
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-indigo-500/30 space-y-3">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <CheckCheck className="w-4 h-4 text-emerald-400" /> AI Advisor Strategic Guidance ({(advisorResponse.language || uiLang).toUpperCase()})
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {advisorResponse.answer}
                </p>
                {advisorResponse.keyTakeaways && advisorResponse.keyTakeaways.length > 0 && (
                  <div className="space-y-1 pt-2 border-t border-zinc-800">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Key Takeaways:</span>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-emerald-400">
                      {advisorResponse.keyTakeaways.map((item, idx) => (
                        <li key={idx}><span className="text-zinc-300">{item}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DISBURSEMENT EXECUTION MODAL */}
      {/* ========================================================================= */}
      {showDisburseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base">Confirm YouTube Revenue Disbursement</h3>
              </div>
              <button
                onClick={() => {
                  setShowDisburseModal(false);
                  setDisbursementSuccess(null);
                }}
                className="text-zinc-500 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {disbursementSuccess ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Disbursement Executed Successfully!</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Transaction Ref: <span className="text-emerald-400 font-mono font-bold">{disbursementSuccess.transactionRef}</span>
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Disbursed Amount:</span>
                    <span className="font-mono font-black text-white">${disbursementSuccess.amount.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Destination:</span>
                    <span className="text-zinc-300">{disbursementSuccess.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Wise ACH Fee:</span>
                    <span className="text-zinc-300 font-mono">${disbursementSuccess.feeAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-zinc-800">
                    <span className="text-emerald-400 font-bold">Total Bank Wire Fee Saved:</span>
                    <span className="text-emerald-400 font-mono font-bold">+${disbursementSuccess.savings.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowDisburseModal(false);
                    setDisbursementSuccess(null);
                  }}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition cursor-pointer"
                >
                  Close &amp; Return to Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1.5">Disbursement Amount (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-zinc-500 font-bold text-sm">$</span>
                    <input
                      type="number"
                      value={disburseAmount}
                      onChange={(e) => setDisburseAmount(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">
                    Available balance: ${youtubeEarnings?.currentCycle.eligibleForDisbursement.toFixed(2)} USD
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1.5">Destination Wise Account</label>
                  <select
                    value={disburseDestination}
                    onChange={(e) => setDisburseDestination(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Wise UK Account (Sort Code: 60-84-64, Acc: 88425941) - GBP Primary">Wise UK Account (Sort Code: 60-84-64, Acc: 88425941) - GBP Primary</option>
                    <option value="Wise Multi-Currency USD Balance">Wise Multi-Currency USD Balance (Free ACH)</option>
                    <option value="Wise EUR Balance (Mid-Market Rate)">Wise EUR Balance (Mid-Market Rate - 0% Markup)</option>
                    <option value="Wise GBP Balance (Mid-Market Rate)">Wise GBP Balance (Mid-Market Rate - 0% Markup)</option>
                  </select>
                </div>

                {/* Savings Summary Banner */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-zinc-400">Wise Transaction Fee:</span>
                    <span className="text-zinc-200 font-bold">$0.42</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-zinc-400">Traditional Bank Wire Fee:</span>
                    <span className="text-red-400 line-through">$45.00</span>
                  </div>
                  <div className="flex justify-between font-mono pt-1 border-t border-emerald-500/20">
                    <span className="text-emerald-300 font-bold">You Keep in Profit:</span>
                    <span className="text-emerald-400 font-bold">+${(45.00 - 0.42).toFixed(2)} Extra</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setShowDisburseModal(false)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExecuteDisbursement}
                    disabled={isDisbursing || disburseAmount <= 0}
                    className="flex-1 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className={`w-3.5 h-3.5 ${isDisbursing ? 'animate-spin' : ''}`} />
                    <span>{isDisbursing ? 'Transferring via Wise...' : 'Confirm & Disburse'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
