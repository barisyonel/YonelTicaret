# 🚀 Vercel Otomatik Deployment Rehberi

## 📋 GitHub Branch'i Push Edildi

**Branch:** `update/production-optimizations`  
**Repository:** https://github.com/barisyonel/YonelTicaret

---

## ✅ Vercel'de Otomatik Deployment Ayarları

### 1. Vercel Dashboard'a Giriş
1. https://vercel.com adresine gidin
2. GitHub hesabınızla giriş yapın
3. "Add New Project" butonuna tıklayın

### 2. Repository Bağlama
1. Repository listesinden `barisyonel/YonelTicaret` seçin
2. **Framework Preset:** Next.js (otomatik algılanacak)
3. **Root Directory:** `./` (varsayılan)

### 3. Build Ayarları
Vercel otomatik olarak algılayacak, ancak manuel kontrol edin:

```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 4. Environment Variables (ÖNEMLİ!)

Vercel Dashboard > Project Settings > Environment Variables bölümüne şunları ekleyin:

#### Database Variables
```
DB_SERVER=your-server-address
DB_NAME=your-database-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_PORT=1433
DB_CONNECT_TIMEOUT=120000
DB_REQUEST_TIMEOUT=120000
```

#### JWT Variables
```
JWT_SECRET=your-secret-key-min-32-chars
JWT_ISSUER=https://yonelotoyedekparca.com
JWT_AUDIENCE=https://yonelotoyedekparca.com
```

#### Admin Variables
```
ADMIN_SECRET_KEY=your-admin-secret
```

#### Cloudinary Variables
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### WhatsApp Variables
```
NEXT_PUBLIC_WHATSAPP_NUMBER=905542597273
```

#### Node Environment
```
NODE_ENV=production
```

**⚠️ ÖNEMLİ:** Tüm environment variable'ları **Production**, **Preview** ve **Development** için ekleyin!

### 5. Branch Deployment Ayarları

Vercel Dashboard > Project Settings > Git:

1. **Production Branch:** `main` veya `production/deploy`
2. **Preview Branches:** `update/production-optimizations` ve diğer branch'ler
3. **Auto-deploy:** ✅ Açık (otomatik deployment aktif)

### 6. Custom Domain Ayarları

Vercel Dashboard > Project Settings > Domains:

1. **Domain Ekle:**
   - `yonelotoyedekparca.com`
   - `www.yonelotoyedekparca.com`

2. **DNS Ayarları:**
   - Domain sağlayıcınızda (GoDaddy, Namecheap vb.) DNS kayıtlarını güncelleyin:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### 7. Deployment Ayarları

Vercel Dashboard > Project Settings > General:

1. **Build & Development Settings:**
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

2. **Node.js Version:** 20.x (veya 18.x)

3. **Serverless Functions:**
   - Max Duration: 60 seconds (Vercel Pro için 300 saniye)

---

## 🔄 Otomatik Deployment Süreci

### Her Push'ta Ne Olur?

1. **GitHub'a Push:** Branch'e push yapıldığında
2. **Vercel Algılar:** GitHub webhook ile Vercel haberdar olur
3. **Build Başlar:** Otomatik olarak build başlatılır
4. **Deploy:** Build başarılı olursa otomatik deploy edilir
5. **Preview URL:** Her branch için preview URL oluşturulur

### Production Deployment

- **Main Branch:** Production'a otomatik deploy edilir
- **Production Branch:** Production'a deploy edilir
- **Diğer Branch'ler:** Preview deployment olarak deploy edilir

---

## 📊 Deployment Durumu Kontrolü

### Vercel Dashboard'da:
1. Project sayfasına gidin
2. "Deployments" sekmesine tıklayın
3. Her deployment'ın durumunu görebilirsiniz:
   - ✅ **Ready:** Başarılı
   - ⏳ **Building:** Build aşamasında
   - ❌ **Error:** Hata var (logları kontrol edin)

### Deployment Logları:
1. Deployment'a tıklayın
2. "Build Logs" sekmesine gidin
3. Hata varsa burada görebilirsiniz

---

## 🔧 Troubleshooting

### Build Hatası
**Problem:** Build başarısız oluyor

**Çözüm:**
1. Build loglarını kontrol edin
2. Environment variable'ların doğru olduğundan emin olun
3. TypeScript/ESLint hatalarını düzeltin
4. `npm run build` komutunu lokal'de test edin

### Database Connection Hatası
**Problem:** Runtime'da veritabanı bağlantı hatası

**Çözüm:**
1. SQL Server firewall ayarlarını kontrol edin
2. Vercel IP'lerini whitelist edin:
   - 76.76.21.0/24
   - 76.76.19.0/24
3. Environment variable'ları kontrol edin

### Environment Variable Hatası
**Problem:** Environment variable'lar çalışmıyor

**Çözüm:**
1. Vercel Dashboard > Settings > Environment Variables
2. Tüm environment'lar için (Production, Preview, Development) ekleyin
3. Variable isimlerinin doğru olduğundan emin olun
4. Redeploy yapın

---

## 🎯 Deployment Checklist

### Pre-Deployment
- [ ] Tüm değişiklikler commit edildi
- [ ] Branch push edildi
- [ ] Environment variable'lar Vercel'de eklendi
- [ ] Build lokal'de test edildi (`npm run build`)

### Post-Deployment
- [ ] Site açılıyor mu? (https://yonelotoyedekparca.com)
- [ ] Admin paneli çalışıyor mu?
- [ ] Veritabanı bağlantısı çalışıyor mu?
- [ ] Ürünler listeleniyor mu?
- [ ] Görseller yükleniyor mu?

---

## 📝 Notlar

- **Preview Deployments:** Her branch push'unda preview URL oluşturulur
- **Production Deployments:** Sadece main/production branch'lerde
- **Rollback:** Deployment geçmişinden önceki bir versiyona geri dönebilirsiniz
- **Analytics:** Vercel Analytics ile performans metriklerini takip edebilirsiniz

---

## 🔗 Yararlı Linkler

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Repository](https://github.com/barisyonel/YonelTicaret)

---

**Son Güncelleme:** $(date)

