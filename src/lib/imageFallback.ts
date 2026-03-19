// Category-based fallback images using Unsplash
const CATEGORY_FALLBACKS: Record<string, string> = {
  brasileirao: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',
  futebol: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
  premier: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
  laliga: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80',
  bundesliga: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  seriea: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  champions: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=80',
  nba: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  ufc: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80',
  mls: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
  olimpiadas: 'https://images.unsplash.com/photo-1461896836934-bd45ba24e166?w=800&q=80',
};

const DEFAULT_FALLBACK = '/placeholder.svg';

export const getFallbackImage = (categorySlug: string): string => {
  return CATEGORY_FALLBACKS[categorySlug] || DEFAULT_FALLBACK;
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  categorySlug: string
) => {
  const target = e.currentTarget;
  const fallback = getFallbackImage(categorySlug);
  
  // Prevent infinite loop if fallback also fails
  if (target.src === fallback || target.dataset.fallbackApplied) {
    target.src = DEFAULT_FALLBACK;
    return;
  }
  
  target.dataset.fallbackApplied = 'true';
  target.src = fallback;
};
