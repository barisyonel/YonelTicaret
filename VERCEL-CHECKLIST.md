# 🔍 Vercel Deployment Sorun Giderme Checklist

## ✅ Kontrol Listesi

### 1. Vercel Dashboard Kontrolleri

#### Deployments Sayfası
- [ ] En son deployment'ın durumu: **Ready** (yeşil) olmalı
- [ ] Build loglarında hata var mı kontrol edin
- [ ] Deploy URL'ine tıklayıp canlı siteyi test edin

#### Settings → Git
- [ ] **Production Branch**: `main` olmalı
- [ ] **Connected Repository**: `barisyonel/YonelTicaret` olmalı
- [ ] **Auto-deploy**: ✅ Enabled olmalı

#### Settings → Environment Variables
Aşağıdaki değişkenlerin **TÜMÜ** ekli olmalı:

**Database:**
- [ ] `DB_SERVER` = `104.247.167.194\MSSQLSERVER2019` (⚠️ DİKKAT: Tek backslash `\`)
- [ ] `DB_NAME` = `yone8215_yoneltic_y`
- [ ] `DB_USER` = `yone8215_yoneltic_y`
- [ ] `DB_PASSWORD` = `[ŞİFRENİZ]`

**JWT:**
- [ ] `JWT_SECRET` = `[EN AZ 32 KARAKTERLİ SECRET]`
- [ ] `JWT_ISSUER` = `https://yonelotoyedekparca.com`
- [ ] `JWT_AUDIENCE` = `https://yonelotoyedekparca.com`

**Admin:**
- [ ] `ADMIN_SECRET_KEY` = `yonel1.`

**Cloudinary:**
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = `dhqdwiovd`
- [ ] `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` = `ml_default`
- [ ] `CLOUDINARY_API_KEY` = `985332843956355`
- [ ] `CLOUDINARY_API_SECRET` = `OYI8UH9Ufe_ljkvxGLm0Loa_rZ4`

**WhatsApp:**
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` = `905542597273`

⚠️ **ÖNEMLİ:** Her değişken için **Environment** seçimi:
- ✅ Production
- ✅ Preview  
- ✅ Development
(Hepsi seçili olmalı!)

### 2. Build Ayarları

#### Settings → General → Build & Development Settings
- [ ] **Framework Preset**: Next.js
- [ ] **Build Command**: `npm run build` (otomatik olmalı)
- [ ] **Output Directory**: `.next` (boş bırakın, Next.js otomatik halleder)
- [ ] **Install Command**: `npm install`
- [ ] **Node.js Version**: 18.x veya 20.x

### 3. Cache Sorunları

#### Browser Cache Temizleme
1. Chrome/Edge: `Ctrl+Shift+Delete` → **Clear browsing data** → **Cached images and files**
2. Hard Refresh: `Ctrl+F5` (Windows) veya `Cmd+Shift+R` (Mac)
3. Incognito/Private modda test edin

#### Vercel Cache Temizleme
1. Vercel Dashboard → Deployments
2. En son deployment'a tıklayın
3. "Redeploy" butonuna tıklayın (sağ üst köşe)

### 4. Common Issues & Solutions

#### ❌ "Build failed"
- Build loglarına bakın
- Environment variables eksik olabilir
- Database bağlantısı başarısız olabilir

#### ❌ "Deployment successful but changes not visible"
1. Browser cache temizleyin
2. Hard refresh yapın (`Ctrl+F5`)
3. Incognito modda test edin
4. Vercel'de redeploy yapın
5. CDN cache beklemesi: 1-2 dakika sürebilir

#### ❌ "Database connection failed"
- `DB_SERVER` değişkeninde **TEK backslash** kullanın: `104.247.167.194\MSSQLSERVER2019`
- SQL Server firewall'da Vercel IP'lerine izin verin
- Port 1433'ün açık olduğundan emin olun

#### ❌ "Environment variable not found"
- Vercel'de tüm environment variables'ların ekli olduğundan emin olun
- Production, Preview ve Development için **hepsini seçin**
- Redeploy yapın (environment variables değişikliği sonrası)

### 5. Manuel Redeploy

1. Vercel Dashboard → Deployments
2. En son deployment'ın sağ tarafındaki "..." menüsüne tıklayın
3. **"Redeploy"** seçin
4. **"Use existing Build Cache"** seçeneğini **KAPATIN** (cache sorunu varsa)
5. **"Redeploy"** butonuna tıklayın

### 6. Test Adımları

1. ✅ Ana sayfa açılıyor mu?
2. ✅ Ürünler sayfası çalışıyor mu?
3. ✅ Database bağlantısı var mı? (Ürünler görünüyor mu?)
4. ✅ Admin panel açılıyor mu?
5. ✅ Cloudinary görseller yükleniyor mu?

---

## 🚀 Quick Fix: Manuel Trigger

Eğer hala çalışmıyorsa, yeni bir commit yapın:

```bash
git commit --allow-empty -m "trigger: force redeploy"
git push origin main
```

Bu, Vercel'de yeni bir deployment başlatacaktır.

