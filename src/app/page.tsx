import ProductsRepository from '@/lib/repositories/ProductsRepository';
import Link from 'next/link';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Dynamic imports for better code splitting and performance
const ModernHeroSlider = dynamic(() => import('@/components/ModernHeroSlider'), {
  ssr: true,
  loading: () => <div style={{ height: '60vh', backgroundColor: '#1f2937' }} />,
});
const ScrollFadeIn = dynamic(() => import('@/components/ScrollFadeIn'), {
  ssr: true,
});
const ModernProductCard = dynamic(() => import('@/components/ModernProductCard'), {
  ssr: true,
});
const AnimatedBrandCard = dynamic(() => import('@/components/AnimatedBrandCard'), {
  ssr: true,
  loading: () => <div style={{ minHeight: '200px' }} />,
});
const FAQ = dynamic(() => import('@/components/FAQ'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />,
});

  // Advanced SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'İveco Daily 120-14, 85-12, 65-9, 50NC, Eurobus Yedek Parça | Fiat Ducato 2.3, 3.0 | Foton, Karataş Traktör | Mutlu Akü - Yönel Oto',
  description: 'İveco Daily (120-14, 85-12, 65-9, 50NC, Eurobus), Fiat Ducato (2.3, 3.0), Foton Traktör, Karataş Traktör yedek parçaları ve Mutlu Akü. Orijinal yedek parça, fren balata, motor parçaları, filtre. Tüm Türkiye\'ye hızlı teslimat, 50+ yıl tecrübe. Online yedek parça satışı.',
  keywords: 'iveco daily 120-14 yedek parça, iveco 85-12 yedek parça, iveco 65-9 yedek parça, iveco 50nc yedek parça, iveco eurobus yedek parça, fiat ducato 2.3 yedek parça, fiat ducato 3.0 yedek parça, foton traktör yedek parça, karataş traktör yedek parça, mutlu akü, orijinal yedek parça, online yedek parça, türkiye geneli yedek parça, tüm türkiye yedek parça, türkiye yedek parça satışı, iveco daily fren balata, iveco motor parçaları, ducato filtre',
  alternates: {
    canonical: 'https://yonelotoyedekparca.com',
  },
  authors: [{ name: 'Yönel Oto Yedek Parça' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'İveco Daily 120-14, 85-12, 65-9, 50NC, Eurobus Yedek Parça | Fiat Ducato 2.3, 3.0 | Foton, Karataş Traktör',
    description: 'İveco Daily (120-14, 85-12, 65-9, 50NC, Eurobus), Fiat Ducato (2.3, 3.0), Foton Traktör, Karataş Traktör yedek parçaları ve Mutlu Akü. Orijinal yedek parça, tüm Türkiye\'ye hızlı teslimat, 50+ yıl tecrübe.',
    url: 'https://yonelotoyedekparca.com',
    siteName: 'Yönel Oto Yedek Parça',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yönel Oto Yedek Parça - İveco, Ducato, Foton, Karataş, Mutlu Akü',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İveco Daily 120-14, 85-12, 65-9, 50NC, Eurobus | Fiat Ducato 2.3, 3.0 | Foton, Karataş Traktör Yedek Parça',
    description: 'İveco Daily (120-14, 85-12, 65-9, 50NC, Eurobus), Fiat Ducato (2.3, 3.0), Foton Traktör, Karataş Traktör yedek parçaları ve Mutlu Akü. Orijinal yedek parça, hızlı teslimat.',
    images: ['/twitter-image.jpg'],
  },
};

export default async function Home() {
  // Server-side data fetching (SSR) - İveco Products with Stable Order
  let featuredProducts: Array<{ Id: number; Name: string; Description?: string; ImageUrl?: string; CategoryName?: string; SubCategoryName?: string }> = [];
  
  try {
    const result = await ProductsRepository.findAll({ 
      limit: 6, // 6 ürün direkt çekiyoruz
      search: 'iveco'
    });
    
    // Ürünleri direkt kullan (stable order for hydration)
    featuredProducts = result.products;
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️ Products could not be loaded (database not configured)');
    }
  }

  // Kategori ID'den slug'a mapping (sabit değerler - hydration hatası önleme)
  const categorySlugMap: Record<number, string> = {
    17: 'iveco-daily',
    22: 'iveco-120-14',
    23: 'iveco-85-12',
    24: 'iveco-65-9',
    25: 'iveco-50nc',
    34: 'foton',
    36: 'mutlu-aku',
    45: 'karatas',
    55: 'fiat-ducato',
  };

  // Helper function to get category slug by ID
  const getCategorySlugById = (id: number): string => {
    return categorySlugMap[id] || '';
  };

  // Brand categories with models
  const brands = [
    {
      name: 'İveco Daily',
      models: ['120-14', '85-12', '65-9', '50NC', 'Daily'],
      icon: '🚐',
      image: '/assets/dailly.png',
      description: 'İveco Daily serisi için orijinal yedek parçalar',
      slug: 'iveco-daily',
    },
    {
      name: 'Fiat Ducato',
      models: ['Ducato 2.3', 'Ducato 3.0', 'Tüm Modeller'],
      icon: '🚚',
      image: '/assets/d.png',
      description: 'Fiat Ducato ticari araç yedek parçaları',
      slug: 'fiat-ducato',
    },
    {
      name: 'Karataş Traktör',
      models: ['Tüm Modeller'],
      icon: '🚜',
      image: '/assets/karat.png',
      description: 'Karataş traktör yedek parça ve aksesuar çeşitleri',
      slug: 'karatas',
    },
    {
      name: 'Foton Traktör',
      models: ['Tüm Modeller'],
      icon: '🚜',
      image: '/assets/foton.png',
      description: 'Foton traktör yedek parçaları ve bakım ürünleri',
      slug: 'foton',
    },
    {
      name: 'Mutlu Akü',
      models: ['Tüm Kapasiteler'],
      icon: '🔋',
      image: '/images/60aku.png',
      description: 'Mutlu akü çeşitleri, güvenilir enerji çözümleri',
      slug: 'mutlu-aku',
    },
  ];

  // Product categories with SEO data
  const productCategories = [
    { 
      name: 'Fren Sistemleri', 
      link: '/urunler?search=fren',
      description: 'Fren balata, disk ve hidrolik parçaları',
      color: 'from-red-500 to-red-700',
    },
    { 
      name: 'Motor Yedek Parça', 
      link: '/urunler?search=motor',
      description: 'Motor revizyonu ve motor parçaları',
      color: 'from-blue-500 to-blue-700',
    },
    { 
      name: 'Filtre Grubu', 
      link: '/urunler?search=filtre',
      description: 'Yağ, hava, yakıt ve polen filtreleri',
      color: 'from-green-500 to-green-700',
    },
    { 
      name: 'Elektrik Sistemleri', 
      link: '/urunler?search=elektrik',
      description: 'Alternatör, marş ve elektrik aksam',
      color: 'from-yellow-500 to-orange-600',
    },
    { 
      name: 'Yağlar', 
      link: '/urunler?search=yağ',
      description: 'Motor, şanzıman ve hidrolik yağları',
      color: 'from-purple-500 to-purple-700',
    },
    { 
      name: 'Balata & Kampana', 
      link: '/urunler?search=balata',
      description: 'Fren balata, kampana ve baskı',
      color: 'from-gray-600 to-gray-800',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Advanced Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://yonelotoyedekparca.com/#organization',
                name: 'Yönel Oto Yedek Parça',
                url: 'https://yonelotoyedekparca.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://yonelotoyedekparca.com/assets/logo.jpg',
                  width: 260,
                  height: 120,
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+90-554-259-72-73',
                  contactType: 'Customer Service',
                  areaServed: {
                    '@type': 'Country',
                    name: 'Türkiye',
                  },
                  availableLanguage: 'Turkish',
                },
                sameAs: [
                  'https://yonelotoyedekparca.com',
                ],
              },
              {
                '@type': 'LocalBusiness',
                '@id': 'https://yonelotoyedekparca.com/#localbusiness',
                name: 'Yönel Oto Yedek Parça',
                image: 'https://yonelotoyedekparca.com/og-image.jpg',
                url: 'https://yonelotoyedekparca.com',
                telephone: '+905542597273',
                priceRange: '$$',
                areaServed: {
                  '@type': 'Country',
                  name: 'Türkiye',
                },
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'TR',
                },
                openingHoursSpecification: [
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    opens: '08:00',
                    closes: '18:00',
                  },
                ],
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.8',
                  reviewCount: '250',
                  bestRating: '5',
                  worstRating: '1',
                },
              },
              {
                '@type': 'AutoPartsStore',
                name: 'Yönel Oto Yedek Parça',
                description: 'İveco Daily (120-14, 85-12, 65-9, 50NC, Eurobus), Fiat Ducato (2.3, 3.0), Foton Traktör, Karataş Traktör yedek parçaları ve Mutlu Akü satışı. Tüm Türkiye\'ye online yedek parça satışı. Orijinal yedek parça, fren balata, filtre, motor parçaları.',
                url: 'https://yonelotoyedekparca.com',
                telephone: '+905542597273',
                email: 'tokatyonelotoyedekparca@gmail.com',
                areaServed: {
                  '@type': 'Country',
                  name: 'Türkiye',
                },
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'TR',
                },
                openingHoursSpecification: [
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    opens: '08:00',
                    closes: '18:00',
                  },
                ],
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'Yedek Parça Katalog',
                  itemListElement: [
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Product',
                        name: 'İveco Daily 120-14 Yedek Parça',
                        description: 'İveco Daily 120-14 modeline özel orijinal yedek parçalar - fren balata, motor parçaları, filtre. Tüm Türkiye\'ye online satış ve hızlı teslimat.',
                        url: 'https://yonelotoyedekparca.com/urunler?search=iveco+120-14',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Product',
                        name: 'İveco Daily 85-12 Yedek Parça',
                        description: 'İveco Daily 85-12 modeline özel orijinal yedek parçalar. Tüm Türkiye\'ye online satış ve hızlı teslimat.',
                        url: 'https://yonelotoyedekparca.com/urunler?search=iveco+85-12',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Product',
                        name: 'İveco Daily 65-9 Yedek Parça',
                        description: 'İveco Daily 65-9 modeline özel orijinal yedek parçalar. Tüm Türkiye\'ye online satış ve hızlı teslimat.',
                        url: 'https://yonelotoyedekparca.com/urunler?search=iveco+65-9',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Product',
                        name: 'İveco Daily 50NC Yedek Parça',
                        description: 'İveco Daily 50NC modeline özel orijinal yedek parçalar. Tüm Türkiye\'ye online satış ve hızlı teslimat.',
                        url: 'https://yonelotoyedekparca.com/urunler?search=iveco+50nc',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Product',
                        name: 'İveco Eurobus Yedek Parça',
                        description: 'İveco Eurobus modeline özel orijinal yedek parçalar. Tüm Türkiye\'ye online satış ve hızlı teslimat.',
                        url: 'https://yonelotoyedekparca.com/urunler?search=iveco+eurobus',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Product',
                        name: 'Fiat Ducato 2.3 Yedek Parça',
                        description: 'Fiat Ducato 2.3 motor yedek parçaları - orijinal ve yan sanayi. Tüm Türkiye\'ye online satış ve hızlı teslimat.',
                        url: 'https://yonelotoyedekparca.com/urunler?search=ducato+2.3',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Product',
                        name: 'Fiat Ducato 3.0 Yedek Parça',
                        description: 'Fiat Ducato 3.0 motor yedek parçaları - orijinal ve yan sanayi. Tüm Türkiye\'ye online satış ve hızlı teslimat.',
                        url: 'https://yonelotoyedekparca.com/urunler?search=ducato+3.0',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Product',
                        name: 'Foton Traktör Yedek Parça',
                        description: 'Foton traktör parçaları ve aksesuar - hidrolik sistemler, motor parçaları. Tüm Türkiye\'ye online satış ve hızlı teslimat.',
                        url: 'https://yonelotoyedekparca.com/urunler?search=foton',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Product',
                        name: 'Karataş Traktör Yedek Parça',
                        description: 'Karataş traktör yedek parça ve hidrolik sistemler. Tüm Türkiye\'ye online satış ve hızlı teslimat.',
                        url: 'https://yonelotoyedekparca.com/urunler?search=karataş',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Product',
                        name: 'Mutlu Akü',
                        description: 'Tüm araç tipleri için Mutlu akü çeşitleri - araç ve traktör aküleri. Tüm Türkiye\'ye online satış ve hızlı teslimat.',
                        url: 'https://yonelotoyedekparca.com/urunler?search=mutlu',
                      },
                    },
                  ],
                },
              },
              {
                '@type': 'WebSite',
                '@id': 'https://yonelotoyedekparca.com/#website',
                url: 'https://yonelotoyedekparca.com',
                name: 'Yönel Oto Yedek Parça',
                description: 'İveco Daily (120-14, 85-12, 65-9, 50NC, Eurobus), Fiat Ducato (2.3, 3.0), Foton Traktör, Karataş Traktör Yedek Parçaları ve Mutlu Akü',
                publisher: {
                  '@id': 'https://yonelotoyedekparca.com/#organization',
                },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://yonelotoyedekparca.com/urunler?search={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
            ],
          }),
        }}
      />

      {/* Modern Hero Slider - Komatsu Style */}
      <ModernHeroSlider />

      {/* Main Title Section - SEO Focused */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Heading - H1 for SEO */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-6 leading-tight">
              İveco Daily 120-14, 85-12, 65-9, 50NC, Eurobus ve Fiat Ducato 2.3, 3.0 Yedek Parçaları
            </h1>
            
            {/* Description - SEO Optimized */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-5xl mx-auto font-medium mb-4">
              <strong>İveco Daily</strong> (120-14, 85-12, 65-9, 50NC, Eurobus), <strong>Fiat Ducato</strong> (2.3, 3.0), 
              <strong> Foton Traktör</strong>, <strong>Karataş Traktör</strong> yedek parçaları ve <strong>Mutlu Akü</strong> 
              satışında Türkiye'nin güvenilir adresi. <strong>Tüm Türkiye'ye online yedek parça satışı</strong> ve hızlı teslimat. 50+ yıllık tecrübe ile orijinal ve kaliteli yan sanayi ürünleri.
            </p>
            
            {/* SEO Keywords as H2 */}
            <h2 className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-5xl mx-auto font-semibold mb-2">
              Tüm Türkiye'ye Online Yedek Parça Satışı | Foton Traktör, Karataş Traktör ve Mutlu Akü
            </h2>

          </div>
        </div>
      </section>

      {/* Brands Section - Komatsu Style with Scroll Animations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Satış Yaptığımız Markalar
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                İveco (Daily, 120-14, 85-12, 65-9, 50NC, Eurobus) Fiat Ducato, Foton Traktör, Karataş Traktör ürünlerinin 
                tüm orijinal yedek parçalarını bulabilirsiniz
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {brands.map((brand, index) => {
              // Animasyon sınıflarını belirle
              let animationClass = '';
              let delayClass = '';
              
              if (index === 0 || index === 1) {
                animationClass = 'animate__animated animate__fadeInLeft';
                delayClass = index === 1 ? 'animate__delay-200ms' : '';
              } else if (index === 2) {
                animationClass = 'animate__animated animate__fadeInDown';
                delayClass = 'animate__delay-300ms';
              } else if (index === 3 || index === 4) {
                animationClass = 'animate__animated animate__fadeInRight';
                delayClass = index === 4 ? 'animate__delay-200ms' : '';
              }
              
              // Link ekle
              const brandWithLink = {
                ...brand,
                link: `/urunler/${brand.slug}`,
              };
              
              return (
                <AnimatedBrandCard
                  key={brand.name}
                  brand={brandWithLink}
                  index={index}
                  animationClass={animationClass}
                  delayClass={delayClass}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* İveco Modelleri - Premium Design */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-bold mb-4 uppercase tracking-wider">
                İveco Serisi
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                İveco Modelleri
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                İveco serisi tüm modeller için orijinal ve yan sanayi yedek parça stoğumuz mevcuttur
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { model: '120-14', categoryId: 22, popular: true },
              { model: '85-12', categoryId: 23, popular: true },
              { model: '65-9', categoryId: 24, popular: false },
              { model: '50NC', categoryId: 25, popular: false },
              { model: 'Daily 4x4', categoryId: 17, popular: false },
            ].map(({ model, categoryId, popular }, index) => {
              const categorySlug = getCategorySlugById(categoryId);
              const href = categorySlug ? `/urunler/${categorySlug}` : '/urunler';
              
              return (
                <Link
                  key={model}
                  href={href}
                  className="group relative overflow-hidden"
                >
              
                <div className={`relative h-full rounded-2xl p-6 transition-all duration-500 border-2 ${
                  popular 
                    ? 'bg-gradient-to-br from-primary/5 via-red-50 to-orange-50 border-primary/30 hover:border-primary shadow-lg' 
                    : 'bg-white border-gray-200 hover:border-primary/50 shadow-md'
                } hover:shadow-2xl hover:-translate-y-2`}>
                  
                  {/* Popular Badge */}
                  {popular && (
                    <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                      Popüler
                    </div>
                  )}
                  
                  {/* Number Badge - Modern */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 font-bold text-lg transition-all duration-300 ${
                    popular
                      ? 'bg-gradient-to-br from-primary to-red-700 text-white shadow-lg group-hover:scale-110'
                      : 'bg-gray-100 text-gray-700 group-hover:bg-primary group-hover:text-white'
                  }`}>
                    {index + 1}
                  </div>

                  {/* Model Name */}
                  <h3 className={`text-2xl font-bold mb-2 transition-colors ${
                    popular ? 'text-primary' : 'text-gray-900 group-hover:text-primary'
                  }`}>
                    İveco {model}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-gray-600 mb-4 font-medium">
                    Yedek Parça
                  </p>

                  {/* CTA Arrow */}
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Ürünleri Gör</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Decorative Element */}
                  <div className={`absolute bottom-0 right-0 w-24 h-24 rounded-tl-full transition-opacity duration-300 ${
                    popular 
                      ? 'bg-gradient-to-br from-primary/5 to-transparent' 
                      : 'bg-gray-50 group-hover:bg-primary/5'
                  }`} />
                </div>
              </Link>
            );
            })}
          </div>
        </div>
      </section>

           {/* Product Categories - Premium SEO Optimized */}
      <section className="py-20 bg-white" itemScope itemType="https://schema.org/ItemList">
        <div className="container mx-auto px-4">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <div className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-full text-sm font-bold mb-4 uppercase tracking-wider">
                Kategoriler
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Ürün Kategorileri
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Aradığınız tüm yedek parça kategorilerinde hizmetinizdeyiz
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((category, index) => (
              <Link
                key={category.name}
                href={category.link}
                className="group relative overflow-hidden"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String(index + 1)} />
                <div className="relative h-full bg-white rounded-2xl border-2 border-gray-200 hover:border-transparent p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Number Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {index + 1}
                      </div>
                      <svg 
                        className="w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    {/* Category Name */}
                    <h3 
                      className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300"
                      itemProp="name"
                    >
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p 
                      className="text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300 leading-relaxed"
                      itemProp="description"
                    >
                      {category.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-6 flex items-center gap-2 text-primary group-hover:text-white font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      <span>Ürünleri İncele</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Corner Element */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-50 rounded-full group-hover:bg-white/10 transition-colors duration-500" />
                </div>
              </Link>
            ))}
          </div>

          {/* SEO Rich Content */}
          <ScrollFadeIn>
            <div className="mt-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                  Yedek Parça Kategorilerimiz
                </h3>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    <strong>İveco (Daily, 120-14, 85-12, 65-9, 50NC, Eurobus), Fiat Ducato, Foton ve Karataş Traktör</strong> araçlarınız için ihtiyaç duyduğunuz 
                    tüm <strong>orijinal ve yan sanayi yedek parçaları</strong> kapsamlı kategorilerimizde bulabilirsiniz.
                  </p>
                  <p className="mb-4">
                    <strong className="text-primary">Fren Sistemleri:</strong> Güvenli sürüş için kaliteli fren balata, fren diski, 
                    hidrolik fren parçaları ve ABS sensörleri stoklarımızda mevcuttur.
                  </p>
                  <p className="mb-4">
                    <strong className="text-primary">Motor ve Filtre Grubu:</strong> Aracınızın performansını artıran motor yedek parçaları, 
                    yağ filtresi, hava filtresi, yakıt filtresi ve polen filtreleri ile motor ömrünü uzatın.
                  </p>
                  <p>
                    50+ yıllık tecrübemizle, <strong>aynı gün kargo</strong> ve <strong>uzman destek</strong> garantisiyle 
                    hizmetinizdeyiz. Tüm kategorilerde <strong>orijinal ürün garantisi</strong> sunuyoruz.
                  </p>
                </div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Featured Products - İveco */}
      {featuredProducts.length > 0 && (
        <section 
          className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
          itemScope 
          itemType="https://schema.org/ItemList"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollFadeIn>
              {/* Header Section with Premium Design */}
              <div className="text-center mb-16">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-red-700 text-white px-6 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>İVECO YEDEK PARÇA</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                {/* Main Title */}
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight"
                  itemProp="name"
                >
                  İveco <span className="text-primary">Öne Çıkan</span> Ürünler
                </h2>

                {/* Description with SEO-rich keywords */}
                <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
                  <strong className="text-primary">İveco Daily 120-14, 85-12, 65-9, 50NC</strong> ve 
                  <strong className="text-primary"> Eurobus</strong> modelleri için en çok tercih edilen 
                  <strong> orijinal ve yan sanayi yedek parçalar</strong>. 
                  Motor, fren, şanzıman ve elektrik sistemleri için 50+ yıllık tecrübe ile hizmetinizdeyiz.
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 px-5 py-3 rounded-xl shadow-md">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-gray-600 font-semibold">İveco Ürünü</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm border-2 border-green-500/20 px-5 py-3 rounded-xl shadow-md">
                    <div className="text-2xl font-bold text-green-600">%100</div>
                    <div className="text-sm text-gray-600 font-semibold">Orijinal Garanti</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm border-2 border-blue-500/20 px-5 py-3 rounded-xl shadow-md">
                    <div className="text-2xl font-bold text-blue-600">24 Saat</div>
                    <div className="text-sm text-gray-600 font-semibold">Hızlı Teslimat</div>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Products Grid with Modern Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.Id} 
                  className="relative"
                  itemProp="itemListElement" 
                  itemScope 
                  itemType="https://schema.org/Product"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 z-20 bg-gradient-to-br from-primary to-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Popularity Badge for First Item */}
                  {index === 0 && (
                    <div className="absolute -top-4 -right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      ÇOK SATAN
                    </div>
                  )}

                  {/* Product Card */}
                  <ModernProductCard product={product} />

                  {/* Schema.org Hidden Data */}
                  <meta itemProp="position" content={String(index + 1)} />
                  <meta itemProp="name" content={product.Name} />
                  <meta itemProp="url" content={`https://www.yonelotoyedekparca.com/products/${product.Id}`} />
                </div>
              ))}
            </div>

            {/* CTA Section - Premium Design */}
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-gray-50 to-white p-8 rounded-3xl shadow-xl border-2 border-primary/20">
                <p className="text-gray-700 text-lg mb-6 max-w-2xl">
                  İveco araçlarınız için <strong className="text-primary">500+ farklı ürün</strong> seçeneğimiz bulunmaktadır. 
                  Tüm İveco yedek parçalarını incelemek için aşağıdaki butona tıklayın.
                </p>

                <Link
                  href={`/urunler/${getCategorySlugById(17)}`}
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-red-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  itemProp="url"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>Tüm İveco Ürünlerini Görüntüle</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Additional Info */}
                <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Orijinal Ürün Garantisi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span className="font-semibold">Türkiye Geneli Kargo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">50+ Yıllık Tecrübe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schema.org Hidden Data */}
          <meta itemProp="numberOfItems" content={String(featuredProducts.length)} />
          <meta itemProp="itemListOrder" content="https://schema.org/ItemListOrderAscending" />
        </section>
      )}

      {/* Strong CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-red-700 to-red-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main CTA Content */}
            <div className="text-center mb-12">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <span className="text-white font-bold text-sm">🎯 HEMEN ARAYIN</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Aradığınız Yedek Parçayı<br />
                <span className="text-yellow-300">Hemen Bulalım!</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-red-50 mb-4 max-w-3xl mx-auto leading-relaxed">
                İveco Daily, Fiat Ducato, Foton, Karataş Traktör ve Mutlu Akü için 
                <strong className="text-white"> 50+ yıllık tecrübemizle </strong> 
                size en doğru yedek parçayı buluyoruz!
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white font-semibold">✅ Orijinal Ürün Garantisi</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white font-semibold">🚚 Aynı Gün Kargo</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white font-semibold">💰 Havale - Nakit</span>
                </div>
              </div>
            </div>

            {/* Contact Methods - Large Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Phone Button */}
              <a
                href="tel:+905542597273"
                className="group bg-white text-gray-900 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Hemen Arayın</h3>
                  <p className="text-3xl font-bold text-primary mb-2 group-hover:text-white transition-colors">
                    0554 259 72 73
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">
                    Uzman ekibimiz hizmetinizde
                  </p>
                </div>
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/905542597273?text=Merhaba, yedek parça hakkında bilgi almak istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-gray-900 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">WhatsApp Destek</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2 group-hover:text-white transition-colors">
                    Mesaj Gönderin
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">
                    Hızlı ve kolay iletişim
                  </p>
                </div>
              </a>

              {/* Contact Page Button */}
              <Link
                href="/iletisim"
                className="group bg-white text-gray-900 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">İletişim Formu</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2 group-hover:text-white transition-colors">
                    Mesaj Bırakın
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">
                    24 saat içinde yanıt veriyoruz
                  </p>
                </div>
              </Link>
            </div>

            {/* Extra Info */}
            <div className="mt-12 text-center">
              <p className="text-red-50 text-lg mb-4">
                📍 <strong>Tokat</strong> merkezli, <strong>Türkiye geneline</strong> hızlı kargo ile hizmet veriyoruz
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-red-100">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>Pzt-Cmt: 08:00-18:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>tokatyonelotoyedekparca@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Comprehensive SEO Content Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main SEO Title */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                OTO YEDEK PARÇADA ONLİNE ALIŞVERİŞ
              </h2>
              <p className="text-xl text-gray-600">
                İveco Daily, Fiat Ducato, Foton ve Karataş Traktör Yedek Parçalarında Türkiye'nin Güvenilir Adresi
              </p>
            </div>

            {/* İveco Section */}
            <div className="mb-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-primary pb-4">
                İveco Daily Yedek Parça - Tüm Modeller
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>İveco Daily</strong> araç sahipleri için en kapsamlı yedek parça stoğuna sahibiz. 
                  <strong className="text-primary"> İveco Daily 120-14</strong>, 
                  <strong className="text-primary"> İveco Daily 85-12</strong>, 
                  <strong className="text-primary"> İveco Daily 65-9</strong>, 
                  <strong className="text-primary"> İveco Daily 50NC</strong> ve 
                  <strong className="text-primary"> İveco Daily 4x4</strong> modelleri için motor aksamı, 
                  şanzıman, diferansiyel, fren sistemi, elektrik parçaları ve kaporta ürünlerinde 
                  hem orijinal hem de kaliteli muadil ürünler sunmaktayız.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <div className="font-bold text-primary text-lg">Motor 2.3</div>
                    <div className="text-sm text-gray-600">C13-C15</div>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <div className="font-bold text-primary text-lg">Motor 2.8</div>
                    <div className="text-sm text-gray-600">C11-C13</div>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <div className="font-bold text-primary text-lg">Motor 3.0</div>
                    <div className="text-sm text-gray-600">C15-C17</div>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <div className="font-bold text-primary text-lg">Tüm Aksam</div>
                    <div className="text-sm text-gray-600">Stokta</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <strong>İveco Daily yedek parça</strong> kategorisinde; debriyaj ve volant, 
                  fren balata ve diski, yağ ve hava filtresi, yakıt filtresi, alternatör, 
                  marş motoru, şarj dinamosu, su pompası, termostat gibi tüm bakım ürünleri 
                  depolarımızda mevcuttur. İveco orijinal yedek parça tercihinizde 
                  maksimum 2 iş günü içerisinde adresinize teslim ediyoruz.
                </p>
              </div>
            </div>

            {/* Fiat Ducato Section */}
            <div className="mb-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-primary pb-4">
                Fiat Ducato Yedek Parça - 2.3 ve 3.0 Motor
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Fiat Ducato</strong> ticari araçlarınız için en kaliteli yedek parçaları sunuyoruz. 
                  <strong className="text-primary"> Fiat Ducato 2.3 MultiJet</strong> ve 
                  <strong className="text-primary"> Fiat Ducato 3.0 MultiJet</strong> motor modellerine özel 
                  orijinal ve yan sanayi yedek parçalarımız bulunmaktadır. Ducato fren balata, 
                  motor yağ filtresi, hava filtresi, polen filtresi, su pompası, debriyaj seti, 
                  alternatör ve marş motoru gibi kritik parçalarda güvenle alışveriş yapabilirsiniz.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg my-4">
                  <h4 className="font-bold text-lg mb-3">Ducato Yedek Parça Kategorileri:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-gray-700">
                    <li>✓ Motor Yedek Parça (2.3 / 3.0)</li>
                    <li>✓ Fren Sistemi (Balata, Disk)</li>
                    <li>✓ Filtre Grubu (Yağ, Hava, Yakıt)</li>
                    <li>✓ Elektrik Sistemleri</li>
                    <li>✓ Debriyaj & Volant</li>
                    <li>✓ Şanzıman Parçaları</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Foton Traktör Section */}
            <div className="mb-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-primary pb-4">
                Foton Traktör Yedek Parça - Tüm Modeller
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Foton Traktör</strong> sahipleri için en kapsamlı yedek parça stoğunu sunuyoruz. 
                  Tarımda güvenilirlik ve dayanıklılığıyla öne çıkan Foton traktörleriniz için 
                  motor parçaları, hidrolik sistem elemanları, şanzıman aksam, fren grubu ve 
                  elektrik sistemleri başta olmak üzere tüm yedek parça kategorilerinde hizmet veriyoruz.
                </p>
                
                {/* Foton Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-600 text-white p-3 rounded-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Motor Yedek Parça</h4>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Piston ve Piston Segmanları</li>
                      <li>✓ Silindir Kapağı ve Contaları</li>
                      <li>✓ Enjektör ve Yakıt Pompaları</li>
                      <li>✓ Su Pompası ve Termostat</li>
                      <li>✓ Krank ve Kam Milleri</li>
                      <li>✓ Turbo ve Kompresör Parçaları</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-600 text-white p-3 rounded-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Hidrolik Sistem</h4>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Hidrolik Pompa ve Motorlar</li>
                      <li>✓ Hidrolik Silindir ve Pistonlar</li>
                      <li>✓ Hidrolik Hortum ve Rakordlar</li>
                      <li>✓ Kontrol Vanaları</li>
                      <li>✓ Hidrolik Filtreler</li>
                      <li>✓ Lift Kol Aksam Parçaları</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-red-600 text-white p-3 rounded-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Şanzıman & Fren</h4>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Debriyaj Balata ve Baskı</li>
                      <li>✓ Şanzıman Dişli Takımları</li>
                      <li>✓ Fren Balata ve Disk</li>
                      <li>✓ Fren Hidrolik Sistemi</li>
                      <li>✓ Diferansiyel Parçaları</li>
                      <li>✓ Şaft ve Mafsallar</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-yellow-600 text-white p-3 rounded-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Elektrik & Filtre</h4>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Marş Motoru ve Alternatör</li>
                      <li>✓ Far ve Sinyal Lambası</li>
                      <li>✓ Akü ve Kablo Tesisatı</li>
                      <li>✓ Yağ ve Hava Filtresi</li>
                      <li>✓ Yakıt Filtresi</li>
                      <li>✓ Hidrolik Yağ Filtresi</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 mt-6">
                  <p className="text-gray-700 leading-relaxed mb-0">
                    💡 <strong>Foton Traktör İpucu:</strong> Traktörünüzün performansını maksimum seviyede tutmak için 
                    periyodik bakımlarınızı aksatmayın. Özellikle filtre değişimleri, hidrolik yağ kontrolleri 
                    ve motor bakımları düzenli yapılmalıdır. Orijinal Foton yedek parça kullanımı, 
                    traktörünüzün ömrünü uzatır ve arıza riskini minimize eder.
                  </p>
                </div>
              </div>
            </div>

            {/* Karataş Traktör Section */}
            <div className="mb-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-primary pb-4">
                Karataş Traktör Yedek Parça - Yerli Üretim Güvencesi
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Karataş Traktör</strong>, Türkiye'nin yerli üretim traktör markalarından biridir. 
                  Karataş traktörleriniz için orijinal ve yan sanayi yedek parçalarında uzman kadromuz 
                  ve geniş stoklarımızla hizmetinizdeyiz. Tarla çalışmalarınızda kesintisiz üretim için 
                  ihtiyaç duyduğunuz tüm yedek parçaları hızlı ve güvenilir şekilde tedarik ediyoruz.
                </p>

                {/* Karataş Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl text-center border-2 border-primary/20 hover:shadow-lg transition-all">
                    <div className="text-5xl mb-4">🚜</div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Yerli Üretim</h4>
                    <p className="text-gray-600 text-sm">Türk yapımı traktör parçaları</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl text-center border-2 border-primary/20 hover:shadow-lg transition-all">
                    <div className="text-5xl mb-4">⚙️</div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Uyumlu Parçalar</h4>
                    <p className="text-gray-600 text-sm">%100 uyumlu yedek parça</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl text-center border-2 border-primary/20 hover:shadow-lg transition-all">
                    <div className="text-5xl mb-4">📦</div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Hızlı Tedarik</h4>
                    <p className="text-gray-600 text-sm">Aynı gün kargoya hazır</p>
                  </div>
                </div>

                {/* Karataş Product Categories */}
                <div className="bg-gray-50 p-8 rounded-xl my-6 border-2 border-gray-200">
                  <h4 className="font-bold text-2xl mb-6 text-gray-900 text-center">
                    Karataş Traktör Yedek Parça Kategorileri
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl">🔧</div>
                      <div>
                        <div className="font-semibold text-gray-900">Motor Parçaları</div>
                        <div className="text-sm text-gray-600">Piston, segman, krank</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl">💧</div>
                      <div>
                        <div className="font-semibold text-gray-900">Hidrolik Sistem</div>
                        <div className="text-sm text-gray-600">Pompa, silindir, hortum</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl">⚙️</div>
                      <div>
                        <div className="font-semibold text-gray-900">Şanzıman</div>
                        <div className="text-sm text-gray-600">Dişli, rulman, conta</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl">🛞</div>
                      <div>
                        <div className="font-semibold text-gray-900">Fren Sistemi</div>
                        <div className="text-sm text-gray-600">Balata, disk, silindir</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl">🔌</div>
                      <div>
                        <div className="font-semibold text-gray-900">Elektrik</div>
                        <div className="text-sm text-gray-600">Marş, alternatör, kablo</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl">🔍</div>
                      <div>
                        <div className="font-semibold text-gray-900">Filtre Grubu</div>
                        <div className="text-sm text-gray-600">Yağ, hava, yakıt filtre</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <div className="font-semibold text-gray-900">Debriyaj</div>
                        <div className="text-sm text-gray-600">Balata, baskı, rulman</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl">🔩</div>
                      <div>
                        <div className="font-semibold text-gray-900">Aksam Parçaları</div>
                        <div className="text-sm text-gray-600">Rotil, kampana, poyra</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl">🎨</div>
                      <div>
                        <div className="font-semibold text-gray-900">Kaporta</div>
                        <div className="text-sm text-gray-600">Far, ayna, panel</div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mt-6">
                  <strong>Karataş Traktör yedek parça</strong> kategorisinde; motor revizyonu, 
                  şanzıman tamiri, hidrolik sistem bakımı, fren sistemi yenileme ve elektrik 
                  tesisatı onarımı için ihtiyaç duyacağınız tüm parçalar stoklarımızda mevcuttur. 
                  Yerli üretimin gücüyle, uygun fiyat avantajı ve hızlı teslimat garantisi sunuyoruz.
                </p>

                <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200 mt-6">
                  <p className="text-gray-700 leading-relaxed mb-0">
                    ⚠️ <strong>Önemli Not:</strong> Karataş traktör yedek parça siparişlerinizde 
                    traktörünüzün model yılını ve seri numarasını belirtmeniz, doğru parçanın 
                    teminini hızlandırır. WhatsApp hattımızdan fotoğraf paylaşarak da ürün 
                    tespiti yaptırabilirsiniz.
                  </p>
                </div>
              </div>
            </div>

            {/* Mutlu Akü Section */}
            <div className="mb-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-primary pb-4">
                Mutlu Akü - Tüm Araç Tipleri İçin
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Mutlu Akü</strong> yetkili satıcısı olarak, otomobil, hafif ticari, 
                  ağır vasıta ve traktör aküsü çeşitlerinde en uygun fiyatları sunuyoruz. 
                  45 Ah'dan 200 Ah'a kadar farklı kapasitelerde Mutlu akü stoğumuz mevcuttur. 
                  Mutlu akü fiyatları ve kampanyalarımız için bizi arayabilirsiniz.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <Testimonials />
    </main>
  );
}