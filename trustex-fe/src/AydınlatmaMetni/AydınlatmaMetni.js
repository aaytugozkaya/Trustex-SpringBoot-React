import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/bireysel-musteri-ol');
  };

  return (
    <div>
      <Container>
        <Grid>
          <Grid>
            <CloseButton
              style={{
                position: 'absolute',
                top: '10px',
                right: '50px',
                zIndex: 1000,
                fontSize: '100px',
                width: '50px',
                height: '50px'
              }}
              onClick={handleClose}
            />
            <Typography
              variant="h8"
              style={{
                position: 'relative',
                top: '0px',
                left: '0px',
                transform: 'translateX(-50%)',
                color: 'black',
                zIndex: 10
              }}
            >
              TRUSTEX ÖDEME KURULUŞU A.Ş.

              KİŞİSEL VERİLERİN İŞLENMESİNE İLİŞKİN AYDINLATMA METNİ



              6698 sayılı Kişisel Verilerin Korunması Kanunu, 07.04.2016 tarih ve 29677 sayılı Resmi Gazete'de yayınlanarak yürürlüğe girmiştir. Uluslararası belgeler, mukayeseli hukuk uygulamaları ve ülkemiz ihtiyaçları göz önüne alınmak suretiyle hazırlanan Kanun ile kişisel verilerin çağdaş standartlarda işlenmesi ve koruma altına alınması amaçlanmaktadır. Bu kapsamda Kanunun amacı; kişisel verilerin işlenme şartlarını, kişisel verilerin işlenmesinde kişilerin temel hak ve özgürlüklerinin korunmasını ve kişisel verileri işleyen gerçek ve tüzel kişilerin yükümlülükleri ile uyacakları usul ve esasları düzenlemektir.

              Şirketimiz, 6698 sayılı Kişisel Verilerin Korunması Kanunu’na uymakla yükümlüdür ve faaliyet süreçlerinde işlenen tüm kişisel veriler bu kanun kapsamındadır.

              TrustEX A.Ş. olarak, veri sorumlusu sıfatıyla hareket etmekte ve kişisel verilerin korunması hakkında gerekli önlemleri almaktayız.

              Kişisel Verilerin İşlenmesinde Genel İlkeler

              Şirketimiz, kişisel verilerin işlenmesinde 6698 sayılı Kanun’un ortaya koymuş olduğu genel ilkelere uygun davranmaktadır. Kişisel verilerin işlenmesinde genel ilkelerimiz şu şekildedir;

              1) Hukuka ve dürüstlük kurallarına uygun olma,
              2) Doğru ve gerektiğinde güncel olma,
              3) Belirli, açık ve meşru amaçlar için işlenme,
              4) İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olma,
              5) İlgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza etme.

              Kişisel verileriniz, Şirketimiz tarafından verilen hizmet, ürün ya da ticari faaliyete bağlı olarak değişkenlik gösterebilmekle birlikte otomatik ya da otomatik olmayan yöntemlerle, Şirketimizin ve üye iş yerlerimizin ofisler, şubeler, bayiler, çağrı merkezi, internet sitesi, sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla sözlü, yazılı ya da elektronik olarak toplanabilecektir.

              Ayrıca Şirketimiz hizmetlerini kullanmak niyetiyle çağrı merkezimizi aradığınızda, internet sitemizi ziyaret ettiğinizde, şirketimizin düzenlediği eğitim, seminer, organizasyon ve toplantılara katıldığınızda kişisel verileriniz işlenebilecektir.


              Kişisel Veri Toplamanın Hukuki Sebebi

              Kişisel verileriniz, her türlü sözlü, yazılı ya da elektronik ortamda, yukarıda yer verilen amaçlar doğrultusunda Şirketçe sunduğumuz ürün ve hizmetlerin belirlenen yasal çerçevede sunulabilmesi ve bu kapsamda Şirketimizin sözleşme ve yasadan doğan mesuliyetlerini eksiksiz ve doğru bir şekilde yerine getirebilmesi gayesi ile edinilir. Bu hukuki sebeple toplanan kişisel verileriniz KVK Kanunu’nun 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları kapsamında bu metinde belirtilen amaçlarla da işlenebilmekte ve aktarılabilmektedir.

              Kişisel veriler, şirketimiz tarafından;
              •	Sunulan hizmetlerin iyileştirilmesi, yeni hizmetlerin geliştirilmesi ve bununla ilgili bilgilendirme yapılması,
              •	Ticari elektronik ileti onayı mevcut müşteriler ve aday müşteriler açısından; kampanya ve hizmetlerin tanıtımı ile pazarlamasının yapılması,
              •	Müşteri sorun ve şikâyetlerinin çözümlenmesi,
              •	İstatistiksel değerlendirmeler ve pazar araştırmaları yapılması,
              •	Şirketin ticari ve iş stratejilerinin belirlenmesi ve uygulanması,
              •	Üye iş yerleri ve iş ortakları ile ilişkilerin yönetilmesi,
              •	Muhasebe ve ödeme işlemlerinin takibi,
              •	Hukuki süreçler ve mevzuata uyum,
              •	İdari ve adli makamlardan gelen bilgi taleplerinin cevaplandırılması,
              •	Şirket içi raporlama ve iş geliştirme faaliyetlerinin planlanması
              •	Finansal kontrol ve raporlamaların yapılarak yasal bildirimlerin gerçekleştirilmesi,
              •	İç kontrol ve denetim faaliyetlerinin yönetilmesi,
              •	Bilgi ve işlem güvenliği sağlanması ve kötü amaçlı kullanımın önlenmesi,
              •	İşlenen verilerin güncel ve doğru olmasının sağlanması amacıyla gerekli düzenlemelerin yapılması ve sayılan tüm bu süreçlere ilişkin faaliyetleri gerçekleştirmek amacıyla kullanılmaktadır.

              İşlenen Kişisel Verilerin Aktarımı
              Şirketimiz, kişisel verilerinizi yurt içi ve yurt dışındaki iş ortaklarımız, üye iş yerlerimiz, bankalar, finansal kuruluşlar, bağımsız denetim kuruluşları vb. Ödeme ve Menkul Kıymet Mutabakat Sistemleri, Ödeme Hizmetleri ve Elektronik Para Kuruluşları Hakkında Kanun ve diğer mevzuat hükümlerinin izin verdiği kişi ve kuruşlar ile paylaşabilir. Saklanan veriler, KVK Kanunu’ nun 8. ve 9. Maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
              Şirketimizin müşterileri ile gerçekleştirdiği işlemlere ilişkin kayıt ve belgelerin yasal düzenlemeler kapsamında belirli bir süre saklanması söz konusu olup kişisel verilerinizin silinmesini istemeniz halinde bu talebiniz, yasal düzenlemeler ile belirlenen süre sonuna kadar yerine getirilebilecek, bu süreç içerisinde kişisel verileriniz yasal düzenlemelerden kaynaklı zorunluluklar haricinde işlenmeyecek ve üçüncü kişiler ile paylaşılmayacaktır.
              Kişisel Veri Sahibinin KVK Kanunu’nun 11. Maddesinde Sayılan Hakları

              Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi, işbu Aydınlatma Metni’nde aşağıda düzenlenen yöntemlerle Şirketimize iletmeniz durumunda Şirketimiz talebin niteliğine göre talebi en geç otuz gün içinde herhangi bir ücret olmaksızın sonuçlandıracaktır. Ancak, Kişisel Verileri Koruma Kurulunca bir ücret öngörülmesi halinde, Şirketimiz tarafından belirlenen tarifedeki ücret alınacaktır. Bu kapsamda kişisel veri sahipleri;
              •	Kişisel veri işlenip işlenmediğini öğrenme,
              •	Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,
              •	Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,
              •	Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,
              Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
              •	KVK Kanunu’nun ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
              •	İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,
              •	Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme haklarına sahiptir.

              KVK Kanunu’nun 13. maddesinin 1. fıkrası gereğince, yukarıda belirtilen haklarınızı kullanmak ile ilgili talebinizi, yazılı veya Kişisel Verileri Koruma Kurulu’nun belirlediği diğer yöntemlerle Şirketimize iletebilirsiniz. Kişisel Verileri Koruma Kurulu, şu aşamada herhangi bir yöntem belirlemediği için başvurunuzu KVK Kanunu gereğince, yazılı olarak Şirketimize iletmeniz gerekmektedir. Bu çerçevede Şirketimize KVK Kanunu’nun 11. maddesi kapsamında yapacağınız başvurularda yazılı olarak başvurunuzu ileteceğiniz kanallar ve usuller aşağıda açıklanmaktadır.

              Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit edici gerekli bilgiler ve talep olunan diğer bilgiler ile KVK Kanunu’nun 11. maddesinde belirtilen haklardan kullanmayı talep ettiğiniz hakkınıza yönelik açıklamalarınızı içeren talebinizi KVK Kanunu’nda belirtilen diğer yöntemler ile gönderebilir veya ilgili formu ozanardacam@gmail adresine güvenli elektronik imzalı olarak iletebilirsiniz.


            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}