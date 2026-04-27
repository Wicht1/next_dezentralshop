// lib/woocommerce.ts
// WooCommerce REST API v3 client

const WC_URL = process.env.WOOCOMMERCE_URL!;
const WC_KEY = process.env.WOOCOMMERCE_KEY!;
const WC_SECRET = process.env.WOOCOMMERCE_SECRET!;

// ─── Types ────────────────────────────────────────────────────────────────────

export type WCImage = {
  id: number;
  src: string;
  alt: string;
};

export type WCCategory = {
  id: number;
  name: string;
  slug: string;
};

export type WCAttribute = {
  id: number;
  name: string;
  slug?: string;
  options: string[];
  variation: boolean;
};

export type WCProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: "simple" | "variable" | "grouped" | "external";
  status: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: "instock" | "outofstock" | "onbackorder";
  weight: string;
  dimensions: { length: string; width: string; height: string };
  categories: WCCategory[];
  images: WCImage[];
  attributes: WCAttribute[];
};

export type WCVariation = {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_quantity: number | null;
  stock_status: string;
  attributes: { id: number; name: string; option: string }[];
  image: WCImage | null;
};

export type WCProductCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
  description: string;
  image: WCImage | null;
};

// ─── Fetch helper ─────────────────────────────────────────────────────────────

async function wcFetch<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${WC_URL}/wp-json/wc/v3${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Basic ${auth}` },
    next: { revalidate: 60 }, // ISR: refresh every 60s
  });

  if (!res.ok) throw new Error(`WooCommerce API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(params: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  orderby?: string;
  order?: string;
} = {}): Promise<WCProduct[]> {
  return wcFetch<WCProduct[]>("/products", {
    status: "publish",
    per_page: params.per_page ?? 24,
    page: params.page ?? 1,
    ...(params.category && { category: params.category }),
    ...(params.search && { search: params.search }),
    ...(params.orderby && { orderby: params.orderby }),
    ...(params.order && { order: params.order }),
  });
}

export async function getProductBySlug(slug: string): Promise<WCProduct | null> {
  const products = await wcFetch<WCProduct[]>("/products", { slug, status: "publish" });
  return products[0] ?? null;
}

export async function getProductVariations(productId: number): Promise<WCVariation[]> {
  return wcFetch<WCVariation[]>(`/products/${productId}/variations`, { per_page: 50 });
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<WCProductCategory[]> {
  const cats = await wcFetch<WCProductCategory[]>("/products/categories", {
    per_page: 100,
    hide_empty: 1,
  });
  return cats.filter((c) => c.count > 0);
}

export async function getCategoryBySlug(slug: string): Promise<WCProductCategory | null> {
  const cats = await wcFetch<WCProductCategory[]>("/products/categories", { slug });
  return cats[0] ?? null;
}

// ─── Attributes ───────────────────────────────────────────────────────────────

export type WCGlobalAttribute = {
  id: number;
  name: string;
  slug: string;
};

export async function getGlobalAttributes(): Promise<WCGlobalAttribute[]> {
  return wcFetch<WCGlobalAttribute[]>("/products/attributes", { per_page: 100 });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format CHF price string → number */
export function parsePrice(price: string): number {
  return parseFloat(price) || 0;
}

/** Format number → "CHF 1'234.00" */
export function fmtChf(n: number): string {
  return "CHF " + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

/** Approx sats from CHF (rate fetched server-side elsewhere) */
export function chfToSats(chf: number, satsPerChf: number): number {
  return Math.round(chf * satsPerChf);
}

/** Format sats → "1'020 sats" */
export function fmtSats(sats: number): string {
  return sats.toLocaleString("de-CH").replace(/\./g, "'") + " sats";
}

/** 10% Bitcoin discount */
export function btcPrice(chf: number): number {
  return chf * 0.9;
}
