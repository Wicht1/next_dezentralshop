import "server-only";

import { getDictionary, normalizeLocale, type Locale } from "@/lib/dictionaries";

export type StatusState = "online" | "warn" | "down" | "unknown";

export type StatusRow = {
  label: string;
  value: string;
};

export type StatusLink = {
  label: string;
  href: string;
};

export type StatusEvent = {
  title: string;
  when: string;
  location?: string;
  url?: string;
};

export type StatusEntry = {
  id: string;
  title: string;
  state: StatusState;
  stateLabel: string;
  source: string;
  rows?: StatusRow[];
  primaryValue?: string;
  events?: StatusEvent[];
  links?: StatusLink[];
  note?: string;
};

type StatusCopy = Awaited<ReturnType<typeof getDictionary>>["status"];

const ZURICH_TIME_ZONE = "Europe/Zurich";
const BITCOIN_STATUS_URL = "https://status.dezentralshop.ch/api/bitcoin.json";
const LIGHTNING_STATUS_URL = "https://status.dezentralshop.ch/api/lightning.json";
const DEFAULT_ICS_URL =
  "https://calendar.google.com/calendar/ical/29e4bad50baefd78643484bf57a241c04726603864bb29c98e43b5aba80547f5%40group.calendar.google.com/public/basic.ics";
const DEFAULT_CALENDAR_WEB_URL =
  "https://calendar.google.com/calendar/u/3?cid=MjllNGJhZDUwYmFlZmQ3ODY0MzQ4NGJmNTdhMjQxYzA0NzI2NjAzODY0YmIyOWM5OGU0M2I1YWJhODA1NDdmNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t";

function localeTag(locale: Locale) {
  return locale === "de" ? "de-CH" : locale === "fr" ? "fr-CH" : locale === "it" ? "it-CH" : "en-CH";
}

function stateLabel(copy: StatusCopy, state: StatusState) {
  return copy.badges[state];
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

function formatNumber(value: number, locale: Locale, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(localeTag(locale), options).format(value);
}

function formatDateTime(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: ZURICH_TIME_ZONE,
  }).format(date);
}

function formatMinutes(seconds: number, locale: Locale) {
  const minutes = seconds / 60;
  const value = minutes < 10 ? Math.round(minutes * 10) / 10 : Math.round(minutes);
  return `${formatNumber(value, locale, { maximumFractionDigits: minutes < 10 ? 1 : 0 })} min`;
}

async function fetchJson<T>(url: string, revalidate: number, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    next: { revalidate },
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function fetchText(url: string, revalidate: number, init?: RequestInit): Promise<string> {
  const response = await fetch(url, {
    ...init,
    next: { revalidate },
    headers: {
      Accept: "text/calendar,*/*;q=0.8",
      "User-Agent": "dezentralshop-status/1.0",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.text();
}

async function getBitcoinNetwork(locale: Locale, copy: StatusCopy): Promise<StatusEntry> {
  const base = {
    id: "bitcoin-network",
    title: copy.blocks.bitcoinNetwork.title,
    source: copy.sources.ownNode,
  };

  try {
    const data = await fetchJson<Record<string, unknown>>(BITCOIN_STATUS_URL, 30);
    const height = typeof data.height === "number" ? data.height : Number(data.height);
    const seconds =
      typeof data.seconds_since_block === "number"
        ? data.seconds_since_block
        : Number(data.seconds_since_block);

    if (data.ok !== true || !Number.isFinite(height) || height <= 0 || !Number.isFinite(seconds) || seconds < 0) {
      return {
        ...base,
        state: "unknown",
        stateLabel: stateLabel(copy, "unknown"),
        rows: [
          { label: copy.labels.blockHeight, value: copy.emptyValue },
          { label: copy.labels.sinceLastBlock, value: copy.emptyValue },
        ],
        note: copy.messages.invalidData,
      };
    }

    const minutes = seconds / 60;
    const state: StatusState = minutes <= 20 ? "online" : minutes <= 60 ? "warn" : "down";

    return {
      ...base,
      state,
      stateLabel: stateLabel(copy, state),
      rows: [
        { label: copy.labels.blockHeight, value: formatNumber(height, locale) },
        { label: copy.labels.sinceLastBlock, value: formatMinutes(seconds, locale) },
      ],
    };
  } catch (error) {
    return {
      ...base,
      state: "unknown",
      stateLabel: stateLabel(copy, "unknown"),
      rows: [
        { label: copy.labels.blockHeight, value: copy.emptyValue },
        { label: copy.labels.sinceLastBlock, value: copy.emptyValue },
      ],
      note: `${copy.messages.sourceUnavailable} (${errorMessage(error)})`,
    };
  }
}

async function getBitcoinPrice(locale: Locale, copy: StatusCopy): Promise<StatusEntry> {
  const base = {
    id: "bitcoin-price",
    title: copy.blocks.bitcoinPrice.title,
    source: copy.sources.btcpayRates,
  };

  const btcpayUrl = process.env.BTCPAY_URL?.replace(/\/+$/, "");
  const apiKey = process.env.BTCPAY_API_KEY;
  const storeId = process.env.BTCPAY_STORE_ID;

  if (!btcpayUrl || !apiKey || !storeId) {
    return {
      ...base,
      state: "unknown",
      stateLabel: stateLabel(copy, "unknown"),
      primaryValue: copy.emptyValue,
      rows: [{ label: "BTC/CHF", value: copy.emptyValue }],
      note: copy.messages.btcpayConfigMissing,
    };
  }

  try {
    const url = `${btcpayUrl}/api/v1/stores/${encodeURIComponent(storeId)}/rates?currencyPair=BTC_CHF`;
    const data = await fetchJson<unknown>(url, 600, {
      headers: { Authorization: `Token ${apiKey}` },
    });
    const firstRate = Array.isArray(data) ? data[0] : null;
    const rawRate =
      firstRate && typeof firstRate === "object" && "rate" in firstRate
        ? (firstRate as { rate?: unknown }).rate
        : null;
    const rate = typeof rawRate === "number" ? rawRate : Number(rawRate);

    if (!Number.isFinite(rate) || rate <= 0) {
      return {
        ...base,
        state: "unknown",
        stateLabel: stateLabel(copy, "unknown"),
        primaryValue: copy.emptyValue,
        rows: [{ label: "BTC/CHF", value: copy.emptyValue }],
        note: copy.messages.rateUnavailable,
      };
    }

    const formattedRate = formatNumber(rate, locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return {
      ...base,
      state: "online",
      stateLabel: stateLabel(copy, "online"),
      primaryValue: formattedRate,
      rows: [{ label: "BTC/CHF", value: formattedRate }],
    };
  } catch (error) {
    return {
      ...base,
      state: "unknown",
      stateLabel: stateLabel(copy, "unknown"),
      primaryValue: copy.emptyValue,
      rows: [{ label: "BTC/CHF", value: copy.emptyValue }],
      note: `${copy.messages.rateUnavailable} (${errorMessage(error)})`,
    };
  }
}

async function getLightningNode(locale: Locale, copy: StatusCopy): Promise<StatusEntry> {
  const base = {
    id: "lightning-node",
    title: copy.blocks.lightningNode.title,
    source: copy.sources.lightningApi,
  };

  try {
    const data = await fetchJson<Record<string, unknown>>(LIGHTNING_STATUS_URL, 60);

    if (data.ok !== true) {
      return {
        ...base,
        state: "warn",
        stateLabel: stateLabel(copy, "warn"),
        rows: [
          { label: copy.labels.node, value: copy.emptyValue },
          { label: copy.labels.channels, value: copy.emptyValue },
          { label: copy.labels.capacity, value: copy.emptyValue },
        ],
        note: typeof data.error === "string" ? data.error : copy.messages.lightningUnavailable,
      };
    }

    const alias = typeof data.alias === "string" && data.alias.trim() ? data.alias : "Dezentralshop";
    const pubkey = typeof data.pubkey === "string" ? data.pubkey : "";
    const channels = typeof data.channels === "number" ? data.channels : Number(data.channels);
    const capacitySats =
      typeof data.capacity_sats === "number" ? data.capacity_sats : Number(data.capacity_sats);

    return {
      ...base,
      state: "online",
      stateLabel: stateLabel(copy, "online"),
      rows: [
        { label: copy.labels.node, value: alias },
        {
          label: copy.labels.channels,
          value: Number.isFinite(channels) ? formatNumber(channels, locale) : copy.emptyValue,
        },
        {
          label: copy.labels.capacity,
          value: Number.isFinite(capacitySats)
            ? `${formatNumber(capacitySats, locale)} sats`
            : copy.emptyValue,
        },
      ],
      links: pubkey ? [{ label: copy.links.openAmboss, href: `https://amboss.space/node/${pubkey}` }] : undefined,
    };
  } catch (error) {
    return {
      ...base,
      state: "warn",
      stateLabel: stateLabel(copy, "warn"),
      rows: [
        { label: copy.labels.node, value: copy.emptyValue },
        { label: copy.labels.channels, value: copy.emptyValue },
        { label: copy.labels.capacity, value: copy.emptyValue },
      ],
      note: `${copy.messages.lightningUnavailable} (${errorMessage(error)})`,
    };
  }
}

async function getBtcpayServer(copy: StatusCopy): Promise<StatusEntry> {
  const statusSlug = process.env.UPTIME_KUMA_STATUS_SLUG || "btcpay";
  const base = {
    id: "btcpay-server",
    title: copy.blocks.btcpayServer.title,
    source: copy.sources.uptimeKuma,
  };

  const kumaBase = process.env.UPTIME_KUMA_BASE_URL?.replace(/\/+$/, "");

  if (!kumaBase) {
    return {
      ...base,
      state: "unknown",
      stateLabel: stateLabel(copy, "unknown"),
      rows: [
        { label: copy.labels.statuspage, value: statusSlug },
        { label: copy.labels.overall, value: copy.emptyValue },
        { label: copy.labels.monitors, value: copy.emptyValue },
        { label: copy.labels.upOtherDown, value: copy.emptyValue },
      ],
      note: copy.messages.uptimeConfigMissing,
    };
  }

  try {
    const url = `${kumaBase}/api/status-page/${encodeURIComponent(statusSlug)}`;
    const data = await fetchJson<Record<string, unknown>>(url, 30);
    const groups = Array.isArray(data.publicGroupList) ? data.publicGroupList : [];
    let up = 0;
    let other = 0;
    let down = 0;

    for (const group of groups) {
      const monitors =
        group && typeof group === "object" && Array.isArray((group as { monitorList?: unknown }).monitorList)
          ? (group as { monitorList: unknown[] }).monitorList
          : [];

      for (const monitor of monitors) {
        const status =
          monitor && typeof monitor === "object" ? (monitor as { status?: unknown }).status : undefined;
        const numericStatus = typeof status === "number" ? status : Number(status);

        if (numericStatus === 0) {
          down += 1;
        } else if (numericStatus === 1) {
          up += 1;
        } else {
          other += 1;
        }
      }
    }

    const total = up + other + down;
    const state: StatusState = down > 0 ? "down" : other > 0 ? "warn" : "online";

    return {
      ...base,
      state,
      stateLabel: stateLabel(copy, state),
      rows: [
        { label: copy.labels.statuspage, value: statusSlug },
        { label: copy.labels.overall, value: stateLabel(copy, state) },
        { label: copy.labels.monitors, value: total ? String(total) : copy.emptyValue },
        { label: copy.labels.upOtherDown, value: `${up} / ${other} / ${down}` },
      ],
      links: [{ label: copy.links.openStatuspage, href: `${kumaBase}/status/${statusSlug}` }],
    };
  } catch (error) {
    return {
      ...base,
      state: "unknown",
      stateLabel: stateLabel(copy, "unknown"),
      rows: [
        { label: copy.labels.statuspage, value: statusSlug },
        { label: copy.labels.overall, value: copy.emptyValue },
        { label: copy.labels.monitors, value: copy.emptyValue },
        { label: copy.labels.upOtherDown, value: copy.emptyValue },
      ],
      note: `${copy.messages.sourceUnavailable} (${errorMessage(error)})`,
    };
  }
}

type IcsDateValue = {
  value: string;
  isDate: boolean;
  tzid?: string;
};

type ParsedIcsEvent = {
  title: string;
  location?: string;
  url?: string;
  start: Date;
  end?: Date;
  allDay: boolean;
  endIsDate: boolean;
};

function unfoldIcsLines(body: string) {
  const lines = body.split(/\r\n|\n|\r/);
  const unfolded: string[] = [];

  for (const line of lines) {
    if (!line) {
      continue;
    }

    if (unfolded.length && (line.startsWith(" ") || line.startsWith("\t"))) {
      unfolded[unfolded.length - 1] += line.slice(1);
    } else {
      unfolded.push(line);
    }
  }

  return unfolded;
}

function unescapeIcsText(value: string) {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function pickIcsDate(current: Record<string, string>, key: "DTSTART" | "DTEND"): IcsDateValue | null {
  if (current[key]) {
    return { value: current[key], isDate: false };
  }

  for (const [rawKey, value] of Object.entries(current)) {
    const upperKey = rawKey.toUpperCase();
    if (!upperKey.startsWith(`${key};`)) {
      continue;
    }

    const tzid = rawKey
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.toUpperCase().startsWith("TZID="))
      ?.slice(5)
      .replace(/^"|"$/g, "");

    return {
      value,
      isDate: upperKey.includes("VALUE=DATE"),
      tzid,
    };
  }

  return null;
}

function parseDateParts(value: string) {
  const dateMatch = value.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (dateMatch) {
    return {
      year: Number(dateMatch[1]),
      month: Number(dateMatch[2]),
      day: Number(dateMatch[3]),
    };
  }

  const dateTimeMatch = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/);
  if (!dateTimeMatch) {
    return null;
  }

  return {
    year: Number(dateTimeMatch[1]),
    month: Number(dateTimeMatch[2]),
    day: Number(dateTimeMatch[3]),
    hour: Number(dateTimeMatch[4]),
    minute: Number(dateTimeMatch[5]),
    second: Number(dateTimeMatch[6]),
    utc: dateTimeMatch[7] === "Z",
  };
}

function zonedOffset(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  const asUtc = Date.UTC(value("year"), value("month") - 1, value("day"), value("hour"), value("minute"), value("second"));
  return asUtc - date.getTime();
}

function dateInTimeZone(
  timeZone: string,
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0
) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  return new Date(utcGuess.getTime() - zonedOffset(utcGuess, timeZone));
}

function parseIcsDate(value: IcsDateValue) {
  const parts = parseDateParts(value.value.trim());
  if (!parts) {
    return null;
  }

  if (!("hour" in parts)) {
    return dateInTimeZone(ZURICH_TIME_ZONE, parts.year, parts.month, parts.day);
  }

  if (parts.utc) {
    return new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second));
  }

  return dateInTimeZone(value.tzid || ZURICH_TIME_ZONE, parts.year, parts.month, parts.day, parts.hour, parts.minute, parts.second);
}

function parseIcsEvents(body: string) {
  const lines = unfoldIcsLines(body);
  const events: ParsedIcsEvent[] = [];
  let inEvent = false;
  let current: Record<string, string> = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      current = {};
      continue;
    }

    if (line === "END:VEVENT") {
      inEvent = false;
      const startValue = pickIcsDate(current, "DTSTART");
      const endValue = pickIcsDate(current, "DTEND");
      const title = current.SUMMARY;
      const start = startValue ? parseIcsDate(startValue) : null;
      const end = endValue ? parseIcsDate(endValue) : null;

      if (title && start && startValue) {
        events.push({
          title: unescapeIcsText(title),
          location: current.LOCATION ? unescapeIcsText(current.LOCATION) : undefined,
          url: current.URL?.trim(),
          start,
          end: end ?? undefined,
          allDay: startValue?.isDate === true || /^\d{8}$/.test(startValue.value),
          endIsDate: endValue?.isDate === true,
        });
      }

      current = {};
      continue;
    }

    if (!inEvent) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex);
    const value = line.slice(separatorIndex + 1);
    const mainKey = key.split(";")[0].toUpperCase();
    const storedKey = mainKey === "DTSTART" || mainKey === "DTEND" ? key : mainKey;

    if (!(storedKey in current)) {
      current[storedKey] = value;
    }
  }

  return events;
}

function sameZurichDay(a: Date, b: Date, locale: Locale) {
  const formatter = new Intl.DateTimeFormat(localeTag(locale), {
    timeZone: ZURICH_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(a) === formatter.format(b);
}

function formatEventWhen(event: ParsedIcsEvent, locale: Locale) {
  const dateFormatter = new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: "medium",
    timeZone: ZURICH_TIME_ZONE,
  });
  const timeFormatter = new Intl.DateTimeFormat(localeTag(locale), {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: ZURICH_TIME_ZONE,
  });
  const dateTimeFormatter = new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: ZURICH_TIME_ZONE,
  });

  if (!event.end) {
    return event.allDay ? dateFormatter.format(event.start) : dateTimeFormatter.format(event.start);
  }

  if (event.allDay || event.endIsDate) {
    const inclusiveEnd = new Date(event.end.getTime() - 24 * 60 * 60 * 1000);
    const start = dateFormatter.format(event.start);
    const end = dateFormatter.format(inclusiveEnd);
    return start === end ? start : `${start} - ${end}`;
  }

  if (sameZurichDay(event.start, event.end, locale)) {
    return `${dateFormatter.format(event.start)} ${timeFormatter.format(event.start)} - ${timeFormatter.format(event.end)}`;
  }

  return `${dateTimeFormatter.format(event.start)} - ${dateTimeFormatter.format(event.end)}`;
}

async function getNextEvents(locale: Locale, copy: StatusCopy): Promise<StatusEntry> {
  const base = {
    id: "next-events",
    title: copy.blocks.nextEvents.title,
    source: copy.sources.googleCalendar,
  };
  const icsUrl = process.env.STATUS_ICS_URL || DEFAULT_ICS_URL;
  const calendarWebUrl = process.env.STATUS_CALENDAR_WEB_URL || DEFAULT_CALENDAR_WEB_URL;
  const links = [
    { label: copy.links.subscribeCalendar, href: icsUrl },
    { label: copy.links.openCalendar, href: calendarWebUrl },
  ];

  try {
    const body = await fetchText(icsUrl, 3600);
    const now = new Date();
    const cutoff = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    const events = parseIcsEvents(body)
      .filter((event) => event.start <= cutoff && (event.end ? event.end >= now : event.start >= now))
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .slice(0, 5);

    if (!events.length) {
      return {
        ...base,
        state: "warn",
        stateLabel: stateLabel(copy, "warn"),
        events: [],
        links,
        note: copy.messages.noEvents,
      };
    }

    return {
      ...base,
      state: "online",
      stateLabel: stateLabel(copy, "online"),
      events: events.map((event) => ({
        title: event.title,
        when: formatEventWhen(event, locale),
        location: event.location,
        url: event.url,
      })),
      links,
    };
  } catch (error) {
    return {
      ...base,
      state: "unknown",
      stateLabel: stateLabel(copy, "unknown"),
      events: [],
      links,
      note: `${copy.messages.calendarUnavailable} (${errorMessage(error)})`,
    };
  }
}

export async function getStatusPageData(localeInput: string): Promise<{ renderedAt: Date; entries: StatusEntry[] }> {
  const locale = normalizeLocale(localeInput);
  const dictionary = await getDictionary(locale);
  const copy = dictionary.status;

  const entries = await Promise.all([
    getBitcoinNetwork(locale, copy),
    getBitcoinPrice(locale, copy),
    getLightningNode(locale, copy),
    getBtcpayServer(copy),
    getNextEvents(locale, copy),
  ]);

  return {
    renderedAt: new Date(),
    entries,
  };
}

export function formatStatusRenderedAt(date: Date, localeInput: string) {
  return formatDateTime(date, normalizeLocale(localeInput));
}
