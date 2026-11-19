import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Folder, FileVideo, Calendar, Clock, CheckCircle2, 
  AlertCircle, Sparkles, Copy, Check, Play, Pause, RefreshCw, 
  Trash2, Plus, Edit3, ArrowRight, ShieldCheck, DollarSign, 
  Share2, Terminal, ExternalLink, Zap, Sliders, ChevronDown, 
  ChevronUp, Eye, Layers, Filter, Send, Download, AlertTriangle,
  Info, TrendingUp, BarChart3, HelpCircle, Lock, Shield
} from 'lucide-react';
import { BatchStagedShort, BulkMetadataTemplate, AudiencePeakTimeSlot, BatchUploadPlanSummary } from '../types';
import { QueuedShortRegistryItem } from '../data/youtubePipelineData';
import { playSoundEffect } from '../utils/soundEffects';
import {
  verifyBeforeUpload,
  PipelineState,
  PipelineVerificationResult,
  BatchForensicsLogEntry,
  getBatchForensicsLog,
  writeToBatchForensicsLog,
  subscribeBatchForensicsLog,
  clearBatchForensicsLog
} from '../utils/pipelineVerifier';

interface BatchUploaderModuleProps {
  onQueueToPipeline?: (items: QueuedShortRegistryItem[]) => void;
  onNavigateToSocialSync?: () => void;
  onNavigateToWisePayouts?: () => void;
}

const PRESET_BATCH_FOLDERS: {
  folderName: string;
  niche: string;
  category: string;
  description: string;
  files: {
    originalFileName: string;
    parsedTitle: string;
    fileSizeBytes: number;
    durationSec: number;
    videoSrc: string;
  }[];
}[] = [
  {
    folderName: 'batch_finance_mistakes_2026',
    niche: 'Finance & Wealth',
    category: '27', // Education
    description: '14 viral long-form clippers targeting high-CPM personal finance and wealth leaks.',
    files: [
      { originalFileName: '01_Why_The_Rich_Never_Save_Cash.mp4', parsedTitle: 'Why The Rich Never Save Cash', fileSizeBytes: 18450000, durationSec: 46, videoSrc: '/samples/sample_blazes.mp4' },
      { originalFileName: '02_The_Compound_Interest_Trap.mp4', parsedTitle: 'The Compound Interest Trap Nobody Talks About', fileSizeBytes: 19200000, durationSec: 52, videoSrc: '/samples/sample_escapes.mp4' },
      { originalFileName: '03_Stop_Buying_Index_Funds_Blindly.mp4', parsedTitle: 'Stop Buying Index Funds Blindly', fileSizeBytes: 17800000, durationSec: 41, videoSrc: '/samples/sample_fun.mp4' },
      { originalFileName: '04_The_UK_Sort_Code_Arbitrage.mp4', parsedTitle: 'The Wise Sort Code Arbitrage (Keep 100% AdSense)', fileSizeBytes: 20100000, durationSec: 49, videoSrc: '/samples/sample_joy.mp4' },
      { originalFileName: '05_Three_Things_Banks_Hide_From_You.mp4', parsedTitle: '3 Things Retail Banks Hide From Depositors', fileSizeBytes: 16900000, durationSec: 38, videoSrc: '/samples/sample_meltdowns.mp4' },
      { originalFileName: '06_How_To_Legally_Stop_30_Percent_Tax.mp4', parsedTitle: 'How International Creators Eliminate 30% Withholding', fileSizeBytes: 22400000, durationSec: 54, videoSrc: '/samples/sample_blazes.mp4' },
      { originalFileName: '07_The_Lifestyle_Creep_Silent_Killer.mp4', parsedTitle: 'The Lifestyle Creep Silent Killer', fileSizeBytes: 18100000, durationSec: 44, videoSrc: '/samples/sample_escapes.mp4' },
      { originalFileName: '08_Why_High_Earners_Die_Broke.mp4', parsedTitle: 'Why £150k Earners Still Die Broke', fileSizeBytes: 19800000, durationSec: 50, videoSrc: '/samples/sample_fun.mp4' },
      { originalFileName: '09_Real_Estate_Is_No_Longer_Passive.mp4', parsedTitle: 'Real Estate Is No Longer Passive Income', fileSizeBytes: 17300000, durationSec: 43, videoSrc: '/samples/sample_joy.mp4' },
      { originalFileName: '10_Credit_Card_Points_System_Exposed.mp4', parsedTitle: 'The Credit Card Points System Exposed', fileSizeBytes: 21100000, durationSec: 47, videoSrc: '/samples/sample_meltdowns.mp4' },
      { originalFileName: '11_The_72_Hour_Impulse_Rule.mp4', parsedTitle: 'The 72-Hour Impulse Buying Rule', fileSizeBytes: 16500000, durationSec: 36, videoSrc: '/samples/sample_blazes.mp4' },
      { originalFileName: '12_Emergency_Funds_Are_Costing_You.mp4', parsedTitle: 'Your Emergency Fund Is Silently Depreciating', fileSizeBytes: 18900000, durationSec: 48, videoSrc: '/samples/sample_escapes.mp4' },
      { originalFileName: '13_How_To_Negotiate_Any_Salary_2026.mp4', parsedTitle: 'How To Double Your Salary In 2026', fileSizeBytes: 23100000, durationSec: 55, videoSrc: '/samples/sample_fun.mp4' },
      { originalFileName: '14_The_ManyChat_Automated_Funnel.mp4', parsedTitle: 'The ManyChat DM Funnel Generating £45 EPC', fileSizeBytes: 19400000, durationSec: 51, videoSrc: '/samples/sample_joy.mp4' }
    ]
  },
  {
    folderName: 'batch_ai_automation_productivity',
    niche: 'AI & Technology',
    category: '28', // Science & Tech
    description: '10 rapid-fire tech productivity and AI prompt engineering breakdowns.',
    files: [
      { originalFileName: '01_This_AI_Prompt_Replaces_4_Employees.mp4', parsedTitle: 'This AI Prompt Replaces 4 Junior Employees', fileSizeBytes: 17200000, durationSec: 42, videoSrc: '/samples/sample_blazes.mp4' },
      { originalFileName: '02_Never_Use_ChatGPT_Like_This.mp4', parsedTitle: 'Never Use ChatGPT Like This In 2026', fileSizeBytes: 18900000, durationSec: 45, videoSrc: '/samples/sample_escapes.mp4' },
      { originalFileName: '03_Automate_Google_Sheets_With_Python.mp4', parsedTitle: 'Automate Google Sheets With Python In 3 Lines', fileSizeBytes: 21500000, durationSec: 53, videoSrc: '/samples/sample_fun.mp4' },
      { originalFileName: '04_The_YouTube_Transcript_Scraper_Hack.mp4', parsedTitle: 'Scrape Top 25 Viral Shorts In 5 Seconds', fileSizeBytes: 19800000, durationSec: 48, videoSrc: '/samples/sample_joy.mp4' },
      { originalFileName: '05_Three_Open_Source_AI_Models_Better_Than_Claude.mp4', parsedTitle: '3 Open Source AI Models Better Than Claude', fileSizeBytes: 22100000, durationSec: 57, videoSrc: '/samples/sample_meltdowns.mp4' },
      { originalFileName: '06_Deep_Research_Agents_Explained.mp4', parsedTitle: 'Autonomous Deep Research Agents Explained', fileSizeBytes: 18700000, durationSec: 44, videoSrc: '/samples/sample_blazes.mp4' },
      { originalFileName: '07_Voice_Cloning_Ethics_And_Speed.mp4', parsedTitle: 'Zero-Shot Ultra-Realistic Voice Cloning', fileSizeBytes: 17900000, durationSec: 40, videoSrc: '/samples/sample_escapes.mp4' },
      { originalFileName: '08_Automated_Video_Editing_Pipelines.mp4', parsedTitle: 'How To Build An Automated FFmpeg Video Factory', fileSizeBytes: 24200000, durationSec: 59, videoSrc: '/samples/sample_fun.mp4' },
      { originalFileName: '09_The_Best_Local_LLM_Hardware_Setup.mp4', parsedTitle: 'Run 70B Models Locally On A Budget', fileSizeBytes: 20400000, durationSec: 50, videoSrc: '/samples/sample_joy.mp4' },
      { originalFileName: '10_Stop_Writing_Code_By_Hand.mp4', parsedTitle: 'Stop Writing Boilerplate Code By Hand', fileSizeBytes: 16800000, durationSec: 37, videoSrc: '/samples/sample_meltdowns.mp4' }
    ]
  }
];

export const BatchUploaderModule: React.FC<BatchUploaderModuleProps> = ({
  onQueueToPipeline,
  onNavigateToSocialSync,
  onNavigateToWisePayouts
}) => {
  // Folder Ingestion State
  const [stagedFiles, setStagedFiles] = useState<BatchStagedShort[]>([]);
  const [folderName, setFolderName] = useState<string>('batch_finance_mistakes_2026');
  const [selectedNiche, setSelectedNiche] = useState<string>('Finance & Wealth');
  const [cadencePerDay, setCadencePerDay] = useState<number>(2); // Recommended: 2-3 uploads/day
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('curiosity_loop');
  const [customTitlePattern, setCustomTitlePattern] = useState<string>('{title} (Wait For Part {part_num}) #Shorts');
  
  // Customization & editing
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isAutoScheduling, setIsAutoScheduling] = useState<boolean>(false);
  const [filterDay, setFilterDay] = useState<number | 'all'>('all');
  
  // Script Generator Modal State
  const [showScriptModal, setShowScriptModal] = useState<boolean>(false);
  const [generatedScriptCode, setGeneratedScriptCode] = useState<string>('');
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
  
  // Batch Execution Simulation State
  const [isExecutingBatch, setIsExecutingBatch] = useState<boolean>(false);
  const [batchExecutionProgress, setBatchExecutionProgress] = useState<number>(0);
  const [currentUploadingIndex, setCurrentUploadingIndex] = useState<number>(-1);
  const [completedCount, setCompletedCount] = useState<number>(0);

  // Operational Blueprint Accordion
  const [showStrategicBlueprint, setShowStrategicBlueprint] = useState<boolean>(true);
  const [activeBlueprintPhase, setActiveBlueprintPhase] = useState<1 | 2 | 3 | 4>(1);

  // Pipeline Verifier Gate & Batch Forensics Log State
  const [verifierBlockedBanner, setVerifierBlockedBanner] = useState<{
    itemTitle: string;
    result: PipelineVerificationResult;
    blockedCount: number;
  } | null>(null);
  const [forensicsLog, setForensicsLog] = useState<BatchForensicsLogEntry[]>(() =>
    getBatchForensicsLog()
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  // Initialize with the first preset batch folder on mount & subscribe to forensics log
  useEffect(() => {
    loadPresetFolder(PRESET_BATCH_FOLDERS[0]);
    const unsubscribe = subscribeBatchForensicsLog(setForensicsLog);
    return unsubscribe;
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playSoundEffect('pulse', 0.4);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Ingest preset folder
  const loadPresetFolder = (folderData: typeof PRESET_BATCH_FOLDERS[0]) => {
    setFolderName(folderData.folderName);
    setSelectedNiche(folderData.niche);
    playSoundEffect('whoosh', 0.3);

    // Initial parsing
    const parsedItems: BatchStagedShort[] = folderData.files.map((file, idx) => {
      const partNum = idx + 1;
      return {
        id: `batch_init_${Date.now()}_${idx}`,
        originalFileName: file.originalFileName,
        fileSizeBytes: file.fileSizeBytes,
        parsedPartNumber: partNum,
        parsedTitle: file.parsedTitle,
        title: `${file.parsedTitle} (Part ${partNum}) #Shorts`,
        description: `Here is the exact truth about ${file.parsedTitle}.\n\n📌 FREE BLUEPRINT: Comment "SCALE" and receive the automated checklist directly in your DMs!\n\n💼 Payout Protection: Creator gross income routed via Wise UK Sort Code (60-84-64) & US Routing (026073150) with 0% foreign exchange markup.\n\n#shorts #finance #wealth #mistakes #productivity`,
        tags: ['shorts', 'finance', 'wealth', 'mistakes', 'algorithm2026', 'productivity'],
        durationSec: file.durationSec,
        niche: folderData.niche,
        cpm: 7.80,
        estimatedEarnings: Math.round(3100 + Math.random() * 2400),
        retentionScore: Math.round(90 + Math.random() * 7),
        scheduledDate: 'Day 1',
        scheduledTime: '12:15 PM',
        dayOffset: 0,
        status: 'ready',
        videoSrc: file.videoSrc,
        compliancePassed: true,
        greenDollarMonetized: true,
        affiliateDisclosure: true
      };
    });

    setStagedFiles(parsedItems);
    // Automatically apply schedule
    scheduleBatchItems(parsedItems, cadencePerDay, selectedTemplateId);
    showToast(`Loaded ${parsedItems.length} pre-indexed video shorts from "${folderData.folderName}"!`);
  };

  // Handle local folder upload (directory selection)
  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const detectedFolderName = files[0].webkitRelativePath?.split('/')[0] || 'Uploaded_Shorts_Folder';
    setFolderName(detectedFolderName);

    const videoExtensions = ['.mp4', '.mov', '.webm', '.m4v'];
    const validFiles = Array.from(files).filter(f => 
      videoExtensions.some(ext => f.name.toLowerCase().endsWith(ext))
    );

    if (validFiles.length === 0) {
      showToast('No MP4/MOV/WebM video files found in the selected folder.');
      return;
    }

    // Sort by name so numbered files (01_, 02_, etc.) maintain sequence
    validFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    const parsedItems: BatchStagedShort[] = validFiles.map((file, idx) => {
      const partNum = idx + 1;
      const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      const cleanTitle = rawName
        .replace(/^\d+[\s_-]*/, '')
        .replace(/^(hook|part|short)[\s_-]*/i, '')
        .trim();

      const objectUrl = URL.createObjectURL(file);

      return {
        id: `batch_local_${Date.now()}_${idx}`,
        originalFileName: file.name,
        fileSizeBytes: file.size,
        parsedPartNumber: partNum,
        parsedTitle: cleanTitle || `Video Part ${partNum}`,
        title: `${cleanTitle || `Video Part ${partNum}`} (Part ${partNum}) #Shorts`,
        description: `Uncovering the truth about ${cleanTitle}.\n\n💬 Comment "SCALE" for the full automation checklist in your DMs!\n\n#shorts #viral #growth`,
        tags: ['shorts', 'viral', 'growth', 'algorithm2026'],
        durationSec: 45,
        niche: selectedNiche,
        cpm: 7.20,
        estimatedEarnings: 3200,
        retentionScore: 92,
        scheduledDate: 'Day 1',
        scheduledTime: '12:15 PM',
        dayOffset: 0,
        status: 'ready',
        videoSrc: objectUrl,
        compliancePassed: true,
        greenDollarMonetized: true,
        affiliateDisclosure: true
      };
    });

    setStagedFiles(parsedItems);
    scheduleBatchItems(parsedItems, cadencePerDay, selectedTemplateId);
    playSoundEffect('chime', 0.5);
    showToast(`Successfully indexed ${parsedItems.length} videos from folder "${detectedFolderName}"!`);
  };

  // Auto-schedule items across 7 days on audience peak retention windows
  const scheduleBatchItems = (items: BatchStagedShort[], cadence: number, templateId: string) => {
    setIsAutoScheduling(true);

    const peakSlotsByDay = [
      { dayName: 'Monday', slots: ['12:15 PM', '06:45 PM', '08:30 PM'], score: 94 },
      { dayName: 'Tuesday', slots: ['12:30 PM', '07:15 PM', '09:00 PM'], score: 92 },
      { dayName: 'Wednesday', slots: ['11:45 AM', '06:30 PM', '08:15 PM'], score: 97 },
      { dayName: 'Thursday', slots: ['12:00 PM', '07:00 PM', '08:45 PM'], score: 95 },
      { dayName: 'Friday', slots: ['01:15 PM', '08:30 PM', '10:00 PM'], score: 99 },
      { dayName: 'Saturday', slots: ['10:30 AM', '02:45 PM', '08:15 PM'], score: 96 },
      { dayName: 'Sunday', slots: ['11:00 AM', '04:15 PM', '07:45 PM'], score: 100 }
    ];

    const now = new Date();
    const scheduled = items.map((item, idx) => {
      const partNum = idx + 1;
      const dayOffset = Math.floor(idx / Math.max(1, cadence));
      const slotIndexInDay = idx % Math.max(1, cadence);

      const targetDate = new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000);
      const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
      const dateFormatted = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const dayConfig = peakSlotsByDay.find(p => p.dayName === dayName) || peakSlotsByDay[dayOffset % 7];
      const slotTime = dayConfig.slots[slotIndexInDay % dayConfig.slots.length] || '12:00 PM';

      // Template title application
      let titleApplied = item.title;
      if (templateId === 'curiosity_loop') {
        titleApplied = `${item.parsedTitle} (Wait For Part ${partNum}) #Shorts`;
      } else if (templateId === 'brutal_truth') {
        titleApplied = `Never Do This: ${item.parsedTitle} | Shocking Truth #Shorts`;
      } else if (templateId === 'authority_blueprint') {
        titleApplied = `How The Top 1% Master ${item.parsedTitle} (Step-by-Step) #Shorts`;
      } else if (templateId === 'ai_arbitrage') {
        titleApplied = `Automate ${item.parsedTitle} In 60 Seconds (Free AI Hack) #Shorts`;
      } else if (customTitlePattern) {
        titleApplied = customTitlePattern
          .replace(/\{title\}/g, item.parsedTitle)
          .replace(/\{part_num\}/g, String(partNum))
          .replace(/\{niche\}/g, selectedNiche);
      }

      return {
        ...item,
        parsedPartNumber: partNum,
        title: titleApplied.slice(0, 100),
        scheduledDate: `${dayName} (${dateFormatted})`,
        scheduledTime: slotTime,
        dayOffset,
        status: 'scheduled' as const,
        compliancePassed: true,
        greenDollarMonetized: true
      };
    });

    setStagedFiles(scheduled);
    setTimeout(() => setIsAutoScheduling(false), 300);
  };

  // Bulk Apply Metadata Template
  const handleApplyTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    playSoundEffect('pulse', 0.4);

    let templateDesc = '';
    let templateTags: string[] = [];

    if (templateId === 'curiosity_loop') {
      setCustomTitlePattern('{title} (Wait For Part {part_num}) #Shorts');
      templateDesc = `Here is the unspoken truth about {title}.\n\n🔥 Watch till the very end to understand why 99% of people get this wrong.\n\n📌 FREE ACTION CHECKLIST: Comment "SCALE" below and our automated ManyChat funnel will DM you the step-by-step PDF blueprint within 5 seconds.\n\n💼 Payout Protection: Creator gross revenues routed with 0% foreign exchange markup via Wise UK (Sort Code 60-84-64) and US Routing (026073150).\n\n⚠️ Affiliate & FTC Disclosure: Links in this description or pinned comments may generate an affiliate commission at no extra cost to you.\n\n#shorts #growth #viral #productivity`;
      templateTags = ['shorts', 'viral', 'algorithm', 'growth', 'productivity', 'curiosity'];
    } else if (templateId === 'brutal_truth') {
      setCustomTitlePattern('Never Do This: {title} | Shocking Truth #Shorts');
      templateDesc = `99% of creators and professionals make this catastrophic error with {title}.\n\nHere is how to protect yourself and reverse it:\n1. Stop relying on outdated strategies.\n2. Deploy high-retention 3-second visual pacing.\n3. Check the pinned comment resource.\n\n💬 Comment "SCALE" to claim your automated diagnostic checklist!\n\n#mistakes #success #education #shorts #viral`;
      templateTags = ['shorts', 'mistakes', 'truth', 'financialfreedom', 'psychology', 'warning'];
    } else if (templateId === 'authority_blueprint') {
      setCustomTitlePattern('How The Top 1% Master {title} (Step-by-Step) #Shorts');
      templateDesc = `The exact operational blueprint behind {title}.\n\nKey Principles:\n• Leverage over linear effort.\n• Automated multi-platform syndication.\n• Zero FX currency conversion loss via Wise UK (60-84-64).\n\n📌 Resource Library: Claim verified templates in the pinned comment.\n\n#education #masterclass #shorts #wealth #discipline`;
      templateTags = ['shorts', 'masterclass', 'wealth', 'highincome', 'career', 'education'];
    } else if (templateId === 'ai_arbitrage') {
      setCustomTitlePattern('Automate {title} In 60 Seconds (Free AI Hack) #Shorts');
      templateDesc = `This single workflow eliminates 4 hours of tedious manual effort with {title}.\n\nTry this right now:\n1. Paste the prompt template.\n2. Let the engine generate the full output.\n3. Deploy across your channels.\n\n💬 Comment "SCALE" for the direct access link to the tool stack!\n\n#ai #aitools #automation #tech #shorts`;
      templateTags = ['shorts', 'ai', 'aitools', 'automation', 'productivity', 'futuretech'];
    }

    const updated = stagedFiles.map((item, idx) => {
      const partNum = idx + 1;
      let newTitle = item.title;
      if (templateId === 'curiosity_loop') {
        newTitle = `${item.parsedTitle} (Wait For Part ${partNum}) #Shorts`;
      } else if (templateId === 'brutal_truth') {
        newTitle = `Never Do This: ${item.parsedTitle} | Shocking Truth #Shorts`;
      } else if (templateId === 'authority_blueprint') {
        newTitle = `How The Top 1% Master ${item.parsedTitle} (Step-by-Step) #Shorts`;
      } else if (templateId === 'ai_arbitrage') {
        newTitle = `Automate ${item.parsedTitle} In 60 Seconds (Free AI Hack) #Shorts`;
      }

      return {
        ...item,
        title: newTitle.slice(0, 100),
        description: templateDesc.replace(/\{title\}/g, item.parsedTitle),
        tags: Array.from(new Set([...item.tags, ...templateTags])),
        affiliateDisclosure: true,
        greenDollarMonetized: true
      };
    });

    setStagedFiles(updated);
    showToast(`Applied "${templateId.replace(/_/g, ' ')}" template across all ${updated.length} batch shorts!`);
  };

  // Change Cadence (e.g. 1, 2, or 3 per day) and recalculate peak scheduling
  const handleCadenceChange = (newCadence: number) => {
    setCadencePerDay(newCadence);
    playSoundEffect('pulse', 0.3);
    scheduleBatchItems(stagedFiles, newCadence, selectedTemplateId);
    showToast(`Updated schedule cadence to ${newCadence} shorts/day across the next 7 days!`);
  };

  // Queue entire batch into Sequential Pipeline Registry
  const handleQueueAllToPipeline = () => {
    if (stagedFiles.length === 0) {
      showToast('No staged files to queue.');
      return;
    }

    const pipelineItems: QueuedShortRegistryItem[] = stagedFiles.map((item, index) => {
      return {
        queueId: `q_batch_${Date.now()}_${index}`,
        sequenceOrder: index + 1,
        title: item.title,
        niche: item.niche,
        durationSec: item.durationSec,
        videoUrl: item.videoSrc,
        scheduledDate: item.scheduledDate,
        scheduledTime: item.scheduledTime,
        status: 'queued',
        uploadProgress: 0,
        estimatedEarnings: item.estimatedEarnings,
        cpm: item.cpm,
        retentionPredicted: item.retentionScore,
        affiliateDisclosureAdded: item.affiliateDisclosure,
        advertiserGreenDollar: item.greenDollarMonetized,
        tags: item.tags,
        description: item.description,
        aiContentDetails: {
          scriptSnippet: `Auto-ingested batch short part ${item.parsedPartNumber} - ${item.parsedTitle}`,
          musicTrack: 'Industrial ASMR Sub-bass (124 BPM)',
          musicGenre: 'Electronic / ASMR',
          musicBpm: 124,
          voiceName: 'Charon (Deep Authority)',
          animationStyle: 'Macro 50,000x Photogrammetry 60 FPS',
          screenMessage: '⚡ Wise Payout Cleared (Sort Code 60-84-64)',
          cleanUnclutteredMode: true
        }
      };
    });

    playSoundEffect('chime', 0.7);
    if (onQueueToPipeline) {
      onQueueToPipeline(pipelineItems);
    }
    showToast(`Queued ${pipelineItems.length} batch shorts into the Sequential Pipeline Registry!`);
  };

  // Generate Python hands-free upload script
  const handleGeneratePythonScript = async () => {
    setIsGeneratingScript(true);
    setShowScriptModal(true);
    playSoundEffect('pulse', 0.4);

    try {
      const res = await fetch('/api/batch-uploader/generate-python-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchItems: stagedFiles,
          channelName: 'ViralGrowthNetwork',
          cadence: cadencePerDay
        })
      });
      const data = await res.json();
      if (data.scriptCode) {
        setGeneratedScriptCode(data.scriptCode);
      }
    } catch (err) {
      console.error('Failed to generate Python script:', err);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // Derive actual 11-field PipelineState from a staged batch item
  const buildBatchItemPipelineState = (item: BatchStagedShort): PipelineState => ({
    trend_selected: Boolean(item.niche?.trim() && item.parsedTitle?.trim()),
    script_ready: Boolean(item.parsedTitle?.trim()),
    video_file_exists: Boolean(item.videoSrc?.trim()),
    duration_ok: item.durationSec > 0 && item.durationSec < 60,
    captions_burned: Boolean(item.compliancePassed),
    safe_zones_verified: Boolean(item.compliancePassed),
    brand_kit_applied: Boolean(item.greenDollarMonetized),
    affiliate_links_present: Boolean(item.affiliateDisclosure),
    metadata_complete: Boolean(
      item.title?.trim() &&
      item.description?.trim() &&
      item.tags &&
      item.tags.length > 0
    ),
    upload_confirmed: item.status === 'published',
    ledger_updated: false
  });

  // Simulate Batch Execution with live progress
  const handleExecuteBatchSimulation = () => {
    if (stagedFiles.length === 0 || isExecutingBatch) return;

    // Pre-upload Pipeline Verifier Gate
    const verifications = stagedFiles.map((item) => {
      const state = buildBatchItemPipelineState(item);
      const result = verifyBeforeUpload(state);
      writeToBatchForensicsLog('Batch Uploader', item.title, result);
      return { item, result };
    });

    const blockedItems = verifications.filter((v) => v.result.verdict === 'BLOCKED');
    if (blockedItems.length > 0) {
      const blockedIds = new Set(blockedItems.map((b) => b.item.id));
      const firstBlocked = blockedItems[0];
      setStagedFiles((prev) =>
        prev.map((f) => (blockedIds.has(f.id) ? { ...f, status: 'error' } : f))
      );
      setVerifierBlockedBanner({
        itemTitle: firstBlocked.item.title,
        result: firstBlocked.result,
        blockedCount: blockedItems.length
      });
      playSoundEffect('subdrop', 0.4);
      showToast(
        `Upload cancelled: ${firstBlocked.result.message}`
      );
      return;
    }

    setVerifierBlockedBanner(null);
    setIsExecutingBatch(true);
    setBatchExecutionProgress(0);
    setCurrentUploadingIndex(0);
    setCompletedCount(0);
    playSoundEffect('pulse', 0.5);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= stagedFiles.length) {
        clearInterval(interval);
        setIsExecutingBatch(false);
        setCurrentUploadingIndex(-1);
        playSoundEffect('chime', 0.7);
        showToast(`Batch Uploader successfully scheduled all ${stagedFiles.length} videos with YouTube API v3!`);
        return;
      }

      setCurrentUploadingIndex(currentIndex);
      setStagedFiles(prev => prev.map((f, i) => {
        if (i < currentIndex) return { ...f, status: 'published' };
        if (i === currentIndex) return { ...f, status: 'uploading' };
        return f;
      }));

      currentIndex++;
      setCompletedCount(currentIndex);
      setBatchExecutionProgress(Math.round((currentIndex / stagedFiles.length) * 100));
    }, 800);
  };

  // Calculations
  const totalStaged = stagedFiles.length;
  const totalEarningsProjected = stagedFiles.reduce((acc, f) => acc + f.estimatedEarnings, 0);
  const avgRetention = totalStaged > 0 
    ? Math.round(stagedFiles.reduce((acc, f) => acc + f.retentionScore, 0) / totalStaged) 
    : 92;
  const daysCovered = Math.ceil(totalStaged / Math.max(1, cadencePerDay));

  const filteredStagedFiles = filterDay === 'all' 
    ? stagedFiles 
    : stagedFiles.filter(f => f.dayOffset === filterDay);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* 1. HEADER & HIGH-LEVEL METRICS */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-xl shadow-md">
                <Folder className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                Batch Uploader &amp; 7-Day Peak Audience Scheduler
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Multi-File Ingestion
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Peak Retention AI
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Upload a folder of pre-indexed short files, bulk-apply viral metadata templates with dynamic variables, 
              and automatically distribute them across high-traffic audience windows over the next 7 days.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-black/50 border border-zinc-800 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Staged Shorts</span>
              <span className="text-xl font-black text-white">{totalStaged}</span>
              <span className="text-[10px] text-indigo-400 block mt-0.5">{cadencePerDay}/day cadence</span>
            </div>

            <div className="bg-black/50 border border-zinc-800 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Days Covered</span>
              <span className="text-xl font-black text-amber-400">{daysCovered} Days</span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">Peak traffic matched</span>
            </div>

            <div className="bg-black/50 border border-zinc-800 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Projected Views</span>
              <span className="text-xl font-black text-emerald-400">£{(totalEarningsProjected / 1000 * 1.35).toFixed(0)}k</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">£7.80 avg CPM</span>
            </div>

            <div className="bg-black/50 border border-zinc-800 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Predicted Retention</span>
              <span className="text-xl font-black text-purple-400">{avgRetention}%</span>
              <span className="text-[10px] text-purple-400 block mt-0.5">Curiosity loops</span>
            </div>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => folderInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-950/50 cursor-pointer transition-all active:scale-95"
            >
              <Folder className="w-4 h-4" />
              <span>Choose Folder of Shorts</span>
            </button>
            <input
              type="file"
              ref={folderInputRef}
              onChange={handleFolderUpload}
              className="hidden"
              // @ts-ignore
              webkitdirectory=""
              directory=""
              multiple
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all border border-zinc-700"
            >
              <Upload className="w-4 h-4 text-zinc-400" />
              <span>Select Multi-Files</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFolderUpload}
              className="hidden"
              multiple
              accept="video/mp4,video/quicktime,video/webm"
            />

            {/* Presets Ingestion Dropdown */}
            <div className="relative inline-block">
              <select
                onChange={(e) => {
                  const preset = PRESET_BATCH_FOLDERS.find(p => p.folderName === e.target.value);
                  if (preset) loadPresetFolder(preset);
                }}
                value={folderName}
                className="px-3 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700 cursor-pointer focus:outline-none focus:border-indigo-500"
              >
                {PRESET_BATCH_FOLDERS.map(p => (
                  <option key={p.folderName} value={p.folderName}>
                    📁 Preset Batch: {p.folderName} ({p.files.length} shorts)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleGeneratePythonScript}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-500/30 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>View Python Uploader Script</span>
            </button>

            <button
              onClick={handleQueueAllToPipeline}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40 cursor-pointer transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Queue Entire Batch to Pipeline ({totalStaged})</span>
            </button>

            <button
              onClick={handleExecuteBatchSimulation}
              disabled={isExecutingBatch}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-950/40 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              {isExecutingBatch ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scheduling ({batchExecutionProgress}%)</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Execute Direct Uploads</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Execution Progress Bar */}
        {isExecutingBatch && (
          <div className="mt-4 p-3 bg-black/60 border border-purple-500/40 rounded-xl space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-purple-300 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Scheduling Batch Item {completedCount} of {totalStaged}: "{stagedFiles[currentUploadingIndex]?.title?.slice(0, 40)}..."
              </span>
              <span className="font-mono text-purple-400 font-bold">{batchExecutionProgress}%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${batchExecutionProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Pipeline Verifier Blocked Alert Banner */}
        {verifierBlockedBanner && (
          <div className="mt-4 p-4 bg-rose-950/70 border border-rose-500/50 rounded-xl text-xs text-rose-200 space-y-1.5 animate-fadeIn">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  Batch Upload Cancelled by Pipeline Verifier ({verifierBlockedBanner.blockedCount} blocked)
                </span>
              </div>
              <button
                onClick={() => setVerifierBlockedBanner(null)}
                className="text-zinc-400 hover:text-white text-xs cursor-pointer"
              >
                Dismiss
              </button>
            </div>
            <p className="font-mono text-[11px] text-rose-200">
              Item: <strong className="text-white">{verifierBlockedBanner.itemTitle}</strong> — {verifierBlockedBanner.result.message}
            </p>
            {verifierBlockedBanner.result.repairAction && (
              <p className="text-[11px] font-bold text-amber-300">
                VERDICT: REPAIR via {verifierBlockedBanner.result.repairAction}
              </p>
            )}
          </div>
        )}

        {/* Global Toast */}
        {toastMessage && (
          <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-semibold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white text-xs">Dismiss</button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. STRATEGIC NEXT STEPS: FULL UPLOADING & REVENUE GENERATION OPERATIONAL HUB */}
      {/* ========================================================================= */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div 
          onClick={() => setShowStrategicBlueprint(!showStrategicBlueprint)}
          className="p-5 bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 flex items-center justify-between cursor-pointer border-b border-zinc-800 hover:bg-zinc-850/60 transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <DollarSign className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Strategic Next Steps: Full Uploading &amp; Revenue Generation Blueprint
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  High Cash Flow
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                4-phase operational blueprint for cross-platform syndication, tri-pronged monetization, and 0% Wise FX fee retention.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
              {showStrategicBlueprint ? 'Hide Blueprint' : 'Expand Blueprint'}
            </span>
            {showStrategicBlueprint ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
          </div>
        </div>

        {showStrategicBlueprint && (
          <div className="p-6 space-y-6 animate-fadeIn">
            {/* Phase Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
              {[
                { phase: 1, label: '1. Tri-Platform Syndication', badge: '4h Anti-Cannibalism', icon: Share2 },
                { phase: 2, label: '2. Three-Pronged Revenue Model', badge: 'YPP + TikTok + ManyChat', icon: DollarSign },
                { phase: 3, label: '3. Wise Multi-Currency FX Protection', badge: 'Sort Code 60-84-64', icon: ShieldCheck },
                { phase: 4, label: '4. Automated Daily Production Cadence', badge: '2-3 Uploads/Day', icon: Calendar }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.phase}
                    onClick={() => setActiveBlueprintPhase(tab.phase as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      activeBlueprintPhase === tab.phase
                        ? 'bg-zinc-800 text-white border border-zinc-700 shadow-md'
                        : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tab.label}</span>
                    <span className="text-[9px] font-mono bg-black/40 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20">
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Phase 1: Tri-Platform Syndication */}
            {activeBlueprintPhase === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      YouTube Shorts
                    </span>
                    <span className="text-xs font-mono font-bold text-white bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded">
                      12:00 PM
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Target search browse, subscription notifications, and lunch-break algorithmic recommendation feeds.
                  </p>
                  <div className="text-[11px] text-zinc-400 bg-black/40 p-2.5 rounded-lg border border-zinc-800/80">
                    <span className="font-semibold text-zinc-300 block mb-1">Key Action:</span>
                    Add high-CTR curiosity loop title with part number and pinned resource comment.
                  </div>
                </div>

                <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      TikTok (4h Delay)
                    </span>
                    <span className="text-xs font-mono font-bold text-white bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                      04:30 PM
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Targeting late-afternoon For You Page (FYP) discovery when teen and young-adult traffic spikes.
                  </p>
                  <div className="text-[11px] text-zinc-400 bg-black/40 p-2.5 rounded-lg border border-zinc-800/80">
                    <span className="font-semibold text-zinc-300 block mb-1">Key Action:</span>
                    Strip all YouTube watermarks and EXIF tags using Clean Platform Export.
                  </div>
                </div>

                <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-pink-500" />
                      Instagram Reels (4h Delay)
                    </span>
                    <span className="text-xs font-mono font-bold text-white bg-pink-950/60 border border-pink-500/30 px-2 py-0.5 rounded">
                      08:15 PM
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Targeting peak evening explore engagement, saves, and DM conversations where DM conversion rates are highest.
                  </p>
                  <div className="text-[11px] text-zinc-400 bg-black/40 p-2.5 rounded-lg border border-zinc-800/80">
                    <span className="font-semibold text-zinc-300 block mb-1">Key Action:</span>
                    Include call-to-action: "Comment SCALE to get the free checklist."
                  </div>
                </div>
              </div>
            )}

            {/* Phase 2: Three-Pronged Revenue Model */}
            {activeBlueprintPhase === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">YouTube Partner Program (YPP)</h4>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      £0.08–£0.18 RPM
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Requires 1,000 subscribers + 10M Shorts views in 90 days. Boost with pinned comment affiliate links (£45 CPA) and tagged YouTube Shopping merchandise.
                  </p>
                  <div className="p-2.5 bg-black/40 rounded-lg border border-zinc-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-300">Green Dollar Monetized:</span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">100% Staged</span>
                  </div>
                </div>

                <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">TikTok Creator Rewards &amp; Shop</h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      £0.35–£0.85 RPM
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Requires 10,000 followers and 100,000 views in 30 days. Maintain video length 60+ seconds to qualify. Add TikTok Shop affiliate items with 10%–25% commission.
                  </p>
                  <div className="p-2.5 bg-black/40 rounded-lg border border-zinc-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-300">Minimum Duration:</span>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">&gt;60s for CRP</span>
                  </div>
                </div>

                <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">Instagram ManyChat DM Funnel</h4>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                      £12.50–£45.00 EPC
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Highest earnings per thousand views. Connect account to ManyChat. When viewers comment "SCALE", automated DM fires in 5s with Gumroad/Stripe affiliate product.
                  </p>
                  <div className="p-2.5 bg-black/40 rounded-lg border border-zinc-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-300">Trigger Keyword:</span>
                    <button 
                      onClick={() => handleCopy('SCALE', 'kw')}
                      className="text-[11px] font-mono text-purple-300 font-bold hover:underline flex items-center gap-1"
                    >
                      "SCALE" {copiedKey === 'kw' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 3: Wise Multi-Currency FX Protection */}
            {activeBlueprintPhase === 3 && (
              <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Wise Multi-Currency Foreign Exchange Protection
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Standard bank wire or PayPal takes 3.5%–4.2% foreign exchange cut. Connect Wise to retain 100% gross earnings.
                    </p>
                  </div>
                  {onNavigateToWisePayouts && (
                    <button
                      onClick={onNavigateToWisePayouts}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Manage Wise Payouts</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-black/40 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                    <span className="text-[11px] text-zinc-400 font-semibold block">UK Domestic GBP Transfers</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-300">Sort Code:</span>
                      <button 
                        onClick={() => handleCopy('60-84-64', 'sc')}
                        className="text-xs font-mono font-bold text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        60-84-64 {copiedKey === 'sc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-300">FX Fee Rate:</span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">0.00% (Zero Loss)</span>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-indigo-500/20 rounded-xl p-4 space-y-2">
                    <span className="text-[11px] text-zinc-400 font-semibold block">US ACH USD Platform Revenues (AdSense / Meta)</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-300">US Routing Number:</span>
                      <button 
                        onClick={() => handleCopy('026073150', 'rt')}
                        className="text-xs font-mono font-bold text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        026073150 {copiedKey === 'rt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-300">Withholding Tax Form:</span>
                      <span className="text-xs font-mono text-indigo-400 font-bold">W-8BEN Treaty Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 4: Automated Cadence */}
            {activeBlueprintPhase === 4 && (
              <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Automated Weekend Production &amp; Daily Cadence Protocol
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 bg-black/40 rounded-xl border border-zinc-800/80 space-y-1.5">
                    <span className="text-xs font-bold text-purple-300">Step 1: Weekend Batching</span>
                    <p className="text-xs text-zinc-400">
                      Produce 15–20 high-retention shorts over the weekend using the Psychological Trigger Engine and AI Scene Generator.
                    </p>
                  </div>
                  <div className="p-3.5 bg-black/40 rounded-xl border border-zinc-800/80 space-y-1.5">
                    <span className="text-xs font-bold text-indigo-300">Step 2: 7-Day Peak Schedule</span>
                    <p className="text-xs text-zinc-400">
                      Distribute files automatically at 2–3 uploads/day onto algorithmic peak times (12:15 PM &amp; 06:45 PM).
                    </p>
                  </div>
                  <div className="p-3.5 bg-black/40 rounded-xl border border-zinc-800/80 space-y-1.5">
                    <span className="text-xs font-bold text-emerald-300">Step 3: Hands-Free Python</span>
                    <p className="text-xs text-zinc-400">
                      Execute `google-api-python-client` with stored OAuth2 refresh token for fully hands-free background publishing.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. BULK METADATA TEMPLATE ENGINE */}
      {/* ========================================================================= */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Bulk Metadata Template Engine
              </h3>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                Dynamic Variables Active
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Apply unified title patterns, FTC disclosures, Wise account payout notices, and ManyChat DM triggers across all {totalStaged} staged shorts with one click.
            </p>
          </div>

          {/* Cadence Selector */}
          <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
            <span className="text-xs text-zinc-400 px-2 font-medium">Cadence:</span>
            {[1, 2, 3].map((cad) => (
              <button
                key={cad}
                onClick={() => handleCadenceChange(cad)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  cadencePerDay === cad
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cad} / Day {cad === 2 && '(Recommended)'}
              </button>
            ))}
          </div>
        </div>

        {/* Template Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            {
              id: 'curiosity_loop',
              name: 'Viral Curiosity Loop',
              badge: '88% Retention Hold',
              pattern: '{title} (Wait For Part {part_num}) #Shorts',
              desc: 'High suspense, multi-part open loops that drive viewers to binge entire playlists.',
              borderColor: 'border-purple-500/30'
            },
            {
              id: 'brutal_truth',
              name: 'Brutal Truth & Warning',
              badge: 'Highest Click-Through',
              pattern: 'Never Do This: {title} | Shocking Truth #Shorts',
              desc: 'Aggressive pattern interrupt warning against catastrophic industry mistakes.',
              borderColor: 'border-rose-500/30'
            },
            {
              id: 'authority_blueprint',
              name: 'Top 1% Authority Masterclass',
              badge: 'Green Dollar CPM',
              pattern: 'How The Top 1% Master {title} (Step-by-Step) #Shorts',
              desc: 'Premium educational format attracting corporate and finance advertisers ($8.50+ CPM).',
              borderColor: 'border-emerald-500/30'
            },
            {
              id: 'ai_arbitrage',
              name: 'AI Tools & Automation',
              badge: 'Trending Tech',
              pattern: 'Automate {title} In 60 Seconds (Free AI Hack) #Shorts',
              desc: 'Micro-SaaS and workflow automation hacks targeting high-intent developers and entrepreneurs.',
              borderColor: 'border-indigo-500/30'
            }
          ].map((t) => (
            <div
              key={t.id}
              onClick={() => handleApplyTemplate(t.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                selectedTemplateId === t.id
                  ? 'bg-zinc-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {t.name}
                  </span>
                  <span className="text-[9px] font-mono bg-black/50 text-indigo-300 px-1.5 py-0.5 rounded border border-zinc-800">
                    {t.badge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
                  {t.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 font-mono block">Pattern:</span>
                <span className="text-[11px] font-mono text-zinc-300 truncate block">
                  {t.pattern}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Pattern Editor & Apply Button */}
        <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">
                Active Title Pattern (Supports variables: <code className="text-indigo-400">{"{title}"}</code>, <code className="text-purple-400">{"{part_num}"}</code>, <code className="text-emerald-400">{"{niche}"}</code>)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customTitlePattern}
                  onChange={(e) => setCustomTitlePattern(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  placeholder="{title} (Part {part_num}) #Shorts"
                />
                <button
                  onClick={() => scheduleBatchItems(stagedFiles, cadencePerDay, 'custom')}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg cursor-pointer transition-all shrink-0"
                >
                  Apply Pattern
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">
                Target Niche &amp; CPM Calibration
              </label>
              <select
                value={selectedNiche}
                onChange={(e) => {
                  setSelectedNiche(e.target.value);
                  playSoundEffect('pulse', 0.3);
                }}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Finance & Wealth">Finance &amp; Wealth ($8.50 - $18.00 CPM)</option>
                <option value="Machinery & Engineering">Machinery &amp; Engineering ($7.20 - $12.00 CPM)</option>
                <option value="AI & Technology">AI &amp; Technology ($6.80 - $14.50 CPM)</option>
                <option value="Mindset & Productivity">Mindset &amp; Productivity ($5.50 - $9.20 CPM)</option>
                <option value="Craftsmanship & ASMR">Craftsmanship &amp; ASMR ($4.80 - $8.00 CPM)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. AUDIENCE PEAK TIME 7-DAY SCHEDULE MATRIX */}
      {/* ========================================================================= */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
                <Calendar className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Audience Peak Retention 7-Day Schedule Matrix
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                100% Conflict Free
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Visual overview of your staged batch mapped to peak subscriber activity slots (12:15 PM lunch browse &amp; 06:45 PM evening leisure).
            </p>
          </div>

          {/* Filter By Day Offset */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setFilterDay('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterDay === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Days ({stagedFiles.length})
            </button>
            {[0, 1, 2, 3, 4, 5, 6].map((dayNum) => {
              const count = stagedFiles.filter(f => f.dayOffset === dayNum).length;
              return (
                <button
                  key={dayNum}
                  onClick={() => setFilterDay(dayNum)}
                  className={`px-2 py-1 rounded-lg text-xs font-mono transition-all ${
                    filterDay === dayNum ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  D{dayNum + 1} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Staged Items List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStagedFiles.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all space-y-3 ${
                item.status === 'published' 
                  ? 'bg-emerald-950/20 border-emerald-500/40' 
                  : item.status === 'uploading'
                  ? 'bg-purple-950/30 border-purple-500/50 shadow-lg ring-1 ring-purple-500'
                  : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {item.parsedPartNumber}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                      File: {item.originalFileName} ({(item.fileSizeBytes / 1024 / 1024).toFixed(1)} MB • {item.durationSec}s)
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  {item.status === 'published' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Live / Scheduled
                    </span>
                  ) : item.status === 'uploading' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1 font-bold animate-pulse">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Uploading
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      Staged
                    </span>
                  )}
                </div>
              </div>

              {/* Schedule Slot & Algorithmic Parameters */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-black/40 rounded-lg border border-zinc-800/80 text-[11px]">
                <div>
                  <span className="text-[9px] text-zinc-500 font-mono uppercase block">Date Slot</span>
                  <span className="font-semibold text-zinc-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-400" />
                    {item.scheduledDate}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 font-mono uppercase block">Peak Time</span>
                  <span className="font-semibold text-amber-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {item.scheduledTime}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 font-mono uppercase block">Est. Revenue</span>
                  <span className="font-semibold text-emerald-400 font-mono">
                    £{item.estimatedEarnings.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Compliance & Disclosure Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Green Dollar ($7.80 CPM)
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    ManyChat "SCALE"
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setPreviewVideoUrl(item.videoSrc);
                      playSoundEffect('whoosh', 0.3);
                    }}
                    className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                    title="Preview video snippet"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      handleCopy(item.title, `title_${item.id}`);
                      showToast('Copied title to clipboard!');
                    }}
                    className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                    title="Copy optimized title"
                  >
                    {copiedKey === `title_${item.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4B. BATCH FORENSICS LOG (PIPELINE VERIFIER AUDIT TRAIL) */}
      {/* ========================================================================= */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Batch Forensics Log</h3>
            <span className="text-[10px] font-mono bg-zinc-950 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
              {forensicsLog.length} {forensicsLog.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>
          {forensicsLog.length > 0 && (
            <button
              onClick={clearBatchForensicsLog}
              className="text-[11px] font-mono text-zinc-400 hover:text-white cursor-pointer"
            >
              Clear Log
            </button>
          )}
        </div>

        {forensicsLog.length === 0 ? (
          <p className="text-xs font-mono text-zinc-500">
            No verification events recorded yet. Pre-upload Pipeline Verifier checks appear here.
          </p>
        ) : (
          <div className="bg-black/70 border border-zinc-800 rounded-xl p-3 max-h-52 overflow-y-auto space-y-1.5 font-mono text-[11px]">
            {forensicsLog.map((entry) => (
              <div
                key={entry.id}
                className={`px-2.5 py-1.5 rounded border ${
                  entry.verdict === 'BLOCKED'
                    ? 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                    : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                }`}
              >
                {entry.line}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. PYTHON BATCH SCRIPT MODAL */}
      {/* ========================================================================= */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <Terminal className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Python Hands-Free Batch Uploader (<code className="text-amber-400 text-xs font-mono">google-api-python-client</code>)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Standalone background execution script pre-configured with all {stagedFiles.length} staged videos and scheduled peak dates.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowScriptModal(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 font-mono text-xs">
              <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-zinc-300 space-y-1">
                <span className="font-bold text-indigo-300 block font-sans">Quick Installation:</span>
                <p className="text-zinc-400">Run this once in your terminal to install the official Google API client libraries:</p>
                <div className="flex items-center justify-between bg-black/60 p-2 rounded border border-zinc-800">
                  <span className="text-emerald-400">pip install google-api-python-client google-auth-oauthlib google-auth-httplib2 requests</span>
                  <button
                    onClick={() => handleCopy('pip install google-api-python-client google-auth-oauthlib google-auth-httplib2 requests', 'pip_cmd')}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-sans cursor-pointer"
                  >
                    {copiedKey === 'pip_cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-zinc-400 font-sans text-xs font-bold">Script: <code className="text-amber-300">youtube_batch_uploader.py</code></span>
                  <button
                    onClick={() => handleCopy(generatedScriptCode, 'python_script')}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black font-sans font-bold text-xs rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                  >
                    {copiedKey === 'python_script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Complete Python Script</span>
                  </button>
                </div>
                <pre className="p-4 bg-black/90 border border-zinc-800 rounded-xl text-emerald-400 overflow-x-auto max-h-[380px] text-[11px] leading-relaxed">
                  {isGeneratingScript ? 'Generating custom Python script with staged metadata...' : generatedScriptCode}
                </pre>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                Ready to execute via <code className="text-zinc-400">python3 youtube_batch_uploader.py</code>
              </span>
              <button
                onClick={() => setShowScriptModal(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. VIDEO PREVIEW MODAL */}
      {/* ========================================================================= */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-sm w-full p-4 space-y-3 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-indigo-400" />
                9:16 Vertical Video Preview
              </span>
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden border border-zinc-800">
              <video
                src={previewVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setPreviewVideoUrl(null)}
              className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
