/** Shapes of data/products.json — the single source of truth the whole UI renders. */

export interface SiteConfig {
  name: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  line: string;
  facebook: string;
  dealer: string;
  /** Remote origin for product images; empty string = self-hosted under /images. */
  imageBase: string;
}

export interface Category {
  slug: string;
  nameTh: string;
  emoji: string;
  productCount: number;
}

/** A size option of the same model, linking to its own product page. */
export interface Variant {
  url: string;
  label: string;
  pricePerMonth: number;
}

/** A care-service plan (visit interval + type) with its own monthly price. */
export interface ServicePlan {
  interval: string;
  type: string;
  pricePerMonth: number;
}

export interface Technology {
  name: string;
  detail: string;
}

export interface Product {
  slug: string;
  url: string;
  category: string;
  name: string;
  description: string;
  image: string;
  price: number;
  contractMonths: number;
  monthlyPrice: number;
  promoPrice: number | null;
  emoji: string;
  promoLabel?: string;
  variants?: Variant[];
  plans?: ServicePlan[];
  features: string[];
  technologies?: Technology[];
  specs: Record<string, string>;
  contract: string;
  warranty: string;
  totalContractValue: string;
  serviceInterval: string;
  gallery: string[];
  featured?: boolean;
}

export interface Review {
  name: string;
  when: string;
  via: string;
  text: string;
}

export interface ReviewsBlock {
  rating: number;
  count: number;
  items: Review[];
}

export type FaqTopic = "money" | "contract" | "service" | "product";

export interface Faq {
  cat: FaqTopic;
  /** Featured in the top-6 "quick objection handling" grid. */
  closing?: boolean;
  icon?: string;
  q: string;
  a: string;
}

export interface Catalog {
  site: SiteConfig;
  categories: Category[];
  products: Product[];
  reviews: ReviewsBlock;
  faqs: Faq[];
}
