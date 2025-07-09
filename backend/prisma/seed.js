const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  // Tworzymy admina
  const adminEmail = 'admin@tworcza.pl';
  const adminPassword = 'admin123';

  const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!adminExists) {
    const hashed = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashed,
        role: 'admin'
      }
    });
    console.log(`✅ Admin created: ${adminEmail}`);
  }

  // Tworzymy testowe produkty
  const products = [
    {
        title: "Nowoczesna strona dla restauracji", 
        description: "Idealna strona dla nowoczesnej restauracji z funkcją rezerwacji stolików.",
        features: ["Formularz kontaktowy", "Slider", "Newsletter", "WhatsApp Chat"], 
        previewImage: "https://placehold.co/600x400?text=Restauracja",
        demoUrl: "https://shop.windeye.com/", 
        wordpressZipUrl: "https://example.com/zips/restauracja.zip",
        type: 'Strona Internetowa',
        visible: true,
        special: false,
        productCode: 'SITE_RESTAURACJA'
    },
    {
        title: 'Portfolio fotografa',
        description: 'Minimalistyczna strona dla fotografa z galerią zdjęć.',
        features: ['Galeria', 'Kontakt', 'Newsletter', 'Animacje'],
        previewImage: 'https://placehold.co/600x400?text=Portfolio',
        demoUrl: "https://shop.windeye.com/",
        wordpressZipUrl: 'https://example.com/zips/portfolio.zip',
        type: 'Strona Internetowa',
        visible: true,
        special: false,
        productCode: 'SITE_FOTO'
    },
    {
        title: 'Landing page produktu SaaS',
        description: 'Profesjonalna strona sprzedażowa z integracją Stripe.',
        features: ['Płatności', 'Newsletter', 'Sekcja FAQ', 'CTA'],
        previewImage: 'https://placehold.co/600x400?text=SaaS+Landing',
        demoUrl: "https://shop.windeye.com/",
        wordpressZipUrl: 'https://example.com/zips/saas.zip',
        type: 'Landing Page',
        visible: true,
        special: true,
        productCode: 'LANDING_SAAS'
    },
        {
          title: "Sklep internetowy z odzieżą",
          description: "Responsywny e-commerce z filtrowaniem produktów i płatnościami online.",
          features: ["Koszyk", "Płatności online", "Newsletter", "Filtrowanie produktów"],
          previewImage: "https://placehold.co/600x400?text=Sklep+Odzieżowy",
          demoUrl: "https://shop.windeye.com/",
          wordpressZipUrl: "https://example.com/zips/sklep-odziez.zip",
          type: "Sklep Internetowy",
          visible: true,
          special: true,
          productCode: "SHOP_CLOTHING"
        },
        {
          title: "Strona dla salonu kosmetycznego",
          description: "Nowoczesna witryna z możliwością rezerwacji wizyt online.",
          features: ["Rezerwacje", "Instagram feed", "Kontakt", "Newsletter"],
          previewImage: "https://placehold.co/600x400?text=Kosmetyka",
          demoUrl: "https://shop.windeye.com/",
          wordpressZipUrl: "https://example.com/zips/salon.zip",
          type: "Strona Internetowa",
          visible: true,
          special: false,
          productCode: "SITE_KOSMETYKA"
        },
        {
          title: "Landing page dla webinaru",
          description: "Konwertująca strona lądowania z zapisem na webinar i licznikiem czasu.",
          features: ["Zapis na webinar", "Licznik czasu", "Integracja z Zoom", "CTA"],
          previewImage: "https://placehold.co/600x400?text=Webinar",
          demoUrl: "https://shop.windeye.com/",
          wordpressZipUrl: "https://example.com/zips/webinar.zip",
          type: "Landing Page",
          visible: true,
          special: false,
          productCode: "LANDING_WEBINAR"
        },
        {
          title: "Strona dla kancelarii prawnej",
          description: "Profesjonalna strona z prezentacją usług, opinii klientów i formularzem kontaktowym.",
          features: ["Formularz kontaktowy", "Opinie klientów", "Oferta", "Blog"],
          previewImage: "https://placehold.co/600x400?text=Kancelaria",
          demoUrl: "https://shop.windeye.com/",
          wordpressZipUrl: "https://example.com/zips/kancelaria.zip",
          type: "Strona Internetowa",
          visible: true,
          special: false,
          productCode: "SITE_LAW"
        },
        {
          title: "Strona dla siłowni",
          description: "Sportowa strona z rozkładem zajęć i integracją z social media.",
          features: ["Plan zajęć", "Social media", "Cennik", "Kontakt"],
          previewImage: "https://placehold.co/600x400?text=Siłownia",
          demoUrl: "https://shop.windeye.com/",
          wordpressZipUrl: "https://example.com/zips/silownia.zip",
          type: "Strona Internetowa",
          visible: true,
          special: true,
          productCode: "SITE_GYM"
        },
        {
          title: "Landing page aplikacji mobilnej",
          description: "Świetnie wyglądająca strona promująca aplikację i linkami do App Store / Google Play.",
          features: ["Linki do App Store", "Zrzuty ekranu", "Sekcja FAQ", "CTA"],
          previewImage: "https://placehold.co/600x400?text=Aplikacja",
          demoUrl: "https://shop.windeye.com/",
          wordpressZipUrl: "https://example.com/zips/aplikacja.zip",
          type: "Landing Page",
          visible: true,
          special: false,
          productCode: "LANDING_APP"
        },
        {
          title: "Sklep z elektroniką",
          description: "Kompletny e-commerce z kategoriami, ocenami i porównywarką produktów.",
          features: ["Kategorie", "Opinie", "Koszyk", "Porównywarka produktów"],
          previewImage: "https://placehold.co/600x400?text=Elektronika",
          demoUrl: "https://shop.windeye.com/",
          wordpressZipUrl: "https://example.com/zips/elektronika.zip",
          type: "Sklep Internetowy",
          visible: true,
          special: true,
          productCode: "SHOP_ELECTRO"
        },
        {
          title: "Strona dla freelancera UX/UI",
          description: "Nowoczesne portfolio z opcją kontaktu i przedstawieniem projektów.",
          features: ["Portfolio", "Case studies", "Formularz", "Blog"],
          previewImage: "https://placehold.co/600x400?text=UX+Portfolio",
          demoUrl: "https://shop.windeye.com/",
          wordpressZipUrl: "https://example.com/zips/ux.zip",
          type: "Strona Internetowa",
          visible: true,
          special: false,
          productCode: "SITE_UX"
        },
        {
          title: "Landing page kampanii reklamowej",
          description: "Prosty, ale skuteczny landing do kampanii Google Ads lub Meta Ads.",
          features: ["Prosty layout", "CTA", "Formularz leadowy", "Tracking"],
          previewImage: "https://placehold.co/600x400?text=Reklama",
          demoUrl: "https://shop.windeye.com/",
          wordpressZipUrl: "https://example.com/zips/kampania.zip",
          type: "Landing Page",
          visible: true,
          special: false,
          productCode: "LANDING_ADS"
        },
        {
          title: "Strona eventowa / konferencja",
          description: "Dedykowana strona wydarzenia z agendą, prelegentami i zapisami.",
          features: ["Agenda", "Prelegenci", "Zapis na wydarzenie", "Mapa dojazdu"],
          previewImage: "https://placehold.co/600x400?text=Event",
          demoUrl: "https://shop.windeye.com/",
          wordpressZipUrl: "https://example.com/zips/event.zip",
          type: "Strona Internetowa",
          visible: true,
          special: true,
          productCode: "SITE_EVENT"
        }      
  ];

  for (const product of products) {
    const exists = await prisma.digitalProduct.findFirst({ where: { title: product.title } });
    if (!exists) {
      await prisma.digitalProduct.create({ data: product });
      console.log(`✅ Product added: ${product.title}`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
