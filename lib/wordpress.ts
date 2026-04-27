// lib/wordpress.ts
// WordPress REST API v2 client (public – no auth needed for published posts)

const WP_URL = process.env.WOOCOMMERCE_URL!; // same domain

// ─── Types ────────────────────────────────────────────────────────────────────

export type WPRendered = { rendered: string };

export type WPPost = {
  id: number;
  slug: string;
  date: string; // ISO
  modified: string;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  featured_media: number;
  categories: number[];
  tags: number[];
  author: number;
  _embedded?: {
    "wp:featuredmedia"?: [{ source_url: string; alt_text: string }];
    "wp:term"?: [WPTerm[], WPTerm[]];
    author?: [{ name: string; avatar_urls: Record<string, string> }];
  };
};

export type WPTerm = {
  id: number;
  name: string;
  slug: string;
};

export type WPCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
};

// ─── Fetch helper ─────────────────────────────────────────────────────────────

async function wpFetch<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${WP_URL}/wp-json/wp/v2${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url.toString(), {
    next: { revalidate: 300 }, // ISR: 5 min
  });

  if (!res.ok) throw new Error(`WordPress API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export async function getPosts(params: {
  page?: number;
  per_page?: number;
  categories?: number[];
  search?: string;
} = {}): Promise<WPPost[]> {
  return wpFetch<WPPost[]>("/posts", {
    status: "publish",
    per_page: params.per_page ?? 12,
    page: params.page ?? 1,
    _embed: 1, // includes featured image + terms + author inline
    ...(params.categories?.length ? { categories: params.categories.join(",") } : {}),
    ...(params.search ? { search: params.search } : {}),
  });
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>("/posts", {
    slug,
    status: "publish",
    _embed: 1,
  });
  return posts[0] ?? null;
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getBlogCategories(): Promise<WPCategory[]> {
  const cats = await wpFetch<WPCategory[]>("/categories", {
    per_page: 50,
    hide_empty: 1,
  });
  return cats.filter((c) => c.count > 0);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strip HTML tags from WP excerpt */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/** Format ISO date → "27. April 2026" (de-CH) */
export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Get featured image URL from embedded post */
export function getFeaturedImage(post: WPPost): { src: string; alt: string } | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) return null;
  return { src: media.source_url, alt: media.alt_text || post.title.rendered };
}

/** Get category terms from embedded post */
export function getPostCategories(post: WPPost): WPTerm[] {
  return post._embedded?.["wp:term"]?.[0] ?? [];
}

/** Get author name from embedded post */
export function getPostAuthor(post: WPPost): string {
  return post._embedded?.author?.[0]?.name ?? "Dezentralshop";
}
