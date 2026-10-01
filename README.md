# 🛍️ E-Commerce — Full Stack Alışveriş Uygulaması

Spring Boot (Java 17) ile yazılmış REST API ve React + TypeScript ile yazılmış modern bir arayüzden oluşan, uçtan uca bir e-ticaret uygulaması. Kullanıcı kaydı ve JWT ile giriş, ürün listeleme/filtreleme/sıralama, sepet, favoriler, adres ve kart yönetimi, çok adımlı ödeme akışı ve sipariş geçmişi gibi temel e-ticaret özelliklerini içerir.

> **Arayüz tasarımı bana ait değildir.** Tasarım, Workintech eğitim sürecinde sağlanan Figma UI Kit'e (E-commerce UI Kit) aittir; ben bu tasarımı React ile koda döktüm.

🔗 **Canlı demo:** https://e-commerce-ui-khaki.vercel.app/
💻 **GitHub:** https://github.com/KbraEser/e-commerce

> **Not:** Demo verisi çoğunlukla **kadın** kategorisindeki ürünlerden oluşur; kategori ve filtre denemelerini kadın ürünleri üzerinden yapmanız önerilir.

## İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Özellikler](#özellikler)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [Backend Detayları](#backend-detayları)
- [Frontend Detayları](#frontend-detayları)
- [Kimlik Doğrulama Akışı](#kimlik-doğrulama-akışı)
- [Bilinen Sınırlamalar ve Geliştirme Fikirleri](#bilinen-sınırlamalar-ve-geliştirme-fikirleri)

---

## Proje Hakkında

Bu proje, Workintech eğitim sürecinde verilen bir Figma UI Kit'ten (E-commerce UI Kit) yola çıkılarak, Kanban board üzerinden görev bazlı takip edilerek sıfırdan geliştirilmiştir. Arayüzün yanı sıra kendi Spring Boot + PostgreSQL backend'i de yazılmış, uygulama gerçek bir API'ye bağlı tam bir full-stack ürün olarak canlıya alınmıştır.

**Deploy:** Vercel (frontend) + Render (backend ve veritabanı)

---

## Özellikler

**Kullanıcı & Güvenlik**
- Rol seçerek kayıt olma (Admin / Müşteri / Mağaza), BCrypt ile şifre hashleme
- JWT tabanlı stateless kimlik doğrulama, "Beni hatırla" desteği (localStorage / sessionStorage)
- Uygulama açılışında token doğrulama (`/verify`) ve süresi dolan oturumda otomatik çıkış
- Korumalı sayfalar (`ProtectedRoute`) ve backend tarafında yetkilendirme

**Alışveriş**
- Kategori bazlı (cinsiyet / kategori) ürün listeleme, kategori / fiyat / puan bazlı filtreleme, arama, sıralama ve sayfalama
- Çok satanlar (gerçek `sellCount` verisiyle), ürün detay sayfası ve galeri
- Sepet: ürün ekleme, adet değiştirme, seçili ürünleri toplama, kargo hesabı (150 ₺ üzeri ücretsiz kargo)
- Favoriler (wishlist) — kullanıcıya özel, sunucuda saklanır
- Adres yönetimi (ekle / düzenle / sil) ve kayıtlı kart yönetimi
- İki adımlı ödeme (Adres → Ödeme), sipariş oluşturma, sipariş başarı sayfası ve geçmiş siparişler

**İçerik Sayfaları**
- Ana sayfa (slider, öne çıkan kategoriler, çok satanlar, blog bölümü – Swiper), Hakkımızda, Ekip, Blog / Blog detay, İletişim
- Mobile-first, tamamen responsive tasarım (mobil menü dahil), toast bildirimleri

## Teknoloji Yığını

| Katman | Teknolojiler |
| --- | --- |
| **Backend** | Java 17, Spring Boot 4.1, Spring Web MVC, Spring Security, Spring Data JPA (Hibernate), Bean Validation, Lombok, JJWT 0.12.6 |
| **Veritabanı** | PostgreSQL (`ddl-auto=update` ile şema otomatik oluşur) |
| **Frontend** | React 19, TypeScript 6, Vite 8, Redux Toolkit (thunk), React Router 7, Axios, React Hook Form + Yup, Tailwind CSS 4, Material UI 9, Swiper, React-Toastify, Lucide / React Icons |
| **Araçlar** | Maven Wrapper, Docker (multi-stage), Oxlint, Postman koleksiyonu |

## Proje Yapısı

```
e-commerce/
├── e-commerce-backend/            # Spring Boot REST API
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/ecommerce/e_commerce_backend/
│       │   ├── config/            # SecurityConfig, JwtAuthenticationFilter, CORS, hata yöneticileri, cookie servisi
│       │   ├── controller/        # Auth, Product, Category, Order, Address, CreditCard, Favorite, Role
│       │   ├── dto/               # Request/Response kayıtları (Java record) + validasyon
│       │   ├── entity/            # JPA varlıkları (User, Product, Order, ...)
│       │   ├── exceptions/        # ApiException + GlobalExceptionHandler
│       │   ├── repository/        # Spring Data JPA repository'leri
│       │   ├── seed/              # RoleSeeder, ProductDataSeeder (ilk açılışta veri yükler)
│       │   ├── service/           # İş mantığı (arayüz + Impl)
│       │   └── utils/             # JwtUtil, SecurityUtils
│       └── resources/application.properties
│
└── ecommerce-app-ui/              # React + Vite arayüzü
    ├── postman/                   # Postman koleksiyonu (Auth uçları)
    ├── public/                    # favicon, statik görseller
    └── src/
        ├── components/            # UI bileşenleri (auth/, cart/, checkout/ alt klasörleriyle)
        ├── data/                  # Blog yazıları (statik)
        ├── layout/                # Header, Footer, PageContent
        ├── pages/                 # Rota sayfaları
        ├── service/               # Axios örneği + API servisleri
        ├── store/                 # Redux store, slice'lar, thunk'lar, tipler
        ├── utils/                 # Sepet, kategori, scroll yardımcıları
        ├── App.tsx                # Rota tanımları + oturum başlatma
        └── main.tsx               # Provider + ToastContainer
```

## Kurulum ve Çalıştırma

### Gereksinimler

- Java 17+
- Node.js 20+ ve npm
- PostgreSQL (varsayılan: `localhost:5432`)

### 1. Veritabanı

```sql
CREATE DATABASE ecommerce;
```

Tablolar uygulama ilk açıldığında Hibernate tarafından otomatik oluşturulur.

### 2. Backend

```bash
cd e-commerce-backend
```

`e-commerce-backend/.env` dosyası oluşturun ([Ortam Değişkenleri](#ortam-değişkenleri)):

```properties
JWT_SECRET=en-az-32-karakterlik-uzun-ve-rastgele-bir-anahtar
DB_USERNAME=postgres
DB_PASSWORD=sifreniz
```

Çalıştırın:

```bash
./mvnw spring-boot:run
```

API varsayılan olarak **http://localhost:3000** adresinde açılır.

> **İlk açılış:** `RoleSeeder` eksik rolleri (Admin, Müşteri, Mağaza) ekler. `ProductDataSeeder` ise kategori tablosu boşsa örnek kategori ve ürünleri Workintech referans API'sinden (`workintech-fe-ecommerce.onrender.com`) çekip veritabanına yazar. İnternet yoksa seeding atlanır ve uyarı loglanır.

### 3. Frontend

```bash
cd ecommerce-app-ui
npm install
```

`ecommerce-app-ui/.env` dosyası oluşturun:

```properties
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

Arayüz **http://localhost:5173** adresinde açılır.

### Diğer Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run build` | Tip kontrolü + production build (`dist/`) |
| `npm run preview` | Production build'i yerelde önizleme |
| `npm run lint` | Oxlint ile kod kontrolü |
| `./mvnw clean package -DskipTests` | Backend JAR üretimi |

### Docker (Backend)

```bash
cd e-commerce-backend
docker build -t ecommerce-backend .
docker run -p 3000:3000 \
  -e DB_URL=jdbc:postgresql://host.docker.internal:5432/ecommerce \
  -e DB_USERNAME=postgres -e DB_PASSWORD=sifreniz \
  -e JWT_SECRET=en-az-32-karakterlik-uzun-ve-rastgele-bir-anahtar \
  -e CORS_ALLOWED_ORIGINS=http://localhost:5173 \
  ecommerce-backend
```

Dockerfile multi-stage'dir (JDK ile derleme → JRE ile çalıştırma) ve 3000 portunu açar.

## Ortam Değişkenleri

**Backend** (`.env` dosyası veya sistem ortam değişkeni; `application.properties` `.env` dosyasını otomatik import eder)

| Değişken | Varsayılan | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucu portu |
| `DB_URL` | `jdbc:postgresql://localhost:5432/ecommerce` | JDBC bağlantı adresi |
| `DB_USERNAME` | — | Veritabanı kullanıcısı |
| `DB_PASSWORD` | — | Veritabanı şifresi |
| `JWT_SECRET` | — (zorunlu) | HS256 imza anahtarı, en az 32 karakter olmalı |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Virgülle ayrılmış izinli origin listesi |

İsteğe bağlı özellikler: `jwt.access-expiration-ms` (token ömrü, varsayılan 24 saat), `app.cookie.secure`, `app.cookie.same-site`.

**Frontend**

| Değişken | Varsayılan | Açıklama |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:3000` | Backend API adresi |

> ⚠️ `.env` dosyaları `.gitignore` içindedir; gizli bilgileri asla commit etmeyin.

## Backend Detayları

### Mimari

Klasik katmanlı mimari: **Controller → Service (arayüz + Impl) → Repository → Entity**. İstek/yanıt modelleri için DTO'lar (Java `record`) kullanılır; JSON alan adları frontend ile uyumlu olması için `snake_case`'e (`@JsonProperty`) eşlenmiştir.

### Veri Modeli

```
Role 1───* User 1───* Address
                 1───* CreditCard
                 1───* Favorite *───1 Product
                 1───* Order   *───1 Address
                         1───* OrderItem *───1 Product

Category 1───* Product 1───* ProductImage
```

| Tablo | Önemli alanlar |
| --- | --- |
| `users` | name, email (unique), password (BCrypt), role |
| `roles` | name, code (unique: `ADMIN`, `CUSTOMER`, `STORE`) |
| `categories` | code, title, img, rating, gender |
| `products` | name, description, price, stock, storeId, rating, sellCount, category, images |
| `product_images` | url, image_index |
| `addresses` | title, name, surname, phone, city, district, neighborhood |
| `credit_cards` | card_no, expire_month, expire_year, name_on_card |
| `favorites` | (user_id, product_id) unique |
| `orders` | address, order_date, kart özeti, price, items |
| `order_items` | product, count, detail |

### API Uçları

| Metot | Yol | Erişim | Açıklama |
| --- | --- | --- | --- |
| `POST` | `/signup` | Herkese açık | Kayıt (ad ≥ 3, geçerli e-posta, şifre 8–20 karakter, şifre tekrarı, `role_id`) |
| `POST` | `/login` | Herkese açık | Giriş; `id, token, name, email, role_id` döner |
| `GET` | `/verify` | Herkese açık | `Authorization` başlığındaki token'ı doğrular, kullanıcı bilgisini döner |
| `GET` | `/roles` | Herkese açık | Rolleri listeler |
| `GET` | `/categories` | Herkese açık | Kategorileri listeler |
| `GET` | `/products` | Herkese açık | Ürün listesi — `category`, `filter`, `sort`, `limit`, `offset` |
| `GET` | `/products/{id}` | Herkese açık | Ürün detayı |
| `GET` | `/favorites` | 🔒 Giriş | Favori ürünler |
| `POST` | `/favorites/{productId}` | 🔒 Giriş | Favoriye ekle |
| `DELETE` | `/favorites/{productId}` | 🔒 Giriş | Favoriden çıkar |
| `GET` | `/user/address` | 🔒 Giriş | Adresleri listele |
| `POST` | `/user/address` | 🔒 Giriş | Adres ekle |
| `PUT` | `/user/address` | 🔒 Giriş | Adres güncelle |
| `DELETE` | `/user/address/{id}` | 🔒 Giriş | Adres sil |
| `GET` | `/user/card` | 🔒 Giriş | Kartları listele |
| `POST` | `/user/card` | 🔒 Giriş | Kart ekle |
| `PUT` | `/user/card` | 🔒 Giriş | Kart güncelle |
| `DELETE` | `/user/card/{id}` | 🔒 Giriş | Kart sil |
| `POST` | `/order` | 🔒 Giriş | Sipariş oluştur |
| `GET` | `/order` | 🔒 Giriş | Kullanıcının siparişleri (yeniden eskiye) |

**Ürün sorgu parametreleri**

```
GET /products?category=2&filter=ceket&sort=price:asc&limit=12&offset=0
```

- `category` — kategori id'si
- `filter` — ürün adında büyük/küçük harf duyarsız arama
- `sort` — `alan:asc|desc` (ör. `price:asc`, `rating:desc`, `sellCount:desc`)
- `limit` / `offset` — sayfalama (varsayılan sayfa boyutu 8); yanıt `{ products: [...], total: N }`

**Örnek istekler**

```http
POST /signup
{ "name": "Ayşe Yılmaz", "email": "ayse@example.com", "password": "Sifre1234",
  "passwordConfirm": "Sifre1234", "role_id": 2 }

POST /login
{ "email": "ayse@example.com", "password": "Sifre1234" }

POST /order
Authorization: <token>
{
  "address_id": 1, "order_date": "2026-10-01T12:00:00",
  "card_no": "4111111111111111", "card_name": "Ayşe Yılmaz",
  "card_expire_month": 12, "card_expire_year": 2028, "card_ccv": 123,
  "price": 549.99,
  "products": [{ "product_id": 5, "count": 2, "detail": "M - Siyah" }]
}
```

### Güvenlik

- `SecurityConfig`: stateless oturum, CSRF kapalı (token header ile çalıştığı için), HTTP Basic kapalı, `GET /categories/**` ve `GET /products/**` dışındaki tüm uçlar korumalı
- `JwtAuthenticationFilter`: `Authorization` başlığındaki token'ı (`Bearer xxx` veya ham token) çözer; geçersizse kimlik atamadan devam eder, korumalı uçlarda `RestAuthenticationEntryPoint` 401 döner
- Siparişte adres, yalnızca giriş yapan kullanıcıya aitse kabul edilir (`findByIdAndUserId`) — başka kullanıcının adresiyle sipariş verilemez
- Siparişte kart numarası **yalnızca son 4 hanesiyle** saklanır, CVV hiç saklanmaz
- Merkezi hata yönetimi (`GlobalExceptionHandler`): tüm hatalar `{ status, message, timestamp }` formatında döner; validasyon hatasında ilk hata mesajı gösterilir

## Frontend Detayları

### Sayfalar ve Rotalar

| Rota | Sayfa | Koruma |
| --- | --- | --- |
| `/` | Ana sayfa | — |
| `/shop`, `/shop/:gender/:categoryName/:categoryId` | Ürün listesi (filtre, sıralama, sayfalama) | — |
| `/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId` | Ürün detayı | — |
| `/cart` | Sepet | — |
| `/checkout` | Ödeme (Adres → Ödeme) | 🔒 |
| `/order-success` | Sipariş onayı | 🔒 |
| `/orders` | Geçmiş siparişler | 🔒 |
| `/wishlist` | Favoriler | 🔒 |
| `/login`, `/signup` | Giriş / Kayıt | — |
| `/blog`, `/posts/:id` | Blog listesi / detay | — |
| `/about`, `/team`, `/contact` | Kurumsal sayfalar | — |
| `/pages`, `/pricing` | "Yapım aşamasında" sayfası | — |
| `*` | 404 | — |

### State Yönetimi (Redux Toolkit)

| Slice | Sorumluluk |
| --- | --- |
| `client` | Kullanıcı, roller, adresler, kartlar, giriş durumu |
| `product` | Kategoriler, ürün listesi, filtre/sıralama/sayfalama durumu, çok satanlar, seçili ürün |
| `shoppingCart` | Sepet kalemleri (adet, seçili mi), seçilen adres ve ödeme bilgisi |
| `favorite` | Favori ürünler ve yüklenme durumu (`NOT_FETCHED / FETCHING / FETCHED / FAILED`) |

Asenkron işlemler `store/thunks` altındaki `createAsyncThunk`'larla yapılır (`loginUser`, `registerUser`, `verifySession`, `fetchProducts`, `fetchBestSellers`, `fetchFavorites` …). Geliştirme sırasında `redux-logger` aktiftir.

### API Katmanı

`src/service/axios.ts` tek bir Axios örneği tanımlar (`baseURL = VITE_API_URL`). Token `Authorization` başlığına eklenir; yanıt interceptor'ı, giriş isteği dışındaki herhangi bir `401` cevabında token'ı temizleyip kullanıcıyı `/login` sayfasına yönlendirir. Her kaynak için ayrı servis dosyası vardır: `authService`, `productService`, `categoryService`, `addressService`, `cardService`, `favoriteService`, `orderService`, `roleService`.

### Formlar ve Doğrulama

Kayıt, giriş ve adres/kart formları **React Hook Form + Yup** ile doğrulanır. Kayıt formunda rol seçimine göre (Mağaza) ek alanlar (mağaza adı, telefon, vergi no, banka hesabı) gösterilir.

### Sepet ve Ödeme Kuralları

- Sepet toplamı yalnızca **seçili (checked)** ürünlerden hesaplanır
- Kargo ücreti 29,99 ₺; seçili ürün toplamı **150 ₺ ve üzerindeyse** kargo ücretsiz
- Ödeme iki adımlıdır: (1) adres seç/ekle → (2) kart bilgisi → `POST /order`; başarıda sepet sıfırlanır ve `/order-success` sayfasına yönlenir

## Kimlik Doğrulama Akışı

1. `POST /login` → backend JWT üretir (`sub = e-posta`, `type = access`)
2. Frontend token'ı "Beni hatırla" seçiliyse `localStorage`'a, değilse `sessionStorage`'a yazar ve Axios başlığına ekler
3. Sayfa yenilendiğinde `App.tsx` kayıtlı token'ı okuyup `GET /verify` çağırır; başarılıysa token yenilenir ve favoriler yüklenir
4. Token geçersiz/süresi dolmuşsa (401) token silinir ve kullanıcı giriş sayfasına yönlendirilir


## Postman

`ecommerce-app-ui/postman/Ecommerce-API.postman_collection.json` dosyasını Postman'e import ederek Auth uçlarını (Roller, Kayıt – Müşteri/Mağaza/Admin, Giriş) deneyebilirsiniz.

## Lisans

Bu proje eğitim amaçlı geliştirilmiştir.
