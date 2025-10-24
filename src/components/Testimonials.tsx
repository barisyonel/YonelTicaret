'use client';

const testimonials = [
  {
    id: 1,
    name: 'Mehmet Yılmaz',
    company: 'Tokat Nakliyat',
    role: 'Filo Yöneticisi',
    comment: 'İveco Daily 120-14 filomuz için yıllardır Yönel Oto\'dan alışveriş yapıyoruz. Orijinal parça garantisi ve hızlı teslimat sayesinde araçlarımız hiç yolda kalmıyor. Kesinlikle tavsiye ederim!',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    id: 2,
    name: 'Ahmet Kaya',
    company: 'Kaya Tarım',
    role: 'Çiftlik Sahibi',
    comment: 'Foton traktörüm için ihtiyacım olan tüm parçaları buradan temin ediyorum. Uygun fiyat, kaliteli ürün ve güler yüzlü hizmet. 50 yıllık tecrübe gerçekten fark yaratıyor.',
    rating: 5,
    avatar: '👨‍🌾',
  },
  {
    id: 3,
    name: 'Ali Demir',
    company: 'Demir Lojistik',
    role: 'İşletme Müdürü',
    comment: 'Fiat Ducato araçlarımız için en güvenilir tedarikçimiz. Acil durumlarda bile aynı gün kargo ile parçaları alabiliyoruz. Profesyonel yaklaşım için teşekkürler!',
    rating: 5,
    avatar: '👔',
  },
  {
    id: 4,
    name: 'Hasan Öztürk',
    company: 'Öztürk Tarım Makineleri',
    role: 'Çiftçi',
    comment: 'Karataş traktörüm için yedek parça bulmakta zorlanıyordum. Yönel Oto sayesinde hem orijinal hem de uygun fiyatlı parçalara ulaşabiliyorum. Hasat sezonunda bana çok yardımcı oldular.',
    rating: 5,
    avatar: '🚜',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ⭐ MÜŞTERİ YORUMLARI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            50 yıllık tecrübemiz ve binlerce mutlu müşterimizle sektörün güvenilir ismi
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.comment}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-primary font-semibold">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-6 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-gray-900">10.000+ Mutlu Müşteri</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-gray-900">4.8/5 Müşteri Memnuniyeti</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="font-bold text-gray-900">50+ Yıllık Tecrübe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

