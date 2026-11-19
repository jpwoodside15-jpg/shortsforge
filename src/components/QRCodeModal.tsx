import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  X, Download, Copy, Check, QrCode as QrIcon, 
  ExternalLink, Sparkles, ShieldCheck, Tag
} from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  promoCode?: string;
  discountPercent?: number | string;
  url: string;
  brand?: string;
  fairTradeCertified?: boolean;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  promoCode,
  discountPercent,
  url,
  brand,
  fairTradeCertified
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        width: 360,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'H'
      })
        .then((dataUri) => {
          setQrDataUrl(dataUri);
        })
        .catch((err) => {
          console.error('Failed to generate QR Code:', err);
        });
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    if (!promoCode) return;
    navigator.clipboard.writeText(promoCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `ShortsForge-QR-${promoCode || 'deal'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-zinc-950 border border-pink-900/40 rounded-3xl p-6 shadow-2xl shadow-pink-950/40 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 pr-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/30 text-xs font-mono font-bold">
            <QrIcon className="w-3.5 h-3.5 text-pink-400" />
            Interactive Verified QR Voucher
          </div>
          <h3 className="text-lg font-black text-white tracking-tight mt-1">
            {title}
          </h3>
          {brand && (
            <p className="text-xs text-zinc-400 font-medium">
              Official Partner: <span className="text-zinc-200">{brand}</span>
            </p>
          )}
        </div>

        {/* QR Code Presentation Frame */}
        <div className="flex flex-col items-center justify-center p-5 bg-gradient-to-b from-white to-zinc-100 rounded-2xl shadow-inner border border-zinc-200 relative group">
          {qrDataUrl ? (
            <img 
              src={qrDataUrl} 
              alt="Scannable QR Code Voucher" 
              className="w-56 h-56 rounded-lg object-contain"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-zinc-400 text-xs font-mono">
              Generating High-Res QR...
            </div>
          )}

          <div className="text-center mt-3 pt-2 border-t border-zinc-300 w-full">
            <div className="text-[11px] font-bold text-zinc-800 tracking-wide uppercase font-mono">
              📱 Point camera to scan &amp; redeem
            </div>
            {discountPercent && (
              <div className="text-xs font-extrabold text-pink-600 mt-0.5">
                Instant {discountPercent}% Off Applied at Checkout
              </div>
            )}
          </div>
        </div>

        {/* Promo Code & Details */}
        {promoCode && (
          <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Exclusive Affiliate Code
              </span>
              <span className="font-mono font-black text-pink-400 text-base tracking-wider">
                {promoCode}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-md"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        )}

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={handleDownloadQR}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Download className="w-3.5 h-3.5 text-pink-400" />
            Download PNG
          </button>

          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-pink-950/40"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {copiedLink ? 'Copied Link!' : 'Copy Deal Link'}
          </button>
        </div>

        {/* Video Editor Note for Creators */}
        <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-zinc-200">Shorts Creator Tip:</strong> Download this QR code and burn it into the top-right corner of your vertical 9:16 video during the final 5 seconds to drive instant mobile conversions.
          </span>
        </div>

      </div>
    </div>
  );
};
