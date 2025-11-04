/**
 * Türkçe karakterleri destekleyen, SEO-friendly slug oluşturucu
 * Türkçe karakterleri doğru şekilde dönüştürür ve URL-safe format oluşturur
 * Örnek: "ŞANZIMAN KOVANI ÖN KAPAK TAPASI" -> "sanziman-kovani-on-kapak-tapasi"
 * Örnek: "İVECO DAILY" -> "iveco-daily"
 */
export function slugify(text: string): string {
  if (!text) return '';
  
  const turkishMap: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U',
  };

  return text
    .split('')
    .map(char => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    // Özel karakterleri ve noktalama işaretlerini kaldır
    .replace(/[^\w\s-]/g, '')
    // Birden fazla boşluğu tek boşluğa çevir
    .replace(/\s+/g, '-')
    // Birden fazla tireyi tek tire yap
    .replace(/-+/g, '-')
    // Başta ve sondaki tireleri kaldır
    .replace(/^-+|-+$/g, '')
    // Maksimum 100 karakter (SEO için)
    .substring(0, 100)
    .replace(/-+$/, '');
}

/**
 * Kategori ve ürün bilgisini içeren SEO-friendly URL oluştur
 * Format: kategori-slug/urun-slug-id veya kategori-slug-alt-kategori-slug/urun-slug-id
 * 
 * Örnekler:
 * - { Id: 598, Name: "ŞANZIMAN KOVANI", CategoryName: "İVECO DAILY" }
 *   -> "iveco-daily/sanziman-kovani-598"
 * 
 * - { Id: 598, Name: "ŞANZIMAN KOVANI", CategoryName: "İVECO DAILY", SubCategoryName: "MOTOR PARÇALARI" }
 *   -> "iveco-daily-motor-parcalari/sanziman-kovani-598"
 */
export function generateProductUrl(product: { 
  Id: number; 
  Name: string; 
  CategoryName?: string;
  SubCategoryName?: string;
}): string {
  const productSlug = slugify(product.Name);
  
  // Kategori bilgisi varsa URL'e ekle
  if (product.CategoryName) {
    const categorySlug = slugify(product.CategoryName);
    
    // Alt kategori varsa ekle
    if (product.SubCategoryName) {
      const subCategorySlug = slugify(product.SubCategoryName);
      return `${categorySlug}-${subCategorySlug}/${productSlug}-${product.Id}`;
    }
    
    return `${categorySlug}/${productSlug}-${product.Id}`;
  }
  
  // Kategori yoksa sadece ürün adı ve ID
  return `${productSlug}-${product.Id}`;
}

/**
 * URL slug'ından ID çıkar
 * Hem yeni format (kategori/urun-id) hem eski format (urun-id) desteklenir
 * 
 * Örnekler:
 * - extractIdFromSlug("iveco-daily/sanziman-kovani-598") -> 598
 * - extractIdFromSlug("sanziman-kovani-598") -> 598
 * - extractIdFromSlug("iveco-daily-motor-parcalari/sanziman-kovani-598") -> 598
 */
export function extractIdFromSlug(slug: string): number | null {
  if (!slug) return null;
  
  // URL'de / varsa (yeni format: kategori/urun-id)
  if (slug.includes('/')) {
    const parts = slug.split('/');
    const lastPart = parts[parts.length - 1]; // Son kısım: urun-slug-id
    const idParts = lastPart.split('-');
    const lastIdPart = idParts[idParts.length - 1];
    const id = parseInt(lastIdPart, 10);
    return isNaN(id) ? null : id;
  }
  
  // Eski format (urun-id)
  const parts = slug.split('-');
  const lastPart = parts[parts.length - 1];
  const id = parseInt(lastPart, 10);
  return isNaN(id) ? null : id;
}

/**
 * URL'den kategori slug'ını çıkar (yeni format için)
 * Örnek: extractCategoryFromSlug("iveco-daily/sanziman-kovani-598") -> "iveco-daily"
 */
export function extractCategoryFromSlug(slug: string): string | null {
  if (!slug || !slug.includes('/')) return null;
  const parts = slug.split('/');
  return parts[0] || null;
}

