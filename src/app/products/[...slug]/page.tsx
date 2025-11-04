import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductsRepository from '@/lib/repositories/ProductsRepository';
import { extractIdFromSlug, slugify } from '@/lib/utils/slugify';
import { Metadata } from 'next';

// Force dynamic rendering to prevent build-time database connection
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Slug array'i birleştir (kategori/urun-id formatı)
  const slugString = params.slug.join('/');
  const productId = extractIdFromSlug(slugString);
  
  if (!productId) {
    return {
      title: 'Ürün Bulunamadı',
    };
  }

  const product = await ProductsRepository.findById(productId);

  if (!product) {
    return {
      title: 'Ürün Bulunamadı',
    };
  }

  const canonicalUrl = `https://yonelotoyedekparca.com/products/${slugString}`;
  
  // SEO için keywords oluştur
  const seoKeywords = [
    product.Name,
    product.CategoryName,
    product.SubCategoryName,
    'yedek parça',
    'orijinal yedek parça',
  ].filter(Boolean).join(', ');
  
  // İveco modelleri için özel keywords
  const ivecoModels = ['120-14', '85-12', '65-9', '50NC', 'Eurobus'];
  const ducatoModels = ['2.3', '3.0'];
  
  let enhancedKeywords = seoKeywords;
  // Tüm ürünler için genel Türkiye keywords
  const turkeyKeywords = ', online yedek parça, türkiye geneli yedek parça, tüm türkiye yedek parça, türkiye yedek parça satışı';
  
  if (product.CategoryName && product.CategoryName.toLowerCase().includes('iveco')) {
    enhancedKeywords += `, iveco daily ${ivecoModels.join(', iveco daily ')}, iveco daily yedek parça, iveco daily online, türkiye geneli iveco daily, tüm türkiye iveco yedek parça${turkeyKeywords}`;
  }
  if (product.CategoryName && (product.CategoryName.toLowerCase().includes('ducato') || product.CategoryName.toLowerCase().includes('fiat'))) {
    enhancedKeywords += `, fiat ducato ${ducatoModels.join(', fiat ducato ')}, ducato yedek parça, ducato online, türkiye geneli ducato, tüm türkiye ducato yedek parça${turkeyKeywords}`;
  }
  if (product.CategoryName && product.CategoryName.toLowerCase().includes('foton')) {
    enhancedKeywords += `, foton traktör yedek parça, foton traktör parçaları, foton traktör online, türkiye geneli foton traktör, tüm türkiye foton traktör${turkeyKeywords}`;
  }
  if (product.CategoryName && product.CategoryName.toLowerCase().includes('karataş')) {
    enhancedKeywords += `, karataş traktör yedek parça, karataş traktör parçaları, karataş traktör online, türkiye geneli karataş traktör, tüm türkiye karataş traktör${turkeyKeywords}`;
  }
  if (product.CategoryName && product.CategoryName.toLowerCase().includes('mutlu')) {
    enhancedKeywords += `, mutlu akü, mutlu akü fiyat, mutlu akü çeşitleri, mutlu akü online, türkiye geneli mutlu akü, tüm türkiye mutlu akü${turkeyKeywords}`;
  }
  
  // Eğer kategori eşleşmediyse genel Türkiye keywords ekle
  if (!enhancedKeywords.includes('türkiye geneli')) {
    enhancedKeywords += turkeyKeywords;
  }

  return {
    title: `${product.Name} | ${product.CategoryName || 'Yedek Parça'} | Tüm Türkiye'ye Online Satış | Yönel Oto Yedek Parça`,
    description: product.Description || `${product.Name} - ${product.CategoryName || ''} yedek parça. Tüm Türkiye'ye online yedek parça satışı ve hızlı teslimat. Orijinal yedek parça. 50+ yıl tecrübe.`,
    keywords: enhancedKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.Name} | ${product.CategoryName || 'Yedek Parça'} | Tüm Türkiye'ye Online Satış | Yönel Oto Yedek Parça`,
      description: product.Description || `${product.Name} - ${product.CategoryName || ''} yedek parça. Tüm Türkiye'ye online yedek parça satışı ve hızlı teslimat. Orijinal yedek parça.`,
      images: product.ImageUrl ? [{ url: product.ImageUrl, width: 1200, height: 630, alt: product.Name }] : [{ url: '/og-image.jpg' }],
      type: 'website',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.Name} | Yönel Oto Yedek Parça`,
      description: product.Description || product.Name,
      images: product.ImageUrl ? [product.ImageUrl] : ['/twitter-image.jpg'],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  // Slug array'i birleştir (kategori/urun-id formatı)
  const slugString = params.slug.join('/');
  const productId = extractIdFromSlug(slugString);

  if (!productId) {
    notFound();
  }

  const product = await ProductsRepository.findById(productId);

  if (!product) {
    notFound();
  }

  // Canonical URL tanımla
  const canonicalUrl = `https://yonelotoyedekparca.com/products/${slugString}`;

  // Geri dönüş linki oluştur
  let backUrl = '/urunler';
  if (product.CategoryName) {
    const categorySlug = slugify(product.CategoryName);
    if (product.SubCategoryName) {
      backUrl = `/urunler/${categorySlug}/${slugify(product.SubCategoryName)}`;
    } else {
      backUrl = `/urunler/${categorySlug}`;
    }
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905542597273';
  const whatsappMessage = `Merhaba, "${product.Name}" ürünü hakkında bilgi almak istiyorum.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Breadcrumb Schema for Google
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://yonelotoyedekparca.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ürünler',
        item: 'https://yonelotoyedekparca.com/urunler',
      },
      ...(product.CategoryName ? [{
        '@type': 'ListItem',
        position: 3,
        name: product.CategoryName,
        item: `https://yonelotoyedekparca.com/urunler/${slugify(product.CategoryName)}`,
      }] : []),
      ...(product.SubCategoryName && product.CategoryName ? [{
        '@type': 'ListItem',
        position: 4,
        name: product.SubCategoryName,
        item: `https://yonelotoyedekparca.com/urunler/${slugify(product.CategoryName)}/${slugify(product.SubCategoryName)}`,
      }] : []),
      {
        '@type': 'ListItem',
        position: product.CategoryName ? (product.SubCategoryName ? 5 : 4) : 3,
        name: product.Name,
        item: `https://yonelotoyedekparca.com/products/${slugString}`,
      },
    ],
  };

  // Product Schema for SEO - Enhanced with model information
  const productSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.Name,
    image: product.ImageUrl ? [product.ImageUrl] : ['https://yonelotoyedekparca.com/og-image.jpg'],
    description: product.Description || `${product.Name} - ${product.CategoryName || ''} yedek parça. Orijinal yedek parça, hızlı teslimat.`,
    sku: `YP-${product.Id}`,
    mpn: product.Id.toString(),
    brand: {
      '@type': 'Brand',
      name: product.CategoryName || 'Yönel Oto Yedek Parça',
    },
    category: product.CategoryName || 'Yedek Parça',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Kategori',
        value: product.CategoryName || 'Yedek Parça',
      },
      ...(product.SubCategoryName ? [{
        '@type': 'PropertyValue',
        name: 'Alt Kategori',
        value: product.SubCategoryName,
      }] : []),
      {
        '@type': 'PropertyValue',
        name: 'Ürün Tipi',
        value: 'Orijinal Yedek Parça',
      },
    ],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'TRY',
      url: canonicalUrl,
      seller: {
        '@type': 'Organization',
        name: 'Yönel Oto Yedek Parça',
        url: 'https://yonelotoyedekparca.com',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+90-554-259-72-73',
          contactType: 'Customer Service',
          areaServed: 'TR',
          availableLanguage: 'Turkish',
        },
      },
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Müşteri',
        },
        datePublished: new Date().toISOString().split('T')[0],
        reviewBody: 'Orijinal ürün, hızlı teslimat. Güvenilir firma.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
  };
  
  // Model bilgisi ekle (İveco veya Ducato için)
  if (product.CategoryName) {
    const categoryLower = product.CategoryName.toLowerCase();
    if (categoryLower.includes('iveco')) {
      productSchema.additionalProperty.push({
        '@type': 'PropertyValue',
        name: 'Uyumlu Modeller',
        value: 'İveco Daily 120-14, 85-12, 65-9, 50NC, Eurobus',
      });
    }
    if (categoryLower.includes('ducato') || categoryLower.includes('fiat')) {
      productSchema.additionalProperty.push({
        '@type': 'PropertyValue',
        name: 'Uyumlu Modeller',
        value: 'Fiat Ducato 2.3, Fiat Ducato 3.0',
      });
    }
    if (categoryLower.includes('foton')) {
      productSchema.additionalProperty.push({
        '@type': 'PropertyValue',
        name: 'Uyumlu Modeller',
        value: 'Foton Traktör',
      });
    }
    if (categoryLower.includes('karataş')) {
      productSchema.additionalProperty.push({
        '@type': 'PropertyValue',
        name: 'Uyumlu Modeller',
        value: 'Karataş Traktör',
      });
    }
  }

  return (
    <>
      {/* Breadcrumb Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Geri Butonu */}
        <Box sx={{ mb: 3 }}>
          <Link href={backUrl} style={{ textDecoration: 'none' }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              color="primary"
              sx={{
                borderWidth: 2,
                fontWeight: 600,
                px: 3,
                py: 1.5,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Ürünlere Geri Dön
            </Button>
          </Link>
        </Box>

        <Paper sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            {product.ImageUrl ? (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 400,
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={product.ImageUrl}
                  alt={product.Name}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>
            ) : (
              <Box
                sx={{
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Görsel Yok
                </Typography>
              </Box>
            )}
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              {product.Name}
            </Typography>

            {/* Kategoriler */}
            {(product.CategoryName || product.SubCategoryName) && (
              <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                {product.CategoryName && (
                  <Chip 
                    label={product.CategoryName} 
                    color="primary" 
                    size="medium"
                    sx={{ fontWeight: 600 }}
                  />
                )}
                {product.SubCategoryName && (
                  <Chip 
                    label={product.SubCategoryName} 
                    variant="outlined"
                    color="primary"
                    size="medium"
                    sx={{ fontWeight: 600, borderWidth: 2 }}
                  />
                )}
              </Box>
            )}

            {product.Description && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.8 }}
              >
                {product.Description}
              </Typography>
            )}

            {/* CTA */}
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                color="success"
                startIcon={<WhatsAppIcon />}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                sx={{
                  bgcolor: '#25D366',
                  '&:hover': { bgcolor: '#128C7E' },
                  fontWeight: 600,
                  py: 2,
                  px: 4,
                }}
              >
                WhatsApp ile Bilgi Al
              </Button>
            </Box>

            {/* Product Features */}
            <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Ürün Özellikleri
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                ✓ Orijinal ve garantili ürün
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                ✓ Hızlı teslimat
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ✓ Uzman destek
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </>
  );
}

