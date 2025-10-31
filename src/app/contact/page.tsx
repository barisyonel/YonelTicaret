import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | Yönel Oto Yedek Parça - Tokat',
  description: 'Yönel Oto Yedek Parça iletişim. Tel: 0554 259 72 73. İveco Daily, Ducato, Foton, Karataş traktör yedek parça. Tokat.',
  keywords: 'yönel oto iletişim, tokat yedek parça iletişim, iveco daily iletişim, yedek parça telefon, tokat oto yedek parça adres',
  openGraph: {
    title: 'İletişim - Yönel Oto Yedek Parça | Tokat',
    description: 'İveco Daily, Ducato, Foton ve Karataş traktör yedek parça. Tel: 0554 259 72 73.',
    url: 'https://yonelotoyedekparca.com/iletisim',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yönel Oto Yedek Parça İletişim',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İletişim - Yönel Oto',
    description: 'Tel: 0554 259 72 73 | Tokat',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://yonelotoyedekparca.com/iletisim',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen py-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Yönel Oto Yedek Parça',
            image: 'https://yonelotoyedekparca.com/og-image.jpg',
            '@id': 'https://yonelotoyedekparca.com',
            url: 'https://yonelotoyedekparca.com',
            telephone: '+905542597273',
            email: 'tokatyonelotoyedekparca@gmail.com',
            priceRange: '$$',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '',
              addressLocality: 'Tokat',
              addressRegion: 'Tokat',
              postalCode: '',
              addressCountry: 'TR',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 40.334797,
              longitude: 36.540769,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '08:00',
                closes: '18:00',
              },
            ],
            sameAs: ['https://yonelotoyedekparca.com'],
          }),
        }}
      />

      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12">İletişim</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6">İletişim Bilgileri</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">📍 Adres</h3>
                <p className="text-gray-600">
                  Yönel Oto Yedek Parça<br />
                  Türkiye
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">📞 Telefon</h3>
                <p className="text-gray-600">
                  <a href="tel:+905542597273" className="hover:text-primary">
                    0 (554) 259 72 73
                  </a>
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Telefon:</span>{' '}
                  <a href="tel:03562143611" className="hover:text-primary">
                    0 (356) 214 36 11
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">📧 Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:tokatyonelotoyedekparca@gmail.com" className="hover:text-primary">
                    tokatyonelotoyedekparca@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">⏰ Çalışma Saatleri</h3>
                <p className="text-gray-600">
                  Pazartesi - Cumartesi: 08:00 - 18:00<br />
                  Pazar: Kapalı
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="inline-block bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp ile İletişim
              </a>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="bg-gray-200 rounded-lg overflow-hidden h-96 shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3041.3402615865457!2d36.54076967639911!3d40.334797260621315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x407db7f558d93c95%3A0x84e40c2f96ec0062!2sY%C3%96NEL%20OTO%20YEDEK%20PAR%C3%87A!5e0!3m2!1sen!2str!4v1761330905264!5m2!1sen!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Yönel Oto Yedek Parça Konumu"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

