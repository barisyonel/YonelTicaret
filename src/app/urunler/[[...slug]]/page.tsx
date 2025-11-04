import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import nextDynamic from 'next/dynamic';
import ProductsRepository from '@/lib/repositories/ProductsRepository';
import CategoriesRepository from '@/lib/repositories/CategoriesRepository';
import SliderImagesRepository from '@/lib/repositories/SliderImagesRepository';
import Breadcrumb from '@/components/Breadcrumb';
import ProductsHeader from '@/app/products/ProductsHeader';
import { Metadata } from 'next';
import { slugify } from '@/lib/utils/slugify';
import { notFound } from 'next/navigation';

// Dynamic imports for better code splitting
const ProductCard = nextDynamic(() => import('@/app/products/ProductCard'), {
  ssr: true,
});
const ProductsFilter = nextDynamic(() => import('@/app/products/ProductsFilter'), {
  ssr: false,
});
const ProductsPagination = nextDynamic(() => import('@/app/products/ProductsPagination'), {
  ssr: true,
});
const ProductsToolbar = nextDynamic(() => import('@/app/products/ProductsToolbar'), {
  ssr: true,
});
const ScrollToTop = nextDynamic(() => import('@/components/ScrollToTop'), {
  ssr: false,
});
const ProductsCarousel = nextDynamic(() => import('@/components/ProductsCarousel'), {
  ssr: true,
  loading: () => <div style={{ height: 'clamp(280px, 35vh, 400px)', backgroundColor: '#f3f4f6' }} />,
});
const ProductsInfoCards = nextDynamic(() => import('@/components/ProductsInfoCards'), {
  ssr: false,
});

// Force dynamic rendering to prevent build-time database connection
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: { slug?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  let title = 'İveco Daily ve Fiat Ducato Yedek Parçaları | Foton ve Karataş Traktör | Mutlu Akü | Yönel Oto';
  let description = 'İveco Daily (120-14, 85-12, 65-9, 50NC, Eurobus), Fiat Ducato (2.3, 3.0), Foton Traktör, Karataş Traktör yedek parçaları ve Mutlu Akü. Tüm Türkiye\'ye online yedek parça satışı. Orijinal yedek parça, fren balata, motor parçaları, filtre. 50+ yıl tecrübe.';
  let keywords = 'iveco daily 120-14 yedek parça, iveco 85-12, iveco 65-9, iveco 50nc, iveco eurobus, fiat ducato 2.3, fiat ducato 3.0, foton traktör, karataş traktör, mutlu akü, orijinal yedek parça, online yedek parça, türkiye geneli yedek parça, tüm türkiye yedek parça';
  let canonicalUrl = 'https://yonelotoyedekparca.com/urunler';

  if (params.slug && params.slug.length > 0) {
    const parentSlug = params.slug[0];
    const subSlug = params.slug[1];
    const categories = await CategoriesRepository.findAll();
    
    for (const cat of categories) {
      if (slugify(cat.Name) === parentSlug) {
        if (subSlug && cat.SubCategories) {
          // Alt kategori varsa
          for (const sub of cat.SubCategories) {
            if (slugify(sub.Name) === subSlug) {
              title = `${cat.Name} ${sub.Name} Yedek Parçaları | Tüm Türkiye'ye Online Satış | Yönel Oto Yedek Parça`;
              description = `${cat.Name} ${sub.Name} yedek parça ürünleri. Tüm Türkiye'ye online yedek parça satışı ve hızlı teslimat. Orijinal ve kaliteli yedek parçalar. 50+ yıl tecrübe.`;
              keywords = `${cat.Name.toLowerCase()} ${sub.Name.toLowerCase()} yedek parça, ${cat.Name.toLowerCase()} ${sub.Name.toLowerCase()} orijinal parça, ${cat.Name.toLowerCase()} ${sub.Name.toLowerCase()} online, türkiye geneli ${cat.Name.toLowerCase()} ${sub.Name.toLowerCase()}, tüm türkiye ${cat.Name.toLowerCase()} ${sub.Name.toLowerCase()} yedek parça`;
              canonicalUrl = `https://yonelotoyedekparca.com/urunler/${parentSlug}/${subSlug}`;
              break;
            }
          }
        } else {
          // Sadece ana kategori
          const categoryName = cat.Name;
          // İveco için özel title
          if (categoryName.toLowerCase().includes('iveco')) {
            title = `İveco Daily 120-14, 85-12, 65-9, 50NC, Eurobus Yedek Parçaları | Tüm Türkiye'ye Online Satış | Yönel Oto`;
            description = `İveco Daily (120-14, 85-12, 65-9, 50NC, Eurobus) yedek parçaları. Tüm Türkiye'ye online yedek parça satışı ve hızlı teslimat. Orijinal İveco yedek parça, fren balata, motor parçaları, filtre. Türkiye geneli servis.`;
            keywords = 'iveco daily 120-14 yedek parça, iveco 85-12 yedek parça, iveco 65-9 yedek parça, iveco 50nc yedek parça, iveco eurobus yedek parça, iveco daily fren balata, iveco motor parçaları, iveco daily online, türkiye geneli iveco daily, tüm türkiye iveco yedek parça';
          } else if (categoryName.toLowerCase().includes('ducato') || categoryName.toLowerCase().includes('fiat')) {
            title = `Fiat Ducato 2.3 ve 3.0 Yedek Parçaları | Tüm Türkiye'ye Online Satış | Yönel Oto`;
            description = `Fiat Ducato 2.3 ve 3.0 motor yedek parçaları. Tüm Türkiye'ye online yedek parça satışı ve hızlı teslimat. Orijinal Ducato yedek parça, fren balata, motor parçaları, filtre. Türkiye geneli servis.`;
            keywords = 'fiat ducato 2.3 yedek parça, fiat ducato 3.0 yedek parça, ducato yedek parça, ducato fren balata, ducato motor parçaları, ducato online, türkiye geneli ducato, tüm türkiye ducato yedek parça';
          } else if (categoryName.toLowerCase().includes('foton')) {
            title = `Foton Traktör Yedek Parçaları | Tüm Türkiye'ye Online Satış | Yönel Oto`;
            description = `Foton Traktör yedek parçaları. Tüm Türkiye'ye online yedek parça satışı ve hızlı teslimat. Orijinal Foton traktör parçaları, hidrolik sistemler, motor parçaları. Türkiye geneli servis.`;
            keywords = 'foton traktör yedek parça, foton traktör parçaları, foton traktör aksesuar, foton traktör online, türkiye geneli foton traktör, tüm türkiye foton traktör yedek parça';
          } else if (categoryName.toLowerCase().includes('karataş')) {
            title = `Karataş Traktör Yedek Parçaları | Tüm Türkiye'ye Online Satış | Yönel Oto`;
            description = `Karataş Traktör yedek parçaları. Tüm Türkiye'ye online yedek parça satışı ve hızlı teslimat. Orijinal Karataş traktör parçaları, hidrolik sistemler, motor parçaları. Türkiye geneli servis.`;
            keywords = 'karataş traktör yedek parça, karataş traktör parçaları, karataş traktör aksesuar, karataş traktör online, türkiye geneli karataş traktör, tüm türkiye karataş traktör yedek parça';
          } else if (categoryName.toLowerCase().includes('mutlu')) {
            title = `Mutlu Akü Çeşitleri | Tüm Türkiye'ye Online Satış | Yönel Oto`;
            description = `Mutlu Akü çeşitleri. Tüm Türkiye'ye online akü satışı ve hızlı teslimat. Araç ve traktör aküleri. Türkiye geneli servis.`;
            keywords = 'mutlu akü, mutlu akü fiyat, mutlu akü çeşitleri, mutlu akü online, türkiye geneli mutlu akü, tüm türkiye mutlu akü';
          } else {
            title = `${categoryName} Yedek Parçaları | Tüm Türkiye'ye Online Satış | Yönel Oto Yedek Parça`;
            description = `${categoryName} yedek parça ürünleri. Tüm Türkiye'ye online yedek parça satışı ve hızlı teslimat. Orijinal ve kaliteli yedek parçalar. 50+ yıl tecrübe.`;
            keywords = `${categoryName.toLowerCase()} yedek parça, ${categoryName.toLowerCase()} orijinal parça, ${categoryName.toLowerCase()} online, türkiye geneli ${categoryName.toLowerCase()}, tüm türkiye ${categoryName.toLowerCase()} yedek parça`;
          }
          canonicalUrl = `https://yonelotoyedekparca.com/urunler/${parentSlug}`;
        }
        break;
      }
    }
  }

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image.jpg'],
    },
  };
}


export default async function UrunlerPage({ params, searchParams }: PageProps) {
  const page = parseInt(searchParams.page as string || '1');
  const search = searchParams.search as string || '';
  const sort = searchParams.sort as string || 'newest';
  const limit = parseInt(searchParams.limit as string || '12');

  // Fetch categories with error handling (hydration fix)
  let categories: Array<{ Id: number; Name: string; SubCategories?: Array<{ Id: number; Name: string }> }> = [];
  try {
    categories = await CategoriesRepository.findAll();
  } catch (error) {
    console.error('Categories fetch error:', error);
    categories = [];
  }
  
  // Slug'dan kategori bul
  let categoryId: number | undefined = undefined;
  let activeCategory = null;
  let parentCategory = null; // Ana kategoriyi takip etmek için
  
  if (params.slug && params.slug.length > 0 && categories.length > 0) {
    // URL yapısı: /urunler/parent-slug veya /urunler/parent-slug/sub-slug
    const parentSlug = params.slug[0]; // İlk segment ana kategori slug'ı
    const subSlug = params.slug[1]; // İkinci segment alt kategori slug'ı (varsa)
    
    // Önce ana kategoriyi bul
    for (const cat of categories) {
      const catSlug = slugify(cat.Name);
      
      if (catSlug === parentSlug) {
        parentCategory = cat;
        
        // Eğer alt kategori slug'ı varsa onu ara
        if (subSlug && cat.SubCategories) {
          for (const sub of cat.SubCategories) {
            const subCatSlug = slugify(sub.Name);
            
            if (subCatSlug === subSlug) {
              categoryId = sub.Id;
              activeCategory = sub;
              break;
            }
          }
          
          // Alt kategori bulunamadıysa 404
          if (!activeCategory) {
            notFound();
          }
        } else {
          // Alt kategori slug'ı yoksa, ana kategori aktif
          categoryId = cat.Id;
          activeCategory = cat;
        }
        break;
      }
    }
    
    // Ana kategori bulunamadıysa 404
    if (!parentCategory) {
      notFound();
    }
  }

  // Fetch data with error handling
  let products: Array<{ Id: number; Name: string; Description?: string; ImageUrl?: string; CategoryName?: string; SubCategoryName?: string }> = [];
  let total = 0;
  try {
    const result = await ProductsRepository.findAll({
      page,
      limit,
      search,
      categoryId,
      sort,
    });
    products = result.products;
    total = result.total;
  } catch (error) {
    console.error('Products fetch error:', error);
    products = [];
    total = 0;
  }

  // Fetch sliders with error handling
  let sliders: Array<{ Id: number; ImageUrl?: string; Title?: string }> = [];
  try {
    sliders = await SliderImagesRepository.findAll();
  } catch (error) {
    console.error('Sliders fetch error:', error);
    sliders = [];
  }
  
  const totalPages = Math.ceil(total / limit);

  // Breadcrumb Schema for Google
  const breadcrumbItems = [
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
  ];

  if (parentCategory) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: parentCategory.Name,
      item: `https://yonelotoyedekparca.com/urunler/${slugify(parentCategory.Name)}`,
    });
  }

  if (activeCategory) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: parentCategory ? 4 : 3,
      name: activeCategory.Name,
      item: parentCategory 
        ? `https://yonelotoyedekparca.com/urunler/${slugify(parentCategory.Name)}/${slugify(activeCategory.Name)}`
        : `https://yonelotoyedekparca.com/urunler/${slugify(activeCategory.Name)}`,
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: activeCategory ? activeCategory.Name : 'Ürünler',
    description: 'Yonel Otomotiv yedek parça ürünleri',
    url: `https://yonelotoyedekparca.com/urunler${activeCategory ? `/${slugify(activeCategory.Name)}` : ''}`,
    numberOfItems: total,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.Name,
        description: product.Description || product.Name,
        url: `https://yonelotoyedekparca.com/products/${product.Id}`,
      },
    })),
  };

  return (
    <div suppressHydrationWarning>
      {/* Breadcrumb Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Collection Page Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Box
        sx={{
          width: '100%',
          maxWidth: '100vw',
          margin: '0 auto',
          px: { xs: '2%', sm: '3%', md: '2%', lg: '1.5%', xl: '1%' },
          py: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        }}
        suppressHydrationWarning
      >
        {/* Breadcrumb */}
        <Box sx={{ mb: { xs: '1.5rem', md: '2rem' } }}>
          <Breadcrumb
            items={[
              { label: 'Ürünler', href: '/urunler' },
              ...(parentCategory ? [{ label: parentCategory.Name, href: `/urunler/${slugify(parentCategory.Name)}` }] : []),
              ...(activeCategory ? [{ label: activeCategory.Name }] : []),
            ]}
          />
        </Box>

        {/* Header with title */}
        <Box sx={{ mb: { xs: '1.5rem', md: '2rem' } }}>
          <ProductsHeader />
        </Box>

        {/* Products Carousel - Admin tarafından eklenen slider görselleri */}
        <Box sx={{ mb: { xs: '2rem', md: '2.5rem' } }} suppressHydrationWarning>
          <ProductsCarousel sliders={sliders} />
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: '2rem', md: '2.5%', lg: '2%', xl: '1.5%' },
            width: '100%',
          }}
          suppressHydrationWarning
        >
          {/* Sidebar - Filters (Desktop) */}
          <Box
            sx={{
              width: { xs: '100%', md: '22%', lg: '20%', xl: '18%' },
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
            }}
            suppressHydrationWarning
          >
            <ProductsFilter categories={categories} activeCategory={activeCategory} />
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              width: { xs: '100%', md: 'calc(78% - 2.5%)', lg: 'calc(80% - 2%)', xl: 'calc(82% - 1.5%)' },
              flexGrow: 1,
              minWidth: 0,
            }}
            suppressHydrationWarning
          >
            {/* Toolbar - Sort & Limit Controls + Mobile Filter Button */}
            <Box sx={{ mb: { xs: '1.5rem', md: '2rem' } }}>
              <ProductsToolbar categories={categories} activeCategory={activeCategory} />
            </Box>

            {/* Product Grid */}
            {products.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: { xs: '4rem', md: '6rem' },
                  bgcolor: '#f9f9f9',
                  borderRadius: 2,
                  px: '2%',
                }}
              >
                <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                  Ürün bulunamadı
                </Typography>
                <Typography variant="body2" sx={{ color: '#999' }}>
                  {search
                    ? 'Arama kriterlerinize uygun ürün bulunmamaktadır.'
                    : 'Bu kategoride henüz ürün bulunmamaktadır.'}
                </Typography>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                      xl: 'repeat(4, 1fr)',
                    },
                    gap: { xs: '1.5rem', sm: '1.8rem', md: '1.8rem', lg: '2rem', xl: '2rem' },
                    width: '100%',
                  }}
                  suppressHydrationWarning
                >
                  {products.map((product) => (
                    <Box key={product.Id} suppressHydrationWarning>
                      <ProductCard product={product} />
                    </Box>
                  ))}
                </Box>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box
                    sx={{
                      mt: { xs: '3rem', md: '4rem' },
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ProductsPagination 
                      currentPage={page} 
                      totalPages={totalPages}
                      categorySlug={
                        activeCategory && parentCategory
                          ? `${slugify(parentCategory.Name)}/${slugify(activeCategory.Name)}`
                          : activeCategory
                          ? slugify(activeCategory.Name)
                          : undefined
                      }
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>

        {/* Info Cards - Alt bilgi kartları */}
        <Box sx={{ mt: { xs: '3rem', md: '4rem' } }}>
          <ProductsInfoCards />
        </Box>

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </Box>
    </div>
  );
}
