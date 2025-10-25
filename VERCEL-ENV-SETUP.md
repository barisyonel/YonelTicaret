# Vercel Environment Variables Kurulum Rehberi

## 🎯 Vercel Dashboard'da Yapılacaklar

### 1. Vercel Dashboard'a Gidin
https://vercel.com/dashboard

### 2. Projenizi Seçin
"yönel" veya proje adınızı bulun ve tıklayın

### 3. Settings > Environment Variables

Sol menüden **Settings** > **Environment Variables** sekmesine gidin

### 4. Aşağıdaki Değişkenleri Ekleyin

Her bir değişken için:
1. **"Add New"** butonuna tıklayın
2. **Name** ve **Value** alanlarını doldurun
3. **Environment:** Production, Preview, Development (üçünü de seçin) ✅
4. **Save** edin

---

## 📝 Environment Variables Listesi

### Database Configuration

```env
Name: DB_SERVER
Value: 104.247.167.194
Environment: ✅ Production ✅ Preview ✅ Development
```

```env
Name: DB_INSTANCE
Value: MSSQLSERVER2019
Environment: ✅ Production ✅ Preview ✅ Development
```

```env
Name: DB_NAME
Value: yone8215_yoneltic_y
Environment: ✅ Production ✅ Preview ✅ Development
```

```env
Name: DB_USER
Value: [SQL kullanıcı adınız - .env.local'den kopyalayın]
Environment: ✅ Production ✅ Preview ✅ Development
```

```env
Name: DB_PASSWORD
Value: [SQL şifreniz - .env.local'den kopyalayın]
Environment: ✅ Production ✅ Preview ✅ Development
```

```env
Name: DB_PORT
Value: 1433
Environment: ✅ Production ✅ Preview ✅ Development
```

### Cloudinary Configuration

```env
Name: CLOUDINARY_CLOUD_NAME
Value: [.env.local'den kopyalayın]
Environment: ✅ Production ✅ Preview ✅ Development
```

```env
Name: CLOUDINARY_API_KEY
Value: [.env.local'den kopyalayın]
Environment: ✅ Production ✅ Preview ✅ Development
```

```env
Name: CLOUDINARY_API_SECRET
Value: [.env.local'den kopyalayın]
Environment: ✅ Production ✅ Preview ✅ Development
```

### Authentication

```env
Name: JWT_SECRET
Value: [.env.local'den kopyalayın veya yeni 32+ karakter random string]
Environment: ✅ Production ✅ Preview ✅ Development
```

---

## 🔥 SQL Server Firewall Ayarları

Hosting sağlayıcınıza (SQL Server'ınızı barındıran firma) şu bilgiyi verin:

**"Aşağıdaki IP aralıklarının SQL Server'a erişmesine izin verin:"**

```
76.76.21.0/24
76.76.19.0/24
```

Veya tek tek IP olarak:
```
76.76.21.0 - 76.76.21.255
76.76.19.0 - 76.76.19.255
```

**Port:** 1433

---

## ✅ Doğrulama

Environment variables ekledikten sonra:

1. **Vercel Dashboard'da** Settings > Environment Variables sayfasında tümünü görmelisiniz
2. **Redeploy** edin:
   - Deployments sekmesine gidin
   - En son deployment'ı bulun
   - "Redeploy" butonuna tıklayın

3. **Build Logs** kontrol edin:
   - "Building" tamamlanınca
   - Logs'da "✅ SQL Server bağlantısı başarılı!" görmelisiniz

---

## 🆘 Sorun Giderme

### "Connection refused" hatası alıyorsanız:
- ✅ Firewall ayarlarını kontrol edin
- ✅ SQL Server port 1433 dışarıya açık mı?
- ✅ Hosting sağlayıcıya Vercel IP'lerini whitelist'e ekleyin

### "Authentication failed" hatası alıyorsanız:
- ✅ DB_USER ve DB_PASSWORD doğru mu?
- ✅ .env.local'deki değerlerle karşılaştırın

### "Database not found" hatası alıyorsanız:
- ✅ DB_NAME doğru yazıldı mı?
- ✅ DB_INSTANCE eklenmiş mi?

---

## 📞 Yardım

Environment variables eklendikten sonra bana haber verin, birlikte test edelim! 🚀

