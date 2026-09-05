import { useState } from 'react'
import { formatCartPrice } from '../../utils/cartUtils'

const PRE_INFO_TEXT = `1. SATICI BİLGİLERİ
Ünvan: Örnek Ticaret A.Ş.
Adres: Örnek Mah. Örnek Cad. No:1 İstanbul
E-posta: destek@ornek.com

2. ÜRÜN VE SİPARİŞ BİLGİLERİ
Sipariş konusu ürün/ürünlerin temel özellikleri, adedi, satış bedeli ve
ödeme şekli, sipariş özeti sayfasında ve size gönderilecek sipariş
onay e-postasında yer almaktadır. Fiyatlara KDV dahildir.

3. TESLİMAT
Siparişler, sipariş onayını takiben ortalama 2-5 iş günü içinde
belirttiğiniz teslimat adresine kargo ile gönderilir. Kargo bedeli
sipariş özetinde ayrıca belirtilir; 150 TL ve üzeri siparişlerde kargo
ücretsizdir.

4. CAYMA HAKKI
Ürünün size veya gösterdiğiniz adresteki kişiye tesliminden itibaren
14 (on dört) gün içinde, herhangi bir gerekçe göstermeksizin ve
cezai şart ödemeksizin sözleşmeden cayma hakkına sahipsiniz. Cayma
hakkının kullanılabilmesi için ürünün kullanılmamış, ambalajının
bozulmamış olması gerekir. İç giyim, kozmetik gibi hijyen açısından
iadesi uygun olmayan ürünlerde cayma hakkı ambalaj açıldıktan sonra
kullanılamaz.

5. ÖDEME
Ödemeler, sitede belirtilen kredi/banka kartı yöntemleriyle güvenli
ödeme altyapısı üzerinden alınır. Taksit seçenekleri kart bankanıza
göre değişiklik gösterebilir.

6. ONAY
Bu ön bilgilendirme metnini okuduğumu ve anladığımı, sipariş
tarihinden itibaren metnin bir örneğinin e-posta adresime
gönderileceğini kabul ederim.`

const CONTRACT_TEXT = `MADDE 1 - TARAFLAR
SATICI: Örnek Ticaret A.Ş. (bundan sonra "SATICI" olarak anılacaktır)
ALICI: Siparişi veren kullanıcı (bundan sonra "ALICI" olarak anılacaktır)

MADDE 2 - KONU
İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait internet sitesi
üzerinden elektronik ortamda siparişini verdiği, sözleşmede belirtilen
niteliklere sahip ürünün satışı ve teslimi ile ilgili olarak 6502
sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler
Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin
belirlenmesidir.

MADDE 3 - SÖZLEŞME KONUSU ÜRÜN
Ürünün türü, adedi, satış bedeli, ödeme şekli ve teslimat bilgileri,
işbu sözleşmenin ayrılmaz parçası olan sipariş özetinde belirtildiği
gibidir.

MADDE 4 - TESLİMAT VE İFA
Ürün, ALICI'nın sipariş sırasında belirttiği adrese, yasal 30 günlük
süreyi aşmamak kaydıyla teslim edilir. Teslimat masrafları aksi
belirtilmedikçe ALICI'ya aittir.

MADDE 5 - CAYMA HAKKI
ALICI, ürünün kendisine veya gösterdiği adresteki üçüncü kişiye
tesliminden itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin
sözleşmeden cayma hakkına sahiptir. Cayma hakkının kullanıldığına dair
bildirimin bu süre içinde SATICI'ya yöneltilmiş olması yeterlidir.

MADDE 6 - CAYMA HAKKININ KULLANILAMAYACAĞI HALLER
Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları
açılmış olan, iç giyim, kozmetik, hızlı bozulan veya son kullanma
tarihi geçme ihtimali olan ürünlerde cayma hakkı kullanılamaz.

MADDE 7 - TEMERRÜT VE UYUŞMAZLIKLARIN ÇÖZÜMÜ
İşbu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığı'nca ilan
edilen değere kadar ALICI'nın yerleşim yerindeki Tüketici Hakem
Heyetleri, bu değerin üzerindeki uyuşmazlıklarda ise Tüketici
Mahkemeleri yetkilidir.

MADDE 8 - YÜRÜRLÜK
ALICI, sipariş onayı ile birlikte işbu sözleşmenin tüm koşullarını
kabul etmiş sayılır.`

type CheckoutSummaryProps = {
  productsTotal: number
  shippingFee: number
  discount: number
  grandTotal: number
  ctaLabel?: string
  onSubmit?: () => void
}

const CheckoutSummary = ({
  productsTotal,
  shippingFee,
  discount,
  grandTotal,
  ctaLabel = 'Kaydet ve Devam Et',
  onSubmit,
}: CheckoutSummaryProps) => {
  const [openDoc, setOpenDoc] = useState<'pre-info' | 'contract' | null>(null)

  return (
    <aside className="space-y-4">
      <button
        type="button"
        onClick={onSubmit}
        className="w-full cursor-pointer rounded-md bg-secondary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1b8ecf]"
      >
        {ctaLabel}
      </button>

      <label className="flex cursor-pointer items-start gap-2 rounded-md border border-light-open-gray bg-white p-3 text-xs leading-5 text-gray-light">
        <input
          type="checkbox"
          defaultChecked
          className="mt-0.5 h-4 w-4 accent-secondary"
        />
        <span>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault()
              setOpenDoc('pre-info')
            }}
            className="cursor-pointer font-bold text-secondary underline-offset-2 hover:underline"
          >
            Ön Bilgilendirme Koşulları
          </button>
          {"'nı"} ve{' '}
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault()
              setOpenDoc('contract')
            }}
            className="cursor-pointer font-bold text-secondary underline-offset-2 hover:underline"
          >
            Mesafeli Satış Sözleşmesi
          </button>
          {"'ni"} okudum, onaylıyorum.
        </span>
      </label>

      {openDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpenDoc(null)}
        >
          <div
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-md bg-white p-5 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary">
                {openDoc === 'pre-info' ? 'Ön Bilgilendirme Koşulları' : 'Mesafeli Satış Sözleşmesi'}
              </h3>
              <button
                type="button"
                onClick={() => setOpenDoc(null)}
                className="cursor-pointer text-sm font-bold text-gray-light hover:text-primary"
              >
                Kapat
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs leading-5 text-gray-light">
              {openDoc === 'pre-info' ? PRE_INFO_TEXT : CONTRACT_TEXT}
            </pre>
          </div>
        </div>
      )}

      <div className="rounded-md border border-light-open-gray bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-primary">Sipariş Özeti</h2>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-light">Ürünlerin Toplamı</span>
            <span className="font-bold text-primary">
              {formatCartPrice(productsTotal)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-light">Kargo Toplamı</span>
            <span className="font-bold text-primary">
              {formatCartPrice(shippingFee)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="font-medium text-gray-light">
              150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)
            </span>
            <span className="shrink-0 font-bold text-secondary">
              -{formatCartPrice(discount)}
            </span>
          </div>
        </div>

        <div className="my-4 border-t border-light-open-gray" />

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-primary">Toplam</span>
          <span className="text-2xl font-bold text-secondary">
            {formatCartPrice(grandTotal)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="w-full cursor-pointer rounded-md bg-secondary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1b8ecf]"
      >
        {ctaLabel}
      </button>
    </aside>
  )
}

export default CheckoutSummary
