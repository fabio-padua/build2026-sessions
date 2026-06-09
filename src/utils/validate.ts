import type { Session } from '../types/session';

function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

function parseDisplayValue(val: unknown): { displayValue: string; logicalValue: string } | null {
  if (!isObject(val)) return null;
  const dv = typeof val.displayValue === 'string' ? val.displayValue : '';
  const lv = typeof val.logicalValue === 'string' ? val.logicalValue : '';
  return { displayValue: dv, logicalValue: lv };
}

function parseDisplayValueArray(val: unknown): { displayValue: string; logicalValue: string }[] {
  if (!Array.isArray(val)) return [];
  return val.map(parseDisplayValue).filter((v): v is NonNullable<typeof v> => v !== null);
}

function safeString(val: unknown, maxLen = 5000): string {
  if (typeof val !== 'string') return '';
  return val.slice(0, maxLen);
}

function safeNumber(val: unknown, fallback = 0): number {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
}

export function validateSession(raw: unknown): Session | null {
  if (!isObject(raw)) return null;

  const sessionId = safeString(raw.sessionId, 100);
  if (!sessionId) return null;

  const title = safeString(raw.title, 500);
  if (!title) return null;

  return {
    sessionId,
    sessionCode: safeString(raw.sessionCode, 50),
    title,
    sortTitle: safeString(raw.sortTitle, 500),
    description: safeString(raw.description, 5000),
    speakerNames: safeString(raw.speakerNames, 500),
    startDateTime: safeString(raw.startDateTime, 50),
    endDateTime: safeString(raw.endDateTime, 50),
    durationInMinutes: safeNumber(raw.durationInMinutes),
    sessionType: parseDisplayValue(raw.sessionType) || { displayValue: '', logicalValue: '' },
    sessionLevel: parseDisplayValueArray(raw.sessionLevel),
    deliveryTypes: parseDisplayValueArray(raw.deliveryTypes),
    tags: parseDisplayValueArray(raw.tags),
    location: parseDisplayValue(raw.location) || { displayValue: '', logicalValue: '' },
    onDemand: safeString(raw.onDemand, 500),
    hasOnDemand: raw.hasOnDemand === true,
    onDemandThumbnail: safeString(raw.onDemandThumbnail, 500),
    ogImage: safeString(raw.ogImage, 500),
    hasLiveStream: raw.hasLiveStream === true,
    heroSession: raw.heroSession === true,
    sortRank: safeNumber(raw.sortRank),
    partnerType: parseDisplayValueArray(raw.partnerType),
    industry: parseDisplayValueArray(raw.industry),
    businessFocus: parseDisplayValueArray(raw.businessFocus),
    product: parseDisplayValueArray(raw.product),
    solutionArea: parseDisplayValueArray(raw.solutionArea),
    topic: parseDisplayValueArray(raw.topic),
  };
}

export function validateSessions(raw: unknown): Session[] {
  if (!Array.isArray(raw)) return [];
  const MAX_SESSIONS = 5000;
  const limited = raw.slice(0, MAX_SESSIONS);
  return limited.map(validateSession).filter((s): s is Session => s !== null);
}
