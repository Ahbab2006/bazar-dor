export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductPriceChange {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

export interface Product {
  id: string | number;
  nameBn: string;
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number;
  yesterday?: number;
  lastMonth?: number;
  change?: ProductPriceChange;
  markets?: MarketPrice[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}