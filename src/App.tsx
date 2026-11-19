import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { WorkflowTrackerTab } from './components/WorkflowTrackerTab';
import { Earth3DStudioTab } from './components/Earth3DStudioTab';
import { CopywriterTab } from './components/CopywriterTab';
import { ViralVaultTab } from './components/ViralVaultTab';
import { TranscriptSlicerTab } from './components/TranscriptSlicerTab';
import { ViralTrendWatcherTab } from './components/ViralTrendWatcherTab';
import { RetentionAnalyzerTab } from './components/RetentionAnalyzerTab';
import { VideoClipperSuiteTab } from './components/VideoClipperSuiteTab';
import { CapCutDirectorTab } from './components/CapCutDirectorTab';
import { YouTubeUploaderTab } from './components/YouTubeUploaderTab';
import { BrandKitTab } from './components/BrandKitTab';
import { KeywordScraperTab } from './components/KeywordScraperTab';
import { MonetizationTab } from './components/MonetizationTab';
import { AutomationStudioTab } from './components/AutomationStudioTab';
import { CompetitorResearchTab } from './components/CompetitorResearchTab';
import { AISceneGeneratorTab } from './components/AISceneGeneratorTab';
import { OnTrendTab } from './components/OnTrendTab';
import { CreativeSalonDirectorTab } from './components/CreativeSalonDirectorTab';
import { ContentBridgeTool } from './components/ContentBridgeTool';
import { CraftsmanEngineeringStudioTab } from './components/CraftsmanEngineeringStudioTab';
import { AssetLibraryTab } from './components/AssetLibraryTab';
import { AutomatedDailyPipelineTab } from './components/AutomatedDailyPipelineTab';
import { SmartNewsFlashTab } from './components/SmartNewsFlashTab';
import { LanguageLocalizationModule } from './components/LanguageLocalizationModule';
import { ABTestManagerTab } from './components/ABTestManagerTab';
import { NicheLibraryTab } from './components/NicheLibraryTab';
import { ChannelHealthAuditTab } from './components/ChannelHealthAuditTab';
import { SyncToSocialModule } from './components/SyncToSocialModule';
import { WorldWondersTab, WorldWonderAutoEditPayload } from './components/WorldWondersTab';
import { ForensicsDashboard } from './components/ForensicsDashboard';
import { ProStudio } from './components/ProStudio';
import { 
  Flame, Scissors, Video, Search, DollarSign, Terminal, 
  CheckCircle2, AlertCircle, ArrowUpRight, Youtube, Github, History, Upload, Globe,
  TrendingDown, Film
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('ontrend');
  const [subtitlePreview, setSubtitlePreview] = useState<string>('THE SINGLE BIGGEST LIE ABOUT MONEY');
  const [slicerTranscript, setSlicerTranscript] = useState<string>('');
  const [slicerContext, setSlicerContext] = useState<string>('');
  const [clipperTrimStart, setClipperTrimStart] = useState<number>(0);
  const [clipperTrimEnd, setClipperTrimEnd] = useState<number>(30);
  const [clipperContext, setClipperContext] = useState<string>('');
  const [thumbnailInitialFrame, setThumbnailInitialFrame] = useState<string>('');
  const [thumbnailInitialTitle, setThumbnailInitialTitle] = useState<string>('');
  const [uploaderMeta, setUploaderMeta] = useState<{
    title: string;
    description: string;
    tags: string[];
  }>({
    title: "What Standing on Mount Everest Actually Looks Like",
    description: "360 degree panoramic view from the summit of Mount Everest (8,848m). Notice the curvature of the Earth along the horizon.\n\n#shorts #everest #himalayas #adventure",
    tags: ["shorts", "everest", "mountains"]
  });

  const [contentBridgeVideo, setContentBridgeVideo] = useState<{
    id: string;
    title: string;
    channelTitle: string;
    hookQuote: string;
    hookType: string;
    views: string;
    durationSec: number;
    breakdownReason: string;
    suggestedVoice?: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  } | undefined>(undefined);
  const [incomingAutoEdit, setIncomingAutoEdit] = useState<WorldWonderAutoEditPayload | null>(null);

  const handleSendWonderToAutoEdit = (payload: WorldWonderAutoEditPayload) => {
    setIncomingAutoEdit(payload);
    setActiveTab('viralvault');
  };

  const handleSendToSimulator = (text: string) => {
    setSubtitlePreview(text);
    setActiveTab('capcut');
  };

  const handleSendToUploader = (meta: { title: string; description: string; tags: string[] }) => {
    setUploaderMeta(meta);
    setActiveTab('uploader');
  };

  const handleSendToClipper = (startSec: number, endSec: number, context: string) => {
    setClipperTrimStart(startSec);
    setClipperTrimEnd(endSec);
    setClipperContext(context);
    setActiveTab('clipper');
  };

  const handleRemixToSlicer = (transcript: string, context: string) => {
    setSlicerTranscript(transcript);
    setSlicerContext(context);
    setActiveTab('transcript');
  };

  const handleSendToContentBridge = (video: {
    id: string;
    title: string;
    channelTitle: string;
    hookQuote: string;
    hookType: string;
    views: string;
    durationSec: number;
    breakdownReason: string;
    suggestedVoice?: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  }) => {
    setContentBridgeVideo(video);
    setActiveTab('contentbridge');
  };

  const handleSendToThumbnail = (frameUrl: string, title?: string) => {
    setThumbnailInitialFrame(frameUrl);
    if (title) setThumbnailInitialTitle(title);
    setActiveTab('brandkit');
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-zinc-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Metric Bar / Algorithm Golden Rules */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-xs font-mono">
              3s
            </div>
            <div>
              <div className="text-xs font-bold text-white">First 3 Seconds</div>
              <div className="text-[10px] text-zinc-400">Curiosity gap or belief violation</div>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
              &lt;60
            </div>
            <div>
              <div className="text-xs font-bold text-white">Mobile Title Cutoff</div>
              <div className="text-[10px] text-zinc-400">Strictly under 60 chars for CTR</div>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
              9:16
            </div>
            <div>
              <div className="text-xs font-bold text-white">Safe-Zone Clearance</div>
              <div className="text-[10px] text-zinc-400">Avoid like buttons &amp; bottom sound</div>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs font-mono">
              $$$
            </div>
            <div>
              <div className="text-xs font-bold text-white">Pinned Comment Link</div>
              <div className="text-[10px] text-zinc-400">Helpful context, 0% spam score</div>
            </div>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'nichelibrary' && (
          <NicheLibraryTab 
            onSendToClipper={(title, script) => {
              handleSendToClipper(0, 48, `${title} - Script: ${script.substring(0, 180)}...`);
            }}
            onSendToUploader={(title, description, tags) => {
              handleSendToUploader({ title, description, tags });
            }}
            onSendToABTest={() => {
              setActiveTab('abtest');
            }}
            onSendToLocalization={() => {
              setActiveTab('localization');
            }}
            onSendToPipeline={() => {
              setActiveTab('dailypipeline');
            }}
            onSendToContentBridge={(title, script) => {
              handleSendToContentBridge({
                id: `niche_${Date.now()}`,
                title: title,
                channelTitle: 'ShortsForge Studio',
                hookQuote: script.substring(0, 90),
                hookType: 'Pattern Interrupt / High Retention Hook',
                views: '1.4M Benchmark',
                durationSec: 48,
                breakdownReason: 'High retention short film concept from Niche Library Registry',
                suggestedVoice: 'Charon'
              });
            }}
            onSendToSceneGen={() => {
              setActiveTab('scenegen');
            }}
          />
        )}

        {activeTab === 'scenegen' && (
          <AISceneGeneratorTab 
            onSendToClipper={handleSendToClipper}
            onSendToSimulator={handleSendToSimulator}
            onSendToSalon={() => setActiveTab('creativesalon')}
          />
        )}

        {activeTab === 'creativesalon' && (
          <CreativeSalonDirectorTab
            onSendToUploader={handleSendToUploader}
            onSendToSimulator={handleSendToSimulator}
            onSendToClipper={handleSendToClipper}
            onSendToOnTrend={() => setActiveTab('ontrend')}
            onSendToSceneGen={() => setActiveTab('scenegen')}
          />
        )}

        {activeTab === 'ontrend' && (
          <OnTrendTab 
            onSendToCopywriter={() => setActiveTab('copywriter')}
            onSendToSimulator={handleSendToSimulator}
            onSendToVoiceover={() => setActiveTab('competitors')}
            onRemixToSlicer={handleRemixToSlicer}
            onSendToClipper={handleSendToClipper}
            onSendToSalon={() => setActiveTab('creativesalon')}
          />
        )}

        {activeTab === 'competitors' && (
          <CompetitorResearchTab 
            onRemixToSlicer={handleRemixToSlicer}
            onSendToClipper={handleSendToClipper}
            onSendToCopywriter={() => setActiveTab('copywriter')}
            onSendToContentBridge={handleSendToContentBridge}
            onSendToUploader={handleSendToUploader}
            onSendToSimulator={handleSendToSimulator}
          />
        )}

        {activeTab === 'contentbridge' && (
          <ContentBridgeTool 
            initialVideo={contentBridgeVideo}
            onSendToUploader={handleSendToUploader}
            onSendToSimulator={handleSendToSimulator}
            onSendToClipper={handleSendToClipper}
            onSendToVoiceover={() => setActiveTab('competitors')}
          />
        )}

        {activeTab === 'craftsman' && (
          <CraftsmanEngineeringStudioTab 
            onSendToClipper={handleSendToClipper}
            onSendToThumbnail={handleSendToThumbnail}
            onSendToUploader={handleSendToUploader}
            onSendToSimulator={handleSendToSimulator}
          />
        )}

        {activeTab === 'assetlibrary' && (
          <AssetLibraryTab 
            onSendToClipper={handleSendToClipper}
            onSendToThumbnail={handleSendToThumbnail}
            onSendToUploader={handleSendToUploader}
            onSendToSimulator={handleSendToSimulator}
          />
        )}

        {activeTab === 'workflow' && (
          <WorkflowTrackerTab />
        )}

        {activeTab === 'retention' && (
          <RetentionAnalyzerTab 
            onSendToClipper={handleSendToClipper}
            onSendToSimulator={handleSendToSimulator}
            onSendToThumbnail={handleSendToThumbnail}
          />
        )}

        {activeTab === 'clipper' && (
          <VideoClipperSuiteTab 
            initialTrimStart={clipperTrimStart}
            initialTrimEnd={clipperTrimEnd}
            initialContext={clipperContext}
            onSendToSimulator={handleSendToSimulator}
            onSendToThumbnail={handleSendToThumbnail}
            onSendToUploader={handleSendToUploader}
            onSendToPipeline={() => setActiveTab('pipeline')}
            onSendToAssets={() => setActiveTab('assets')}
          />
        )}

        {activeTab === 'earth3d' && (
          <Earth3DStudioTab 
            onSendToUploader={handleSendToUploader}
            onSendToSimulator={handleSendToSimulator}
            onSendToThumbnail={handleSendToThumbnail}
          />
        )}

        {activeTab === 'worldwonders' && (
          <WorldWondersTab
            onSendToAutoEdit={handleSendWonderToAutoEdit}
            onNavigateTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'copywriter' && (
          <CopywriterTab onSendToSimulator={handleSendToSimulator} />
        )}

        {activeTab === 'localization' && (
          <LanguageLocalizationModule 
            initialTitle={uploaderMeta.title}
            initialDescription={uploaderMeta.description}
            onSendToUploader={handleSendToUploader}
            onSendToPipeline={() => setActiveTab('dailypipeline')}
          />
        )}

        {activeTab === 'trends' && (
          <ViralTrendWatcherTab
            onRemixToSlicer={handleRemixToSlicer}
            onSendToSimulator={handleSendToSimulator}
            onSendToUploader={handleSendToUploader}
          />
        )}

        {activeTab === 'viralvault' && (
          <ViralVaultTab 
            onSendToClipper={handleSendToClipper}
            onSendToThumbnail={handleSendToThumbnail}
            onSendToUploader={handleSendToUploader}
            onSendToSimulator={handleSendToSimulator}
            onNavigateTab={(tabId) => setActiveTab(tabId)}
            incomingAutoEdit={incomingAutoEdit}
          />
        )}

        {activeTab === 'prostudio' && (
          <ProStudio onNavigateTab={(tabId) => setActiveTab(tabId)} />
        )}

        {activeTab === 'transcript' && (
          <TranscriptSlicerTab 
            onSendToSimulator={handleSendToSimulator}
            incomingTranscript={slicerTranscript}
            incomingContext={slicerContext}
          />
        )}

        {activeTab === 'abtest' && (
          <ABTestManagerTab 
            onSendToUploader={handleSendToUploader}
            onSendToSimulator={handleSendToSimulator}
            onSendToPipeline={() => setActiveTab('dailypipeline')}
          />
        )}

        {activeTab === 'capcut' && (
          <CapCutDirectorTab 
            currentSubtitlePreview={subtitlePreview} 
            onSendToUploader={handleSendToUploader}
          />
        )}

        {activeTab === 'channelhealth' && (
          <ChannelHealthAuditTab 
            onSendToClipper={handleSendToClipper}
            onSendToUploader={(title, description, tags) => {
              handleSendToUploader({ title, description, tags });
            }}
            onSendToPipeline={() => setActiveTab('dailypipeline')}
            onSendToCapCut={handleSendToSimulator}
          />
        )}

        {activeTab === 'uploader' && (
          <YouTubeUploaderTab 
            key={uploaderMeta.title}
            initialTitle={uploaderMeta.title}
            initialDescription={uploaderMeta.description}
            initialTags={uploaderMeta.tags}
            onNavigateToHealthAudit={() => setActiveTab('channelhealth')}
            onNavigateToSocialSync={() => setActiveTab('socialsync')}
          />
        )}

        {activeTab === 'batchuploader' && (
          <YouTubeUploaderTab 
            key="batch_uploader_tab"
            initialTitle={uploaderMeta.title}
            initialDescription={uploaderMeta.description}
            initialTags={uploaderMeta.tags}
            initialMode="batch"
            onNavigateToHealthAudit={() => setActiveTab('channelhealth')}
            onNavigateToSocialSync={() => setActiveTab('socialsync')}
          />
        )}

        {activeTab === 'socialsync' && (
          <SyncToSocialModule
            initialTitle={uploaderMeta.title}
            initialDescription={uploaderMeta.description}
            initialTags={uploaderMeta.tags}
            onSendToUploader={handleSendToUploader}
          />
        )}

        {activeTab === 'brandkit' && (
          <BrandKitTab 
            initialFrameUrl={thumbnailInitialFrame}
            initialTitle={thumbnailInitialTitle}
            onSendToUploader={handleSendToUploader}
          />
        )}

        {activeTab === 'keywords' && (
          <KeywordScraperTab 
            onSendToUploader={handleSendToUploader}
            onSendToPipeline={() => setActiveTab('dailypipeline')}
            onSendToCopywriter={() => setActiveTab('copywriter')}
            onNavigateTab={(tabId) => setActiveTab(tabId)}
          />
        )}


        {activeTab === 'monetization' && (
          <MonetizationTab 
            onSendToCopywriter={() => setActiveTab('copywriter')} 
            onSendToUploader={handleSendToUploader}
            onSendToPipeline={() => setActiveTab('dailypipeline')}
            onSendToClipper={handleSendToClipper}
            onSendToSceneGen={() => setActiveTab('scenegen')}
          />
        )}


        {activeTab === 'newsflash' && (
          <SmartNewsFlashTab 
            onSendToClipper={handleSendToClipper}
            onSendToThumbnail={handleSendToThumbnail}
            onSendToUploader={handleSendToUploader}
            onSendToSimulator={handleSendToSimulator}
            onNavigateTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'dailypipeline' && (
          <AutomatedDailyPipelineTab 
            onSendToClipper={handleSendToClipper}
            onSendToThumbnail={handleSendToThumbnail}
            onSendToUploader={handleSendToUploader}
            onSendToSimulator={handleSendToSimulator}
            onNavigateTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'forensics' && (
          <ForensicsDashboard />
        )}

        {activeTab === 'automation' && (
          <AutomationStudioTab />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="font-semibold text-zinc-300">ShortsForge AI</span>
            <span>— Complete YouTube Shorts Growth Suite &amp; Automation Pipeline</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-zinc-400">
              Built for high CTR, retention curves, and faceless channel monetization.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
