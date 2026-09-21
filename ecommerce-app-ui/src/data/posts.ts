import trendColors from '../img/featuredCategory/women.jpg'
import shoeGuide from '../img/featuredCategory/shoes.jpg'
import accessoryGuide from '../img/featuredCategory/accessory.jpg'
import sportStyle from '../img/featuredCategory/sport.jpg'
import loungewear from '../img/featuredCategory/pijamas.jpg'
import menStyle from '../img/post_img.jpg'

export type Post = {
  id: number
  imageUrl: string
  isNew: boolean
  tags: string[]
  title: string
  description: string
  date: string
  commentCount: number
}

export const posts: Post[] = [
  {
    id: 1,
    imageUrl: trendColors,
    isNew: true,
    tags: ['Trend', 'Sezon', 'Kombin'],
    title: 'Bu Sezonun Trend Renkleri',
    description:
      'Bu sezon gardırobunuza katmanız gereken renkler ve onları günlük kombinlerinize nasıl taşıyabileceğinize dair ipuçları. Toprak tonlarından canlı pastellere, bu sezon podyumlarda ve sokak stilinde öne çıkan renk paletini sizin için derledik. Doğru renk eşleştirmeleriyle en sade parçaları bile fark edilir kılabilir, mevsime uygun bir görünüm yakalayabilirsiniz. Özellikle nötr tonların yanına eklenecek tek bir canlı renk, tüm kombini baştan yaratabilir; bu yüzden yeni parçalar almadan önce dolabınızdaki renk dengesini gözden geçirmenizi öneririz. Aksesuar ve ayakkabı seçimlerinizde de aynı palete sadık kalmak, bütünlüklü ve derli toplu bir görünüm elde etmenizi sağlar.',
    date: '22 Nisan 2026',
    commentCount: 12,
  },
  {
    id: 2,
    imageUrl: shoeGuide,
    isNew: true,
    tags: ['Stil', 'Ayakkabı', 'Kombin'],
    title: 'Doğru Ayakkabı Kombininin Sırrı',
    description:
      'Kıyafetinizi tamamlayan doğru ayakkabıyı seçmek kombininizi bir üst seviyeye taşır. İşte dikkat etmeniz gereken noktalar. Günlük kombinlerden özel davetlere kadar her ortam için farklı bir ayakkabı seçimi gerekir; renk uyumu, kalıp ve konfor arasındaki dengeyi nasıl kuracağınızı adım adım anlatıyoruz. Doğru çift, kombininizin genel algısını baştan sona değiştirebilir. Klasik bir deri ayakkabı iş kıyafetlerinizle mükemmel uyum sağlarken, spor bir sneaker günlük kombinlerinize enerji katar; her ikisinin de dolabınızda bir yeri olmalı. Ayrıca ayakkabınızın bakımına özen göstermek, hem ömrünü uzatır hem de her zaman özenli bir görünüm sergilemenizi sağlar.',
    date: '15 Mayıs 2026',
    commentCount: 8,
  },
  {
    id: 3,
    imageUrl: accessoryGuide,
    isNew: true,
    tags: ['Aksesuar', 'Stil', 'Detaylar'],
    title: 'Aksesuarla Stilinizi Tamamlayın',
    description:
      'Doğru aksesuar seçimi en sade kombini bile fark edilir kılar. Küçük detaylarla büyük stil farkı yaratmanın yolları. Bir kolye, bir kemer ya da doğru bir çanta seçimi, üzerinizdeki en temel parçaları bile tamamen farklı bir noktaya taşıyabilir. Aksesuarlarınızı mevsime, ortama ve kombininizin renk paletine göre nasıl seçeceğinizi bu yazıda bulacaksınız. Fazla aksesuar kullanmak kombininizi karmaşık gösterebilir; bu yüzden bir ya da iki güçlü parçayla öne çıkmak, sade bir dengeden çok daha etkili bir sonuç verir. Mevsimlik değişen aksesuar tercihleriyle aynı kıyafetleri farklı görünümlerde tekrar tekrar kullanabilirsiniz.',
    date: '3 Haziran 2026',
    commentCount: 15,
  },
  {
    id: 4,
    imageUrl: sportStyle,
    isNew: false,
    tags: ['Spor', 'Rahat', 'Günlük'],
    title: 'Spor Şıklığı: Rahatlık ve Stil Bir Arada',
    description:
      'Günlük hayatta hem konforu hem de şıklığı bırakmak zorunda değilsiniz. Spor şıklığı akımından ilham alan kombin önerileri. Rahat bir eşofman altını şık bir ceketle, ya da spor ayakkabınızı zarif bir gömlekle eşleştirerek hem konforlu hem de bakımlı bir görünüm yakalayabilirsiniz. İşte gün boyu rahat edeceğiniz ama şıklıktan ödün vermeyeceğiniz kombin fikirleri. Spor şıklığının sırrı, rahat parçaları daha yapılandırılmış bir parçayla dengelemekte gizli; örneğin bir sweatshirt\'ü blazer ile ya da tayt\'ı uzun bir trençkotla eşleştirmek şık bir görünüm yaratır. Bu akım sayesinde ofisten spor salonuna, oradan da akşam buluşmasına kıyafet değiştirmeden geçiş yapabilirsiniz.',
    date: '18 Haziran 2026',
    commentCount: 9,
  },
  {
    id: 5,
    imageUrl: loungewear,
    isNew: false,
    tags: ['Ev Giyimi', 'Konfor', 'Rahat'],
    title: 'Evde Şıklık: Ev Kıyafetlerinde Konfor',
    description:
      'Evde geçirdiğiniz zamanı da stilinizden ödün vermeden geçirebilirsiniz. Konforlu ve şık ev kıyafetleri için öneriler. Yumuşak kumaşlar, rahat kalıplar ve nefes alan dokular ile hem evde konforu yaşayın hem de kapınıza gelen bir misafir karşısında şaşırtıcı derecede derli toplu görünün. Ev kıyafetlerinde konforu şıklıktan ayırmanıza gerek yok. Pamuklu ve keten karışımlı kumaşlar cildinize daha iyi davranırken, uyumlu takım parçaları evden çıkmadan da kendinizi bakımlı hissetmenizi sağlar. Doğru renk ve kalıp seçimiyle ev kıyafetleriniz artık sadece uyku için değil, evde geçirdiğiniz her an için keyifli bir tercih haline gelir.',
    date: '2 Temmuz 2026',
    commentCount: 6,
  },
  {
    id: 6,
    imageUrl: menStyle,
    isNew: false,
    tags: ['Erkek', 'Trend', 'Kombin'],
    title: 'Erkek Giyiminde Bu Sezonun Vazgeçilmezleri',
    description:
      'Erkek gardıroplarında bu sezon öne çıkan parçalar ve onları farklı kombinlerle nasıl değerlendirebileceğinize dair fikirler. Klasik bir ceketten rahat bir günlük kombine, iş toplantısından hafta sonu buluşmalarına kadar her ortama uyum sağlayacak temel parçaları sizin için listeledik. Bu sezon dolabınızda mutlaka bulunması gereken vazgeçilmezleri keşfedin. İyi kesimli bir pantolon, birkaç temel renkte gömlek ve kaliteli bir ceket ile onlarca farklı kombin yaratmak mümkün; asıl sır az parçayla çok kombin çıkarabilmekte. Aksesuarlarda sadeliği korumak, erkek stilinde her zaman daha zarif ve güvenilir bir görünüm sağlar.',
    date: '20 Temmuz 2026',
    commentCount: 11,
  },
]
