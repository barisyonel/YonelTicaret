# 🚀 Hızlı Deployment Başlangıç Rehberi

## ✅ Tamamlanan İşlemler

1. ✅ Yeni branch oluşturuldu: `update/production-optimizations`
2. ✅ Tüm değişiklikler commit edildi
3. ✅ GitHub'a push edildi: https://github.com/barisyonel/YonelTicaret

## 📋 Vercel'de Yapılması Gerekenler

### Adım 1: Vercel Dashboard
1. https://vercel.com/dashboard adresine gidin
2. GitHub hesabınızla giriş yapın

### Adım 2: Repository Bağlama
1. "Add New Project" butonuna tıklayın
2. `barisyonel/YonelTicaret` repository'sini seçin
3. Framework: Next.js (otomatik algılanacak)
4. "Deploy" butonuna tıklayın

### Adım 3: Environment Variables Ekleme
Project Settings > Environment Variables bölümüne gidin ve şunları ekleyin:

```bash
# Database
DB_SERVER=your-server
DB_NAME=your-database
DB_USER=your-user
DB_PASSWORD=your-password
DB_PORT=1433

# JWT
JWT_SECRET=your-secret-key-min-32-chars
JWT_ISSUER=https://yonelotoyedekparca.com
JWT_AUDIENCE=https://yonelotoyedekparca.com

# Admin
ADMIN_SECRET_KEY=your-admin-secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=905542597273

# Node
NODE_ENV=production
```

**⚠️ ÖNEMLİ:** Her environment variable'ı **Production**, **Preview** ve **Development** için ekleyin!

### Adım 4: Branch Ayarları
1. Project Settings > Git
2. **Production Branch:** `main` veya `update/production-optimizations`
3. **Auto-deploy:** ✅ Açık

### Adım 5: Custom Domain
1. Project Settings > Domains
2. Domain ekleyin: `yonelotoyedekparca.com`
3. DNS ayarlarını yapın (VERCEL-DEPLOYMENT-GUIDE.md'ye bakın)

## 🔄 Otomatik Deployment

Artık:
- Her push'ta otomatik deployment olacak
- Preview URL'ler oluşturulacak
- Production branch'de production'a deploy edilecek

## 📝 Pull Request Oluşturma

Production'a merge etmek için:
1. GitHub'da Pull Request oluşturun:
   https://github.com/barisyonel/YonelTicaret/pull/new/update/production-optimizations
2. PR'ı review edin
3. Merge edin → Otomatik production deployment başlar!

## 🎉 Hazır!

Artık projeniz GitHub'da ve Vercel'de otomatik deployment için hazır!

