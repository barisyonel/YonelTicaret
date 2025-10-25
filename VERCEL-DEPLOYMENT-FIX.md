# Vercel Deployment Sorununun Çözümü

## Sorun
Build zamanında admin sayfaları veritabanına bağlanmaya çalışıyor ve `ESOCKET` hatası alınıyordu:
```
Error: :1433'e bağlanılamadı - (Sıraya) bağlanılamadı
"/admin/sliders" sayfasının ön işlenmesi sırasında hata oluştu
```

## Çözüm
Admin sayfalarına `export const dynamic = 'force-dynamic'` ekledik. Bu, Next.js'e bu sayfaları build zamanında prerender etmemesini, sadece runtime'da render etmesini söyler.

### Güncellenen Dosyalar
1. ✅ `src/app/admin/page.tsx`
2. ✅ `src/app/admin/sliders/page.tsx`
3. ✅ `src/app/admin/products/page.tsx`
4. ✅ `src/app/admin/categories/page.tsx`
5. ✅ `src/app/admin/products/create/page.tsx`
6. ✅ `src/app/admin/products/edit/[id]/page.tsx`
7. ✅ `src/lib/db.ts` - Daha iyi hata yönetimi eklendi

## Vercel'de Deploy Etmeden Önce Kontrol Listesi

### 1. Environment Variables
Vercel Dashboard'da aşağıdaki environment variable'ları ekleyin:

```env
DB_SERVER=your-sql-server.database.windows.net
DB_NAME=your-database-name
DB_USER=your-username
DB_PASSWORD=your-password
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
JWT_SECRET=your-jwt-secret-key
```

**Önemli:** Bu değerleri hem **Production** hem de **Preview** environment'lara ekleyin!

### 2. SQL Server Firewall Ayarları

#### Azure SQL Server kullanıyorsanız:

1. Azure Portal'a gidin
2. SQL Server > Firewalls and virtual networks
3. Aşağıdaki ayarları yapın:

**Seçenek A: Vercel IP aralıklarını ekleyin**
```
76.76.21.0/24
76.76.19.0/24
```

**Seçenek B: Azure Services'i aktif edin**
- "Allow Azure services and resources to access this server" seçeneğini **ON** yapın

#### Diğer SQL Server kullanıyorsanız:
- Firewall'da Vercel IP aralıklarını whitelist'e ekleyin
- Port 1433'ün açık olduğundan emin olun

### 3. Build ve Deploy

```bash
# Local'de test edin (environment variable'lar .env.local'de olmalı)
npm run build

# Build başarılıysa Vercel'e push edin
git add .
git commit -m "fix: Admin sayfalarına dynamic rendering eklendi"
git push origin main
```

### 4. Deploy Sonrası Test

Deploy tamamlandıktan sonra test edin:
- ✅ Ana sayfa yükleniyor mu?
- ✅ Ürünler sayfası çalışıyor mu?
- ✅ Admin paneline giriş yapılabiliyor mu?
- ✅ Admin sayfaları yükleniyor mu?

## Neden Bu Çözüm Çalışır?

### Önceki Durum:
```typescript
// page.tsx
export default async function AdminPage() {
  const data = await db.query(); // ❌ Build zamanında çalışır
  return <div>...</div>
}
```

Build sırasında → Next.js sayfayı prerender eder → Veritabanına bağlanmaya çalışır → Hata!

### Yeni Durum:
```typescript
// page.tsx
export const dynamic = 'force-dynamic'; // ✅ Build zamanında rendering yok

export default async function AdminPage() {
  const data = await db.query(); // ✅ Sadece runtime'da çalışır
  return <div>...</div>
}
```

Build sırasında → Next.js sayfayı atlar → Runtime'da kullanıcı geldiğinde render eder → Başarılı!

## Ek Notlar

### Admin Sayfaları için Dynamic Rendering Mantıklı Çünkü:
1. ✅ Admin sayfaları her zaman güncel veri göstermeli
2. ✅ SEO önemli değil (zaten authentication gerekiyor)
3. ✅ Prerendering'in performans avantajı yok
4. ✅ Build zamanı kısalır

### Public Sayfalar için Static Rendering Devam Eder:
- Ana sayfa
- Ürünler sayfası
- Hakkımızda
- İletişim
- Blog

Bu sayfalar build zamanında oluşturulur ve ISR (Incremental Static Regeneration) ile güncellenir.

## Sorun Devam Ederse

### 1. Vercel Build Loglarını İnceleyin
```bash
# Vercel dashboard > Deployment > Build Logs
```

### 2. Environment Variables'ı Kontrol Edin
```bash
# Vercel dashboard > Settings > Environment Variables
# Tüm değişkenler hem Production hem Preview'da olmalı
```

### 3. Database Connection String'i Test Edin
- SQL Server Management Studio veya Azure Data Studio ile bağlanmayı deneyin
- Aynı credentials'ları kullanın

### 4. Firewall Kurallarını Kontrol Edin
- Vercel IP'lerinin whitelist'de olduğundan emin olun
- Port 1433'ün açık olduğunu kontrol edin

## Yararlı Linkler

- [Next.js Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel IP Ranges](https://vercel.com/docs/concepts/edge-network/regions)
- [Azure SQL Firewall Rules](https://docs.microsoft.com/en-us/azure/azure-sql/database/firewall-configure)

## Özet

✅ Admin sayfalarına `export const dynamic = 'force-dynamic'` eklendi
✅ Database connection hatası yönetimi iyileştirildi
✅ Build zamanında veritabanı bağlantısı olmayacak
✅ Runtime'da normal şekilde çalışacak

Artık Vercel'e deploy edebilirsiniz! 🚀

