import { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Yönel Oto Yedek Parça',
  description: 'Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metni ve kişisel verilerin korunması politikası.',
  keywords: 'KVKK, kişisel verilerin korunması, gizlilik, veri koruma, aydınlatma metni',
  alternates: {
    canonical: 'https://yonelotoyedekparca.com/kvkk',
  },
};

export default function KVKKPage() {
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
          KVKK Aydınlatma Metni
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
          <strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            1. Veri Sorumlusu
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            <strong>Yönel Oto Yedek Parça</strong> olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla, 
            kişisel verilerinizin işlenmesi ve korunması konusunda aşağıdaki bilgilendirmeyi yapmaktayız.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            <strong>Adres:</strong> Tokat, Türkiye<br />
            <strong>E-posta:</strong> tokatyonelotoyedekparca@gmail.com<br />
            <strong>Telefon:</strong> 0 (554) 259 72 73
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            2. İşlenen Kişisel Veriler
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Web sitemiz üzerinden veya WhatsApp üzerinden iletişime geçtiğinizde aşağıdaki kişisel verileriniz işlenebilmektedir:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Kimlik Bilgileri: Ad, soyad</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>İletişim Bilgileri: Telefon numarası, e-posta adresi</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>İşlem Bilgileri: Talep ettiğiniz ürün bilgileri, sipariş geçmişi</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Teknik Bilgiler: IP adresi, çerez (cookie) bilgileri, tarayıcı bilgileri</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            3. Kişisel Verilerin İşlenme Amaçları
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Ürün ve hizmet taleplerinizin karşılanması</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Müşteri ilişkileri yönetimi ve iletişim</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Sipariş ve teslimat işlemlerinin yürütülmesi</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Yasal yükümlülüklerin yerine getirilmesi</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Web sitesi kullanım analizi ve iyileştirme</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Güvenlik ve dolandırıcılık önleme</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            4. Kişisel Verilerin İşlenme Hukuki Sebepleri
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Kişisel verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayanarak işlenmektedir:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Açık rızanız</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Sözleşmenin kurulması veya ifası</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Yasal yükümlülüklerin yerine getirilmesi</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Meşru menfaatlerimiz</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            5. Kişisel Verilerin Aktarılması
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi kapsamında, yasal yükümlülüklerimiz ve meşru menfaatlerimiz çerçevesinde:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Kargo ve lojistik firmalarına (teslimat amaçlı)</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Muhasebe ve danışmanlık hizmeti sağlayıcılarına (yasal yükümlülükler için)</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Bilişim teknolojileri hizmet sağlayıcılarına (web hosting, güvenlik)</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Yasal zorunluluklar çerçevesinde ilgili kamu kurum ve kuruluşlarına</Typography></li>
          </Box>
          <Typography variant="body1" sx={{ lineHeight: 1.8, fontStyle: 'italic', color: 'text.secondary' }}>
            Kişisel verileriniz yurt dışına aktarılmamaktadır.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            6. Kişisel Verilerin Saklanma Süresi
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Kişisel verileriniz, işlenme amaçlarının gerektirdiği süre boyunca ve yasal saklama sürelerine uygun olarak saklanmaktadır. 
            İşleme amacının sona ermesi veya yasal saklama süresinin dolması halinde, kişisel verileriniz KVKK hükümlerine uygun olarak silinmekte, 
            yok edilmekte veya anonim hale getirilmektedir.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            7. KVKK Kapsamındaki Haklarınız
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            KVKK'nın 11. maddesi uyarınca, kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Kişisel verilerinizin işlenip işlenmediğini öğrenme</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>İşlenmişse buna ilişkin bilgi talep etme</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Eksik veya yanlış işlenmişse düzeltilmesini isteme</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Düzeltme, silme veya yok edilme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</Typography></li>
            <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            8. Başvuru Yöntemi
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Yukarıda belirtilen haklarınızı kullanmak için, kimliğinizi tespit edici belgelerle birlikte:
          </Typography>
          <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontWeight: 600, mb: 1 }}>
              E-posta: tokatyonelotoyedekparca@gmail.com
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontWeight: 600 }}>
              Telefon: 0 (554) 259 72 73
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Başvurularınız en geç 30 gün içinde ücretsiz olarak sonuçlandırılacaktır. Ancak, işlemin ayrıca bir maliyet gerektirmesi halinde 
            Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            9. İletişim
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            KVKK kapsamındaki haklarınız veya kişisel verilerinizin işlenmesi ile ilgili sorularınız için bizimle iletişime geçebilirsiniz.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

