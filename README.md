# Anqet

Bir anket uygulaması!

Projeyi kısıtlı zaman içinde olabildiğince tamamlayabilmek için React Native dökümanın da önerdiği gibi Expo ile kurdum ve tamamen Native olan Expo Navigation kütüphanesini kullandım.

Proje genel repo yönetim mantığı "locality of behaviour" felsefi üzerine kurulmuştur. Uygulama genelinde state async ve sync olarak iki temel yapıya bölünmüştür. Async state management server ve IO gerektiren dış etkenlere bağlı state olarak react-query ile yönetilmiştir. Sync state ise local ve global olarak karmaşıklığına ve erişimine göre useState ve context api kullanılarak yönetilmiştir.

Kullanınlan teknolojiler;

- expo: temel geliştirme ortamı ve bazı native eklentiler
- supabase: veritabanı ve kimlik doğrulama
- react-query: async state management
- context api: global veya paylaşılan state yönetimi
- react native ui lib: tema ve arayüz bileşenleri

Uygulamayı kullanmak için öncelikle Expo Go yükleyin sonra [exp://161.35.85.58:8081](exp://161.35.85.58:8081) adresi üzerinden veya aşağıdaki QR okutarak erişebilirsiniz.

![expo qr](expoqr.png)

Local üzerinde çalıştırıp kullanmak için;

- `npm install`
- `npm start`
- Expo Go uygulamasını telefonunuza yükleyin sonra açın ve konsoldaki QR kodu okutun.
