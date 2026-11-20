export const AWIN_AFFILIATE_ID = '2863987';

export interface AwinMerchantMapping {
  id: string;
  merchantName: string;
  awinmid: string;
  nicheKeywords: string[];
  defaultLandingUrl: string;
  ctaLabel: string;
}

export const AWIN_MERCHANT_MAPPINGS: AwinMerchantMapping[] = [
  {
    id: 'tech_ai',
    merchantName: 'NordVPN',
    awinmid: '15132',
    nicheKeywords: ['tech', 'ai', 'coding', 'software', 'saas', 'developer', 'cyber', 'cloud'],
    defaultLandingUrl: 'https://nordvpn.com/',
    ctaLabel: 'Recommended Tech Stack'
  },
  {
    id: 'machinery_craft',
    merchantName: 'Toolstation',
    awinmid: '10146',
    nicheKeywords: ['machinery', 'craftsman', 'tool', 'asmr', 'workshop', 'hardware', 'engineering', 'drill'],
    defaultLandingUrl: 'https://www.toolstation.com/',
    ctaLabel: 'Featured Workshop Gear'
  },
  {
    id: 'creator_finance',
    merchantName: 'Hostinger',
    awinmid: '20545',
    nicheKeywords: ['creator', 'finance', 'investing', 'growth', 'money', 'business', 'youtube', 'marketing'],
    defaultLandingUrl: 'https://www.hostinger.com/',
    ctaLabel: 'Creator Growth Toolkit'
  },
  {
    id: 'aerial_travel',
    merchantName: 'Viator',
    awinmid: '11018',
    nicheKeywords: ['travel', 'aerial', 'wonder', 'scenery', 'nature', 'fpv', 'geography', 'expedition', 'aurora', 'canyon'],
    defaultLandingUrl: 'https://www.viator.com/',
    ctaLabel: 'Explore This Destination'
  },
  {
    id: 'beauty_health',
    merchantName: 'LOOKFANTASTIC',
    awinmid: '2082',
    nicheKeywords: ['beauty', 'skincare', 'health', 'wellness', 'fitness', 'cosmetic'],
    defaultLandingUrl: 'https://www.lookfantastic.com/',
    ctaLabel: 'Featured Skincare Pick'
  },
  {
    id: 'gaming_culture',
    merchantName: 'Fanatical',
    awinmid: '15351',
    nicheKeywords: ['gaming', 'game', 'pop culture', 'esports', 'pc'],
    defaultLandingUrl: 'https://www.fanatical.com/',
    ctaLabel: 'Featured Gaming Deal'
  }
];

/**
 * Resolves the mapped Awin merchant for a video's niche tag.
 * Returns null if the niche has no configured merchant mapping.
 */
export function resolveAwinMerchantForNiche(niche: string | undefined | null): AwinMerchantMapping | null {
  const normalized = (niche || '').trim().toLowerCase();
  if (!normalized) return null;

  // Prefer specific niche matches (e.g. Machinery before generic Tech)
  const prioritizedOrder = [
    'machinery_craft',
    'aerial_travel',
    'beauty_health',
    'gaming_culture',
    'creator_finance',
    'tech_ai'
  ];

  for (const id of prioritizedOrder) {
    const mapping = AWIN_MERCHANT_MAPPINGS.find((m) => m.id === id);
    if (!mapping) continue;
    if (mapping.nicheKeywords.some((kw) => normalized.includes(kw))) {
      return mapping;
    }
  }

  return null;
}

/**
 * Builds an official Awin tracking URL (awin1.com/cread.php) with awinmid and awinaffid=2863987.
 */
export function buildAwinAffiliateUrl(
  awinmid: string,
  destinationUrl?: string,
  awinaffid: string = AWIN_AFFILIATE_ID
): string {
  const params = new URLSearchParams({
    awinmid: awinmid.trim(),
    awinaffid: awinaffid.trim()
  });
  if (destinationUrl && destinationUrl.trim()) {
    params.set('ued', destinationUrl.trim());
  }
  return `https://www.awin1.com/cread.php?${params.toString()}`;
}

/**
 * Validates that a single URL string is a real awin1.com/cread.php URL
 * containing a numeric awinmid and awinaffid=2863987.
 */
export function isRealAwinUrl(urlCandidate: string): boolean {
  const cleaned = urlCandidate.trim().replace(/[),.;:!?"'>\]]+$/, '');
  if (!cleaned) return false;
  try {
    const parsed = new URL(cleaned);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    const host = parsed.hostname.toLowerCase();
    if (host !== 'awin1.com' && host !== 'www.awin1.com') return false;
    if (parsed.pathname !== '/cread.php') return false;

    const awinmid = parsed.searchParams.get('awinmid')?.trim() || '';
    const awinaffid = parsed.searchParams.get('awinaffid')?.trim() || '';
    if (!/^\d+$/.test(awinmid)) return false;
    if (awinaffid !== AWIN_AFFILIATE_ID) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Extracts the first real awin1.com/cread.php affiliate URL found in arbitrary metadata text.
 */
export function extractValidAwinUrl(text: string | undefined | null): string | null {
  if (!text) return null;
  const matches = text.match(/https?:\/\/[^\s"'<>]+/gi);
  if (!matches) return null;
  for (const raw of matches) {
    const cleaned = raw.replace(/[),.;:!?"'>\]]+$/, '');
    if (isRealAwinUrl(cleaned)) {
      return cleaned;
    }
  }
  return null;
}

/**
 * Strictly verifies that text contains a real awin1.com/cread.php affiliate URL
 * (not just arbitrary URLs or keywords like "affiliate" or "#ad").
 */
export function hasValidAwinAffiliateLink(text: string | undefined | null): boolean {
  return extractValidAwinUrl(text) !== null;
}

export function hasAdDisclosure(text: string | undefined | null): boolean {
  return /#ad\b/i.test(text || '');
}

export interface AwinMetadataEnrichmentResult {
  description: string;
  affiliateLink?: string;
  affiliateMerchant?: string;
  awinmid?: string;
  affiliateDisclosure: boolean;
  mapped: boolean;
}

/**
 * Metadata step helper: auto-inserts the mapped Awin affiliate link
 * (awin1.com/cread.php?awinmid=...&awinaffid=2863987) based on niche tag plus #ad disclosure.
 */
export function applyAwinAffiliateMetadata(input: {
  niche: string;
  description: string;
  affiliateDisclosure?: boolean;
}): AwinMetadataEnrichmentResult {
  const baseDescription = (input.description || '').trim();
  const existingValidUrl = extractValidAwinUrl(baseDescription);
  const merchant = resolveAwinMerchantForNiche(input.niche);

  if (existingValidUrl) {
    const nextDescription = hasAdDisclosure(baseDescription)
      ? baseDescription
      : `${baseDescription} #ad`;
    return {
      description: nextDescription,
      affiliateLink: existingValidUrl,
      affiliateMerchant: merchant?.merchantName,
      awinmid: merchant?.awinmid,
      affiliateDisclosure: true,
      mapped: true
    };
  }

  if (!merchant) {
    return {
      description: baseDescription,
      affiliateLink: undefined,
      affiliateMerchant: undefined,
      awinmid: undefined,
      affiliateDisclosure: Boolean(input.affiliateDisclosure),
      mapped: false
    };
  }

  const awinUrl = buildAwinAffiliateUrl(
    merchant.awinmid,
    merchant.defaultLandingUrl,
    AWIN_AFFILIATE_ID
  );
  const disclosureSuffix = hasAdDisclosure(baseDescription) ? '' : ' #ad';
  const affiliateLine = `${merchant.ctaLabel} (${merchant.merchantName}): ${awinUrl}${disclosureSuffix}`;
  const nextDescription = baseDescription
    ? `${baseDescription}\n\n${affiliateLine}`
    : affiliateLine;

  return {
    description: nextDescription,
    affiliateLink: awinUrl,
    affiliateMerchant: merchant.merchantName,
    awinmid: merchant.awinmid,
    affiliateDisclosure: true,
    mapped: true
  };
}
