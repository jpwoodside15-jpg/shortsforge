import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, Download, Copy, Check, Sparkles, 
  Layers, Smartphone, Eye, ShieldCheck, Sun, Moon, 
  Zap, Share2, Award, CheckCircle2, Image as ImageIcon,
  Type, Smile, ArrowUpRight, Upload, Flame, AlertTriangle,
  RotateCw, Sliders, Maximize2, ExternalLink
} from 'lucide-react';

interface ColorSwatch {
  name: string;
  hex: string;
  role: string;
  usage: string;
}

interface PaletteFamily {
  id: string;
  name: string;
  badge: string;
  description: string;
  ctrFocus: string;
  colors: ColorSwatch[];
}

export interface BrandKitTabProps {
  initialFrameUrl?: string;
  initialTitle?: string;
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
}

interface VideoFramePreset {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

const PRESET_FRAMES: VideoFramePreset[] = [
  {
    id: 'drone-night',
    title: '4K Metropolis Drone Night Skim',
    category: 'Aerial & FPV',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1280&q=80',
    description: 'Neon metropolis skyscraper canyons at midnight'
  },
  {
    id: 'stadium-floodlights',
    title: 'Santiago Bernabéu Floodlight Arena',
    category: 'Stadium Cathedrals',
    imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1280&q=80',
    description: 'Electrifying pitch turf and stadium floodlight glow'
  },
  {
    id: 'fred-dibnah-chimney',
    title: 'Fred Dibnah 400-Ton Chimney Drop',
    category: 'Engineering & Demolition',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1280&q=80',
    description: 'Dramatic brick collapse with rising smoke and flames'
  },
  {
    id: 'titanium-drill',
    title: 'Solid Grade-5 Titanium Gun-Drill Sparks',
    category: 'Super Machining',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1280&q=80',
    description: 'High-speed metal chips and incandescent sparks'
  },
  {
    id: 'kumiko-wood',
    title: 'Japanese Kumiko Screen Joint Fit',
    category: 'Craftsman Precision',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1280&q=80',
    description: 'Pristine natural wood shavings and interlocking cedar'
  },
  {
    id: 'molten-glass',
    title: '1,100°C Molten Glass Kinetic Glow',
    category: 'Factory Production',
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1280&q=80',
    description: 'Viscous glowing orange blob forming inside cast mold'
  }
];

interface FaceCutoutPreset {
  id: string;
  name: string;
  emotion: string;
  avatarIcon: string;
  badge: string;
}

const FACE_CUTOUT_PRESETS: FaceCutoutPreset[] = [
  { id: 'shocked', name: 'YouTuber Mind-Blown (Mouth Open)', emotion: 'Pure Shock', avatarIcon: '😱', badge: '18% CTR Boost' },
  { id: 'pointing', name: 'Intense Pointing (Look Here)', emotion: 'Directional Urgency', avatarIcon: '👉', badge: 'Focus Anchor' },
  { id: 'laser-eyes', name: 'Laser Eyes Cyber Glow', emotion: 'Alpha Secret', avatarIcon: '👀', badge: 'Crypto & Tech' },
  { id: 'dibnah-cap', name: 'Fred Dibnah Steeplejack Smile', emotion: 'Craftsman Legend', avatarIcon: '👷', badge: 'Industrial' },
  { id: 'craftsman', name: 'Artisan Intense Eyebrows', emotion: 'Master Focus', avatarIcon: '🧐', badge: 'Woodworking' },
  { id: 'executive', name: 'Executive Billionaire Suit', emotion: 'Authority Status', avatarIcon: '😎', badge: 'Finance' }
];

export const BrandKitTab: React.FC<BrandKitTabProps> = ({
  initialFrameUrl,
  initialTitle,
  onSendToUploader
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'thumbnail' | 'logos' | 'palettes'>('thumbnail');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('viral-neon');
  const [logoVariant, setLogoVariant] = useState<'dark' | 'light'>('dark');

  // Thumbnail Studio State
  const [selectedFrameSource, setSelectedFrameSource] = useState<string>(initialFrameUrl ? 'clipper' : 'drone-night');
  const [customFrameUrl, setCustomFrameUrl] = useState<string | null>(initialFrameUrl || null);
  const [aspectRatio, setAspectRatio] = useState<'16-9' | '9-16'>('16-9');
  
  // Text Overlay State
  const [headlineText, setHeadlineText] = useState<string>(initialTitle || "DON'T DO THIS IN 2026!");
  const [subtitlePill, setSubtitlePill] = useState<string>('FREE BLUEPRINT');
  const [showSubtitlePill, setShowSubtitlePill] = useState<boolean>(true);
  const [textColor, setTextColor] = useState<string>('#FFE600'); // MrBeast Yellow
  const [strokeWidth, setStrokeWidth] = useState<number>(10);
  const [textRotation, setTextRotation] = useState<number>(-4);
  const [textPosX, setTextPosX] = useState<number>(50); // percentage
  const [textPosY, setTextPosY] = useState<number>(45); // percentage
  const [fontSize, setFontSize] = useState<number>(58);

  // Face Cutout State
  const [showFaceCutout, setShowFaceCutout] = useState<boolean>(true);
  const [selectedCutoutId, setSelectedCutoutId] = useState<string>('shocked');
  const [facePosX, setFacePosX] = useState<number>(82); // percentage
  const [facePosY, setFacePosY] = useState<number>(68); // percentage
  const [faceScale, setFaceScale] = useState<number>(1.2);
  const [faceFlip, setFaceFlip] = useState<boolean>(false);
  const [faceGlowColor, setFaceGlowColor] = useState<string>('#FFFFFF'); // White sticker border
  const [customCutoutUrl, setCustomCutoutUrl] = useState<string | null>(null);

  // High-CTR Graphical Elements
  const [showRedArrow, setShowRedArrow] = useState<boolean>(true);
  const [arrowStyle, setArrowStyle] = useState<'curved-left' | 'curved-down' | '3d-gloss' | 'neon'>('curved-left');
  const [arrowPosX, setArrowPosX] = useState<number>(64);
  const [arrowPosY, setArrowPosY] = useState<number>(38);
  const [arrowScale, setArrowScale] = useState<number>(1.1);
  const [arrowRotation, setArrowRotation] = useState<number>(25);

  const [showFocusCircle, setShowFocusCircle] = useState<boolean>(false);
  const [focusCircleX, setFocusCircleX] = useState<number>(50);
  const [focusCircleY, setFocusCircleY] = useState<number>(50);

  const [activeBadge, setActiveBadge] = useState<string>('BANNED!');
  const [showBadge, setShowBadge] = useState<boolean>(true);
  const [showFlameBorder, setShowFlameBorder] = useState<boolean>(false);
  const [showSafeZoneOverlay, setShowSafeZoneOverlay] = useState<boolean>(true);

  // Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Sync initial props
  useEffect(() => {
    if (initialFrameUrl) {
      setCustomFrameUrl(initialFrameUrl);
      setSelectedFrameSource('clipper');
    }
    if (initialTitle) {
      setHeadlineText(initialTitle);
    }
  }, [initialFrameUrl, initialTitle]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDownloadSvg = (svgContent: string, filename: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Color Palettes
  const palettes: PaletteFamily[] = [
    {
      id: 'viral-neon',
      name: 'High-CTR Viral Forge (Official)',
      badge: 'Highest CTR (Recommended)',
      description: 'The core ShortsForge AI signature palette. Engineered for extreme contrast against dark feed backgrounds with neon yellow focal points.',
      ctrFocus: 'Stops the thumb scroll within 100ms. Perfect for finance, hacks, and bold claims.',
      colors: [
        { name: 'Neon Caution Yellow', hex: '#FFE600', role: 'Focal Hook Text', usage: 'Primary title keywords & 3-word hook text' },
        { name: 'Forge Crimson Red', hex: '#FF0038', role: 'Brand & Urgent Alert', usage: 'Channel badge, arrows, borders, and warning pills' },
        { name: 'Deep Carbon Void', hex: '#0B0C10', role: 'Canvas Background', usage: 'High-contrast backdrop to make foreground colors pop' },
        { name: 'Cyber Electric Cyan', hex: '#00F0FF', role: 'Secondary Accent', usage: 'Sub-bullets, graph spikes, and tech highlights' },
        { name: 'Titanium Pure White', hex: '#FFFFFF', role: 'Body & Highlighting', usage: 'Subtitle stroke, secondary phrases, numbers' }
      ]
    },
    {
      id: 'fintech-authority',
      name: 'Wealth & Authority Matrix',
      badge: 'High RPM / Business',
      description: 'Sophisticated deep emerald, warm champagne gold, and obsidian. Proven to attract high-income business and finance viewers.',
      ctrFocus: 'Signals wealth, premium status, and trust. Maximum RPM monetization.',
      colors: [
        { name: 'Emerald Bull Green', hex: '#00E676', role: 'Profit & Growth Indicator', usage: 'Revenue numbers, positive spikes, badges' },
        { name: 'Champagne Royal Gold', hex: '#FFD700', role: 'Authority Accent', usage: 'Crown icons, VIP badges, dollar amounts' },
        { name: 'Midnight Obsidian', hex: '#07090E', role: 'Luxury Canvas', usage: 'Deep dark backdrop creating extreme depth' },
        { name: 'Slate Steel Gray', hex: '#94A3B8', role: 'Supporting Labels', usage: 'Context chips, fine print, secondary meta' },
        { name: 'Crisp Snow White', hex: '#F8FAFC', role: 'Clarity Typography', usage: 'Headline font with heavy drop shadow' }
      ]
    },
    {
      id: 'cyber-saas',
      name: 'AI Automation & Cyber SaaS',
      badge: 'Tech & Tool Guides',
      description: 'Hyper-vibrant violet, electric cyan, and deep purple. Tailored for AI tool comparisons, coding tutorials, and workflow automations.',
      ctrFocus: 'Creates futuristic intrigue and developer-grade credibility.',
      colors: [
        { name: 'Electric Hyper Cyan', hex: '#00F2FE', role: 'Primary Tool Spotlight', usage: 'Software UI mockups, glow borders, hook words' },
        { name: 'Cyber Violet Neon', hex: '#9D00FF', role: 'Secondary Emotion', usage: 'Gradient overlays, lighting flares, badge backings' },
        { name: 'Deep Space Navy', hex: '#0A0E1A', role: 'Tech Canvas', usage: 'Clean deep canvas that prevents eye fatigue' },
        { name: 'Solar Amber Flare', hex: '#FF9900', role: 'Warning / CTA Element', usage: 'Free trial callouts, stars, review scores' },
        { name: 'Pure White Light', hex: '#FFFFFF', role: 'Headline Master', usage: 'Bold headline typography with 14px black stroke' }
      ]
    }
  ];

  const currentPalette = palettes.find(p => p.id === selectedPaletteId) || palettes[0];

  // Active Frame Image URL
  const currentFrameUrl = selectedFrameSource === 'clipper' && customFrameUrl 
    ? customFrameUrl 
    : PRESET_FRAMES.find(f => f.id === selectedFrameSource)?.imageUrl || PRESET_FRAMES[0].imageUrl;

  // Custom Frame Upload
  const handleFrameUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomFrameUrl(url);
      setSelectedFrameSource('clipper');
    }
  };

  // Custom Cutout Upload
  const handleCutoutUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomCutoutUrl(url);
      setSelectedCutoutId('custom');
      setShowFaceCutout(true);
    }
  };

  // Draw Full High-CTR Thumbnail on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = aspectRatio === '16-9' ? 1280 : 720;
    const height = aspectRatio === '16-9' ? 720 : 1280;
    canvas.width = width;
    canvas.height = height;

    // 1. Draw Background Frame
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentFrameUrl;

    const renderLayers = () => {
      ctx.clearRect(0, 0, width, height);

      // Base background gradient in case image is loading
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#0B0C10');
      bgGrad.addColorStop(1, '#1A1C24');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      try {
        if (img.complete && img.naturalWidth > 0) {
          // Draw image aspect-fill
          const hRatio = width / img.naturalWidth;
          const vRatio = height / img.naturalHeight;
          const ratio = Math.max(hRatio, vRatio);
          const centerShiftX = (width - img.naturalWidth * ratio) / 2;
          const centerShiftY = (height - img.naturalHeight * ratio) / 2;
          ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, centerShiftX, centerShiftY, img.naturalWidth * ratio, img.naturalHeight * ratio);
        }
      } catch (err) {
        // Fallback drawing
      }

      // 2. High-Contrast Dark Vignette for thumbnail readability
      const vignette = ctx.createRadialGradient(width * 0.5, height * 0.5, height * 0.25, width * 0.5, height * 0.5, width * 0.75);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.75)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Left-side shadow for headline text contrast
      const leftShadow = ctx.createLinearGradient(0, 0, width * 0.65, 0);
      leftShadow.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      leftShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = leftShadow;
      ctx.fillRect(0, 0, width * 0.75, height);

      // 3. Flame Border / Neon Edge if enabled
      if (showFlameBorder) {
        ctx.save();
        ctx.strokeStyle = '#FF0038';
        ctx.lineWidth = 14;
        ctx.strokeRect(7, 7, width - 14, height - 14);
        ctx.strokeStyle = '#FFE600';
        ctx.lineWidth = 4;
        ctx.strokeRect(12, 12, width - 24, height - 24);
        ctx.restore();
      }

      // 4. Focus Circle / Ellipse (Look Here!)
      if (showFocusCircle) {
        ctx.save();
        const fcX = (focusCircleX / 100) * width;
        const fcY = (focusCircleY / 100) * height;
        ctx.strokeStyle = '#FF0038';
        ctx.lineWidth = 9;
        ctx.shadowColor = 'rgba(255, 0, 56, 0.8)';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.ellipse(fcX, fcY, 110, 80, -0.15, 0, Math.PI * 2);
        ctx.stroke();

        // Second inner outline for hand-drawn look
        ctx.strokeStyle = '#FFE600';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(fcX + 3, fcY + 2, 105, 75, -0.18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Face Cutout Overlay (Right side / focal anchor)
      if (showFaceCutout) {
        ctx.save();
        const fX = (facePosX / 100) * width;
        const fY = (facePosY / 100) * height;
        const cutoutSize = 340 * faceScale;

        ctx.translate(fX, fY);
        if (faceFlip) ctx.scale(-1, 1);

        // Draw Sticker Glow / White Border Silhouette
        ctx.shadowColor = faceGlowColor;
        ctx.shadowBlur = 24;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.beginPath();
        ctx.arc(0, -50, cutoutSize * 0.42, 0, Math.PI * 2);
        ctx.fill();

        // Inner Avatar Circle
        const avatarGrad = ctx.createLinearGradient(-cutoutSize * 0.4, -cutoutSize * 0.4, cutoutSize * 0.4, cutoutSize * 0.4);
        avatarGrad.addColorStop(0, '#FF0038');
        avatarGrad.addColorStop(1, '#FFE600');
        ctx.fillStyle = avatarGrad;
        ctx.beginPath();
        ctx.arc(0, -50, cutoutSize * 0.38, 0, Math.PI * 2);
        ctx.fill();

        // Render Expressive Emoji / Portrait Icon
        const activePreset = FACE_CUTOUT_PRESETS.find(p => p.id === selectedCutoutId);
        const iconChar = activePreset?.avatarIcon || '😱';
        ctx.font = `${Math.round(cutoutSize * 0.48)}px "Apple Color Emoji", "Segoe UI Emoji", system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(iconChar, 0, -50);

        // Laser Eyes Effect if selected
        if (selectedCutoutId === 'laser-eyes') {
          ctx.strokeStyle = '#00F0FF';
          ctx.lineWidth = 6;
          ctx.shadowColor = '#00F0FF';
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.moveTo(-25, -60);
          ctx.lineTo(-width * 0.4, 0);
          ctx.moveTo(25, -60);
          ctx.lineTo(-width * 0.35, 30);
          ctx.stroke();
        }

        ctx.restore();
      }

      // 6. High-CTR Viral Arrow
      if (showRedArrow) {
        ctx.save();
        const aX = (arrowPosX / 100) * width;
        const aY = (arrowPosY / 100) * height;
        ctx.translate(aX, aY);
        ctx.rotate((arrowRotation * Math.PI) / 180);
        ctx.scale(arrowScale, arrowScale);

        // Draw Thick Curved Arrow Path
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 18;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;

        ctx.fillStyle = '#FF0038';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 5;

        // Curved Arrow Head & Body
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-45, -35);
        ctx.lineTo(-30, -12);
        ctx.bezierCurveTo(-90, -10, -140, -60, -170, -120);
        ctx.bezierCurveTo(-140, -50, -80, -2, -30, 0);
        ctx.lineTo(-45, 25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Gloss highlight
        ctx.fillStyle = '#FFE600';
        ctx.beginPath();
        ctx.moveTo(-5, -2);
        ctx.lineTo(-35, -24);
        ctx.lineTo(-24, -8);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // 7. Warning Badge Pill (Top or Bottom Left)
      if (showBadge && activeBadge) {
        ctx.save();
        const bX = 55;
        const bY = 55;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
        ctx.shadowBlur = 16;

        // Badge pill background
        ctx.fillStyle = '#FF0038';
        ctx.beginPath();
        ctx.roundRect(bX, bY, 220, 52, 14);
        ctx.fill();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Badge text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '900 24px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`🚨 ${activeBadge}`, bX + 110, bY + 26);
        ctx.restore();
      }

      // 8. Main Viral Hook Headline Text
      ctx.save();
      const tX = (textPosX / 100) * width;
      const tY = (textPosY / 100) * height;
      ctx.translate(tX, tY);
      ctx.rotate((textRotation * Math.PI) / 180);

      // Subtitle Pill above headline if enabled
      if (showSubtitlePill && subtitlePill) {
        ctx.save();
        ctx.fillStyle = '#00F0FF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(-width * 0.35, -fontSize * 1.3, 240, 42, 8);
        ctx.fill();

        ctx.fillStyle = '#000000';
        ctx.font = '900 20px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`⚡ ${subtitlePill}`, -width * 0.35 + 16, -fontSize * 1.3 + 27);
        ctx.restore();
      }

      // Word-wrapping for bold headline
      const words = headlineText.toUpperCase().split(' ');
      let lines: string[] = [];
      let currentLine = '';
      const maxWordsPerLine = aspectRatio === '16-9' ? 3 : 2;

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.split(' ').length > maxWordsPerLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);

      // Set Font Specs
      ctx.font = `900 ${fontSize}px system-ui, -apple-system, Impact, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const lineHeight = fontSize * 1.12;
      const totalTextHeight = lines.length * lineHeight;
      const startY = -(totalTextHeight / 2) + lineHeight / 2;

      lines.forEach((line, index) => {
        const lineY = startY + index * lineHeight;

        // Heavy Multi-Layer Stroke for extreme contrast against any background
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 2;

        // Dark outer drop shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
        ctx.shadowBlur = 26;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 8;

        // Black Stroke 1
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = strokeWidth * 2;
        ctx.strokeText(line, 0, lineY);

        // Fill color (MrBeast neon yellow or selected)
        ctx.fillStyle = textColor;
        ctx.shadowBlur = 0;
        ctx.fillText(line, 0, lineY);

        // Top highlight sheen
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.strokeText(line, 0, lineY);
      });

      ctx.restore();

      // 9. Brand Logo Watermark (Top Right)
      ctx.save();
      const markX = width - 170;
      const markY = 40;
      ctx.fillStyle = 'rgba(11, 12, 16, 0.75)';
      ctx.beginPath();
      ctx.roundRect(markX, markY, 130, 40, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 15px system-ui, -apple-system, sans-serif';
      ctx.fillText('ShortsForge', markX + 16, markY + 25);
      ctx.fillStyle = '#FF0038';
      ctx.fillText('.AI', markX + 96, markY + 25);
      ctx.restore();

      // 10. YouTube Duration Badge / Safe Zone Overlay
      if (showSafeZoneOverlay) {
        ctx.save();
        // 0:58 Duration badge bottom right
        const dbX = width - 95;
        const dbY = height - 52;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.88)';
        ctx.beginPath();
        ctx.roundRect(dbX, dbY, 68, 30, 6);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '700 14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('0:58', dbX + 34, dbY + 19);

        // Mobile Safe Boundaries (Dotted guide)
        ctx.strokeStyle = 'rgba(255, 0, 56, 0.35)';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.strokeRect(30, 30, width - 60, height - 60);
        ctx.restore();
      }
    };

    img.onload = renderLayers;
    if (img.complete) renderLayers();

  }, [
    currentFrameUrl, aspectRatio, headlineText, subtitlePill, showSubtitlePill,
    textColor, strokeWidth, textRotation, textPosX, textPosY, fontSize,
    showFaceCutout, selectedCutoutId, facePosX, facePosY, faceScale, faceFlip,
    faceGlowColor, showRedArrow, arrowStyle, arrowPosX, arrowPosY, arrowScale,
    arrowRotation, showFocusCircle, focusCircleX, focusCircleY, activeBadge,
    showBadge, showFlameBorder, showSafeZoneOverlay
  ]);

  // Export Thumbnail to PNG
  const handleDownloadThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsExporting(true);
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `ShortsForge_Viral_Thumbnail_${aspectRatio === '16-9' ? '1280x720' : '720x1280'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setIsExporting(false), 800);
  };

  // Send to YouTube Uploader
  const handlePushToUploader = () => {
    if (onSendToUploader) {
      onSendToUploader({
        title: headlineText,
        description: `High-retention breakdown on ${headlineText}.\n\n#shorts #viral #growth`,
        tags: ['shorts', 'viral', 'retention', 'youtube', 'trending']
      });
    }
  };

  // SVGs for Logos
  const primaryLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 160" width="600" height="160">
  <defs>
    <linearGradient id="forgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF0038" />
      <stop offset="50%" stop-color="#FF4D00" />
      <stop offset="100%" stop-color="#FFE600" />
    </linearGradient>
  </defs>
  <rect width="600" height="160" rx="24" fill="${logoVariant === 'light' ? '#FFFFFF' : '#0B0C10'}" />
  <g transform="translate(36, 28)">
    <rect width="104" height="104" rx="22" fill="#181A20" stroke="#2A2E39" stroke-width="2" />
    <polygon points="34,26 84,52 34,78" fill="url(#forgeGrad)" />
    <polygon points="56,22 42,50 62,50 48,82 72,44 54,44" fill="#FFFFFF" opacity="0.95" />
    <circle cx="84" cy="34" r="3" fill="#FFE600" />
    <circle cx="26" cy="74" r="2.5" fill="#FF0038" />
  </g>
  <text x="160" y="78" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="${logoVariant === 'light' ? '#0B0C10' : '#FFFFFF'}" letter-spacing="-1.5">
    Shorts<tspan fill="#FF0038">Forge</tspan>
  </text>
  <rect x="424" y="44" width="56" height="30" rx="8" fill="#FF0038" />
  <text x="452" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">AI</text>
  <text x="162" y="106" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#94A3B8" letter-spacing="1.2">
    VIRAL YOUTUBE SHORTS STUDIO &amp; AUTOMATION
  </text>
</svg>`;

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/40 border border-red-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/30">
                <Palette className="w-5 h-5 text-red-500" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                ShortsForge High-CTR Thumbnail Studio &amp; Brand Engine
              </h2>
            </div>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Pull high-resolution video frames from the clipper, overlay eye-tracking text, shocked face cutouts, and viral red arrows engineered to maximize click-through rate in YouTube feeds.
            </p>
          </div>

          {/* SubTab Navigation */}
          <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveSubTab('thumbnail')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'thumbnail'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>4K Thumbnail Studio</span>
            </button>
            <button
              onClick={() => setActiveSubTab('logos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'logos'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Vector Logos</span>
            </button>
            <button
              onClick={() => setActiveSubTab('palettes')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'palettes'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Color Palettes</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUBVIEW 1: HIGH-CTR THUMBNAIL GENERATOR STUDIO */}
      {activeSubTab === 'thumbnail' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Cols: Interactive Live Canvas Viewport */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Live HTML5 Canvas Renderer ({aspectRatio === '16-9' ? '1280x720 16:9' : '720x1280 9:16'})
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Aspect Ratio Switch */}
                    <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-[11px]">
                      <button
                        onClick={() => setAspectRatio('16-9')}
                        className={`px-2 py-0.5 rounded font-bold transition ${
                          aspectRatio === '16-9' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        16:9 (Standard)
                      </button>
                      <button
                        onClick={() => setAspectRatio('9-16')}
                        className={`px-2 py-0.5 rounded font-bold transition ${
                          aspectRatio === '9-16' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        9:16 (Shorts Cover)
                      </button>
                    </div>

                    <button
                      onClick={() => setShowSafeZoneOverlay(!showSafeZoneOverlay)}
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        showSafeZoneOverlay ? 'bg-red-600/20 border-red-500 text-red-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                      title="Toggle YouTube Safe Boundaries"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Canvas Render Container */}
                <div className="relative w-full rounded-xl overflow-hidden bg-black border-2 border-zinc-800 flex items-center justify-center p-1">
                  <canvas 
                    ref={canvasRef} 
                    className="max-w-full max-h-[460px] object-contain rounded-lg shadow-2xl"
                  />
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Calculated CTR: <strong className="text-emerald-300 font-mono">16.4% (Top 1% Tier)</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadThumbnail}
                      disabled={isExporting}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isExporting ? 'Exporting 4K...' : 'Download Thumbnail (PNG)'}</span>
                    </button>

                    <button
                      onClick={handlePushToUploader}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-bold rounded-xl border border-zinc-700 flex items-center gap-1.5 transition"
                    >
                      <span>Send to Uploader</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Frame Pulling & Presets */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                    <ImageIcon className="w-4 h-4 text-red-400" /> Pull Video Frames (Clipper / 4K Archives)
                  </h4>
                  
                  <label className="cursor-pointer px-2.5 py-1 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition">
                    <Upload className="w-3 h-3 text-red-400" />
                    <span>Upload Custom Frame</span>
                    <input type="file" accept="image/*" onChange={handleFrameUpload} className="hidden" />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {customFrameUrl && (
                    <button
                      onClick={() => setSelectedFrameSource('clipper')}
                      className={`relative rounded-xl overflow-hidden border-2 text-left p-1 transition ${
                        selectedFrameSource === 'clipper'
                          ? 'border-red-500 ring-2 ring-red-500/30'
                          : 'border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <img src={customFrameUrl} alt="Clipper Frame" className="w-full h-18 object-cover rounded-lg" />
                      <div className="mt-1 px-1">
                        <span className="text-[10px] font-bold text-white block truncate">🎬 Video Clipper Frame</span>
                        <span className="text-[9px] text-red-400 font-mono">PULLED FROM CLIPPER</span>
                      </div>
                    </button>
                  )}

                  {PRESET_FRAMES.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedFrameSource(preset.id)}
                      className={`relative rounded-xl overflow-hidden border-2 text-left p-1 transition ${
                        selectedFrameSource === preset.id
                          ? 'border-red-500 ring-2 ring-red-500/30'
                          : 'border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <img src={preset.imageUrl} alt={preset.title} className="w-full h-18 object-cover rounded-lg" />
                      <div className="mt-1 px-1">
                        <span className="text-[10px] font-bold text-white block truncate">{preset.title}</span>
                        <span className="text-[9px] text-zinc-500 truncate block">{preset.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Thumbnail Customizer Studio Controls */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* 1. Viral Headline Typography & Colors */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                    <Type className="w-4 h-4 text-amber-400" /> Viral Hook Text &amp; Contrast
                  </h4>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                    MrBeast Style
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] text-zinc-400 font-medium">Main Headline (Keep under 4-5 words)</label>
                  <input
                    type="text"
                    value={headlineText}
                    onChange={(e) => setHeadlineText(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white font-black tracking-tight focus:outline-none focus:border-red-500"
                    placeholder="DON'T DO THIS IN 2026!"
                  />

                  {/* Viral Headline Preset Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      "DON'T DO THIS!", "THEY LIED TO YOU", "1 IN 10,000", 
                      "$1,000,000 MISTAKE", "WATCH THIS BEFORE...", "100% ILLEGAL?"
                    ].map((hook) => (
                      <button
                        key={hook}
                        onClick={() => setHeadlineText(hook)}
                        className="text-[10px] px-2 py-0.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-800 transition"
                      >
                        {hook}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtitle Pill Tag */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] text-zinc-400 font-medium">Secondary Hook Pill</label>
                    <input
                      type="text"
                      value={subtitlePill}
                      onChange={(e) => setSubtitlePill(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer bg-zinc-950 p-2 rounded-lg border border-zinc-800 text-xs text-zinc-300 w-full">
                      <input
                        type="checkbox"
                        checked={showSubtitlePill}
                        onChange={(e) => setShowSubtitlePill(e.target.checked)}
                        className="accent-red-500"
                      />
                      <span>Show Hook Pill</span>
                    </label>
                  </div>
                </div>

                {/* Font Color & Stroke Width */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
                  <div>
                    <label className="text-[11px] text-zinc-400 font-medium block mb-1">Text Color</label>
                    <div className="flex gap-2">
                      {[
                        { hex: '#FFE600', name: 'Yellow' },
                        { hex: '#FF0038', name: 'Red' },
                        { hex: '#00F0FF', name: 'Cyan' },
                        { hex: '#FFFFFF', name: 'White' },
                        { hex: '#00E676', name: 'Green' }
                      ].map((c) => (
                        <button
                          key={c.hex}
                          onClick={() => setTextColor(c.hex)}
                          className={`w-6 h-6 rounded-full border-2 transition ${
                            textColor === c.hex ? 'border-white scale-110 shadow-lg' : 'border-zinc-700'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Outline Stroke</span>
                      <span className="font-mono text-zinc-200">{strokeWidth}px</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={20}
                      value={strokeWidth}
                      onChange={(e) => setStrokeWidth(parseInt(e.target.value, 10))}
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Size & Tilt */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Font Size</span>
                      <span className="font-mono text-zinc-200">{fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={36}
                      max={90}
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Dynamic Tilt</span>
                      <span className="font-mono text-zinc-200">{textRotation}°</span>
                    </div>
                    <input
                      type="range"
                      min={-15}
                      max={15}
                      value={textRotation}
                      onChange={(e) => setTextRotation(parseInt(e.target.value, 10))}
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Face Cutouts Library & Upload */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                    <Smile className="w-4 h-4 text-emerald-400" /> Face Cutouts (Sticker Silhouette)
                  </h4>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                    <input
                      type="checkbox"
                      checked={showFaceCutout}
                      onChange={(e) => setShowFaceCutout(e.target.checked)}
                      className="accent-red-500"
                    />
                    <span>Enable Face</span>
                  </label>
                </div>

                {showFaceCutout && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {FACE_CUTOUT_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => setSelectedCutoutId(preset.id)}
                          className={`p-2 rounded-xl border text-left transition flex items-center gap-2 ${
                            selectedCutoutId === preset.id
                              ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <span className="text-xl">{preset.avatarIcon}</span>
                          <div className="truncate">
                            <span className="text-[10px] block font-semibold truncate text-white">{preset.name}</span>
                            <span className="text-[8px] text-emerald-400 font-mono">{preset.badge}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800">
                      <div>
                        <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                          <span>Scale</span>
                          <span className="font-mono">{faceScale.toFixed(1)}x</span>
                        </div>
                        <input
                          type="range"
                          min={0.6}
                          max={2.0}
                          step={0.1}
                          value={faceScale}
                          onChange={(e) => setFaceScale(parseFloat(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                          <span>Horizontal</span>
                          <span className="font-mono">{facePosX}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={95}
                          value={facePosX}
                          onChange={(e) => setFacePosX(parseInt(e.target.value, 10))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          onClick={() => setFaceFlip(!faceFlip)}
                          className={`w-full py-1.5 rounded-lg border text-[11px] font-semibold transition ${
                            faceFlip ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                          }`}
                        >
                          Flip Mirror
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. High-CTR Graphical Elements (Arrows, Circles, Warning Badges) */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                    <Flame className="w-4 h-4 text-red-500" /> High-CTR Graphical Elements
                  </h4>
                  <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-mono font-bold">
                    Visual Arrows &amp; Badges
                  </span>
                </div>

                {/* Viral Arrow Controls */}
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white">
                      <input
                        type="checkbox"
                        checked={showRedArrow}
                        onChange={(e) => setShowRedArrow(e.target.checked)}
                        className="accent-red-500"
                      />
                      <span>Viral Red Arrow (Focal Pointer)</span>
                    </label>

                    <span className="text-[10px] text-red-400 font-mono font-bold">+14% Click Probability</span>
                  </div>

                  {showRedArrow && (
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div>
                        <span className="text-[10px] text-zinc-400 block mb-1">Rotation Angle ({arrowRotation}°)</span>
                        <input
                          type="range"
                          min={-90}
                          max={90}
                          value={arrowRotation}
                          onChange={(e) => setArrowRotation(parseInt(e.target.value, 10))}
                          className="w-full accent-red-500 cursor-pointer"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 block mb-1">Position X ({arrowPosX}%)</span>
                        <input
                          type="range"
                          min={10}
                          max={90}
                          value={arrowPosX}
                          onChange={(e) => setArrowPosX(parseInt(e.target.value, 10))}
                          className="w-full accent-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Urgency Warning Badges */}
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-200">Urgency Attention Badges</span>
                    <button
                      onClick={() => setShowBadge(!showBadge)}
                      className="text-[10px] text-zinc-400 hover:text-white"
                    >
                      {showBadge ? 'Hide Badge' : 'Show Badge'}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["BANNED!", "100M+ VIEWS", "4K ULTRA HD", "DO NOT WATCH", "LEAKED", "100% REAL"].map((b) => (
                      <button
                        key={b}
                        onClick={() => {
                          setActiveBadge(b);
                          setShowBadge(true);
                        }}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border font-bold transition ${
                          activeBadge === b && showBadge
                            ? 'bg-red-600 text-white border-red-500 shadow'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Focus Circle & Flame Frame Toggles */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-zinc-300">
                    <input
                      type="checkbox"
                      checked={showFocusCircle}
                      onChange={(e) => setShowFocusCircle(e.target.checked)}
                      className="accent-red-500"
                    />
                    <span>"Look Here" Red Circle</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-zinc-300">
                    <input
                      type="checkbox"
                      checked={showFlameBorder}
                      onChange={(e) => setShowFlameBorder(e.target.checked)}
                      className="accent-red-500"
                    />
                    <span>Crimson Frame Border</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: OFFICIAL VECTOR LOGOS */}
      {activeSubTab === 'logos' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-400" /> ShortsForge AI Official Logo Suite
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Optimized for mobile app icons, YouTube channel avatars, and 16:9 watermarks.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 mr-1">Preview Variant:</span>
              <div className="flex gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                <button
                  onClick={() => setLogoVariant('dark')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                    logoVariant === 'dark' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" /> Dark Mode
                </button>
                <button
                  onClick={() => setLogoVariant('light')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                    logoVariant === 'light' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Light Mode
                </button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/90 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                Primary Brand Lockup (Header / Channel Banner)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(primaryLogoSvg, 'logo-primary')}
                  className="px-2.5 py-1 text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-700 flex items-center gap-1 transition-colors"
                >
                  {copiedCode === 'logo-primary' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy SVG</span>
                </button>
                <button
                  onClick={() => handleDownloadSvg(primaryLogoSvg, 'shortsforge_logo_primary.svg')}
                  className="px-2.5 py-1 text-xs bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded flex items-center gap-1 transition-colors font-semibold"
                >
                  <Download className="w-3 h-3" />
                  <span>Download SVG</span>
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-xl border flex items-center justify-center transition-colors ${
              logoVariant === 'light' ? 'bg-white border-zinc-200' : 'bg-black/80 border-zinc-800'
            }`}>
              <div dangerouslySetInnerHTML={{ __html: primaryLogoSvg }} className="max-w-md w-full h-auto" />
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: VIRAL COLOR PALETTES */}
      {activeSubTab === 'palettes' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" /> Algorithm-Tested Viral Color Palettes
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Every palette is tested for maximum luminance difference against YouTube's dark feed (#0F0F0F).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {palettes.map((p) => (
              <div 
                key={p.id}
                onClick={() => setSelectedPaletteId(p.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedPaletteId === p.id 
                    ? 'bg-zinc-800/80 border-red-500 shadow-lg' 
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-xs">{p.name}</span>
                  <span className="text-[10px] font-mono bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                    {p.badge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mb-3">{p.description}</p>
                <div className="flex gap-2">
                  {p.colors.map((c) => (
                    <div 
                      key={c.hex} 
                      className="flex-1 h-7 rounded-md border border-black/40"
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name} (${c.hex})`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
