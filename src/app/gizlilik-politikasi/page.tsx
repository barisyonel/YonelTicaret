import { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Yönel Oto Yedek Parça',
  description: 'Yönel Oto Yedek Parça web sitesi gizlilik politikası ve çerez kullanımı hakkında bilgilendirme.',
  keywords: 'gizlilik politikası, çerez politikası, privacy policy, cookie policy',
  alternates: {
    canonical: 'https://yonelotoyedekparca.com/gizlilik-politikasi',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: '#a80000',
            mb: 3,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Gizlilik Politikası
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
          <strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            <strong>Yönel Oto Yedek Parça</strong> olarak, ziyaretçilerimizin ve müşterilerimizin gizliliğine büyük önem vermekteyiz. 
            Bu gizlilik politikası, web sitemizi kullanırken toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklamaktadır.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            1. Toplanan Bilgiler
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Web sitemizi kullanırken aşağıdaki bilgiler toplanabilir:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Kişisel bilgiler (ad, soyad, telefon, e-posta) - sadece siz tarafından sağlandığında</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Teknik bilgiler (IP adresi, tarayıcı türü, işletim sistemi)</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Kullanım bilgileri (ziyaret edilen sayfalar, ziyaret süresi, tıklama verileri)</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Çerez (cookie) bilgileri</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            2. Bilgilerin Kullanımı
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Toplanan bilgiler aşağıdaki amaçlarla kullanılmaktadır:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Ürün ve hizmet taleplerinizin karşılanması</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Müşteri desteği ve iletişim</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Web sitesi performansının iyileştirilmesi</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Kullanıcı deneyiminin geliştirilmesi</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Güvenlik ve dolandırıcılık önleme</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Yasal yükümlülüklerin yerine getirilmesi</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            3. Çerez (Cookie) Politikası
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Web sitemiz, kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek için çerezler kullanmaktadır. 
            Çerezler, web sitesini ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır.
          </Typography>
          
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 2, color: '#2c3e50' }}>
            Kullandığımız Çerez Türleri:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontWeight: 600 }}>
                Zorunlu Çerezler:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, ml: 2 }}>
                Web sitesinin temel işlevlerinin çalışması için gereklidir. Bu çerezler olmadan site düzgün çalışmaz.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontWeight: 600, mt: 1 }}>
                Analitik Çerezler:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, ml: 2 }}>
                Web sitesinin nasıl kullanıldığını anlamamıza yardımcı olur. Bu bilgiler anonimleştirilmiş şekilde toplanır.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontWeight: 600, mt: 1 }}>
                İşlevsellik Çerezleri:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, ml: 2 }}>
                Tercihlerinizi hatırlamamıza ve kişiselleştirilmiş deneyim sunmamıza yardımcı olur.
              </Typography>
            </li>
          </Box>

          <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.8 }}>
            Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz. Ancak, bazı çerezler devre dışı bırakıldığında 
            web sitesinin bazı özellikleri düzgün çalışmayabilir.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            4. Bilgilerin Paylaşılması
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Kişisel bilgileriniz, aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmaz:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Yasal yükümlülükler gereği</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Hizmet sağlayıcılarımızla (kargo, hosting vb.) - sadece hizmet sunumu için gerekli olan bilgiler</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Açık rızanız ile</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            5. Veri Güvenliği
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Kişisel verilerinizin güvenliğini sağlamak için:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>SSL/TLS şifreleme teknolojisi kullanıyoruz</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Güvenli sunucu altyapısı kullanıyoruz</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Düzenli güvenlik güncellemeleri yapıyoruz</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Erişim kontrolleri ve yetkilendirme sistemleri uyguluyoruz</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            6. Üçüncü Taraf Bağlantılar
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Web sitemizde üçüncü taraf web sitelerine (WhatsApp, sosyal medya platformları vb.) bağlantılar bulunabilir. 
            Bu bağlantılara tıkladığınızda, farklı bir web sitesine yönlendirilirsiniz ve o sitenin gizlilik politikası geçerli olur. 
            Üçüncü taraf sitelerin gizlilik uygulamalarından sorumlu değiliz.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            7. Çocukların Gizliliği
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Web sitemiz 18 yaş altındaki çocuklardan bilerek kişisel bilgi toplamamaktadır. 
            Eğer bir çocuğun kişisel bilgilerini topladığımızı fark edersek, bu bilgileri derhal sileriz.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            8. Gizlilik Politikasının Değiştirilmesi
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Değişiklikler web sitemizde yayınlandığında geçerli olur. 
            Önemli değişiklikler için sizi bilgilendirebiliriz. Bu sayfayı düzenli olarak kontrol etmenizi öneririz.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            9. İletişim
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Gizlilik politikamız hakkında sorularınız veya endişeleriniz varsa, lütfen bizimle iletişime geçin:
          </Typography>
          <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontWeight: 600, mb: 1 }}>
              <strong>Yönel Oto Yedek Parça</strong>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>
              E-posta: tokatyonelotoyedekparca@gmail.com
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>
              Telefon: 0 (554) 259 72 73
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Adres: Tokat, Türkiye
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

